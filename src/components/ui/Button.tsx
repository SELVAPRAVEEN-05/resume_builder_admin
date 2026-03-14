import clsx from "clsx";

type ButtonVariant = "primary" | "ghost" | "danger" | "outline";

const variants: Record<ButtonVariant, string> = {
  primary: "bg-primary-500 text-white hover:bg-primary-600 border-transparent",
  ghost: "bg-gray-100 text-gray-700 hover:bg-gray-200 border-gray-200",
  danger: "bg-red-50 text-red-600 hover:bg-red-100 border-red-200",
  outline: "bg-white text-gray-600 hover:bg-gray-50 border-gray-200",
};

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: "sm" | "md";
  children: React.ReactNode;
}

export default function Button({
  variant = "primary",
  size = "md",
  children,
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      className={clsx(
        "inline-flex items-center gap-1.5 font-medium rounded-lg border transition-all duration-150",
        size === "sm" ? "text-[10px] px-2 py-1" : "text-xs px-3.5 py-1.5",
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
