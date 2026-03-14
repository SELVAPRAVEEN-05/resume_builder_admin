import clsx from "clsx";

type BadgeVariant = "green" | "blue" | "amber" | "red" | "gray" | "purple";

const variants: Record<BadgeVariant, string> = {
  green: "bg-primary-100 text-primary-700",
  blue: "bg-blue-50 text-blue-700",
  amber: "bg-amber-50 text-amber-700",
  red: "bg-red-50 text-red-700",
  gray: "bg-gray-100 text-gray-600",
  purple: "bg-purple-50 text-purple-700",
};

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  className?: string;
}

export default function Badge({ children, variant = "gray", className }: BadgeProps) {
  return (
    <span
      className={clsx(
        "inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold",
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
