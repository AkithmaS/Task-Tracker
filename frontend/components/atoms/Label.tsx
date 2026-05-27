import type { LabelHTMLAttributes } from "react";

export type LabelProps = LabelHTMLAttributes<HTMLLabelElement> & {
  required?: boolean;
};

export const Label = ({ required, className, children, ...props }: LabelProps) => {
  const classes = ["text-sm font-medium text-slate-700", className ?? ""]
    .filter(Boolean)
    .join(" ");

  return (
    <label className={classes} {...props}>
      {children}
      {required ? <span className="text-red-500"> *</span> : null}
    </label>
  );
};

export default Label;
