import type { ReactNode } from "react";
import { Inbox } from "lucide-react";

type EmptyStateProps = {
  title: string;
  description: string;
  icon?: ReactNode;
  action?: ReactNode;
};

export function EmptyState({
  title,
  description,
  icon,
  action,
}: EmptyStateProps) {
  return (
    <section className="flex w-full flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-card px-6 py-12 text-center">
      <div className="flex size-14 items-center justify-center rounded-2xl bg-secondary text-primary">
        {icon ?? <Inbox size={26} aria-hidden="true" />}
      </div>

      <h2 className="mt-5 font-heading text-xl font-bold">{title}</h2>

      <p className="mt-2 max-w-md text-sm leading-6 text-muted-foreground">
        {description}
      </p>

      {action && <div className="mt-6">{action}</div>}
    </section>
  );
}