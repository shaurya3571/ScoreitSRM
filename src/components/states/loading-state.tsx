import { Skeleton } from "@/components/ui/skeleton";

type LoadingStateProps = {
  title?: string;
  rows?: number;
};

export function LoadingState({
  title = "Loading...",
  rows = 3,
}: LoadingStateProps) {
  return (
    <section
      role="status"
      aria-busy="true"
      aria-label={title}
      className="w-full space-y-4"
    >
      <p className="text-sm font-medium text-muted-foreground">{title}</p>

      {Array.from({ length: Math.max(0, Math.min(rows, 10)) }).map((_, index) => (
        <div
          key={index}
          className="flex items-center gap-4 rounded-2xl border border-border bg-card p-4"
        >
          <Skeleton className="size-11 shrink-0 rounded-xl" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-4 w-2/5" />
            <Skeleton className="h-3 w-3/5" />
          </div>
          <Skeleton className="h-6 w-12" />
        </div>
      ))}

      <span className="sr-only">Please wait while the content loads.</span>
    </section>
  );
}