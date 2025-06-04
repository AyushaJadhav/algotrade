import { useEffect, useState } from 'react';

type SectionData = {
  heading: string;
  fullText: string;
};

export function useSequentialTyping(sections: SectionData[], delay: number = 300) {
  const [typedSections, setTypedSections] = useState<{ [heading: string]: string }>({});
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex >= sections.length) return;

    const { heading, fullText } = sections[currentIndex];
    const words = fullText.split(' ');
    let wordIndex = 0;

    setTypedSections((prev) => ({ ...prev, [heading]: '' }));

    const interval = setInterval(() => {
      setTypedSections((prev) => ({
        ...prev,
        [heading]: (prev[heading] || '') + (wordIndex > 0 ? ' ' : '') + words[wordIndex],
      }));
      wordIndex++;

      if (wordIndex >= words.length) {
        clearInterval(interval);
        setTimeout(() => setCurrentIndex((prev) => prev + 1), delay); // Wait before next section starts
      }
    }, delay);

    return () => clearInterval(interval);
  }, [currentIndex, sections, delay]);

  return typedSections;
}
