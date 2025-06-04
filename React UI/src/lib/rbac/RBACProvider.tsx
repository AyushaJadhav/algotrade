
import React, { createContext, useState, useContext, useEffect } from 'react';
import { User, Role, Permission } from './types';
import rbacConfig from './config';

// Do not use ReactContext for global state, only for the RBAC system
interface RBACContextType {
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
  hasPermission: (action: Permission['action'], resource: Permission['resource']) => boolean;
  hasRole: (role: Role) => boolean;
}

// Create context with a default value
const RBACContext = createContext<RBACContextType>({
  user: null,
  login: () => {},
  logout: () => {},
  hasPermission: () => false,
  hasRole: () => false,
});

interface RBACProviderProps {
  children: React.ReactNode;
  initialUser?: User | null;
}

export const RBACProvider: React.FC<RBACProviderProps> = ({ 
  children, 
  initialUser = null 
}) => {
  const [user, setUser] = useState<User | null>(initialUser);

  // Load user from localStorage on initial mount
  useEffect(() => {
    const storedUser = localStorage.getItem('rbac_user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        console.error('Failed to parse stored user:', e);
        localStorage.removeItem('rbac_user');
      }
    }
  }, []);

  // When user changes, store in localStorage
  useEffect(() => {
    if (user) {
      localStorage.setItem('rbac_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('rbac_user');
    }
  }, [user]);

  // Login function - in a real app, this would validate credentials
  const login = (newUser: User) => {
    setUser(newUser);
  };

  // Logout function
  const logout = () => {
    setUser(null);
  };

  // Check if user has a specific role
  const hasRole = (role: Role): boolean => {
    if (!user) return false;
    return user.roles.includes(role);
  };

  // Check if user has permission for an action on a resource
  const hasPermission = (
    action: Permission['action'],
    resource: Permission['resource']
  ): boolean => {
    if (!user) return false;

    // Check each of the user's roles for the required permission
    return user.roles.some(role => {
      const permissions = rbacConfig.roles[role];
      
      return permissions.some(permission => {
        // Check for wildcard permissions
        if (permission.action === 'manage' && permission.resource === '*') {
          return true;
        }
        
        // Check for resource wildcard
        if (permission.action === action && permission.resource === '*') {
          return true;
        }
        
        // Check for exact permission match
        return permission.action === action && permission.resource === resource;
      });
    });
  };

  const contextValue: RBACContextType = {
    user,
    login,
    logout,
    hasPermission,
    hasRole,
  };

  return (
    <RBACContext.Provider value={contextValue}>
      {children}
    </RBACContext.Provider>
  );
};

// Hook for using RBAC in components
export const useRBAC = () => useContext(RBACContext);

// Higher-order component to protect routes
export const withPermission = (
  Component: React.ComponentType<any>,
  requiredAction: Permission['action'],
  requiredResource: Permission['resource']
) => {
  const ProtectedComponent = (props: any) => {
    const { hasPermission, user } = useRBAC();
    
    if (!user) {
      // Redirect to login if user not logged in
      return <div>Please log in to access this resource</div>;
    }
    
    if (!hasPermission(requiredAction, requiredResource)) {
      // Permission denied
      return <div>You don't have permission to access this resource</div>;
    }
    
    // User has permission, render the component
    return <Component {...props} />;
  };
  
  return ProtectedComponent;
};
