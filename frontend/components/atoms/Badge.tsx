import type { HTMLAttributes } from "react";

export type BadgeProps = HTMLAttributes<HTMLSpanElement> & {
  color?: "green" | "amber" | "red" | "blue" | "gray";
};

const colorClasses: Record<NonNullable<BadgeProps["color"]>, string> = {
  green: "bg-emerald-100 text-emerald-800",
  amber: "bg-amber-100 text-amber-800",
  red: "bg-red-100 text-red-800",
  blue: "bg-blue-100 text-blue-800",
  gray: "bg-slate-200 text-slate-700",
};

export const Badge = ({ color = "gray", className, ...props }: BadgeProps) => {
  const classes = [
    "inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold",
    colorClasses[color],
    className ?? "",
  ]
    .filter(Boolean)
    .join(" ");

  return <span className={classes} {...props} />;
};

export default Badge;
