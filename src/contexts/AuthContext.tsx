
import { AuthState, User } from "@/types";
import React, { createContext, useContext, useEffect, useState } from "react";
import { mockUsers } from "@/data/mockData";
import { toast } from "sonner";

interface AuthContextType {
  authState: AuthState;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isLoading: true,
    isAuthenticated: false,
  });

  useEffect(() => {
    // Check for stored user in localStorage
    const storedUser = localStorage.getItem("tripMatesUser");
    if (storedUser) {
      try {
        const user = JSON.parse(storedUser);
        setAuthState({
          user,
          isLoading: false,
          isAuthenticated: true,
        });
      } catch (error) {
        console.error("Error parsing stored user:", error);
        localStorage.removeItem("tripMatesUser");
        setAuthState({
          user: null,
          isLoading: false,
          isAuthenticated: false,
        });
      }
    } else {
      setAuthState({
        user: null,
        isLoading: false,
        isAuthenticated: false,
      });
    }
  }, []);

  const login = async (email: string, password: string) => {
    // In a real application, this would send an API request
    // For the mock version, we'll just check against our mock data
    const user = mockUsers.find((u) => u.email === email);
    if (!user) {
      toast.error("Invalid email or password");
      throw new Error("Invalid email or password");
    }

    // Simulate successful login
    localStorage.setItem("tripMatesUser", JSON.stringify(user));
    setAuthState({
      user,
      isLoading: false,
      isAuthenticated: true,
    });
    toast.success("Login successful!");
  };

  const register = async (name: string, email: string, password: string) => {
    // Check if user already exists
    const userExists = mockUsers.some((u) => u.email === email);
    if (userExists) {
      toast.error("Email already in use");
      throw new Error("Email already in use");
    }

    // Create new user
    const newUser: User = {
      id: `user${mockUsers.length + 1}`,
      name,
      email,
      avatarUrl: `https://randomuser.me/api/portraits/${Math.random() > 0.5 ? "men" : "women"}/${mockUsers.length + 1}.jpg`,
    };

    // In a real app, this would be an API call
    mockUsers.push(newUser);
    
    // Save to localStorage
    localStorage.setItem("tripMatesUser", JSON.stringify(newUser));
    
    setAuthState({
      user: newUser,
      isLoading: false,
      isAuthenticated: true,
    });
    
    toast.success("Registration successful!");
  };

  const logout = () => {
    localStorage.removeItem("tripMatesUser");
    setAuthState({
      user: null,
      isLoading: false,
      isAuthenticated: false,
    });
    toast.success("Logged out successfully");
  };

  const value = {
    authState,
    login,
    register,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
