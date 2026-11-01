import { describe, expect, it } from "vitest";
import {
  applyRound,
  computeStandings,
  editScore,
  newGame,
  rankPlayers,
  reachedTarget,
  undoRound,
} from "./engine";
import { gameSchema } from "./schema";

const P = ["Aarav", "Priya", "Rohan"];
const play = (rounds: number[][], players = P) =>
  rounds.reduce(
    (game, r) =>
      applyRound(game, Object.fromEntries(players.map((p, i) => [p, r[i]]))).game,
    newGame(players),
  );

describe("newGame", () => {
  it("starts empty with default rules", () => {
    const game = newGame(P);
    expect(game.rounds).toEqual([]);
    expect(game.rules).toEqual({ penalty: 30, targetTotal: null });
    expect(computeStandings(game).map((s) => s.total)).toEqual([0, 0, 0]);
  });

  it("accepts custom rules", () => {
    expect(newGame(P, { penalty: 40, targetTotal: 200 }).rules).toEqual({
      penalty: 40,
      targetTotal: 200,
    });
  });

  it("allows 2 to 8 players only", () => {
    expect(() => newGame(["A"])).toThrow();
    expect(() => newGame("ABCDEFGHI".split(""))).toThrow();
    expect(newGame("AB".split("")).players).toHaveLength(2);
    expect(newGame("ABCDEFGH".split("")).players).toHaveLength(8);
  });

  it("rejects duplicate or blank names", () => {
    expect(() => newGame(["A", "A"])).toThrow();
    expect(() => newGame(["A", " "])).toThrow();
  });
});

describe("applyRound", () => {
  it("records a round and sums totals", () => {
    const game = play([
      [0, 12, 30],
      [5, 0, 8],
    ]);
    expect(computeStandings(game)).toEqual([
      { player: "Aarav", total: 5, zeros: 1 },
      { player: "Priya", total: 12, zeros: 1 },
      { player: "Rohan", total: 38, zeros: 0 },
    ]);
  });

  it("allows several zeros in one round with no warning", () => {
    const { warnings } = applyRound(newGame(P), { Aarav: 0, Priya: 0, Rohan: 9 });
    expect(warnings).toEqual([]);
  });

  it("warns, but does not block, when nobody scored 0", () => {
    const { game, warnings } = applyRound(newGame(P), { Aarav: 4, Priya: 9, Rohan: 7 });
    expect(warnings).toHaveLength(1);
    expect(game.rounds).toHaveLength(1);
  });

  it("does not mutate the input game", () => {
    const before = newGame(P);
    applyRound(before, { Aarav: 0, Priya: 1, Rohan: 2 });
    expect(before.rounds).toEqual([]);
  });

  it.each([
    ["negative", -1],
    ["fractional", 2.5],
    ["NaN", NaN],
    ["Infinity", Infinity],
    ["a string", "7" as unknown as number],
  ])("rejects %s scores", (_, bad) => {
    expect(() => applyRound(newGame(P), { Aarav: bad, Priya: 0, Rohan: 0 })).toThrow(/Aarav/);
  });

  it("rejects a missing player and an unknown player", () => {
    expect(() => applyRound(newGame(P), { Aarav: 0, Priya: 0 })).toThrow(/Rohan/);
    expect(() =>
      applyRound(newGame(P), { Aarav: 0, Priya: 0, Rohan: 0, Zed: 1 }),
    ).toThrow(/Zed/);
  });

  describe("wrong show", () => {
    it("gives the player the penalty instead of their hand", () => {
      const { game } = applyRound(newGame(P), { Aarav: 99, Priya: 0, Rohan: 6 }, "Aarav");
      expect(game.rounds[0].scores.Aarav).toBe(30);
      expect(game.rounds[0].wrongShow).toBe("Aarav");
    });

    it("uses the game's penalty and needs no entered value for that player", () => {
      const game = newGame(P, { penalty: 50 });
      const { game: next } = applyRound(game, { Priya: 0, Rohan: 6 }, "Aarav");
      expect(next.rounds[0].scores.Aarav).toBe(50);
    });

    it("is not a zero-round, even when the penalty is the only score", () => {
      const { game } = applyRound(newGame(P), { Priya: 3, Rohan: 6 }, "Aarav");
      expect(computeStandings(game)[0].zeros).toBe(0);
    });

    it("rejects an unknown wrong-show player", () => {
      expect(() => applyRound(newGame(P), { Aarav: 0, Priya: 0, Rohan: 0 }, "Zed")).toThrow(/Zed/);
    });
  });
});

describe("rankPlayers", () => {
  it("ranks lowest total first", () => {
    const ranked = rankPlayers(play([[10, 0, 5]]));
    expect(ranked.map((r) => [r.player, r.rank])).toEqual([
      ["Priya", 1],
      ["Rohan", 2],
      ["Aarav", 3],
    ]);
  });

  it("breaks a tied total by most zero-rounds", () => {
    // Everyone ends on 10; Aarav has 2 zero-rounds, Priya 1, Rohan 0.
    const ranked = rankPlayers(
      play([
        [0, 5, 4],
        [0, 5, 3],
        [10, 0, 3],
      ]),
    );
    expect(ranked.map((r) => [r.player, r.rank])).toEqual([
      ["Aarav", 1],
      ["Priya", 2],
      ["Rohan", 3],
    ]);
  });

  it("shares a rank when total and zero-rounds are both equal", () => {
    // Aarav and Priya tie on 5 with one zero each; Rohan is behind.
    const ranked = rankPlayers(
      play([
        [0, 5, 9],
        [5, 0, 9],
      ]),
    );
    expect(ranked.map((r) => r.rank)).toEqual([1, 1, 3]);
  });

  it("shares rank 1 for everyone in an empty game", () => {
    expect(rankPlayers(newGame(P)).map((r) => r.rank)).toEqual([1, 1, 1]);
  });
});

describe("reachedTarget", () => {
  const withTarget = (rounds: number[][]) =>
    rounds.reduce(
      (g, r) => applyRound(g, { Aarav: r[0], Priya: r[1], Rohan: r[2] }).game,
      newGame(P, { targetTotal: 50 }),
    );

  it("is always false when no target is set", () => {
    expect(reachedTarget(play([[999, 0, 0]]))).toBe(false);
  });

  it("turns true when a player's total reaches the target, not before", () => {
    expect(reachedTarget(withTarget([[49, 0, 0]]))).toBe(false);
    expect(reachedTarget(withTarget([[20, 0, 0], [30, 0, 0]]))).toBe(true);
    expect(reachedTarget(withTarget([[60, 0, 0]]))).toBe(true);
  });

  it("goes back to false after an undo", () => {
    expect(reachedTarget(undoRound(withTarget([[10, 0, 0], [45, 0, 0]])))).toBe(false);
  });
});

describe("editScore", () => {
  it("changes one cell and records the edit", () => {
    const game = editScore(play([[1, 2, 3]]), 1, "Priya", 9);
    expect(game.rounds[0].scores.Priya).toBe(9);
    expect(game.log).toEqual([{ type: "edit", round: 1, player: "Priya", from: 2, to: 9 }]);
  });

  it("changes totals and ranking", () => {
    const game = editScore(play([[1, 2, 3]]), 1, "Aarav", 50);
    expect(rankPlayers(game)[0].player).toBe("Priya");
  });

  it("does not mutate the input game", () => {
    const before = play([[1, 2, 3]]);
    editScore(before, 1, "Priya", 9);
    expect(before.rounds[0].scores.Priya).toBe(2);
    expect(before.log).toEqual([]);
  });

  it("clears the wrong-show flag when that player's cell is edited", () => {
    const { game } = applyRound(newGame(P), { Priya: 0, Rohan: 6 }, "Aarav");
    expect(editScore(game, 1, "Aarav", 12).rounds[0].wrongShow).toBeNull();
    expect(editScore(game, 1, "Priya", 1).rounds[0].wrongShow).toBe("Aarav");
  });

  it("rejects bad rounds, players and values", () => {
    const game = play([[1, 2, 3]]);
    expect(() => editScore(game, 0, "Aarav", 1)).toThrow(/round/i);
    expect(() => editScore(game, 2, "Aarav", 1)).toThrow(/round/i);
    expect(() => editScore(game, 1, "Zed", 1)).toThrow(/Zed/);
    expect(() => editScore(game, 1, "Aarav", -1)).toThrow(/Aarav/);
    expect(() => editScore(game, 1, "Aarav", 1.5)).toThrow(/Aarav/);
  });
});

describe("undoRound", () => {
  it("removes only the last round and records it", () => {
    const game = undoRound(play([[1, 2, 3], [4, 5, 6]]));
    expect(game.rounds).toHaveLength(1);
    expect(computeStandings(game).map((s) => s.total)).toEqual([1, 2, 3]);
    expect(game.log).toEqual([{ type: "undo", round: 2 }]);
  });

  it("throws on an empty game", () => {
    expect(() => undoRound(newGame(P))).toThrow(/no rounds/i);
  });

  it("keeps earlier edits in the log", () => {
    const game = undoRound(editScore(play([[1, 2, 3], [4, 5, 6]]), 1, "Aarav", 7));
    expect(game.log.map((e) => e.type)).toEqual(["edit", "undo"]);
  });
});

describe("gameSchema (used for saved or loaded games)", () => {
  const saved = play([[0, 4, 9]]);

  it("accepts a game the engine produced", () => {
    expect(gameSchema.safeParse(saved).success).toBe(true);
  });

  it.each([
    ["a round missing a player", { Aarav: 0, Priya: 4 }, null],
    ["a round with a stranger", { Aarav: 0, Priya: 4, Rohan: 9, Zed: 1 }, null],
    ["a wrong-show player who is not in the game", { Aarav: 0, Priya: 4, Rohan: 9 }, "Zed"],
  ])("rejects %s", (_, scores, wrongShow) => {
    expect(gameSchema.safeParse({ ...saved, rounds: [{ scores, wrongShow }] }).success).toBe(false);
  });
});
