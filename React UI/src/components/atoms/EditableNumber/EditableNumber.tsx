
import React, { useState, useRef, KeyboardEvent, useEffect } from 'react';
import { cn } from "@/lib/utils";

export interface EditableNumberProps {
  initialValue: number;
  onSave: (value: number) => void;
  className?: string;
  placeholder?: string;
  min?: number;
  max?: number;
  step?: number;
  disabled?: boolean;
}

const EditableNumber = ({
  initialValue,
  onSave,
  className = '',
  placeholder = 'Click to edit',
  min,
  max,
  step = 1,
  disabled = false,
}: EditableNumberProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(initialValue);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
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

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      setIsEditing(false);
      onSave(value);
    } else if (e.key === 'Escape') {
      setIsEditing(false);
      setValue(initialValue);
    }
  };

  return isEditing ? (
    <input
      ref={inputRef}
      type="number"
      value={value}
      onChange={(e) => setValue(Number(e.target.value))}
      onBlur={handleBlur}
      onKeyDown={handleKeyDown}
      min={min}
      max={max}
      step={step}
      className={cn(
        "border border-fluent-neutral-dark/20 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-fluent-primary/50",
        className
      )}
    />
  ) : (
    <span
      onDoubleClick={handleDoubleClick}
      className={cn(
        "cursor-pointer hover:bg-fluent-neutral-lighter transition-colors px-1 py-1 rounded inline-block",
        {"opacity-70 cursor-not-allowed": disabled},
        className
      )}
      role="textbox"
      aria-label={`Double click to edit ${placeholder}`}
      tabIndex={disabled ? -1 : 0}
    >
      {value}
    </span>
  );
};

export default EditableNumber;
