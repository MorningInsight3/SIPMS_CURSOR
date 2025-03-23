import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'user';
}

interface AuthState {
  user: User | null;
  isLoggedIn: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (email: string, password: string, name: string) => Promise<void>;
  checkAuth: () => Promise<boolean>;
}

// Mock users for demonstration purposes
const mockUsers = [
  {
    id: '1',
    email: 'admin@example.com',
    password: '123456',
    name: 'Admin User',
    role: 'admin' as const,
  },
  {
    id: '2',
    email: 'test@example.com',
    password: '123456',
    name: 'Test User',
    role: 'user' as const,
  },
];

// Create store with persistence
const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isLoggedIn: false,

      // Check if user is already authenticated
      checkAuth: async () => {
        try {
          const userData = await AsyncStorage.getItem('auth-storage');
          if (userData) {
            const parsedData = JSON.parse(userData);
            if (parsedData.state.user) {
              set({ 
                user: parsedData.state.user, 
                isLoggedIn: true 
              });
              return true;
            }
          }
          return false;
        } catch (error) {
          console.error('Error checking auth:', error);
          return false;
        }
      },

      // Login function
      login: async (email: string, password: string) => {
        try {
          console.log("Trying to login:", email, password);

          // First try local mock login
          const mockUser = mockUsers.find(
            (user) => user.email === email && user.password === password
          );

          if (mockUser) {
            console.log("Local mock login successful");
            // Simulate successful login
            const { password: _, ...userWithoutPassword } = mockUser;
            set({
              user: userWithoutPassword,
              isLoggedIn: true,
            });
            return;
          }

          // If local login fails, try remote API login
          const response = await fetch('https://glamsipms.com/api/login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              email,
              password,
            }),
          });

          if (response.ok) {
            const data = await response.json();
            if (data.success) {
              set({
                user: {
                  id: data.user.id,
                  email: data.user.email,
                  name: data.user.name,
                  role: data.user.role,
                },
                isLoggedIn: true,
              });
              return;
            }
          }

          console.log("Remote API login failed, invalid credentials or server unavailable");
          throw new Error("Login failed: invalid credentials or server unavailable");
        } catch (error) {
          console.error('Login error:', error);
          throw error;
        }
      },

      // Registration function
      register: async (email: string, password: string, name: string) => {
        try {
          // First check if mock user with same email already exists
          const existingUser = mockUsers.find((user) => user.email === email);
          if (existingUser) {
            alert('This email is already registered! Please login directly.');
            throw new Error('Email already registered');
          }

          // Simulate API registration
          const response = await fetch('https://glamsipms.com/api/register', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              email,
              password,
              name,
            }),
          });

          // For demonstration, assume success even if API is unavailable
          // In a real app, you'd handle API errors here
          
          // Add the new user to our mock users
          const newUserId = (mockUsers.length + 1).toString();
          mockUsers.push({
            id: newUserId,
            email,
            password,
            name,
            role: 'user' as const,
          });
          
          alert('Registration successful! Please login.');
          return;
        } catch (error) {
          console.error('Registration error:', error);
          throw error;
        }
      },

      // Logout function
      logout: () => {
        set({ user: null, isLoggedIn: false });
      },
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);

export default useAuthStore;
