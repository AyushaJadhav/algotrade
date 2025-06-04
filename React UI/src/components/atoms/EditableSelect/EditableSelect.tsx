
import React, { useState, useRef, useEffect } from 'react';
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";

export interface SelectOption {
  value: string;
  label: string;
}

export interface EditableSelectProps {
  initialValue: string;
  onSave: (value: string) => void;
  options: SelectOption[];
  className?: string;
  placeholder?: string;
  disabled?: boolean;
}

const EditableSelect = ({
  initialValue,
  onSave,
  options,
  className = '',
  placeholder = 'Select an option',
  disabled = false,
}: EditableSelectProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(initialValue);
  const selectRef = useRef<HTMLSelectElement>(null);
  
  const selectedLabel = options.find(option => option.value === value)?.label || placeholder;

  useEffect(() => {
    if (isEditing && selectRef.current) {
      selectRef.current.focus();
    }
  }, [isEditing]);

  const handleDoubleClick = () => {
    if (!disabled) {
      setIsEditing(true);
    }
  };

  const handleBlur = () => {
    setIsEditing(false);
    if (value !== initialValue) {
      onSave(value);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newValue = e.target.value;
    setValue(newValue);
    onSave(newValue);
    setIsEditing(false);
  };

  return isEditing ? (
    <div className="relative inline-block">
      <select
        ref={selectRef}
        value={value}
        onChange={handleChange}
        onBlur={handleBlur}
        className={cn(
          "border border-fluent-neutral-dark/20 rounded px-2 py-1 pr-8 focus:outline-none focus:ring-2 focus:ring-fluent-primary/50 bg-white appearance-none",
          className
        )}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none text-fluent-neutral-dark" size={16} />
    </div>
  ) : (
    <span
      onDoubleClick={handleDoubleClick}
      className={cn(
        "cursor-pointer hover:bg-fluent-neutral-lighter transition-colors px-3 py-1 rounded inline-flex items-center",
        {"text-fluent-neutral-dark/50 italic": !value},
        {"opacity-70 cursor-not-allowed": disabled},
        className
      )}
      role="button"
      aria-label={`Double click to edit ${placeholder}`}
      tabIndex={disabled ? -1 : 0}
    >
      <span>{selectedLabel}</span>
      <ChevronDown className="ml-1" size={14} />
    </span>
  );
};

export default EditableSelect;
