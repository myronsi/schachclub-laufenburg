import { cn } from "@/lib/utils";
import { ComponentProps, ReactNode } from "react";

type ScrollButtonProps = ComponentProps<"button"> & {
  icon: ReactNode;
  variant?: "default" | "ghost";
};

export const ScrollButton = ({
  className,
  icon,
  variant = "default",
  ...props
}: ScrollButtonProps) => {
  return (
    <button
      className={cn(
        "rounded-full p-2 transition-colors",
        variant === "default" && "bg-club-accent text-white hover:bg-club-dark",
        variant === "ghost" && "hover:bg-gray-100",
        className
      )}
      {...props}
    >
      {icon}
    </button>
  );
};