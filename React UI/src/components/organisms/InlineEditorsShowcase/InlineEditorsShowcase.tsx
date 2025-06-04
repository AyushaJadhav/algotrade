
import React, { useState, useRef } from 'react';
import { Separator } from '@/components/ui/separator';
import { useShortcutTargets } from './hooks/useShortcutTargets';
import HeaderSection from './components/HeaderSection';
import EditorSection from './components/EditorSection';
import TypographyExamples from './components/TypographyExamples';
import InstructionsPanel from './components/InstructionsPanel';
import { ShortcutTarget } from '../../molecules/KeyboardShortcutNavigator/KeyboardShortcutNavigator';

const colorOptions = [
  { value: 'red', label: 'Red' },
  { value: 'green', label: 'Green' },
  { value: 'blue', label: 'Blue' },
  { value: 'yellow', label: 'Yellow' },
  { value: 'purple', label: 'Purple' },
];

const sizeOptions = [
  { value: 'small', label: 'Small' },
  { value: 'medium', label: 'Medium' },
  { value: 'large', label: 'Large' },
];

const InlineEditorsShowcase = () => {
  // State for header section
  const [headingValue, setHeadingValue] = useState('Inline Editing Components');
  const [subheadingValue, setSubheadingValue] = useState('Double-click on any text to edit it');
  const [paragraphValue, setParagraphValue] = useState(
    'This showcase demonstrates various inline editable components built with React 18 and modern practices. All components follow the Fluent UI 2 design system by Microsoft.'
  );
  const [leadText, setLeadText] = useState(
    'Easily create editable interfaces with these reusable components.'
  );
  
  // State for editor controls
  const [nameValue, setNameValue] = useState('John Smith');
  const [descriptionValue, setDescriptionValue] = useState(
    'This is a longer description that can span multiple lines. You can edit this text by double-clicking on it.'
  );
  const [quantityValue, setQuantityValue] = useState(5);
  const [isActive, setIsActive] = useState(true);
  const [isApproved, setIsApproved] = useState(false);
  const [selectedColor, setSelectedColor] = useState('blue');
  const [selectedSize, setSelectedSize] = useState('medium');
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [colorValue, setColorValue] = useState('#0078D4');
  const [sliderValue, setSliderValue] = useState(75);
  
  // Create refs for keyboard navigation
  const headingRef = useRef<HTMLDivElement>(null);
  const nameFieldRef = useRef<HTMLDivElement>(null);
  const descriptionFieldRef = useRef<HTMLDivElement>(null);
  const quantityFieldRef = useRef<HTMLDivElement>(null);
  const toggleFieldRef = useRef<HTMLDivElement>(null);
  const checkboxFieldRef = useRef<HTMLDivElement>(null);
  const selectFieldRef = useRef<HTMLDivElement>(null);
  const radioFieldRef = useRef<HTMLDivElement>(null);
  const dateFieldRef = useRef<HTMLDivElement>(null);
  const colorFieldRef = useRef<HTMLDivElement>(null);
  const sliderFieldRef = useRef<HTMLDivElement>(null);

  // Get shortcut targets
  const shortcutTargets = useShortcutTargets();

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 space-y-8">
      <HeaderSection 
        heading={{ value: headingValue, setValue: setHeadingValue }}
        subheading={{ value: subheadingValue, setValue: setSubheadingValue }}
        leadText={{ value: leadText, setValue: setLeadText }}
        paragraph={{ value: paragraphValue, setValue: setParagraphValue }}
        headingRef={headingRef}
      />
      
      <Separator />
      
      <EditorSection
        name={{ value: nameValue, setValue: setNameValue }}
        description={{ value: descriptionValue, setValue: setDescriptionValue }}
        quantity={{ value: quantityValue, setValue: setQuantityValue }}
        isActive={{ value: isActive, setValue: setIsActive }}
        isApproved={{ value: isApproved, setValue: setIsApproved }}
        selectedColor={{ value: selectedColor, setValue: setSelectedColor }}
        selectedSize={{ value: selectedSize, setValue: setSelectedSize }}
        selectedDate={{ value: selectedDate, setValue: setSelectedDate }}
        colorValue={{ value: colorValue, setValue: setColorValue }}
        sliderValue={{ value: sliderValue, setValue: setSliderValue }}
        colorOptions={colorOptions}
        sizeOptions={sizeOptions}
        nameRef={nameFieldRef}
        descriptionRef={descriptionFieldRef}
        quantityRef={quantityFieldRef}
        toggleRef={toggleFieldRef}
        checkboxRef={checkboxFieldRef}
        selectRef={selectFieldRef}
        radioRef={radioFieldRef}
        dateRef={dateFieldRef}
        colorRef={colorFieldRef}
        sliderRef={sliderFieldRef}
      />

      <Separator />
      
      <TypographyExamples />
      
      <Separator />
      
      <InstructionsPanel />
      
      {/* Export shortcut targets for the parent component to use */}
      <span className="hidden">{JSON.stringify(shortcutTargets)}</span>
    </div>
  );
};

export default InlineEditorsShowcase;
export type { ShortcutTarget } from '../../molecules/KeyboardShortcutNavigator/KeyboardShortcutNavigator';
