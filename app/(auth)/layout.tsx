"use client";

import { useConvexAuth } from "convex/react";
import { useRouter } from "next/navigation";
import React, { ReactNode, useEffect } from "react";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const { isAuthenticated, isLoading } = useConvexAuth();
  const router = useRouter();

  // Redirect authenticated users away from auth pages
  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      router.replace("/"); // home page
    }
  }, [isLoading, isAuthenticated, router]);

  // While checking auth, or while redirecting, we can show a loader
  if (isLoading || isAuthenticated) {
    return (
      <div className="position absolute inset-0">
        <span>loading ...</span>
      </div>
    );
  }

  // Not authenticated: render sign-in / sign-up children
  return (
    <div className="relative flex min-h-screen w-full flex-col items-center justify-center bg-background-dark text-white overflow-hidden p-4 sm:p-6 lg:p-8">
      <div className="absolute top-0 -left-1/4 w-96 h-96 bg-primary/20 rounded-full mix-blend-screen blur-3xl opacity-50 animate-blob"></div>
      <div className="absolute top-0 -right-1/4 w-96 h-96 bg-[#00BFFF]/20 rounded-full mix-blend-screen blur-3xl opacity-50 animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-[#6A0DAD]/20 rounded-full mix-blend-screen blur-3xl opacity-50 animate-blob animation-delay-4000"></div>

      {children}
    </div>
  );
}