
import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import PromptGenerator from '../components/PromptGenerator';
import { useRBAC } from '../lib/rbac/RBACProvider';

const Index = () => {
  const { hasRole } = useRBAC();
  const canAccessEditors = hasRole('admin') || hasRole('editor');
  
  return (
    <div className="min-h-screen bg-fluent-neutral-lighter flex flex-col">
      <Header />
      <main className="flex-grow py-6">
        <div className="max-w-3xl mx-auto px-4">
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-fluent-neutral-darker mb-4">
              Welcome to Fluent UI Demo
            </h2>
            <p className="text-fluent-neutral-dark mb-6">
              This application demonstrates various features using React 18, modern hooks, Redux, and follows Atomic Design principles.
            </p>
            
            {canAccessEditors && (
              <div className="mt-4 mb-8">
                <Link 
                  to="/inline-editor" 
                  className="bg-fluent-primary hover:bg-fluent-secondary text-white px-4 py-2 rounded transition-colors"
                >
                  Go to Inline Editors Demo →
                </Link>
                <p className="text-sm text-fluent-neutral-dark mt-2">
                  Explore 10 different editable components with keyboard shortcuts (Alt+K).
                </p>
              </div>
            )}
          </div>
          
          <PromptGenerator />
        </div>
      </main>
      <footer className="py-4 px-6 text-center text-sm text-fluent-neutral-dark border-t border-fluent-neutral-dark/10">
        <p>© 2025 Fluent Prompt Palette. Inspired by Microsoft Fluent UI 2.</p>
      </footer>
    </div>
  );
};

export default Index;
