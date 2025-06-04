
import React from 'react';
import EditableTypography from '@/components/molecules/EditableTypography/EditableTypography';

const TypographyExamples: React.FC = () => {
  const handleSave = () => {
    // Placeholder onSave handler for the examples
  };

  return (
    <div className="space-y-4">
      <EditableTypography
        variant="h2"
        initialValue="Typography Examples"
        onSave={handleSave}
      />
      
      <div className="space-y-3">
        {[1, 2, 3, 4, 5, 6].map((level) => (
          <EditableTypography
            key={level}
            variant={`h${level}` as any}
            initialValue={`Heading ${level} (h${level})`}
            onSave={handleSave}
          />
        ))}
        
        <EditableTypography
          variant="p"
          initialValue="Regular paragraph text can be edited inline as well."
          onSave={handleSave}
        />
        
        <EditableTypography
          variant="blockquote"
          initialValue="This is a blockquote with editable content. Use it to highlight important information."
          onSave={handleSave}
        />
        
        <EditableTypography
          variant="lead"
          initialValue="Lead text is slightly larger than normal paragraph text."
          onSave={handleSave}
        />
        
        <EditableTypography
          variant="small"
          initialValue="Small text is useful for captions, footnotes, and other supplementary content."
          onSave={handleSave}
        />
      </div>
    </div>
  );
};

export default TypographyExamples;
