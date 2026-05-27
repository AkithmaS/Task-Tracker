import { forwardRef, useId } from "react";
import type { InputHTMLAttributes } from "react";
import { Label } from "@/components/atoms/Label";

export type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  error?: string;
};

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, id, className, ...props }, ref) => {
  const fallbackId = useId();
  const inputId = id ?? fallbackId;

  const inputClasses = [
    "w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400",
    "focus:border-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-200",
    error ? "border-red-400 focus:border-red-500 focus:ring-red-100" : "",
    className ?? "",
  ]
    .filter(Boolean)
    .join(" ");

    return (
      <div className="space-y-2">
        {label ? <Label htmlFor={inputId}>{label}</Label> : null}
        <input id={inputId} className={inputClasses} ref={ref} {...props} />
        {error ? (
          <p className="text-xs text-red-600" role="alert">
            {error}
          </p>
        ) : null}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;
