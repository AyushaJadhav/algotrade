import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import Header from '../components/Header';
import EditableTypography from '@/components/molecules/EditableTypography/EditableTypography';
import { motion, AnimatePresence } from 'framer-motion';
import { Shimmer, ShimmerElementType } from '@fluentui/react';
import { saveAs } from 'file-saver';
import ReactMarkdown from "react-markdown";

type ParsedSectionsType = { [heading: string]: string };

const formatAsMarkdown = (text: string): string => text.trim();


const ConnectionStatus = ({ isConnected }: { isConnected: boolean }) => (
  <Card className="mb-8">
    <CardHeader>
      <CardTitle>Connection Status</CardTitle>
    </CardHeader>
    <CardContent>
      <div className="flex items-center">
        <div className={`w-3 h-3 rounded-full mr-2 ${isConnected ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`}></div>
        <span>{isConnected ? 'Connected' : 'Disconnected'}</span>
      </div>
    </CardContent>
  </Card>
);

const SectionCard = ({
  heading,
  content,
  index,
  isActive,
  isCompleted,
  onTypingDone,
  onUpdateHeading,
}: {
  heading: string;
  content: string;
  index: number;
  isActive: boolean;
  isCompleted: boolean;
  onTypingDone: () => void;
  onUpdateHeading: (index: number, newValue: string) => void;
}) => {
  const [typedContent, setTypedContent] = useState('');
  const contentRef = useRef('');
  const typingIntervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!isActive) {
      setTypedContent(content || '');
      contentRef.current = content || '';
      if (typingIntervalRef.current) clearInterval(typingIntervalRef.current);
      return;
    }

    if (!content) {
      setTypedContent('');
      contentRef.current = '';
      if (typingIntervalRef.current) clearInterval(typingIntervalRef.current);
      return;
    }

    const fullContent = content;
    const prevContent = contentRef.current;

    if (fullContent.length <= prevContent.length) {
      setTypedContent(fullContent);
      contentRef.current = fullContent;
      return;
    }

    const newChars = fullContent.slice(prevContent.length);
    let i = 0;

    if (typingIntervalRef.current) clearInterval(typingIntervalRef.current);

    typingIntervalRef.current = setInterval(() => {
      contentRef.current += newChars[i];
      setTypedContent(contentRef.current);
      i++;
      if (i >= newChars.length) {
        if (typingIntervalRef.current) clearInterval(typingIntervalRef.current);
        onTypingDone();
      }
    }, 20);

    return () => {
      if (typingIntervalRef.current) clearInterval(typingIntervalRef.current);
    };
  }, [content, isActive, onTypingDone]);

  const renderContent = () => {
    if (!content?.trim()) {
      return <span className="italic text-gray-400 animate-pulse">Waiting for content...</span>;
    }
    if (isCompleted || !isActive) {
      return (
  <div className="prose prose-sm max-w-none whitespace-pre-wrap">
    <ReactMarkdown>{content.trim()}</ReactMarkdown>
  </div>
);

    }
    return <span className="whitespace-pre-wrap">{typedContent}</span>;
  };

  return (
    <motion.div key={heading} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="mb-4">
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
          {!isCompleted && !isActive ? (
            <div className="space-y-2">
              <div className="w-full h-4 bg-gray-200 rounded animate-pulse" />
              <div className="w-5/6 h-4 bg-gray-200 rounded animate-pulse" />
              <div className="w-4/6 h-4 bg-gray-200 rounded animate-pulse" />
            </div>
          ) : (
            renderContent()
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
};

const HeadingSkeleton = () => (
  <div className="mb-4">
    <Shimmer shimmerElements={[{ type: ShimmerElementType.line, height: 24, width: '90%' }]} isDataLoaded={false} width="100%" />
  </div>
);

const StreamingPage: React.FC = () => {
  const navigate = useNavigate();
  const [isConnected, setIsConnected] = useState(false);
  const [headings, setHeadings] = useState<string[]>([]);
  const [parsedSections, setParsedSections] = useState<ParsedSectionsType>({});
  const [activeSectionIndex, setActiveSectionIndex] = useState(0);
  const [completedSections, setCompletedSections] = useState<Set<number>>(new Set());
  const sectionBuffer = useRef<ParsedSectionsType>({});
  const headingOrder = useRef<string[]>([]);
  const updateTimeout = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const idea = sessionStorage.getItem('lastPrompt');
    if (!idea) return;

    const eventSource = new EventSource(`http://localhost:8000/generate-business-case?idea=${encodeURIComponent(idea)}`);

    const parsedReadyRef = { current: false };

    eventSource.onopen = () => {
      setIsConnected(true);
    };

    eventSource.onerror = (e) => {
      console.error("SSE error:", e);
      setIsConnected(false);
      eventSource.close();
    };

    eventSource.onmessage = (e) => {
      console.log("Raw SSE data:", e.data);
      try {
        const data = JSON.parse(e.data);

        if (data.status) {
          console.log('Status:', data.status);
          return;
        }

        if (data.event === 'start') {
          const newHeadings = data.headings || [];
          setHeadings(newHeadings);

          const initialSections: ParsedSectionsType = {};
          newHeadings.forEach((h: string) => {
            initialSections[h] = '';
          });

          sectionBuffer.current = initialSections;
          headingOrder.current = [...newHeadings];
          setParsedSections({ ...initialSections });
          setActiveSectionIndex(0);
          setCompletedSections(new Set());

          parsedReadyRef.current = true;
        } else if (data.event === 'content') {
          if (!parsedReadyRef.current) return;

          const { key, value } = data.content;

          if (!headingOrder.current.includes(key)) {
            headingOrder.current.push(key);
          }

          sectionBuffer.current[key] = (sectionBuffer.current[key] || '') + value + ' ';

          if (updateTimeout.current) clearTimeout(updateTimeout.current);
          updateTimeout.current = setTimeout(() => {
            setParsedSections({ ...sectionBuffer.current });
          }, 30);
        }
      } catch (err) {
        console.error('Failed to parse SSE data:', err, e.data);
      }
    };

    return () => {
      if (updateTimeout.current) clearTimeout(updateTimeout.current);
      eventSource.close();
    };
  }, []);

  const updateHeading = (index: number, newValue: string) => {
    setHeadings((prev) => {
      const updated = [...prev];
      const oldHeading = updated[index];
      updated[index] = newValue;

      setParsedSections((sections) => {
        const updatedSections: ParsedSectionsType = {};
        Object.entries(sections).forEach(([key, value]) => {
          updatedSections[key === oldHeading ? newValue : key] = value;
        });
        return updatedSections;
      });

      headingOrder.current = headingOrder.current.map(h => h === oldHeading ? newValue : h);

      return updated;
    });
  };

  const generateMarkdown = () => {
    return headingOrder.current.map((heading) => {
      const content = parsedSections[heading] || '';
      return `# ${heading}\n${content.trim()}\n`;
    }).join('\n');
  };

  const handleDownloadMarkdown = () => {
    const blob = new Blob([generateMarkdown()], { type: 'text/markdown;charset=utf-8' });
    saveAs(blob, 'project-business-case.md');
  };

  return (
    <div className="min-h-screen bg-fluent-neutral-lighter flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-6 max-w-6xl">

        
        {headings.length === 0 && <ConnectionStatus isConnected={isConnected} />}

        <Button variant="outline" onClick={() => navigate('/')} className="mb-4">
          Back
        </Button>

        {headings.length === 0 && (
          <>
            <HeadingSkeleton />
            <HeadingSkeleton />
            <HeadingSkeleton />
          </>
        )}

        {headingOrder.current.map((heading, i) => (
          <SectionCard
            key={heading}
            heading={heading}
            content={parsedSections[heading] || ''}
            index={i}
            isActive={activeSectionIndex === i}
            isCompleted={completedSections.has(i)}
            onTypingDone={() => {
              setCompletedSections((prev) => new Set(prev).add(i));
              setActiveSectionIndex((prev) => Math.min(prev + 1, headingOrder.current.length - 1));
            }}
            onUpdateHeading={updateHeading}
          />
        ))}

       
      </main>
    </div>
  );
};

export default StreamingPage;
