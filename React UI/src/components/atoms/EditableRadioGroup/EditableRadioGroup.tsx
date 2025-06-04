
import React, { useState } from 'react';
import { cn } from "@/lib/utils";

export interface RadioOption {
  value: string;
  label: string;
}

export interface EditableRadioGroupProps {
  initialValue: string;
  onSave: (value: string) => void;
  options: RadioOption[];
  className?: string;
  layout?: 'horizontal' | 'vertical';
  disabled?: boolean;
}

const EditableRadioGroup = ({
  initialValue,
  onSave,
  options,
  className = '',
  layout = 'horizontal',
  disabled = false,
}: EditableRadioGroupProps) => {
  const [value, setValue] = useState(initialValue);

  const handleChange = (newValue: string) => {
    if (disabled) return;
    setValue(newValue);
    onSave(newValue);
  };

  return (
    <div 
      className={cn(
        "flex gap-4",
        layout === 'vertical' ? "flex-col" : "flex-row flex-wrap items-center",
        className
      )}
    >
      {options.map((option) => (
        <label 
          key={option.value} 
          className={cn(
            "flex items-center gap-2", 
            disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer"
          )}
        >
          <div 
            className={cn(
              "w-4 h-4 rounded-full border flex items-center justify-center",
              value === option.value ? "border-fluent-primary" : "border-fluent-neutral-dark/30",
              disabled ? "" : "hover:border-fluent-primary"
            )}
            onClick={disabled ? undefined : () => handleChange(option.value)}
          >
            {value === option.value && (
              <div className="w-2 h-2 rounded-full bg-fluent-primary" />
            )}
          </div>
          <span className="select-none">{option.label}</span>
        </label>
      ))}
    </div>
  );
};

export default EditableRadioGroup;
