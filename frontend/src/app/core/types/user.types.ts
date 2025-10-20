export interface User {
  id: number;
  name: string;
  email: string;
  role: 'admin' | 'user';
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
}