import type { Metadata } from "next";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Container } from "@/components/layout/container";
import { LoadingState } from "@/components/states/loading-state";
import { EmptyState } from "@/components/states/empty-state";
import { ErrorState } from "@/components/states/error-state";

export const metadata: Metadata = {
  title: "Design System",
  description: "ScoreitSRM design system and component showcase.",
};

const colors = [
  { name: "Background", variable: "--background" },
  { name: "Foreground", variable: "--foreground" },
  { name: "Primary", variable: "--primary" },
  { name: "Secondary", variable: "--secondary" },
  { name: "Muted", variable: "--muted" },
  { name: "Border", variable: "--border" },
  { name: "Success", variable: "--success" },
  { name: "Warning", variable: "--warning" },
  { name: "Player green", variable: "--player-green" },
  { name: "Player pink", variable: "--player-pink" },
  { name: "Player orange", variable: "--player-orange" },
  { name: "Player blue", variable: "--player-blue" },
];

function Section({
  id,
  number,
  title,
  description,
  children,
}: {
  id: string;
  number: string;
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-24 py-10 sm:py-14">
      <div className="mb-6 flex items-start gap-4">
        <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-secondary font-heading text-sm font-bold text-primary">
          {number}
        </span>
        <div>
          <h2 className="font-heading text-2xl font-bold tracking-tight">
            {title}
          </h2>
          <p className="mt-1 text-sm leading-6 text-muted-foreground">
            {description}
          </p>
        </div>
      </div>
      {children}
    </section>
  );
}

export default function DesignSystemPage() {
  return (
    <Container className="py-8 sm:py-12">
      <header className="rounded-3xl border border-border bg-card p-6 sm:p-10">
        <Badge>Internal showcase</Badge>
        <h1 className="mt-4 font-heading text-4xl font-bold tracking-tight sm:text-5xl">
          Design system<span className="text-primary">.</span>
        </h1>
        <p className="mt-4 max-w-2xl leading-7 text-muted-foreground">
          One place to inspect ScoreitSRM typography, colors, reusable
          components, shared states, and responsive layouts.
        </p>

        <nav aria-label="Design system sections" className="mt-6 flex flex-wrap gap-2">
          {[
            ["Typography", "#typography"],
            ["Colors", "#colors"],
            ["Buttons", "#buttons"],
            ["Cards", "#cards"],
            ["Badges", "#badges"],
            ["Avatars", "#avatars"],
            ["Inputs", "#inputs"],
            ["States", "#states"],
            ["Responsive", "#responsive"],
          ].map(([label, href]) => (
            <a
              key={href}
              href={href}
              className="rounded-full border border-border px-3 py-2 text-sm font-medium transition-colors hover:bg-muted"
            >
              {label}
            </a>
          ))}
        </nav>
      </header>

      <Section
        id="typography"
        number="01"
        title="Typography"
        description="Inter for body text, Plus Jakarta Sans for headings, and Geist Mono for code."
      >
        <Card>
          <CardContent className="space-y-5 pt-6">
            <div>
              <p className="text-xs text-muted-foreground">Heading / 4xl</p>
              <h1 className="font-heading text-4xl font-bold tracking-tight">
                Every round counts.
              </h1>
            </div>
            <Separator />
            <div>
              <p className="text-xs text-muted-foreground">Heading / 2xl</p>
              <h2 className="font-heading text-2xl font-semibold">
                Keep the game going.
              </h2>
            </div>
            <Separator />
            <div>
              <p className="text-xs text-muted-foreground">Body</p>
              <p className="leading-7">
                Bring your friends together, record scores, and follow the
                leaderboard without interrupting game night.
              </p>
            </div>
            <Separator />
            <div>
              <p className="text-xs text-muted-foreground">Monospace</p>
              <code className="font-mono text-sm">round.totalScore = 42;</code>
            </div>
          </CardContent>
        </Card>
      </Section>

      <Section
        id="colors"
        number="02"
        title="Colors"
        description="Color swatches are linked to the CSS variables defined in globals.css."
      >
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {colors.map((color) => (
            <div
              key={color.variable}
              className="overflow-hidden rounded-2xl border border-border bg-card"
            >
              <div
                className="h-20 border-b border-border"
                style={{ backgroundColor: `var(${color.variable})` }}
                aria-label={`${color.name} color swatch`}
              />
              <div className="p-3">
                <p className="text-sm font-semibold">{color.name}</p>
                <code className="mt-1 block break-all text-xs text-muted-foreground">
                  {color.variable}
                </code>
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section
        id="buttons"
        number="03"
        title="Buttons"
        description="Check variants, sizes, disabled states, and wrapping on smaller screens."
      >
        <Card>
          <CardContent className="flex flex-wrap items-center gap-3 pt-6">
            <Button>Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="destructive">Destructive</Button>
            <Button disabled>Disabled</Button>
          </CardContent>
          <CardFooter className="flex flex-wrap items-center gap-3">
            <Button size="sm">Small</Button>
            <Button size="default">Default</Button>
            <Button size="lg">Large</Button>
          </CardFooter>
        </Card>
      </Section>

      <Section
        id="cards"
        number="04"
        title="Cards"
        description="Reusable surfaces for game rooms, players, history, and dashboard summaries."
      >
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Friday Game Night</CardTitle>
              <CardDescription>Example game room</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-end justify-between gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Players</p>
                  <p className="font-heading text-3xl font-bold">4</p>
                </div>
                <Badge variant="secondary">In progress</Badge>
              </div>
            </CardContent>
            <CardFooter>
              <p className="text-sm text-muted-foreground">
                Sample content only
              </p>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Leaderboard</CardTitle>
              <CardDescription>Example score summary</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                ["Aarav", "42"],
                ["Priya", "35"],
                ["Rohan", "28"],
              ].map(([name, score], index) => (
                <div key={name} className="flex items-center gap-3">
                  <span className="flex size-8 items-center justify-center rounded-lg bg-secondary text-sm font-bold">
                    {index + 1}
                  </span>
                  <span className="flex-1 font-medium">{name}</span>
                  <span className="font-heading font-bold tabular-nums">
                    {score}
                  </span>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </Section>

      <Section
        id="badges"
        number="05"
        title="Badges"
        description="Compact labels for game status, categories, and player information."
      >
        <Card>
          <CardContent className="flex flex-wrap items-center gap-3 pt-6">
            <Badge>Default</Badge>
            <Badge variant="secondary">Secondary</Badge>
            <Badge variant="outline">Outline</Badge>
            <Badge variant="destructive">Destructive</Badge>
          </CardContent>
        </Card>
      </Section>

      <Section
        id="avatars"
        number="06"
        title="Avatars"
        description="Image avatars with initials as a fallback."
      >
        <Card>
          <CardContent className="flex flex-wrap items-center gap-5 pt-6">
            <div className="text-center">
              <Avatar className="size-12">
                <AvatarImage src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=96&h=96&fit=crop&crop=faces" alt="Example player" />
                <AvatarFallback>AA</AvatarFallback>
              </Avatar>
              <p className="mt-2 text-xs text-muted-foreground">Image</p>
            </div>
            <div className="text-center">
              <Avatar className="size-12">
                <AvatarFallback>PR</AvatarFallback>
              </Avatar>
              <p className="mt-2 text-xs text-muted-foreground">Fallback</p>
            </div>
            <div className="text-center">
              <Avatar className="size-9">
                <AvatarFallback>RK</AvatarFallback>
              </Avatar>
              <p className="mt-2 text-xs text-muted-foreground">Small</p>
            </div>
          </CardContent>
        </Card>
      </Section>

      <Section
        id="inputs"
        number="07"
        title="Inputs"
        description="Inspect labels, placeholders, focus outlines, and disabled styling."
      >
        <Card>
          <CardContent className="grid gap-5 pt-6 sm:grid-cols-2">
            <div className="space-y-2">
              <label htmlFor="demo-name" className="text-sm font-medium">
                Player name
              </label>
              <Input id="demo-name" placeholder="Enter a player name" />
            </div>
            <div className="space-y-2">
              <label htmlFor="demo-email" className="text-sm font-medium">
                Email address
              </label>
              <Input
                id="demo-email"
                type="email"
                placeholder="you@example.com"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="demo-search" className="text-sm font-medium">
                Search games
              </label>
              <Input id="demo-search" placeholder="Search your games..." />
            </div>
            <div className="space-y-2">
              <label htmlFor="demo-disabled" className="text-sm font-medium">
                Disabled input
              </label>
              <Input id="demo-disabled" disabled value="Not editable" readOnly />
            </div>
          </CardContent>
        </Card>
      </Section>

      <Section
        id="states"
        number="08"
        title="Shared states"
        description="Reusable loading, empty, and error patterns for future application screens."
      >
        <div className="space-y-5">
          <Card>
            <CardHeader>
              <CardTitle>Loading state</CardTitle>
            </CardHeader>
            <CardContent>
              <LoadingState title="Loading games..." rows={2} />
            </CardContent>
          </Card>

          <div>
            <p className="mb-3 text-sm font-semibold">Empty state</p>
            <EmptyState
              title="No games yet"
              description="Your game history will appear here when you start playing."
              action={<Button variant="outline">Explore the interface</Button>}
            />
          </div>

          <div>
            <p className="mb-3 text-sm font-semibold">Error state</p>
            <ErrorState
              title="Unable to load games"
              description="This is a preview of the shared error UI. No request was made."
            />
          </div>
        </div>
      </Section>

      <Section
        id="responsive"
        number="09"
        title="Responsive behavior"
        description="Resize your browser to check the layout at mobile, tablet, and desktop widths."
      >
        <Card>
          <CardHeader>
            <CardTitle>Breakpoint preview</CardTitle>
            <CardDescription>
              These panels reflow at Tailwind standard responsive breakpoints.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {[
                ["Mobile", "Single-column layout", "bg-player-pink"],
                ["Tablet", "Two-column layout", "bg-player-green"],
                ["Desktop", "Three-column layout", "bg-player-blue"],
              ].map(([title, description, color]) => (
                <div
                  key={title}
                  className={`rounded-2xl border border-border p-5 ${color}`}
                >
                  <p className="font-heading text-lg font-bold">{title}</p>
                  <p className="mt-1 text-sm text-foreground">{description}</p>
                </div>
              ))}
            </div>
            <p className="mt-4 text-sm text-muted-foreground">
              Actual viewport width determines the active layout. The labels
              describe the intended breakpoint, not a detected device.
            </p>
          </CardContent>
        </Card>
      </Section>

      <Separator />

      <footer className="py-8 text-center text-sm text-muted-foreground">
        ScoreitSRM Design System · Internal component showcase
      </footer>
    </Container>
  );
}