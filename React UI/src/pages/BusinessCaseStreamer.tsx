// src/BusinessCaseStream.tsx
import React, { useEffect, useState } from "react";

type Props = {
  idea: string;
};

const BusinessCaseStream: React.FC<Props> = ({ idea }) => {
  const [content, setContent] = useState("");
  const [status, setStatus] = useState("idle");

  useEffect(() => {
    if (!idea) return;

    const eventSource = new EventSource(
      `http://localhost:8000/stream-business-case?idea=${encodeURIComponent(idea)}`
    );

    setStatus("connecting");

    eventSource.onmessage = (event) => {
      try {
        const parsed = JSON.parse(event.data);
        if (parsed.chunk) {
          setContent((prev) => prev + parsed.chunk); // word-by-word append
        }
      } catch (err) {
        console.error("Error parsing chunk:", err);
      }
    };

    eventSource.addEventListener("status", (event) => {
      const parsed = JSON.parse(event.data);
      if (parsed.status === "started") {
        setStatus("streaming");
      }
    });

    eventSource.addEventListener("complete", () => {
      setStatus("done");
      eventSource.close();
    });

    eventSource.addEventListener("error", (event) => {
      console.error("SSE error:", event);
      setStatus("error");
      eventSource.close();
    });

    return () => {
      eventSource.close();
    };
  }, [idea]);

  return (
    <div className="p-4 border rounded shadow-md bg-white mt-4 max-w-2xl mx-auto">
      <h2 className="text-lg font-semibold mb-2">Generated Business Case</h2>
      <div className="min-h-[150px] whitespace-pre-wrap text-gray-800">
        {content || "Waiting for content..."}
      </div>
      <p className="text-sm text-gray-500 mt-2">
        Status: {status === "streaming" ? "Streaming..." : status}
      </p>
    </div>
  );
};

export default BusinessCaseStream;
