
import React, { useState } from 'react';
import { Send } from 'lucide-react';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

const PromptGenerator = () => {
  const [prompt, setPrompt] = useState('');
  const [generatedContent, setGeneratedContent] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!prompt.trim()) {
      toast.error('Please enter a prompt');
      return;
    }
    
    setIsGenerating(true);
    
    try {
      // For demo purposes, simulate a brief delay before navigating
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Store the prompt in session storage to use on the streaming page
      sessionStorage.setItem('lastPrompt', prompt);
      
      // Navigate to the streaming page
      navigate('/streaming');
    } catch (error) {
      toast.error('Failed to generate content');
      console.error('Generation error:', error);
      setIsGenerating(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <div className="fluent-card mb-8">
        <h2 className="text-fluent-neutral-darker text-xl font-semibold mb-5">Generate Corporate Content</h2>
        <p className="text-fluent-neutral-dark mb-6">
          Enter your prompt below and click Generate to create professional corporate content with streaming updates.
        </p>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label htmlFor="prompt" className="block text-sm font-medium text-fluent-neutral-darker mb-2">
              Your Prompt
            </label>
            <textarea
              id="prompt"
              className="fluent-input min-h-[120px] resize-y"
              placeholder="Enter a prompt (e.g., 'Write a professional email about quarterly results')"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
            />
          </div>
          
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isGenerating}
              className={`fluent-button ${isGenerating ? 'opacity-80 cursor-not-allowed' : ''}`}
            >
              {isGenerating ? (
                <>
                  <span className="animate-pulse-subtle mr-2">Generating</span>
                  <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
                  </span>
                </>
              ) : (
                <>
                  Submit
                  <Send size={16} className="ml-2" />
                </>
              )}
            </button>
          </div>
        </form>
      </div>
      
      {generatedContent && (
        <div className="fluent-card border-l-4 border-l-fluent-primary mt-8 transition-all duration-300 ease-in">
          <h3 className="text-fluent-primary font-medium mb-3">Generated Content</h3>
          <p className="text-fluent-neutral-darker whitespace-pre-wrap">{generatedContent}</p>
        </div>
      )}
    </div>
  );
};

export default PromptGenerator;
