import { cn } from "@/lib/utils";

interface AvatarProps {
  src?: string;
  alt?: string;
  fallback?: string;
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
}

const sizeClasses = {
  sm: "h-8 w-8 text-xs",
  md: "h-10 w-10 text-sm",
  lg: "h-12 w-12 text-base",
  xl: "h-16 w-16 text-lg",
};

export const Avatar = ({
  src,
  alt,
  fallback,
  size = "md",
  className,
}: AvatarProps) => {
  const initials = fallback || alt?.slice(0, 2).toUpperCase() || "??";

  if (src) {
    return (
      <img
        src={src}
        alt={alt}
        className={cn(
          "rounded-full object-cover border-2 border-border",
          sizeClasses[size],
          className,
        )}
      />
    );
  }

  return (
    <div
      className={cn(
        "rounded-full bg-muted flex items-center justify-center font-medium text-muted-foreground border-2 border-border",
        sizeClasses[size],
        className,
      )}
    >
      {initials}
    </div>
  );
};
