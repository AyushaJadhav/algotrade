// src/hooks/useTypedText.ts
import { useEffect, useState } from 'react';

export function useTypedText(fullText: string, delay = 300, onComplete?: () => void) {
  const [displayedText, setDisplayedText] = useState('');

  useEffect(() => {
    setDisplayedText('');
    if (!fullText) return;

    const words = fullText.split(' ');
    let currentIndex = 0;

   const interval = setInterval(() => {
  if (currentIndex >= words.length) {
    clearInterval(interval);
    onComplete?.(); // Notify when typing is done
    return;
  }

  setDisplayedText((prev) => prev + (prev ? ' ' : '') + words[currentIndex]);
  currentIndex++;
}, delay);


    return () => clearInterval(interval);
  }, [fullText, delay]);

  return displayedText;
}
