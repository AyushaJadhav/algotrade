
import React from 'react';
import EditableField from '@/components/molecules/EditableField/EditableField';
import EditableText from '@/components/atoms/EditableText/EditableText';
import EditableTextarea from '@/components/atoms/EditableTextarea/EditableTextarea';
import EditableNumber from '@/components/atoms/EditableNumber/EditableNumber';
import EditableToggle from '@/components/atoms/EditableToggle/EditableToggle';
import EditableCheckbox from '@/components/atoms/EditableCheckbox/EditableCheckbox';
import EditableSelect from '@/components/atoms/EditableSelect/EditableSelect';
import EditableRadioGroup from '@/components/atoms/EditableRadioGroup/EditableRadioGroup';
import EditableDate from '@/components/atoms/EditableDate/EditableDate';
import EditableColor from '@/components/atoms/EditableColor/EditableColor';
import EditableSlider from '@/components/atoms/EditableSlider/EditableSlider';

// Common option types used in select and radio components
export interface Option {
  value: string;
  label: string;
}

interface EditorSectionProps {
  name: { value: string; setValue: (value: string) => void };
  description: { value: string; setValue: (value: string) => void };
  quantity: { value: number; setValue: (value: number) => void };
  isActive: { value: boolean; setValue: (value: boolean) => void };
  isApproved: { value: boolean; setValue: (value: boolean) => void };
  selectedColor: { value: string; setValue: (value: string) => void };
  selectedSize: { value: string; setValue: (value: string) => void };
  selectedDate: { value: Date; setValue: (value: Date) => void };
  colorValue: { value: string; setValue: (value: string) => void };
  sliderValue: { value: number; setValue: (value: number) => void };
  colorOptions: Option[];
  sizeOptions: Option[];
  nameRef: React.RefObject<HTMLDivElement>;
  descriptionRef: React.RefObject<HTMLDivElement>;
  quantityRef: React.RefObject<HTMLDivElement>;
  toggleRef: React.RefObject<HTMLDivElement>;
  checkboxRef: React.RefObject<HTMLDivElement>;
  selectRef: React.RefObject<HTMLDivElement>;
  radioRef: React.RefObject<HTMLDivElement>;
  dateRef: React.RefObject<HTMLDivElement>;
  colorRef: React.RefObject<HTMLDivElement>;
  sliderRef: React.RefObject<HTMLDivElement>;
}

const EditorSection: React.FC<EditorSectionProps> = ({
  name,
  description,
  quantity,
  isActive,
  isApproved,
  selectedColor,
  selectedSize,
  selectedDate,
  colorValue,
  sliderValue,
  colorOptions,
  sizeOptions,
  nameRef,
  descriptionRef,
  quantityRef,
  toggleRef,
  checkboxRef,
  selectRef,
  radioRef,
  dateRef,
  colorRef,
  sliderRef,
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div ref={nameRef} tabIndex={0}>
        <EditableField label="Name" hint="Double-click to edit">
          <EditableText
            initialValue={name.value}
            onSave={name.setValue}
            className="w-full p-2 border border-fluent-neutral-dark/20 rounded bg-white"
          />
        </EditableField>
      </div>
      
      <div ref={descriptionRef} tabIndex={0}>
        <EditableField label="Description" hint="Multi-line text editor">
          <EditableTextarea
            initialValue={description.value}
            onSave={description.setValue}
            className="w-full border border-fluent-neutral-dark/20 rounded"
            rows={3}
          />
        </EditableField>
      </div>
      
      <div ref={quantityRef} tabIndex={0}>
        <EditableField label="Quantity" hint="Numeric value editor">
          <EditableNumber
            initialValue={quantity.value}
            onSave={quantity.setValue}
            className="w-full p-2 border border-fluent-neutral-dark/20 rounded bg-white"
            min={0}
            max={100}
          />
        </EditableField>
      </div>
      
      <div ref={toggleRef} tabIndex={0}>
        <EditableField label="Active Status" hint="Toggle switch">
          <EditableToggle
            initialValue={isActive.value}
            onSave={isActive.setValue}
            onLabel="Active"
            offLabel="Inactive"
          />
        </EditableField>
      </div>
      
      <div ref={checkboxRef} tabIndex={0}>
        <EditableField label="Approval" hint="Checkbox control">
          <EditableCheckbox
            initialValue={isApproved.value}
            onSave={isApproved.setValue}
            label="Approved"
          />
        </EditableField>
      </div>
      
      <div ref={selectRef} tabIndex={0}>
        <EditableField label="Color" hint="Dropdown selection">
          <EditableSelect
            initialValue={selectedColor.value}
            onSave={selectedColor.setValue}
            options={colorOptions}
            className="w-full"
          />
        </EditableField>
      </div>
      
      <div ref={radioRef} tabIndex={0}>
        <EditableField label="Size" hint="Radio group selection">
          <EditableRadioGroup
            initialValue={selectedSize.value}
            onSave={selectedSize.setValue}
            options={sizeOptions}
          />
        </EditableField>
      </div>
      
      <div ref={dateRef} tabIndex={0}>
        <EditableField label="Due Date" hint="Date selector">
          <EditableDate
            initialValue={selectedDate.value}
            onSave={selectedDate.setValue}
            className="w-full"
            dateFormat="MMM dd, yyyy"
          />
        </EditableField>
      </div>
      
      <div ref={colorRef} tabIndex={0}>
        <EditableField label="Brand Color" hint="Color picker">
          <EditableColor
            initialValue={colorValue.value}
            onSave={colorValue.setValue}
          />
        </EditableField>
      </div>
      
      <div ref={sliderRef} tabIndex={0}>
        <EditableField label="Progress" hint="Slider control">
          <EditableSlider
            initialValue={sliderValue.value}
            onSave={sliderValue.setValue}
            min={0}
            max={100}
            step={1}
          />
        </EditableField>
      </div>
    </div>
  );
};

export default EditorSection;
