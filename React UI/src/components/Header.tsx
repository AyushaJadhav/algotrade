
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useRBAC } from '../lib/rbac/RBACProvider';

const Header = () => {
  const location = useLocation();
  const { user } = useRBAC();
  
  return (
    <header className="border-b border-fluent-neutral-dark/10 bg-white py-4 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-8">
          <Link to="/">
            <h1 className="text-xl font-semibold text-fluent-primary">Fluent Prompt Palette</h1>
          </Link>
          
          <nav className="hidden md:flex items-center space-x-6">
            <Link 
              to="/" 
              className={`text-sm transition-colors ${
                location.pathname === '/'
                  ? 'text-fluent-primary font-medium'
                  : 'text-fluent-neutral-dark hover:text-fluent-primary'
              }`}
            >
              Home
            </Link>
            <Link 
              to="/inline-editor" 
              className={`text-sm transition-colors ${
                location.pathname === '/inline-editor'
                  ? 'text-fluent-primary font-medium'
                  : 'text-fluent-neutral-dark hover:text-fluent-primary'
              }`}
            >
              Inline Editors
            </Link>
          </nav>
        </div>
        
        <div className="flex items-center space-x-4">
          {user ? (
            <div className="text-sm text-fluent-neutral-dark bg-fluent-neutral-lighter rounded-full px-3 py-1">
              {user.name} ({user.roles.join(', ')})
            </div>
          ) : (
            <span className="text-sm text-fluent-neutral-dark">Guest</span>
          )}
          <span className="text-sm text-fluent-neutral-dark hidden sm:inline-block">
            Corporate Edition
          </span>
        </div>
      </div>
    </header>
  );
};

export default Header;
