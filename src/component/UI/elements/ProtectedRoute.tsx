"use client";
import { ReactNode, useEffect } from "react";
import { useRouter } from "next/navigation";
import useAuth from "@/hooks/useAuth";

interface ProtectedRouteProps {
  children: ReactNode;
  requiredRole?:
    | "USER"
    | "ADMIN"
    | "PHYSICIAN"
    | "SUPPORT_AGENT"
    | ("USER" | "ADMIN" | "PHYSICIAN" | "SUPPORT_AGENT")[];
  fallback?: ReactNode | string;
}

export default function ProtectedRoute({
  children,
  requiredRole = "USER",
  fallback = "/login",
}: ProtectedRouteProps) {
  const router = useRouter();
  const { isAuthenticated, isLoading, user } = useAuth();

  const roles = Array.isArray(requiredRole) ? requiredRole : [requiredRole];
  const isAuthorized = user && roles.includes(user.role);

  useEffect(() => {
    if (isLoading) return;

    if (!isAuthenticated || !isAuthorized) {
      if (typeof fallback === "string") {
        router.replace(fallback);
      }
    }
  }, [isAuthenticated, isAuthorized, isLoading, fallback, router]);

  if (isLoading) return <div>Loading...</div>;
  if (!isAuthenticated || !isAuthorized) return null;

  return <>{children}</>;
}
