
import { RBACConfig } from './types';

// Define permissions for each role
const rbacConfig: RBACConfig = {
  roles: {
    admin: [
      { action: 'manage', resource: '*' }, // Admin can do everything
    ],
    
    editor: [
      { action: 'read', resource: '*' },
      { action: 'create', resource: 'content' },
      { action: 'update', resource: 'content' },
      { action: 'delete', resource: 'content' },
    ],
    
    viewer: [
      { action: 'read', resource: '*' },
    ],
    
    guest: [
      { action: 'read', resource: 'public' },
    ],
  },
};

export default rbacConfig;
