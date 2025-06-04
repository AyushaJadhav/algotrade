
import React from 'react';
import EditableTypography from '@/components/molecules/EditableTypography/EditableTypography';

interface HeaderSectionProps {
  heading: { value: string; setValue: (value: string) => void };
  subheading: { value: string; setValue: (value: string) => void };
  leadText: { value: string; setValue: (value: string) => void };
  paragraph: { value: string; setValue: (value: string) => void };
  headingRef: React.RefObject<HTMLDivElement>;
}

const HeaderSection: React.FC<HeaderSectionProps> = ({
  heading,
  subheading,
  leadText,
  paragraph,
  headingRef,
}) => {
  return (
    <div className="space-y-4" ref={headingRef} tabIndex={0}>
      <EditableTypography
        variant="h1"
        initialValue={heading.value}
        onSave={heading.setValue}
        id="main-heading"
      />
      <EditableTypography
        variant="h3"
        initialValue={subheading.value}
        onSave={subheading.setValue}
        className="text-fluent-primary"
      />
      <EditableTypography
        variant="lead"
        initialValue={leadText.value}
        onSave={leadText.setValue}
      />
      <EditableTypography
        variant="p"
        initialValue={paragraph.value}
        onSave={paragraph.setValue}
      />
    </div>
  );
};

export default HeaderSection;
