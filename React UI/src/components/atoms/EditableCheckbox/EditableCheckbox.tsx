
import React, { useState } from 'react';
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

export interface EditableCheckboxProps {
  initialValue: boolean;
  onSave: (value: boolean) => void;
  className?: string;
  label?: string;
  disabled?: boolean;
}

const EditableCheckbox = ({
  initialValue,
  onSave,
  className = '',
  label = '',
  disabled = false,
}: EditableCheckboxProps) => {
  const [value, setValue] = useState(initialValue);

  const handleChange = () => {
    if (disabled) return;
    
    const newValue = !value;
    setValue(newValue);
    onSave(newValue);
  };

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <button
        type="button"
        onClick={handleChange}
        className={cn(
          "w-5 h-5 flex items-center justify-center rounded border transition-colors",
          value ? "bg-fluent-primary border-fluent-primary" : "bg-white border-fluent-neutral-dark/30",
          disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer hover:border-fluent-primary",
        )}
        disabled={disabled}
        aria-checked={value}
        role="checkbox"
      >
        {value && <Check className="text-white" size={12} />}
      </button>
      {label && (
        <label 
          className={cn(
            "cursor-pointer select-none", 
            disabled && "opacity-50 cursor-not-allowed"
          )}
          onClick={disabled ? undefined : handleChange}
        >
          {label}
        </label>
      )}
    </div>
  );
};

export default EditableCheckbox;
