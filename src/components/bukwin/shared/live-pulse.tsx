import { cn } from "@/lib/utils";

export function LivePulse({
  className,
  color = "bg-success",
}: {
  className?: string;
  color?: string;
}) {
  return (
    <span className={cn("relative inline-flex h-2 w-2", className)}>
      <span
        className={cn(
          "relative inline-flex h-2 w-2 rounded-full",
          color
        )}
      />
      <span
        className={cn(
          "absolute inset-0 inline-flex h-2 w-2 animate-ping rounded-full opacity-75",
          color
        )}
      />
    </span>
  );
}
