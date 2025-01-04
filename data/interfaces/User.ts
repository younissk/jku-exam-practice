export interface User {
  id: string;
  email: string;
  xp: number;
  displayName?: string;
  color?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
