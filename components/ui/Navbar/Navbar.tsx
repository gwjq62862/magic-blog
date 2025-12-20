"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React from "react";
import MobileNavbar from "./MobileNavbar";
import Button from "../Button";
import {
  Authenticated,
  AuthLoading,
  Unauthenticated,
  useQuery,
} from "convex/react";
import { ArrowLeftSquare, Plus, LayoutDashboard } from "lucide-react";
import NavbarSkeleton from "./NavbarSkelton";
import { authClient } from "@/lib/auth-client";
import { api } from "@/convex/_generated/api";

const navbarLinks = [
  {
    title: "Home",
    href: "/",
  },
  {
    title: "Blog",
    href: "/blog",
  },
  {
    title: "About",
    href: "/about",
  },
];

const Navbar = () => {
  const pathName = usePathname();
  const router = useRouter();
  const currentUser = useQuery(api.user.getCurrentUserWithProfile);
  const isAdmin = currentUser?.profile?.role === "admin";

  const handleLogout = async () => {
    try {
      await authClient.signOut();

      router.push("/sign-in");

      router.refresh();
    } catch (err) {
      console.error("Logout failed", err);
    }
  };
  return (
    <header className="flex items-center justify-between whitespace-nowrap px-4 sm:px-6 py-4 glassmorphism rounded-xl relative z-50">
      <div className="flex items-center gap-10 text-white shrink-0">
        <Link className="flex items-center gap-3" href="/">
          <div className="size-6 text-primary">
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
          <h2 className="text-white text-lg sm:text-xl font-bold leading-tight tracking-[-0.015em]">
            Magic Mind Blog
          </h2>
        </Link>
      </div>

      <div className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <nav className="flex items-center gap-1 bg-white/5 rounded-full px-2 py-1 border border-white/10 shadow-sm">
          {navbarLinks.map((item) => {
            const isActive =
              item.href === "/blog"
                ? pathName === "/blog" || pathName.startsWith("/blog/")
                : pathName === item.href;
            return (
              <Link
                key={item.title}
                className={`px-4 py-2 rounded-full text-sm font-medium leading-normal
                  transition-all duration-300 ease-in-out
                  ${
                    isActive
                      ? "text-white bg-white/10 shadow-inner"
                      : "text-white/70 hover:text-white hover:bg-white/5"
                  }
                `}
                href={item.href}
              >
                {item.title}
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="flex gap-3 items-center justify-end">
        <AuthLoading>
          <div className="hidden md:block">
            <NavbarSkeleton />
          </div>
        </AuthLoading>
        <Unauthenticated>
          <div className="hidden sm:block">
            <Link href={"/sign-in"}>
              <Button
                size="sm"
                color="secondary"
                className="text-white hover:text-primary"
              >
                Log in
              </Button>
            </Link>
          </div>

          <Link href={"/sign-up"}>
            <Button
              size="sm"
              className="px-5 rounded-full font-semibold"
              color="primary"
            >
              Sign up
            </Button>
          </Link>
        </Unauthenticated>
        <Authenticated>
          {isAdmin && (
            <Link href="/dashboard" className="hidden lg:block">
              <Button
                size="sm"
                className="px-4 rounded-full font-semibold"
                color="primary"
              >
                <LayoutDashboard className="mr-2 size-4" />
                Dashboard
              </Button>
            </Link>
          )}
          <Button onClick={handleLogout}>
            <ArrowLeftSquare className="mr-2" />
            Logout
          </Button>
        </Authenticated>
        <MobileNavbar navbarLinks={navbarLinks} />
      </div>
    </header>
  );
};

export default Navbar;
