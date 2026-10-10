import Link from "next/link";
import { Container } from "./container";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-border bg-card">
      <Container className="flex flex-col gap-4 py-8 sm:flex-row sm:items-center sm:justify-between">
        <Link href="/" className="font-heading text-lg font-bold tracking-tight">
          Scoreit<span className="text-primary">SRM</span>
        </Link>

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