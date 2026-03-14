import clsx from "clsx";

const colors = [
  "bg-primary-100 text-primary-700",
  "bg-blue-100 text-blue-700",
  "bg-purple-100 text-purple-700",
  "bg-amber-100 text-amber-700",
  "bg-rose-100 text-rose-700",
];

interface AvatarProps {
  name: string;
  size?: "sm" | "md";
  rounded?: boolean;
}

function getColor(name: string) {
  const idx = name.charCodeAt(0) % colors.length;
  return colors[idx];
}

function getInitials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export default function Avatar({ name, size = "md", rounded = false }: AvatarProps) {
  return (
    <div
      className={clsx(
        "flex items-center justify-center font-semibold flex-shrink-0",
        size === "sm" ? "w-7 h-7 text-[10px]" : "w-8 h-8 text-xs",
        rounded ? "rounded-lg" : "rounded-full",
        getColor(name)
      )}
    >
      {getInitials(name)}
    </div>
  );
}
