import { Container } from "./container";
import { Wordmark } from "./wordmark";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-border bg-card">
      <Container className="flex flex-col gap-4 py-8 sm:flex-row sm:items-center sm:justify-between">
        <Wordmark className="text-lg" />

        <p className="text-sm text-muted-foreground">
          Keep the game going. Keep every score together.
        </p>

        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} ScoreitSRM
        </p>
      </Container>
    </footer>
  );
}