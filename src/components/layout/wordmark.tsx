import Link from "next/link";
import { cn } from "@/lib/utils";

type WordmarkProps = {
  className?: string;
  onClick?: () => void;
};

/** Text-only brand mark. ScoreitSRM has no logo, icon or badge. */
export function Wordmark({ className, onClick }: WordmarkProps) {
  return (
    <Link
      href="/"
      onClick={onClick}
      className={cn(
        "inline-flex min-h-11 items-center rounded-md font-heading text-xl font-bold tracking-tight text-foreground",
        className,
      )}
    >
      ScoreitSRM
    </Link>
  );
}
