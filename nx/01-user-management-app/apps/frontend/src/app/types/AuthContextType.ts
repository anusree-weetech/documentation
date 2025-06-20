import { User } from './User';

export interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  setAuthState: (authState: {
    isAuthenticated: boolean;
    user: User | null;
  }) => void;
}
