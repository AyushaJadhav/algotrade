import React, { useEffect, useState, useRef } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import EditableTypography from "@/components/molecules/EditableTypography/EditableTypography";
import { motion, AnimatePresence } from "framer-motion";
import ReactMarkdown from "react-markdown";

// Utility to format text as markdown (similar to your BC UI)
const formatAsMarkdown = (text: string): string => {
  let formatted = text
    .replace(/(Problem|Solution|Benefit|Impact|Key Point|Conclusion)/gi, "**$1**");
  formatted = formatted.replace(/(?:^|\n)[\-\*\•]\s+/g, "\n- ");
  formatted = formatted.replace(/(?:^|\n)\d+\.\s+/g, "\n- ");
  formatted = formatted.replace(/\. +/g, ".\n");
  return formatted.trim();
};

type ProjectCharterData = Record<string, string>;

type SectionCardProps = {
  heading: string;
  content: string;
  index: number;
  isActive: boolean;
  isCompleted: boolean;
  onTypingDone: () => void;
  onUpdateHeading: (index: number, newValue: string) => void;
};

const SectionCard: React.FC<SectionCardProps> = ({
  heading,
  content,
  index,
  isActive,
  isCompleted,
  onTypingDone,
  onUpdateHeading,
}) => {
  const [typedContent, setTypedContent] = useState("");
  const contentRef = useRef("");

  useEffect(() => {
    if (isActive && content) {
      let i = 0;
      contentRef.current = "";
      setTypedContent("");
      const interval = setInterval(() => {
        contentRef.current += content[i];
        setTypedContent(contentRef.current);
        i++;
        if (i >= content.length) {
          clearInterval(interval);
          onTypingDone();
        }
      }, 20);
      return () => clearInterval(interval);
    } else if (!isActive) {
      // Reset typed content if section is inactive and not completed
      if (!isCompleted) {
        setTypedContent("");
      }
    }
  }, [isActive, content, onTypingDone, isCompleted]);

  const renderContent = () => {
    if (!content?.trim()) {
      return <span className="italic text-gray-400 animate-pulse">Waiting for content...</span>;
    }

    if (isCompleted || !isActive) {
      return (
        <div className="prose prose-sm max-w-none">
          <ReactMarkdown>{formatAsMarkdown(content)}</ReactMarkdown>
        </div>
      );
    }

    return <span>{typedContent}</span>;
  };

  return (
    <motion.div
      key={index}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="mb-4"
    >
      <Card className="shadow-md border border-gray-200 bg-white">
        <CardHeader className="py-2 px-4">
          <EditableTypography
            variant="h4"
            initialValue={heading}
            onSave={(newValue) => onUpdateHeading(index, newValue)}
            className="text-lg font-semibold"
          />
        </CardHeader>
        <CardContent className="px-4 pb-4 whitespace-pre-wrap text-sm text-gray-800">
          {renderContent()}
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default function ProjectCharterStreaming() {
  const [status, setStatus] = useState<string | null>(null);
  const [projectCharter, setProjectCharter] = useState<ProjectCharterData>({});
  const [completed, setCompleted] = useState(false);

  // UI state
  const [headings, setHeadings] = useState<string[]>([]);
  const [activeSectionIndex, setActiveSectionIndex] = useState(-1); // Start with no active section
  const [completedSections, setCompletedSections] = useState<Set<number>>(new Set());

  // Track if headings are fully received (to start content streaming)
  const [headingsReceived, setHeadingsReceived] = useState(false);

  // Update headings once when projectCharter keys change (only once for headings)
  useEffect(() => {
    const keys = Object.keys(projectCharter);
    if (keys.length > 0 && !headingsReceived) {
      setHeadings(keys);
      setHeadingsReceived(true);
      setStatus("Headings received. Waiting for content...");
      setActiveSectionIndex(0); // Start typing first section content
    }
  }, [projectCharter, headingsReceived]);

  useEffect(() => {
    if (activeSectionIndex >= headings.length) {
      // All sections completed
      setCompleted(true);
      setStatus("Streaming complete");
    }
  }, [activeSectionIndex, headings.length]);

  // SSE connection and event handlers
  useEffect(() => {
    const evtSource = new EventSource("http://localhost:8000/generate-project-charter?idea=School");

    evtSource.addEventListener("status", (event) => {
      const data = JSON.parse((event as MessageEvent).data);
      setStatus(data.status);
    });

    evtSource.addEventListener("project_charter", (event) => {
      const data = JSON.parse((event as MessageEvent).data);
      // We expect data to be an object with keys = headings and partial content

      // If headings not set yet, collect keys first but do NOT update content yet
      if (!headingsReceived) {
        setProjectCharter(data);
      } else {
        // Append new content to existing sections, but only for sections with content (skip headings keys)
        setProjectCharter((prev) => {
          const updated: ProjectCharterData = { ...prev };
          Object.entries(data).forEach(([key, val]) => {
            updated[key] = (updated[key] || "") + val;
          });
          return updated;
        });
      }
    });

    evtSource.addEventListener("complete", () => {
      setCompleted(true);
      evtSource.close();
    });

    evtSource.onerror = () => {
      evtSource.close();
      setStatus("Connection closed or error.");
    };

    return () => {
      evtSource.close();
    };
  }, [headingsReceived]);

  const onTypingDone = () => {
    setCompletedSections((prev) => new Set(prev).add(activeSectionIndex));
    setActiveSectionIndex((prev) => prev + 1);
  };

  const onUpdateHeading = (index: number, newValue: string) => {
    setHeadings((prev) => {
      const oldHeading = prev[index];
      const updated = [...prev];
      updated[index] = newValue;

      setProjectCharter((pc) => {
        if (!pc) return pc;
        const newPC: ProjectCharterData = {};
        Object.entries(pc).forEach(([key, val]) => {
          newPC[key === oldHeading ? newValue : key] = val;
        });
        return newPC;
      });

      return updated;
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-6">Project Charter Streaming</h1>
      <p className="mb-4 text-gray-600">Status: {status ?? "Waiting for status update..."}</p>

      <div className="w-full max-w-3xl px-4">
        <AnimatePresence>
          {headings.map((heading, i) => (
            <SectionCard
              key={heading}
              heading={heading}
              content={projectCharter?.[heading] || ""}
              index={i}
              isActive={i === activeSectionIndex && !completed}
              isCompleted={completedSections.has(i) || completed}
              onTypingDone={onTypingDone}
              onUpdateHeading={onUpdateHeading}
            />
          ))}
        </AnimatePresence>
      </div>

      {completed && (
        <div className="mt-8 p-4 bg-green-100 border border-green-300 text-green-800 rounded">
          <strong>Streaming Complete!</strong>
        </div>
      )}
    </div>
  );
}
