import { useEffect, useState, cache } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

interface User {
  id: string;
  email: string;
  role: "ADMIN" | "USER" | "PHYSICIAN" | "SUPPORT_AGENT";
}

interface AuthState {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: User | null;
}

export default function useAuth() {
  const router = useRouter();
  const [authState, setAuthState] = useState<AuthState>({
    isAuthenticated: false,
    isLoading: true,
    user: null,
  });

  // Move validateToken outside useEffect so it can be reused
  const validateToken = async () => {
    try {
      const response = await axios.get("/api/auth/validate", {
        withCredentials: true,
      });

      if (response.data.valid) {
        setAuthState({
          isAuthenticated: true,
          isLoading: false,
          user: response.data.user,
        });
      } else {
        setAuthState({
          isAuthenticated: false,
          isLoading: false,
          user: null,
        });
        router.replace("/login");
      }
    } catch (error) {
      console.error("Authentication check failed:", error);
      setAuthState({
        isAuthenticated: false,
        isLoading: false,
        user: null,
      });
      // Only redirect to login if it's an auth error, not network error
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        router.replace("/login");
      }
    }
  };

  useEffect(() => {
    validateToken();
  }, [router]);

  return {
    ...authState,
    user: authState.user,
    // Helper methods
    isAdmin: authState.user?.role === "ADMIN",
    isUser: authState.user?.role === "USER",
    isPhysician: authState.user?.role === "PHYSICIAN",
    isSsupport: authState.user?.role === "SUPPORT_AGENT",
    // Refresh auth state
    refresh: () => {
      setAuthState((prev) => ({ ...prev, isLoading: true }));
      validateToken();
    },
  };
}
