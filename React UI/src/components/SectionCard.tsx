import React, { useEffect, useRef, useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import EditableTypography from "@/components/molecules/EditableTypography/EditableTypography";

type SectionCardProps = {
  heading: string;
  content: string;
  index: number;
  onUpdateHeading: (index: number, newValue: string) => void;
};

const SectionCard: React.FC<SectionCardProps> = ({ heading, content, index, onUpdateHeading }) => {
  const [typedContent, setTypedContent] = useState("");
  const fullContentRef = useRef(content);
  const wordIndexRef = useRef(0);
  const typingIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // When new content updates, reset refs and state as needed
  useEffect(() => {
    if (content !== fullContentRef.current) {
      fullContentRef.current = content;
      // Reset word index to current number of typed words
      const typedWordsCount = typedContent.trim().split(/\s+/).filter(Boolean).length;
      wordIndexRef.current = typedWordsCount;
    }
  }, [content, typedContent]);

  useEffect(() => {
    if (!fullContentRef.current) return;

    const words = fullContentRef.current.split(/\s+/);

    // Clear any previous interval
    if (typingIntervalRef.current) {
      clearInterval(typingIntervalRef.current);
    }

    typingIntervalRef.current = setInterval(() => {
      if (wordIndexRef.current >= words.length) {
        if (typingIntervalRef.current) {
          clearInterval(typingIntervalRef.current);
          typingIntervalRef.current = null;
        }
        return;
      }

      setTypedContent((prev) => {
        const separator = prev.length === 0 ? "" : " ";
        return prev + separator + words[wordIndexRef.current];
      });

      wordIndexRef.current += 1;
    }, 50);

    return () => {
      if (typingIntervalRef.current) clearInterval(typingIntervalRef.current);
    };
  }, [content]);

  return (
    <Card key={index} className="mb-4 shadow-sm border border-gray-200">
      <CardHeader className="py-2 px-4">
        <EditableTypography
          variant="h4"
          initialValue={heading}
          onSave={(newValue) => onUpdateHeading(index, newValue)}
          className="text-lg"
        />
      </CardHeader>
      <CardContent className="px-4 pb-4 whitespace-pre-wrap text-sm text-fluent-neutral-dark">
        {typedContent || <span className="italic text-gray-400">Waiting for content...</span>}
      </CardContent>
    </Card>
  );
};

export default SectionCard;
