
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useRBAC } from '../../lib/rbac/RBACProvider';
import { Permission } from '../../lib/rbac/types';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredAction?: Permission['action'];
  requiredResource?: Permission['resource'];
  requiredRoles?: string[];
  redirectPath?: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  requiredAction,
  requiredResource,
  requiredRoles = [],
  redirectPath = '/login'
}) => {
  const { user, hasPermission, hasRole } = useRBAC();
  const location = useLocation();

  if (!user) {
    // User is not logged in, redirect to login
    return <Navigate to={redirectPath} state={{ from: location }} replace />;
  }

  // Check permissions if specified
  if (requiredAction && requiredResource) {
    if (!hasPermission(requiredAction, requiredResource)) {
      // User lacks the specific permission
      return <Navigate to="/unauthorized" replace />;
    }
  }

  // Check roles if specified
  if (requiredRoles.length > 0) {
    const hasRequiredRole = requiredRoles.some(role => hasRole(role as any));
    if (!hasRequiredRole) {
      // User lacks any of the required roles
      return <Navigate to="/unauthorized" replace />;
    }
  }

  // User has permission, render the children
  return <>{children}</>;
};

export default ProtectedRoute;
