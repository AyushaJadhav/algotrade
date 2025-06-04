
import React, { useState, useRef, KeyboardEvent, useEffect } from 'react';
import { cn } from "@/lib/utils";

export interface EditableTextProps {
  initialValue: string;
  onSave: (value: string) => void;
  className?: string;
  placeholder?: string;
  as?: 'p' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'span';
  disabled?: boolean;
}

const EditableText = ({
  initialValue,
  onSave,
  className = '',
  placeholder = 'Click to edit',
  as = 'p',
  disabled = false,
}: EditableTextProps) => {
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

  const Tag = as;

  return isEditing ? (
    <input
      ref={inputRef}
      value={value}
      onChange={(e) => setValue(e.target.value)}
      onBlur={handleBlur}
      onKeyDown={handleKeyDown}
      className={cn(
        "border border-fluent-neutral-dark/20 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-fluent-primary/50 w-full",
        className
      )}
    />
  ) : (
    <Tag 
      onDoubleClick={handleDoubleClick} 
      className={cn(
        "cursor-pointer hover:bg-fluent-neutral-lighter transition-colors px-1 rounded",
        {"text-fluent-neutral-dark/50 italic": !value.trim()},
        {"opacity-70 cursor-not-allowed": disabled},
        className
      )}
      role="textbox"
      aria-label={`Double click to edit ${placeholder}`}
      tabIndex={disabled ? -1 : 0}
    >
      {value.trim() ? value : placeholder}
    </Tag>
  );
};

export default EditableText;
