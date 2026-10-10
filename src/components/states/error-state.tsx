"use client";

import { AlertCircle, RefreshCw } from "lucide-react";

type ErrorStateProps = {
  title?: string;
  description?: string;
  onRetry?: () => void;
  retryLabel?: string;
};

export function ErrorState({
  title = "Something went wrong",
  description = "We couldn't load this content. Please try again.",
  onRetry,
  retryLabel = "Try again",
}: ErrorStateProps) {
  return (
    <section
      role="alert"
      className="flex w-full flex-col items-center justify-center rounded-2xl border border-destructive/20 bg-card px-6 py-12 text-center"
    >
      <div className="flex size-14 items-center justify-center rounded-2xl bg-destructive/10 text-destructive">
        <AlertCircle size={26} aria-hidden="true" />
      </div>

      <h2 className="mt-5 font-heading text-xl font-bold">{title}</h2>

      <p className="mt-2 max-w-md text-sm leading-6 text-muted-foreground">
        {description}
      </p>

      {onRetry && (
        <button
          type="button"
          onClick={onRetry}
          className="mt-6 inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-primary px-5 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
        >
          <RefreshCw size={16} aria-hidden="true" />
          {retryLabel}
        </button>
      )}
    </section>
  );
}