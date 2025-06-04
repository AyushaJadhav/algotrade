
import React, { useState } from 'react';
import { cn } from "@/lib/utils";

export interface EditableSliderProps {
  initialValue: number;
  onSave: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  className?: string;
  disabled?: boolean;
  showValue?: boolean;
}

const EditableSlider = ({
  initialValue,
  onSave,
  min = 0,
  max = 100,
  step = 1,
  className = '',
  disabled = false,
  showValue = true,
}: EditableSliderProps) => {
  const [value, setValue] = useState(initialValue);
  const [isDragging, setIsDragging] = useState(false);

  const percentage = ((value - min) / (max - min)) * 100;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Number(e.target.value);
    setValue(newValue);
  };

  const handleMouseDown = () => {
    if (!disabled) {
      setIsDragging(true);
    }
  };

  const handleMouseUp = () => {
    if (isDragging) {
      setIsDragging(false);
      onSave(value);
    }
  };

  React.useEffect(() => {
    if (isDragging) {
      document.addEventListener('mouseup', handleMouseUp);
      return () => {
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, value]);

  return (
    <div className={cn("flex items-center gap-3", className)}>
      <div className="relative flex-1 h-6 flex items-center">
        <div className={cn(
          "absolute h-1 w-full bg-fluent-neutral-dark/20 rounded-full",
          disabled && "opacity-50"
        )}/>
        <div
          className={cn(
            "absolute h-1 bg-fluent-primary rounded-full",
            disabled && "opacity-50"
          )}
          style={{ width: `${percentage}%` }}
        />
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={handleChange}
          onMouseDown={handleMouseDown}
          disabled={disabled}
          className={cn(
            "absolute w-full opacity-0 cursor-pointer h-6",
            disabled && "cursor-not-allowed"
          )}
        />
        <div 
          className={cn(
            "absolute h-4 w-4 rounded-full bg-white border-2 border-fluent-primary",
            "transform -translate-y-0 cursor-grab",
            isDragging && "cursor-grabbing",
            disabled && "opacity-50 cursor-not-allowed"
          )}
          style={{ left: `calc(${percentage}% - 8px)` }}
        />
      </div>
      {showValue && (
        <span className={cn(
          "text-sm min-w-[40px] text-center",
          disabled && "opacity-50"
        )}>
          {value}
        </span>
      )}
    </div>
  );
};

export default EditableSlider;
