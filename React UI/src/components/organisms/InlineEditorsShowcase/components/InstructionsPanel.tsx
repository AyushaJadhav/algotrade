
import React from 'react';
import { Keyboard } from 'lucide-react';

const InstructionsPanel: React.FC = () => {
  return (
    <div className="bg-fluent-neutral-lighter p-4 rounded-lg space-y-3">
      <div className="flex items-center gap-2">
        <Keyboard size={18} className="text-fluent-primary" />
        <h3 className="font-medium text-fluent-neutral-darker">Keyboard Shortcuts</h3>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
        <div className="flex items-center gap-2">
          <kbd className="px-1.5 py-0.5 bg-white border rounded text-xs inline-block min-w-[40px] text-center">
            Alt+1-9
          </kbd>
          <span>Navigate to editable sections</span>
        </div>
        
        <div className="flex items-center gap-2">
          <kbd className="px-1.5 py-0.5 bg-white border rounded text-xs inline-block min-w-[40px] text-center">
            Ctrl+K
          </kbd>
          <span>Open shortcut navigator</span>
        </div>
        
        <div className="flex items-center gap-2">
          <kbd className="px-1.5 py-0.5 bg-white border rounded text-xs inline-block min-w-[40px] text-center">
            Esc
          </kbd>
          <span>Cancel editing / Close panels</span>
        </div>
        
        <div className="flex items-center gap-2">
          <kbd className="px-1.5 py-0.5 bg-white border rounded text-xs inline-block min-w-[40px] text-center">
            Enter
          </kbd>
          <span>Save changes</span>
        </div>
      </div>
      
      <p className="text-xs text-fluent-neutral-dark pt-1">
        Double-click on any text or control to edit it. Press Enter or click outside to save changes.
      </p>
    </div>
  );
};

export default InstructionsPanel;
