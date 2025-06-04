import { useEffect, useState } from "react";

interface SectionData {
  [heading: string]: string;
}

export function useStreamingData(idea: string | null) {
  const [sections, setSections] = useState<SectionData>({});
  const [rawContent, setRawContent] = useState(""); // Buffer content
  const [isStreaming, setIsStreaming] = useState(false);

  useEffect(() => {
    if (!idea) return;

    const eventSource = new EventSource("http://localhost:8000/generate-business-case", {
      withCredentials: false,
    });

    eventSource.onopen = () => {
      console.log("✅ SSE connection opened");
      setIsStreaming(true);
    };

    eventSource.onmessage = (event) => {
      try {
        const parsed = JSON.parse(event.data);

        if (parsed.chunk) {
          // Append chunk to buffer
          setRawContent((prev) => prev + parsed.chunk);
        }
      } catch (err) {
        console.error("Error parsing SSE data:", err);
      }
    };

    eventSource.addEventListener("complete", () => {
      console.log("✅ Streaming complete");

      try {
        // Now parse entire content
        const completedJson = eval(`(${rawContent})`);
        setSections(completedJson);
        setIsStreaming(false);
      } catch (err) {
        console.error("❌ Failed to parse completed stream into JSON:", err);
      }

      eventSource.close();
    });

    eventSource.onerror = (err) => {
      console.error("❌ SSE error", err);
      eventSource.close();
      setIsStreaming(false);
    };

    return () => eventSource.close();
  }, [idea]);

  return { sections, isStreaming };
}
