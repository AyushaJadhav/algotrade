
import { useEffect, useCallback, useRef } from 'react';

type KeyCombination = string;
type ShortcutHandler = (e: KeyboardEvent) => void;

interface KeyboardShortcutOptions {
  enabled?: boolean;
  preventDefault?: boolean;
  target?: EventTarget | null;
}

/**
 * Hook to handle keyboard shortcuts
 * @param keyCombo String representation of key combination (e.g., "Ctrl+K", "Shift+A")
 * @param callback Function to execute when the key combination is pressed
 * @param options Additional options for the shortcut
 */
export const useKeyboardShortcut = (
  keyCombo: KeyCombination | KeyCombination[],
  callback: ShortcutHandler,
  options: KeyboardShortcutOptions = {}
) => {
  const { enabled = true, preventDefault = true, target = window } = options;
  const callbackRef = useRef<ShortcutHandler>(callback);

  // Update the callback ref when callback changes
  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  // Parse key combinations
  const keyCombos = Array.isArray(keyCombo) ? keyCombo : [keyCombo];
  
  const parseKeyCombos = useCallback((combos: KeyCombination[]) => {
    return combos.map(combo => {
      const keys = combo.split('+').map(key => key.trim().toLowerCase());
      
      const modifiers = {
        ctrl: keys.includes('ctrl') || keys.includes('control'),
        alt: keys.includes('alt'),
        shift: keys.includes('shift'),
        meta: keys.includes('meta') || keys.includes('cmd') || keys.includes('command')
      };
      
      const mainKey = keys.find(key => 
        !['ctrl', 'control', 'alt', 'shift', 'meta', 'cmd', 'command'].includes(key)
      );
      
      return { modifiers, mainKey };
    });
  }, []);
  
  const parsedCombos = useRef(parseKeyCombos(keyCombos));
  
  useEffect(() => {
    parsedCombos.current = parseKeyCombos(keyCombos);
  }, [keyCombos, parseKeyCombos]);

  // Handle keydown event
  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    if (!enabled) return;
    
    const matchesCombo = parsedCombos.current.some(combo => {
      const mainKeyMatches = !combo.mainKey || 
                            event.key.toLowerCase() === combo.mainKey.toLowerCase() ||
                            event.code.toLowerCase() === `key${combo.mainKey}`.toLowerCase();
      
      const modifiersMatch = (
        event.ctrlKey === combo.modifiers.ctrl &&
        event.altKey === combo.modifiers.alt &&
        event.shiftKey === combo.modifiers.shift &&
        event.metaKey === combo.modifiers.meta
      );
      
      return mainKeyMatches && modifiersMatch;
    });
    
    if (matchesCombo) {
      if (preventDefault) {
        event.preventDefault();
      }
      callbackRef.current(event);
      return true;
    }
    
    return false;
  }, [enabled, preventDefault]);

  // Add event listener
  useEffect(() => {
    if (!enabled || !target) return;
    
    const targetElement = target as EventTarget;
    targetElement.addEventListener('keydown', handleKeyDown as EventListener);
    
    return () => {
      targetElement.removeEventListener('keydown', handleKeyDown as EventListener);
    };
  }, [target, enabled, handleKeyDown]);

  return {
    isEnabled: enabled,
  };
};
