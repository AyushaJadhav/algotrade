
import React, { useState, useRef, KeyboardEvent, useEffect } from 'react';
import { cn } from "@/lib/utils";

export interface EditableTextareaProps {
  initialValue: string;
  onSave: (value: string) => void;
  className?: string;
  placeholder?: string;
  rows?: number;
  disabled?: boolean;
}

const EditableTextarea = ({
  initialValue,
  onSave,
  className = '',
  placeholder = 'Click to edit',
  rows = 3,
  disabled = false,
}: EditableTextareaProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(initialValue);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (isEditing && textareaRef.current) {
      textareaRef.current.focus();
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

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    // Ctrl+Enter to save
    if (e.key === 'Enter' && e.ctrlKey) {
      setIsEditing(false);
      onSave(value);
    } else if (e.key === 'Escape') {
      setIsEditing(false);
      setValue(initialValue);
    }
  };

  return isEditing ? (
    <textarea
      ref={textareaRef}
      value={value}
      onChange={(e) => setValue(e.target.value)}
      onBlur={handleBlur}
      onKeyDown={handleKeyDown}
      rows={rows}
      className={cn(
        "border border-fluent-neutral-dark/20 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-fluent-primary/50 w-full resize-y",
        className
      )}
      placeholder={placeholder}
    />
  ) : (
    <div
      onDoubleClick={handleDoubleClick}
      className={cn(
        "cursor-pointer hover:bg-fluent-neutral-lighter transition-colors px-2 py-1 rounded whitespace-pre-wrap",
        {"text-fluent-neutral-dark/50 italic": !value.trim()},
        {"opacity-70 cursor-not-allowed": disabled},
        className
      )}
      role="textbox"
      aria-label={`Double click to edit ${placeholder}`}
      tabIndex={disabled ? -1 : 0}
    >
      {value.trim() ? value : placeholder}
    </div>
  );
};

export default EditableTextarea;
