
import React, { useState } from 'react';
import { cn } from "@/lib/utils";

export interface EditableToggleProps {
  initialValue: boolean;
  onSave: (value: boolean) => void;
  className?: string;
  onLabel?: string;
  offLabel?: string;
  disabled?: boolean;
}

const EditableToggle = ({
  initialValue,
  onSave,
  className = '',
  onLabel = 'On',
  offLabel = 'Off',
  disabled = false,
}: EditableToggleProps) => {
  const [value, setValue] = useState(initialValue);

  const handleChange = () => {
    if (disabled) return;
    
    const newValue = !value;
    setValue(newValue);
    onSave(newValue);
  };

  return (
    <div className={cn("flex items-center gap-2", className)}>
      {offLabel && !value && (
        <span className="text-sm text-fluent-neutral-dark">{offLabel}</span>
      )}
      <button
        type="button"
        onClick={handleChange}
        className={cn(
          "relative inline-flex h-6 w-11 items-center rounded-full transition-colors",
          value ? "bg-fluent-primary" : "bg-fluent-neutral-dark/30",
          disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
        )}
        disabled={disabled}
        aria-checked={value}
        role="switch"
      >
        <span
          className={cn(
            "inline-block h-4 w-4 transform rounded-full bg-white transition-transform",
            value ? "translate-x-6" : "translate-x-1"
          )}
        />
      </button>
      {onLabel && value && (
        <span className="text-sm text-fluent-neutral-dark">{onLabel}</span>
      )}
    </div>
  );
};

export default EditableToggle;
