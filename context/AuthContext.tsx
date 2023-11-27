// context/AuthContext.tsx
import {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
} from "react";
import { DEV_SERVER_URL } from "../config";
import { useRouter } from "next/router";

interface AuthContextProps {
  children: ReactNode;
}

interface User {
  user_id: number;
  username: string;
  token: string;
  tokenExpiration: number;
  refreshToken: string;
}

interface AuthContextValue {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signUp: (username: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

const TOKEN_STORAGE_KEY = "app_token";

export const AuthProvider: React.FC<AuthContextProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const storedToken = localStorage.getItem(TOKEN_STORAGE_KEY);

    if (storedToken) {
      try {
        const parsedToken = JSON.parse(storedToken);
        if (!isTokenExpired(parsedToken.tokenExpiration)) {
          setUser(parsedToken);
        } else {
          // Token has expired, attempt to refresh the token
          refreshAuthToken()
            .then((refreshedUser) => {
              setUser(refreshedUser);
            })
            .catch((refreshError) => {
              console.error("Token refresh failed:", refreshError);
              // Token refresh failed, initiate login/logout logic as needed
              handleTokenExpired();
            });
        }
      } catch (error) {
        console.error("Error parsing stored token:", error);
        // Handle parsing error if needed
      }
    }
  }, []);

  const isAuthenticated = !!user;

  const login = async (email: string, password: string) => {
    try {

      setLoading(true);

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

      const { token, ...userData } = await response.json();
      const tokenExpiration = Date.now() + 30 * 60 * 1000; // 30 minutes
      const userWithExpiration = { ...userData, token, tokenExpiration };
      setUser(userWithExpiration);
      setLoading(false);
      // Store token in local storage
      localStorage.setItem(
        TOKEN_STORAGE_KEY,
        JSON.stringify(userWithExpiration)
      );
    } catch (error) {
      console.error("Login error:", error);
      throw new Error("Login failed");
    }
  };

  const signUp = async (username: string, email: string, password: string) => {
    try {
      setLoading(true);

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

      const { token, ...userData } = await response.json();
      const tokenExpiration = Date.now() + 30 * 60 * 1000; // 30 minutes
      const userWithExpiration = { ...userData, token, tokenExpiration };
      setUser(userWithExpiration);
      setLoading(false);
      // Store token in local storage
      localStorage.setItem(
        TOKEN_STORAGE_KEY,
        JSON.stringify(userWithExpiration)
      );
    } catch (error) {
      console.error("Sign-up error:", error);
      throw new Error("Sign-up failed");
    }
  };

  const logout = () => {
    // Remove token from local storage
    localStorage.removeItem(TOKEN_STORAGE_KEY);
    setUser(null);
  };

  const handleTokenExpired = async () => {
    console.log("Token expired. Attempting to refresh token...");
    try {
      const refreshedUser = await refreshAuthToken();
      setUser(refreshedUser);
    } catch (refreshError) {
      console.error("Token refresh failed:", refreshError);
      // Token refresh failed, initiate login/logout logic as needed
      router.push("/login");
    }
  };

  const isTokenExpired = (expiration: number) => {
    return Date.now() > expiration;
  };

  const refreshAuthToken = async () => {
    try {
      const refreshToken = user?.refreshToken;
      if (!refreshToken) {
        throw new Error("Refresh token is missing");
      }
  
      const response = await fetch(`${DEV_SERVER_URL}/api/v1/refresh-token`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ refresh_token: refreshToken }),
      });
  
      if (!response.ok) {
        throw new Error(`Token refresh failed: ${await response.text()}`);
      }
  
      const { token, ...userData } = await response.json();
      const tokenExpiration = Date.now() + 30 * 60 * 1000; // 30 minutes
      return { ...userData, token, tokenExpiration };
    } catch (error) {
      throw new Error(`Token refresh failed: ${error.message}`);
    }
  };
  

  const contextValue: AuthContextValue = {
    user,
    isAuthenticated,
    loading,
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
