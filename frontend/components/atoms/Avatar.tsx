import type { HTMLAttributes } from "react";

export type AvatarProps = HTMLAttributes<HTMLDivElement> & {
  name?: string | null;
  size?: "sm" | "md" | "lg";
};

const colorClasses = [
  "bg-rose-500",
  "bg-amber-500",
  "bg-emerald-500",
  "bg-sky-500",
  "bg-indigo-500",
  "bg-fuchsia-500",
];

const sizeClasses: Record<NonNullable<AvatarProps["size"]>, string> = {
  sm: "h-8 w-8 text-xs",
  md: "h-10 w-10 text-sm",
  lg: "h-12 w-12 text-base",
};

const getInitials = (name?: string | null) => {
  if (!name) {
    return "?";
  }

  const parts = name.trim().split(" ").filter(Boolean);
  const initials = parts
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");

  return initials || "?";
};

const getColorIndex = (name?: string | null) => {
  if (!name) {
    return 0;
  }

  let hash = 0;
  for (let index = 0; index < name.length; index += 1) {
    hash = (hash + name.charCodeAt(index) * (index + 1)) % colorClasses.length;
  }

  return hash;
};

export const Avatar = ({ name, size = "md", className, ...props }: AvatarProps) => {
  const initials = getInitials(name);
  const colorClass = colorClasses[getColorIndex(name)];
  const classes = [
    "inline-flex items-center justify-center rounded-full text-white font-semibold",
    colorClass,
    sizeClasses[size],
    className ?? "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={classes} aria-label={name ?? "User avatar"} {...props}>
      {initials}
    </div>
  );
};

export default Avatar;
