
import React, { useState, useRef, useEffect } from 'react';
import { cn } from "@/lib/utils";

export interface EditableColorProps {
  initialValue: string;
  onSave: (value: string) => void;
  className?: string;
  disabled?: boolean;
}

const EditableColor = ({
  initialValue,
  onSave,
  className = '',
  disabled = false,
}: EditableColorProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(initialValue || '#000000');
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <div
        className={cn(
          "w-6 h-6 rounded border border-fluent-neutral-dark/20",
          {"opacity-50": disabled}
        )}
        style={{ backgroundColor: value }}
      />
      
      {isEditing ? (
        <input
          ref={inputRef}
          type="color"
          value={value}
          onChange={handleChange}
          onBlur={handleBlur}
          className="w-8 h-8"
        />
      ) : (
        <span
          onDoubleClick={handleDoubleClick}
          className={cn(
            "cursor-pointer hover:bg-fluent-neutral-lighter transition-colors px-2 py-1 rounded",
            {"opacity-70 cursor-not-allowed": disabled}
          )}
          role="textbox"
          aria-label="Double click to edit color"
          tabIndex={disabled ? -1 : 0}
        >
          {value}
        </span>
      )}
    </div>
  );
};

export default EditableColor;
