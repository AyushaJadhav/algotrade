// App.tsx or another parent component
/*import React, { useState } from 'react';
import BusinessCaseStreamer from './BusinessCaseStreamer';


function App() {
  const [idea, setIdea] = useState('');
  const [submittedIdea, setSubmittedIdea] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmittedIdea(idea);
  };

  return (
    <div className="App p-6">
      <form onSubmit={handleSubmit} className="mb-6">
        <label className="block mb-2 font-semibold">Enter Business Idea:</label>
        <input
          type="text"
          className="border p-2 w-full max-w-md"
          value={idea}
          onChange={(e) => setIdea(e.target.value)}
        />
        <button type="submit" className="mt-2 px-4 py-2 bg-blue-600 text-white rounded">
          Generate
        </button>
      </form>

      {submittedIdea && <BusinessCaseStreamer idea={submittedIdea} />}
    </div>
  );
}

export default App;







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

const formatAsMarkdown = (text: string): string => {
  let formatted = text
    .replace(/(Problem|Solution|Benefit|Impact|Key Point|Conclusion)/gi, '**$1**')
    .replace(/(?:^|\n)[\-\*\•]\s+/g, '\n- ')
    .replace(/(?:^|\n)\d+\.\s+/g, '\n- ')
    .replace(/\. +/g, '.\n');
  return formatted.trim();
};

const ConnectionStatus = ({ isConnected }: { isConnected: boolean }) => (
  <Card className="mb-8">
    <CardHeader>
      <CardTitle>Connection Status</CardTitle>
    </CardHeader>
    <CardContent>
      <div className="flex items-center">
        <div
          className={`w-3 h-3 rounded-full mr-2 ${isConnected ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`}
        ></div>
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

  useEffect(() => {
    if (isActive && content) {
      let i = 0;
      contentRef.current = '';
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
    }
  }, [isActive, content]);

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
    <motion.div key={index} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="mb-4">
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
  const currentHeading = useRef<string>('');

 useEffect(() => {
  const idea = sessionStorage.getItem('lastPrompt');
  if (!idea) return;

  const eventSource = new EventSource(`http://localhost:8000/generate-business-case?idea=${encodeURIComponent(idea)}`);

  eventSource.onopen = () => {
    setIsConnected(true);
  };

  eventSource.onerror = (e) => {
    console.error("SSE error:", e);
    setIsConnected(false);
    eventSource.close();
  };

  eventSource.onmessage = (e) => {
    try {
      const data = JSON.parse(e.data);

      if (data.status) {
        // Handle generic status updates if needed
        console.log('Status:', data.status);
        return;
      }

      if (data.event === 'start') {
        // Initialize headings array with empty content
        const newHeadings = data.headings || [];
        setHeadings(newHeadings);
        // Initialize parsedSections with empty strings for each heading
        const initialSections: ParsedSectionsType = {};
        newHeadings.forEach((h: string) => {
          initialSections[h] = '';
        });
        setParsedSections(initialSections);
        setActiveSectionIndex(0);
        setCompletedSections(new Set());
      } else if (data.event === 'heading') {
        // Optionally handle new heading content start
        // Example: you might want to highlight this heading as active
        console.log("Heading event:", data.content);
      } else if (data.event === 'content') {
        // Append content chunk to the corresponding heading
        const { key, value } = data.content;
        setParsedSections(prev => {
          const updated = { ...prev };
          updated[key] = (updated[key] || '') + value + ' ';
          return updated;
        });
      }
    } catch (err) {
      console.error('Failed to parse SSE data:', err, e.data);
    }
  };

  return () => {
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

      return updated;
    });
  };

  const generateMarkdown = () => {
    return headings.map((heading) => {
      const content = parsedSections[heading] || '';
      return `# ${heading}\n${content.trim()}\n`;
    }).join('\n');
  };

  const handleDownloadMarkdown = () => {
    const blob = new Blob([generateMarkdown()], { type: 'text/markdown;charset=utf-8' });
    saveAs(blob, 'project-charter.md');
  };

  return (
    <div className="min-h-screen bg-fluent-neutral-lighter flex flex-col">
      <Header />
      <main className="flex-grow py-6">
        <div className="max-w-4xl mx-auto px-4">
          <div className="mb-6 flex items-center">
            <Button variant="outline" onClick={() => navigate('/')} className="mr-4">
              <ArrowLeft size={16} className="mr-2" /> Back
            </Button>
            <h1 className="text-2xl font-semibold text-fluent-neutral-darker">Streaming Project Charter</h1>
          </div>

          {headings.length === 0 ? (
            <>
              <ConnectionStatus isConnected={isConnected} />
              <div className="space-y-9 mt-4">
                {Array.from({ length: 6 }).map((_, i) => (
                  <HeadingSkeleton key={i} />
                ))}
              </div>
            </>
          ) : (
            <AnimatePresence>
              {headings.map((heading, index) => (
                <SectionCard
                  key={heading}
                  heading={heading}
                  content={parsedSections[heading]}
                  index={index}
                  isActive={index === activeSectionIndex}
                  isCompleted={completedSections.has(index)}
                  onTypingDone={() => {
                    setCompletedSections((prev) => new Set(prev).add(index));
                    setActiveSectionIndex((prev) => prev + 1);
                  }}
                  onUpdateHeading={updateHeading}
                />
              ))}
            </AnimatePresence>
          )}

          {headings.length > 0 && (
            <div className="mt-10">
              <h2 className="text-xl font-bold mb-2">📄 Markdown Preview</h2>
              <Button variant="secondary" onClick={handleDownloadMarkdown} className="mb-4">
                Download Markdown
              </Button>
              <pre className="whitespace-pre-wrap bg-gray-100 p-4 rounded-md border border-gray-300 text-sm text-gray-800">
                {generateMarkdown()}
              </pre>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default StreamingPage;




//////////////updated streaming page /////////////

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


