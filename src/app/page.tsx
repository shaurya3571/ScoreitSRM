import Link from "next/link";
import { ArrowRight, Check, CircleDot, Users, Trophy } from "lucide-react";
import { Container } from "@/components/layout/container";

const features = [
  {
    icon: Users,
    title: "Play together",
    description:
      "Bring everyone into one game room and keep the whole group on the same page.",
  },
  {
    icon: CircleDot,
    title: "Track every round",
    description:
      "Record scores round by round and spend less time managing the scoreboard.",
  },
  {
    icon: Trophy,
    title: "See who wins",
    description:
      "Follow the leaderboard and find out how the game is progressing.",
  },
];

export default function Home() {
  return (
    <>
      <section className="overflow-hidden py-16 sm:py-24 lg:py-32">
        <Container>
          <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
            <div>
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1.5 text-sm text-muted-foreground">
                <span className="size-2 rounded-full bg-primary" />
                Your games, one scoreboard
              </div>

              <h1 className="max-w-2xl font-heading text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
                Less counting.
                <br />
                <span className="text-primary">More playing.</span>
              </h1>

              <p className="mt-6 max-w-xl text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">
                Keep track of scores, follow every round, and enjoy game night
                with your friends. ScoreitSRM brings your scoreboard together
                in one place.
              </p>

              <div id="get-started" className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="#features"
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-primary px-6 font-semibold text-primary-foreground transition-opacity hover:opacity-90"
                >
                  Explore features <ArrowRight size={18} />
                </Link>

                <Link
                  href="#how-it-works"
                  className="inline-flex min-h-12 items-center justify-center rounded-xl border border-border bg-card px-6 font-semibold text-foreground transition-colors hover:bg-muted"
                >
                  How it works
                </Link>
              </div>

              <div className="mt-8 flex flex-wrap gap-x-5 gap-y-3 text-sm text-muted-foreground">
                {["Simple scorekeeping", "Group-friendly", "Built for game nights"].map(
                  (item) => (
                    <span key={item} className="inline-flex items-center gap-2">
                      <Check size={16} className="text-primary" />
                      {item}
                    </span>
                  ),
                )}
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-4 rounded-[2rem] bg-primary/10 blur-2xl" />

              <div className="relative rounded-3xl border border-border bg-card p-5 shadow-xl sm:p-7">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Game preview</p>
                    <h2 className="mt-1 font-heading text-2xl font-bold">
                      Friday Game Night
                    </h2>
                  </div>
                  <span className="rounded-full bg-secondary px-3 py-1 text-xs font-semibold text-secondary-foreground">
                    Demo
                  </span>
                </div>

                <div className="mt-7 space-y-3">
                  {[
                    { name: "Aarav", score: 42, color: "bg-player-green" },
                    { name: "Priya", score: 35, color: "bg-player-pink" },
                    { name: "Rohan", score: 28, color: "bg-player-orange" },
                    { name: "Ananya", score: 19, color: "bg-player-blue" },
                  ].map((player, index) => (
                    <div
                      key={player.name}
                      className="flex items-center gap-3 rounded-2xl border border-border p-3"
                    >
                      <span
                        className={`flex size-11 shrink-0 items-center justify-center rounded-xl font-heading font-bold text-foreground ${player.color}`}
                      >
                        {player.name.charAt(0)}
                      </span>

                      <div className="min-w-0 flex-1">
                        <p className="truncate font-semibold">{player.name}</p>
                        <p className="text-xs text-muted-foreground">
                          Player {index + 1}
                        </p>
                      </div>

                      <span className="font-heading text-xl font-bold tabular-nums">
                        {player.score}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="mt-5 flex items-center justify-between rounded-2xl bg-muted p-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Current leader</p>
                    <p className="mt-1 font-semibold">Aarav</p>
                  </div>
                  <Trophy className="text-primary" size={24} />
                </div>

                <p className="mt-3 text-center text-xs text-muted-foreground">
                  Illustrative preview — not a live game
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section id="features" className="border-y border-border bg-card py-16 sm:py-20">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold uppercase tracking-widest text-primary">
              Made for game nights
            </p>
            <h2 className="mt-3 font-heading text-3xl font-bold tracking-tight sm:text-4xl">
              Everything starts with the score
            </h2>
            <p className="mt-4 leading-7 text-muted-foreground">
              A clear, simple foundation for keeping your group’s games organized.
            </p>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {features.map((feature) => {
              const Icon = feature.icon;

              return (
                <article
                  key={feature.title}
                  className="rounded-2xl border border-border bg-background p-6 transition-transform hover:-translate-y-1"
                >
                  <span className="inline-flex size-12 items-center justify-center rounded-xl bg-secondary text-primary">
                    <Icon size={23} />
                  </span>
                  <h3 className="mt-5 font-heading text-xl font-bold">
                    {feature.title}
                  </h3>
                  <p className="mt-3 leading-7 text-muted-foreground">
                    {feature.description}
                  </p>
                </article>
              );
            })}
          </div>
        </Container>
      </section>

      <section id="how-it-works" className="py-16 sm:py-24">
        <Container>
          <div className="grid gap-10 md:grid-cols-2 md:items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-widest text-primary">
                How it works
              </p>
              <h2 className="mt-3 font-heading text-3xl font-bold tracking-tight sm:text-4xl">
                Keep game night moving.
              </h2>
              <p className="mt-4 max-w-xl leading-7 text-muted-foreground">
                The goal is straightforward: make scores easier to follow so
                everyone can focus on the game.
              </p>
            </div>

            <ol className="space-y-4">
              {[
                ["01", "Bring your group together", "Get everyone ready for game night."],
                ["02", "Record the scores", "Keep each round organized in one place."],
                ["03", "Follow the leaderboard", "See how the standings change as you play."],
              ].map(([number, title, description]) => (
                <li
                  key={number}
                  className="flex gap-4 rounded-2xl border border-border bg-card p-5"
                >
                  <span className="font-heading text-lg font-bold text-primary">
                    {number}
                  </span>
                  <div>
                    <h3 className="font-semibold">{title}</h3>
                    <p className="mt-1 text-sm leading-6 text-muted-foreground">
                      {description}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </Container>
      </section>

      <section id="about" className="pb-16 sm:pb-24">
        <Container>
          <div className="rounded-3xl bg-primary px-6 py-10 text-center text-primary-foreground sm:px-12 sm:py-14">
            <h2 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl">
              Make every round count.
            </h2>
            <p className="mx-auto mt-4 max-w-xl leading-7 opacity-90">
              ScoreitSRM is building a simpler way to manage scores and enjoy
              friendly competition.
            </p>
            <Link
              href="#get-started"
              className="mt-7 inline-flex min-h-12 items-center justify-center rounded-xl bg-background px-6 font-semibold text-foreground transition-opacity hover:opacity-90"
            >
              Get started
            </Link>
          </div>
        </Container>
      </section>
    </>
  );
}