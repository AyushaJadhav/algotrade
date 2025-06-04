
import React, { useState, useRef, useEffect } from 'react';
import { cn } from "@/lib/utils";
import { format } from 'date-fns';

export interface EditableDateProps {
  initialValue: Date | string | null;
  onSave: (value: Date | null) => void;
  className?: string;
  placeholder?: string;
  disabled?: boolean;
  dateFormat?: string;
}

const EditableDate = ({
  initialValue,
  onSave,
  className = '',
  placeholder = 'Click to edit date',
  disabled = false,
  dateFormat = 'yyyy-MM-dd',
}: EditableDateProps) => {
  const initialDate = initialValue ? new Date(initialValue) : null;
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(initialDate);
  const inputRef = useRef<HTMLInputElement>(null);

  const formattedDate = value ? format(value, dateFormat) : '';

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
    if (value !== initialDate) {
      onSave(value);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const date = e.target.value ? new Date(e.target.value) : null;
    setValue(date);
  };

  return isEditing ? (
    <input
      ref={inputRef}
      type="date"
      value={value ? format(value, 'yyyy-MM-dd') : ''}
      onChange={handleChange}
      onBlur={handleBlur}
      className={cn(
        "border border-fluent-neutral-dark/20 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-fluent-primary/50",
        className
      )}
    />
  ) : (
    <div
      onDoubleClick={handleDoubleClick}
      className={cn(
        "cursor-pointer hover:bg-fluent-neutral-lighter transition-colors px-2 py-1 rounded",
        {"text-fluent-neutral-dark/50 italic": !formattedDate},
        {"opacity-70 cursor-not-allowed": disabled},
        className
      )}
      role="textbox"
      aria-label={`Double click to edit date`}
      tabIndex={disabled ? -1 : 0}
    >
      {formattedDate || placeholder}
    </div>
  );
};

export default EditableDate;
