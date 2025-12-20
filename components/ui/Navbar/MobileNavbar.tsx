"use client";

import {
  Menu,
  X,
  LayoutDashboard,
  ArrowLeftSquare,
  LogIn,
  UserPlus,
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { useQuery, Authenticated, Unauthenticated } from "convex/react";
import { api } from "@/convex/_generated/api";
import { authClient } from "@/lib/auth-client";

interface NavbarLinkProps {
  navbarLinks: { title: string; href: string }[];
}

const MobileNavbar = ({ navbarLinks }: NavbarLinkProps) => {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathName = usePathname();
  const router = useRouter();
  const currentUser = useQuery(api.user.getCurrentUserWithProfile);
  const isAdmin = currentUser?.profile?.role === "admin";

  // Ensure component is mounted (client-side only)
  useEffect(() => {
    setMounted(true);
  }, []);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [open]);

  const handleLogout = async () => {
    try {
      await authClient.signOut();
      router.push("/sign-in");
      router.refresh();
      setOpen(false);
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  const handleLinkClick = () => {
    setOpen(false);
  };

  const overlayContent =
    open && mounted ? (
      <>
        {/* Backdrop */}
        <div
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100] animate-fadeIn"
          onClick={() => setOpen(false)}
        />

        {/* Full Screen Menu */}
        <div className="fixed inset-0 z-[101] flex flex-col bg-gradient-to-br from-[#0f0e13] via-[#1a1622] to-[#0f0e13] overflow-y-auto">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-white/10">
            <div className="flex items-center gap-3">
              <div className="size-8 text-primary">
                <svg
                  fill="none"
                  viewBox="0 0 48 48"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M42.4379 44C42.4379 44 36.0744 33.9038 41.1692 24C46.8624 12.9336 42.2078 4 42.2078 4L7.01134 4C7.01134 4 11.6577 12.932 5.96912 23.9969C0.876273 33.9029 7.27094 44 7.27094 44L42.4379 44Z"
                    fill="currentColor"
                  ></path>
                </svg>
              </div>
              <h2 className="text-white text-xl font-bold">Magic Mind Blog</h2>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="p-2 rounded-lg text-white hover:bg-white/10 transition"
              aria-label="Close menu"
            >
              <X size={24} />
            </button>
          </div>

          {/* Navigation Content */}
          <div className="flex-1 flex flex-col justify-center px-6 py-12 space-y-6">
            {/* Main Navigation Links */}
            <nav className="space-y-4">
              {navbarLinks.map((item) => {
                const isActive = pathName === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={handleLinkClick}
                    className={`flex items-center px-6 py-4 rounded-xl text-lg font-medium transition-all duration-300
                        ${
                          isActive
                            ? "text-white bg-white/10 border border-white/20 shadow-lg"
                            : "text-white/80 hover:text-white hover:bg-white/5"
                        }`}
                  >
                    {item.title}
                  </Link>
                );
              })}
            </nav>

            {/* Divider */}
            <div className="border-t border-white/10 my-4" />

            {/* Authentication Section */}
            <div className="space-y-4">
              <Authenticated>
                {/* Dashboard for Admin */}
                {isAdmin && (
                  <Link
                    href="/dashboard"
                    onClick={handleLinkClick}
                    className={`flex items-center gap-3 px-6 py-4 rounded-xl text-lg font-medium transition-all duration-300
                        ${
                          pathName === "/dashboard"
                            ? "text-white bg-white/10 border border-white/20 shadow-lg"
                            : "text-white/80 hover:text-white hover:bg-white/5"
                        }`}
                  >
                    <LayoutDashboard className="size-5" />
                    Dashboard
                  </Link>
                )}

                {/* Logout Button */}
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-6 py-4 rounded-xl text-lg font-medium text-white/80 hover:text-white hover:bg-white/5 transition-all duration-300"
                >
                  <ArrowLeftSquare className="size-5" />
                  Logout
                </button>
              </Authenticated>

              <Unauthenticated>
                {/* Sign In */}
                <Link
                  href="/sign-in"
                  onClick={handleLinkClick}
                  className="flex items-center gap-3 px-6 py-4 rounded-xl text-lg font-medium text-white/80 hover:text-white hover:bg-white/5 transition-all duration-300"
                >
                  <LogIn className="size-5" />
                  Sign In
                </Link>

                {/* Sign Up */}
                <Link
                  href="/sign-up"
                  onClick={handleLinkClick}
                  className="flex items-center gap-3 px-6 py-4 rounded-xl text-lg font-semibold text-white bg-primary hover:bg-primary/90 transition-all duration-300 shadow-lg shadow-primary/20"
                >
                  <UserPlus className="size-5" />
                  Sign Up
                </Link>
              </Unauthenticated>
            </div>
          </div>
        </div>
      </>
    ) : null;

  return (
    <>
      {/* Hamburger Button */}
      <button
        onClick={() => setOpen(!open)}
        className="md:hidden p-2 rounded-lg text-white hover:bg-white/10 transition relative z-[60]"
        aria-label="Toggle menu"
      >
        {open ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Full Screen Overlay - Rendered via Portal to body */}
      {mounted && overlayContent && createPortal(overlayContent, document.body)}
    </>
  );
};

export default MobileNavbar;
