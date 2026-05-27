import type { InputHTMLAttributes, Ref } from "react";
import { Input } from "@/components/atoms/Input";
import { Label } from "@/components/atoms/Label";

export type FormFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  error?: string;
  inputRef?: Ref<HTMLInputElement>;
};

export const FormField = ({
  label,
  error,
  id,
  required,
  inputRef,
  ...props
}: FormFieldProps) => {
  const inputId = id ?? props.name ?? label.replace(/\s+/g, "-").toLowerCase();

  return (
    <div className="space-y-2">
      <Label htmlFor={inputId} required={required}>
        {label}
      </Label>
      <Input
        id={inputId}
        error={error}
        required={required}
        ref={inputRef}
        {...props}
      />
    </div>
  );
};

export default FormField;
