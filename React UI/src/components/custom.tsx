// src/components/custom.tsx

import React, { useState } from 'react';

// ✅ EditableTypography component
export const EditableTypography: React.FC<{
  initialValue: string;
  onSave: (newVal: string) => void;
  variant?: 'h1' | 'h2' | 'h3' | 'h4';
  className?: string;
}> = ({ initialValue, onSave, variant = 'h4', className }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(initialValue);
  const HeadingTag = variant;

  const handleSave = () => {
    const trimmed = value.trim();
    if (trimmed && trimmed !== initialValue) onSave(trimmed);
    setIsEditing(false);
  };

  return isEditing ? (
    <input
      type="text"
      value={value}
      onChange={(e) => setValue(e.target.value)}
      onBlur={handleSave}
      onKeyDown={(e) => e.key === 'Enter' && handleSave()}
      className="border-b border-gray-400 text-base font-semibold outline-none w-full"
      autoFocus
    />
  ) : (
    <HeadingTag
      className={`cursor-pointer hover:underline ${className}`}
      onClick={() => setIsEditing(true)}
    >
      {value}
    </HeadingTag>
  );
};

// ✅ ConnectionStatus component
export const ConnectionStatus: React.FC<{ isConnected: boolean }> = ({ isConnected }) => (
  <div className={`mb-4 text-sm font-medium ${isConnected ? 'text-green-600' : 'text-red-600'}`}>
    {isConnected ? '🟢 Connected to Server' : '🔴 Disconnected from Server'}
  </div>
);

// ✅ HeadingSkeleton component
export const HeadingSkeleton = () => (
  <div className="animate-pulse rounded-lg bg-gray-100 p-4 border border-gray-200">
    <div className="h-4 bg-gray-300 rounded w-3/4 mb-3" />
    <div className="h-3 bg-gray-200 rounded w-full mb-1" />
    <div className="h-3 bg-gray-200 rounded w-5/6" />
  </div>
);
