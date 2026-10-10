"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { Container } from "./container";

const links = [
  { label: "Features", href: "/#features" },
  { label: "How to play", href: "/#how-it-works" },
  { label: "About", href: "/#about" },
];

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur">
      <Container>
        <nav
          aria-label="Main navigation"
          className="flex min-h-16 items-center justify-between gap-4"
        >
          <Link
            href="/"
            className="flex shrink-0 items-center gap-2 rounded-md font-heading text-xl font-bold tracking-tight text-foreground"
            onClick={() => setMenuOpen(false)}
          >
            <span className="flex size-9 items-center justify-center rounded-xl bg-primary text-sm font-bold text-primary-foreground">
              S
            </span>
            <span>Scoreit<span className="text-primary">SRM</span></span>
          </Link>

          <div className="hidden items-center gap-7 md:flex">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                {link.label}
              </Link>
            ))}

            <Link
              href="/#get-started"
              className="inline-flex min-h-10 items-center justify-center rounded-xl bg-primary px-5 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
            >
              Get started
            </Link>
          </div>

          <button
            type="button"
            className="inline-flex size-10 items-center justify-center rounded-lg border border-border text-foreground transition-colors hover:bg-muted md:hidden"
            aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </nav>

        {menuOpen && (
          <div
            id="mobile-navigation"
            className="flex flex-col gap-1 border-t border-border py-3 md:hidden"
          >
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="rounded-lg px-3 py-3 text-sm font-medium text-foreground hover:bg-muted"
              >
                {link.label}
              </Link>
            ))}

            <Link
              href="/#get-started"
              onClick={() => setMenuOpen(false)}
              className="mt-2 inline-flex min-h-11 items-center justify-center rounded-xl bg-primary px-5 text-sm font-semibold text-primary-foreground"
            >
              Get started
            </Link>
          </div>
        )}
      </Container>
    </header>
  );
}