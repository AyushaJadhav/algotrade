
import { useState, useEffect } from 'react';
import { ShortcutTarget } from '@/components/molecules/KeyboardShortcutNavigator/KeyboardShortcutNavigator';

export const useShortcutTargets = () => {
  const [shortcutTargets, setShortcutTargets] = useState<ShortcutTarget[]>([]);

  useEffect(() => {
    // Give the DOM time to render
    const timer = setTimeout(() => {
      const shortcuts: ShortcutTarget[] = [];
      
      const elements = document.querySelectorAll('[tabindex="0"]');
      elements.forEach((el, index) => {
        if (el instanceof HTMLElement && el.id) {
          shortcuts.push({
            id: el.id,
            label: el.getAttribute('aria-label') || `Element ${el.id}`,
            shortcut: `Alt+${index + 1}`,
            element: el
          });
        }
      });
      
      setShortcutTargets(shortcuts);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);

  return shortcutTargets;
};
