import { z } from "zod";

export const scoreSchema = z.int().min(0);

export const rulesSchema = z.object({
  penalty: scoreSchema.default(30),
  targetTotal: z.int().positive().nullable().default(null),
});

const roundSchema = z.object({
  scores: z.record(z.string(), scoreSchema),
  wrongShow: z.string().nullable(),
});

const logEntrySchema = z.discriminatedUnion("type", [
  z.object({
    type: z.literal("edit"),
    round: z.int().positive(),
    player: z.string(),
    from: scoreSchema,
    to: scoreSchema,
  }),
  z.object({ type: z.literal("undo"), round: z.int().positive() }),
]);

export const gameSchema = z.object({
  players: z
    .array(z.string().trim().min(1))
    .min(2)
    .max(8)
    .refine((names) => new Set(names).size === names.length, "Player names must be unique"),
  rules: rulesSchema,
  rounds: z.array(roundSchema),
  log: z.array(logEntrySchema),
}).refine(
  ({ players, rounds }) =>
    rounds.every(
      (r) =>
        Object.keys(r.scores).length === players.length &&
        players.every((p) => p in r.scores) &&
        (r.wrongShow === null || players.includes(r.wrongShow)),
    ),
  "Every round needs a score for each player, and nobody else",
);

export type Rules = z.infer<typeof rulesSchema>;
export type Game = z.infer<typeof gameSchema>;
