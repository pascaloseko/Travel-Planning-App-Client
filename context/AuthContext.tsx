import { createContext, useContext, ReactNode, useState } from "react";
import { DEV_SERVER_URL } from "../config";

interface AuthContextProps {
  children: ReactNode;
}

interface User {
  user_id: number;
  username: string;
  token: string;
}

interface AuthContextValue {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  signUp: (username: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const AuthProvider: React.FC<AuthContextProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const isAuthenticated = !!user;

  const login = async (email: string, password: string) => {
    try {
      const response = await fetch(`${DEV_SERVER_URL}/api/v1/token`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error("Login failed");
      }

      const userData = await response.json();
      setUser(userData);
    } catch (error) {
      console.error("Login error:", error);
      throw new Error("Login failed");
    }
  };

  const signUp = async (username: string, email: string, password: string) => {
    try {
      const response = await fetch(`${DEV_SERVER_URL}/api/v1/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, password }),
      });

      if (!response.ok) {
        throw new Error("Sign-up failed");
      }

      const userData = await response.json();
      setUser(userData);
    } catch (error) {
      console.error("Sign-up error:", error);
      throw new Error("Sign-up failed");
    }
  };

  const logout = () => {
    setUser(null);
  };

  const contextValue: AuthContextValue = {
    user,
    isAuthenticated,
    login,
    signUp,
    logout,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
