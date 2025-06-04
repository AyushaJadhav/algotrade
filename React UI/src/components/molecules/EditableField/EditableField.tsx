
import React from 'react';
import { cn } from "@/lib/utils";

interface EditableFieldProps {
  label: string;
  children: React.ReactNode;
  className?: string;
  required?: boolean;
  hint?: string;
  error?: string;
  id?: string;
}

const EditableField: React.FC<EditableFieldProps> = ({
  label,
  children,
  className,
  required = false,
  hint,
  error,
  id,
}) => {
  const fieldId = id || `field-${Math.random().toString(36).substr(2, 9)}`;

  return (
    <div className={cn("mb-4", className)} id={fieldId}>
      <div className="flex justify-between items-center mb-1">
        <label 
          htmlFor={fieldId} 
          className="text-fluent-neutral-darker font-medium text-sm"
        >
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      </div>
      
      <div>
        {children}
      </div>
      
      {(hint || error) && (
        <div className="mt-1 text-xs">
          {error && (
            <p className="text-red-600">{error}</p>
          )}
          {!error && hint && (
            <p className="text-fluent-neutral-dark">{hint}</p>
          )}
        </div>
      )}
    </div>
  );
};

export default EditableField;
