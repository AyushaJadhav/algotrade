
import React, { useState, useEffect, useRef } from 'react';
import { useKeyboardShortcut } from '../../../lib/hooks/useKeyboardShortcut';
import { Keyboard } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface ShortcutTarget {
  id: string;
  label: string;
  shortcut: string;
  element: HTMLElement | null;
}

interface KeyboardShortcutNavigatorProps {
  targets: ShortcutTarget[];
  className?: string;
}

const KeyboardShortcutNavigator: React.FC<KeyboardShortcutNavigatorProps> = ({
  targets,
  className
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);

  // Toggle shortcut panel visibility
  useKeyboardShortcut('Ctrl+K', () => {
    setIsVisible(prev => !prev);
  });

  // Close on escape
  useKeyboardShortcut('Escape', () => {
    setIsVisible(false);
  }, { enabled: isVisible });

  // Handle click outside to close
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(event.target as Node)) {
        setIsVisible(false);
      }
    };

    if (isVisible) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isVisible]);

  // Register shortcuts for each target
  const targetRefs = useRef<Record<string, HTMLElement | null>>({});
  
  targets.forEach(target => {
    useKeyboardShortcut(target.shortcut, () => {
      if (target.element) {
        target.element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        target.element.focus();
        
        // Add a temporary highlight effect
        target.element.classList.add('ring-2', 'ring-fluent-primary', 'ring-offset-2');
        setTimeout(() => {
          target.element.classList.remove('ring-2', 'ring-fluent-primary', 'ring-offset-2');
        }, 1500);
      }
    });
    
    // Update refs when targets change
    useEffect(() => {
      targetRefs.current[target.id] = target.element;
    }, [target.element, target.id]);
  });

  if (!targets.length) return null;

  return (
    <>
      <button
        className={cn(
          "fixed bottom-4 right-4 bg-fluent-primary text-white p-2 rounded-full shadow-lg",
          "hover:bg-fluent-secondary transition-colors z-50",
          className
        )}
        onClick={() => setIsVisible(true)}
        title="Show keyboard shortcuts (Ctrl+K)"
      >
        <Keyboard size={20} />
      </button>
      
      {isVisible && (
        <div className="fixed inset-0 bg-black/20 flex items-center justify-center z-50">
          <div 
            ref={panelRef}
            className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[80vh] overflow-auto"
          >
            <div className="p-4 border-b border-fluent-neutral-dark/10 sticky top-0 bg-white">
              <h3 className="text-lg font-semibold text-fluent-neutral-darker">
                Keyboard Shortcuts
              </h3>
              <p className="text-sm text-fluent-neutral-dark">
                Press the shortcut key to navigate to the component
              </p>
            </div>
            
            <div className="p-4 space-y-2">
              {targets.map(target => (
                <div 
                  key={target.id}
                  className="flex justify-between items-center p-2 hover:bg-fluent-neutral-lighter rounded cursor-pointer"
                  onClick={() => {
                    if (target.element) {
                      target.element.scrollIntoView({ behavior: 'smooth', block: 'center' });
                      target.element.focus();
                      setIsVisible(false);
                    }
                  }}
                >
                  <span>{target.label}</span>
                  <kbd className="px-2 py-0.5 bg-fluent-neutral-lighter border rounded text-xs">
                    {target.shortcut}
                  </kbd>
                </div>
              ))}
            </div>
            
            <div className="p-4 border-t border-fluent-neutral-dark/10 bg-fluent-neutral-lighter/50 text-center">
              <button 
                className="text-fluent-primary hover:underline"
                onClick={() => setIsVisible(false)}
              >
                Close (Esc)
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default KeyboardShortcutNavigator;
