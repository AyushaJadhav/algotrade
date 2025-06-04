
export type Role = 'admin' | 'editor' | 'viewer' | 'guest';

export interface Permission {
  action: 'create' | 'read' | 'update' | 'delete' | 'manage';
  resource: string;
}

export interface User {
  id: string;
  name: string;
  roles: Role[];
}

export interface RBACConfig {
  roles: Record<Role, Permission[]>;
}
