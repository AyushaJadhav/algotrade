import { useState, useRef, useEffect } from 'react';
import { useStreamingData } from '@/lib/hooks/useStreamingData';

export function useParsedSections(url: string) {
  const [parsedSections, setParsedSections] = useState<Record<string, string>>({});
  const [headings, setHeadings] = useState<string[]>([]);
  const latestHeadingRef = useRef<string | null>(null);

  // Buffer for words to append: {heading, words[]}
  const wordQueueRef = useRef<{ heading: string; words: string[] }[]>([]);
  const processingRef = useRef(false);

  const { isConnected } = useStreamingData({
    url,
    type: 'sse',
    onMessage: (data) => {
      const cleanLine = data
        .replace(/^(data:\s*)+/gi, '')
        .replace(/^event:\s*/i, '')
        .trim();

      // Skip control/status messages
      if (
        cleanLine.toLowerCase().includes('generation started') ||
        cleanLine.toLowerCase().includes('generation complete') ||
        cleanLine.toLowerCase() === 'done' ||
        cleanLine.toLowerCase().startsWith('event:')
      ) {
        return;
      }

      // Detect headings === HEADING ===
      const headingMatch = cleanLine.match(/^===\s*(.*?)\s*===$/i);
      if (headingMatch) {
        const heading = headingMatch[1];
        latestHeadingRef.current = heading;

        setHeadings((prev) => (prev.includes(heading) ? prev : [...prev, heading]));
        setParsedSections((prev) => ({
          ...prev,
          [heading]: '',
        }));
        return;
      }

      // Append words to queue for delayed streaming
      if (latestHeadingRef.current) {
        const heading = latestHeadingRef.current;
        const words = cleanLine.split(/\s+/);

        // Push new words for current heading to queue
        wordQueueRef.current.push({ heading, words });

        // Start processing queue if not already started
        if (!processingRef.current) {
          processQueue();
        }
      }
    },
  });

  // Function to process the word queue, appending one word at a time with delay
  const processQueue = () => {
    processingRef.current = true;

    const interval = setInterval(() => {
      if (wordQueueRef.current.length === 0) {
        clearInterval(interval);
        processingRef.current = false;
        return;
      }

      // Get the first batch in queue
      const batch = wordQueueRef.current[0];

      if (!batch.words.length) {
        // Remove empty batch and continue
        wordQueueRef.current.shift();
        return;
      }

      // Take the first word
      const nextWord = batch.words.shift()!;

      // Append the word to parsedSections state
      setParsedSections((prev) => {
        const oldContent = prev[batch.heading] || '';
        const newContent = oldContent ? oldContent + ' ' + nextWord : nextWord;
        return {
          ...prev,
          [batch.heading]: newContent,
        };
      });
    }, 200); // Delay between words in ms
  };

  // Update heading title handler
  function updateHeading(index: number, newValue: string) {
    const oldHeading = headings[index];
    const updatedHeadings = [...headings];
    updatedHeadings[index] = newValue;

    setParsedSections((prev) => {
      const updated = { ...prev };
      if (prev[oldHeading]) {
        updated[newValue] = prev[oldHeading];
        delete updated[oldHeading];
      }
      return updated;
    });

    setHeadings(updatedHeadings);
  }

  return { parsedSections, headings, updateHeading, isConnected };
}

