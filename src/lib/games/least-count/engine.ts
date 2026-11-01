import { gameSchema, scoreSchema, type Game, type Rules } from "./schema";

export type Standing = { player: string; total: number; zeros: number };
export type RankedStanding = Standing & { rank: number };

function checkScore(player: string, value: unknown) {
  const parsed = scoreSchema.safeParse(value);
  if (!parsed.success) {
    throw new Error(`Invalid score for ${player}: must be a whole number, 0 or more`);
  }
  return parsed.data;
}

function checkPlayer(game: Game, player: string) {
  if (!game.players.includes(player)) throw new Error(`Unknown player: ${player}`);
}

export function newGame(players: string[], rules: Partial<Rules> = {}): Game {
  return gameSchema.parse({ players, rules, rounds: [], log: [] });
}

/** `entered` holds each player's hand total. A wrong-show player gets the penalty instead. */
export function applyRound(
  game: Game,
  entered: Record<string, number>,
  wrongShow: string | null = null,
): { game: Game; warnings: string[] } {
  Object.keys(entered).forEach((player) => checkPlayer(game, player));
  if (wrongShow !== null) checkPlayer(game, wrongShow);

  const scores = Object.fromEntries(
    game.players.map((player) => [
      player,
      player === wrongShow ? game.rules.penalty : checkScore(player, entered[player]),
    ]),
  );
  const warnings = Object.values(scores).includes(0) ? [] : ["Nobody scored 0 this round"];

  return {
    game: { ...game, rounds: [...game.rounds, { scores, wrongShow }] },
    warnings,
  };
}

/** `round` is 1-based, as shown to players. */
export function editScore(game: Game, round: number, player: string, value: number): Game {
  const target = game.rounds[round - 1];
  if (!target) throw new Error(`No such round: ${round}`);
  checkPlayer(game, player);
  const to = checkScore(player, value);

  const rounds = game.rounds.map((r) =>
    r === target
      ? {
          ...r,
          scores: { ...r.scores, [player]: to },
          // An edited cell is no longer the penalty.
          wrongShow: r.wrongShow === player ? null : r.wrongShow,
        }
      : r,
  );
  const entry = { type: "edit" as const, round, player, from: target.scores[player], to };
  return { ...game, rounds, log: [...game.log, entry] };
}

export function undoRound(game: Game): Game {
  if (game.rounds.length === 0) throw new Error("No rounds to undo");
  const entry = { type: "undo" as const, round: game.rounds.length };
  return { ...game, rounds: game.rounds.slice(0, -1), log: [...game.log, entry] };
}

/** One row per player, in seat order. A zero-round is a round where the player scored 0. */
export function computeStandings(game: Game): Standing[] {
  return game.players.map((player) => {
    const mine = game.rounds.map((r) => r.scores[player]);
    return {
      player,
      total: mine.reduce((sum, s) => sum + s, 0),
      zeros: mine.filter((s) => s === 0).length,
    };
  });
}

/** True once any player's total reaches the target total. Always false when no target is set. */
export function reachedTarget(game: Game): boolean {
  const { targetTotal } = game.rules;
  return targetTotal !== null && computeStandings(game).some((s) => s.total >= targetTotal);
}

/** Lowest total wins; ties go to the most zero-rounds; still tied means a shared rank (1, 1, 3). */
export function rankPlayers(game: Game): RankedStanding[] {
  const sorted = computeStandings(game).sort((a, b) => a.total - b.total || b.zeros - a.zeros);
  const ranked: RankedStanding[] = [];
  sorted.forEach((s, i) => {
    const prev = ranked[i - 1];
    const tied = prev && prev.total === s.total && prev.zeros === s.zeros;
    ranked.push({ ...s, rank: tied ? prev.rank : i + 1 });
  });
  return ranked;
}
