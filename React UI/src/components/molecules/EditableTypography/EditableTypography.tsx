
import React from 'react';
import EditableText from '../../atoms/EditableText/EditableText';
import { cn } from '@/lib/utils';

export interface EditableTypographyProps {
  variant: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'blockquote' | 'lead' | 'small';
  initialValue: string;
  onSave: (value: string) => void;
  className?: string;
  id?: string;
  disabled?: boolean;
}

const EditableTypography: React.FC<EditableTypographyProps> = ({
  variant,
  initialValue,
  onSave,
  className,
  id,
  disabled = false,
}) => {
  const variantStyles = {
    h1: "text-4xl font-bold text-fluent-neutral-darker leading-tight",
    h2: "text-3xl font-bold text-fluent-neutral-darker leading-tight",
    h3: "text-2xl font-bold text-fluent-neutral-darker leading-tight",
    h4: "text-xl font-semibold text-fluent-neutral-darker leading-tight",
    h5: "text-lg font-semibold text-fluent-neutral-darker leading-tight",
    h6: "text-base font-semibold text-fluent-neutral-darker leading-tight",
    p: "text-base text-fluent-neutral-darker leading-normal",
    blockquote: "text-lg italic border-l-4 border-fluent-primary pl-4 py-2 text-fluent-neutral-dark",
    lead: "text-xl text-fluent-neutral-darker leading-relaxed",
    small: "text-sm text-fluent-neutral-dark leading-normal",
  };

  // Determine which element to render based on variant
  const as = variant.startsWith('h') ? variant as 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' : 'p';

  return (
    <EditableText
      as={as}
      initialValue={initialValue}
      onSave={onSave}
      className={cn(variantStyles[variant], className)}
      disabled={disabled}
      // Pass id only if it's defined
      {...(id ? { id } : {})}
    />
  );
};

export default EditableTypography;
