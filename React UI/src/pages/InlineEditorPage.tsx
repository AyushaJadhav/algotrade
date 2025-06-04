
import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import InlineEditorsShowcase, { ShortcutTarget } from '../components/organisms/InlineEditorsShowcase';
import KeyboardShortcutNavigator from '../components/molecules/KeyboardShortcutNavigator/KeyboardShortcutNavigator';
import KeyboardShortcutsDemo from '../components/molecules/KeyboardShortcutsDemo/KeyboardShortcutsDemo';
import { useStreamingData } from '../lib/hooks/useStreamingData';

// Mock SSE URL - in a real app, this would be your actual endpoint
const MOCK_SSE_URL = 'https://example.com/api/sse'; 

const InlineEditorPage = () => {
  const [shortcutTargets, setShortcutTargets] = useState<ShortcutTarget[]>([]);
  const [showMockStreamData, setShowMockStreamData] = useState(false);
  const [streamMessages, setStreamMessages] = useState<string[]>([]);

  // Simulated SSE data
  const mockStream = useStreamingData({
    url: MOCK_SSE_URL,
    type: 'sse',
    enabled: showMockStreamData,
    onMessage: (data) => {
      if (typeof data === 'string') {
        setStreamMessages(prev => [...prev, data]);
      }
    },
    onError: (err) => {
      console.error('Streaming error:', err);
    }
  });

  // Simulate SSE data when enabled
  useEffect(() => {
    if (showMockStreamData) {
      // Simulate incoming token-by-token data
      const tokens = "The Fluent UI design system helps you build interfaces that are beautiful, accessible, and performant.".split(' ');
      let index = 0;
      
      const interval = setInterval(() => {
        if (index < tokens.length) {
          setStreamMessages(prev => [...prev, tokens[index]]);
          index++;
        } else {
          clearInterval(interval);
        }
      }, 300);
      
      return () => clearInterval(interval);
    }
  }, [showMockStreamData]);

  // Find and collect all shortcut targets after render
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

  return (
    <div className="min-h-screen bg-fluent-neutral-lighter flex flex-col">
      <Header />
      
      <main className="flex-grow py-6">
        <div className="max-w-5xl mx-auto">
          {/* Keyboard Shortcuts Demo */}
          <div className="px-4">
            <KeyboardShortcutsDemo />
          </div>
          
          {/* SSE Stream Demo Toggle */}
          <div className="px-4 mb-6">
            <div className="flex items-center gap-2">
              <button
                className={`px-4 py-2 rounded transition-colors ${
                  showMockStreamData 
                    ? "bg-fluent-primary text-white" 
                    : "bg-white border border-fluent-neutral-dark/20 text-fluent-neutral-darker"
                }`}
                onClick={() => setShowMockStreamData(!showMockStreamData)}
              >
                {showMockStreamData ? "Stop Stream" : "Start Demo Stream"}
              </button>
              
              <span className="text-sm text-fluent-neutral-dark">
                {showMockStreamData ? "Simulating token-by-token SSE stream" : "Click to simulate SSE streaming"}
              </span>
            </div>
            
            {/* Stream display area */}
            {showMockStreamData && (
              <div className="mt-4 p-4 border border-fluent-neutral-dark/20 rounded bg-white">
                <h3 className="text-sm font-medium mb-2 text-fluent-neutral-darker">
                  Streaming Data (token by token):
                </h3>
                <div className="font-mono text-sm whitespace-pre-wrap">
                  {streamMessages.join(' ')}
                </div>
              </div>
            )}
          </div>
          
          {/* Main showcase */}
          <InlineEditorsShowcase />
        </div>
      </main>
      
      {/* Keyboard shortcut navigator */}
      <KeyboardShortcutNavigator targets={shortcutTargets} />
      
      <footer className="py-4 px-6 text-center text-sm text-fluent-neutral-dark border-t border-fluent-neutral-dark/10">
        <p>© 2025 Fluent Prompt Palette. Inline Editing Demo with Microsoft Fluent UI 2.</p>
      </footer>
    </div>
  );
};

export default InlineEditorPage;
