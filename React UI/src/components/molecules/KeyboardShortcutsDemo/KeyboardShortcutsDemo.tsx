
import React, { useState } from 'react';
import { Keyboard, Command } from 'lucide-react';
import { useKeyboardShortcut } from '@/lib/hooks/useKeyboardShortcut';

const KeyboardShortcutsDemo: React.FC = () => {
  const [activeShortcut, setActiveShortcut] = useState<string | null>(null);
  const [showDemo, setShowDemo] = useState(false);

  // Demo shortcuts
  const shortcuts = [
    { combo: 'Ctrl+K', description: 'Open shortcut navigator' },
    { combo: 'Ctrl+S', description: 'Save changes' },
    { combo: 'Ctrl+Z', description: 'Undo changes' },
    { combo: 'Ctrl+Y', description: 'Redo changes' },
    { combo: 'Alt+1-9', description: 'Navigate to editable sections' },
    { combo: 'Esc', description: 'Close panels / Cancel editing' }
  ];

  // Register demo keyboard shortcuts
  useKeyboardShortcut('Ctrl+S', () => {
    highlightShortcut('Ctrl+S');
    return false; // Don't prevent default browser behavior
  }, { preventDefault: false });

  useKeyboardShortcut('Ctrl+Z', () => {
    highlightShortcut('Ctrl+Z');
  });

  useKeyboardShortcut('Ctrl+Y', () => {
    highlightShortcut('Ctrl+Y');
  });

  // Function to highlight a shortcut when used
  const highlightShortcut = (combo: string) => {
    setActiveShortcut(combo);
    setTimeout(() => {
      setActiveShortcut(null);
    }, 1000);
  };

  return (
    <div className="mt-6 mb-8">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Keyboard size={20} className="text-fluent-primary" />
          <h3 className="text-lg font-semibold text-fluent-neutral-darker">Keyboard Shortcuts Demo</h3>
        </div>
        <button 
          onClick={() => setShowDemo(!showDemo)} 
          className="text-sm text-fluent-primary hover:underline flex items-center gap-1"
        >
          <Command size={16} />
          {showDemo ? 'Hide Demo' : 'Show Demo'}
        </button>
      </div>

      {showDemo && (
        <div className="bg-white rounded-lg shadow-sm border border-fluent-neutral-dark/10 p-4">
          <p className="text-sm text-fluent-neutral-dark mb-3">
            Try pressing these keyboard shortcuts to see them in action:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {shortcuts.map((shortcut) => (
              <div 
                key={shortcut.combo} 
                className={`flex items-center gap-2 p-2 rounded ${
                  activeShortcut === shortcut.combo 
                    ? 'bg-fluent-primary/10 border border-fluent-primary/20' 
                    : 'border border-fluent-neutral-dark/10'
                }`}
              >
                <kbd className="px-2 py-1 bg-fluent-neutral-lighter rounded text-xs font-mono">
                  {shortcut.combo}
                </kbd>
                <span className="text-sm">{shortcut.description}</span>
                {activeShortcut === shortcut.combo && (
                  <span className="ml-auto text-xs bg-fluent-primary text-white px-1.5 py-0.5 rounded">
                    Activated!
                  </span>
                )}
              </div>
            ))}
          </div>
          <p className="text-xs text-fluent-neutral-dark mt-3">
            Note: Some shortcuts like Ctrl+S might trigger browser functionality as well.
          </p>
        </div>
      )}
    </div>
  );
};

export default KeyboardShortcutsDemo;
