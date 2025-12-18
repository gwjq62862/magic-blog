"use client";

import { usePathname } from "next/navigation";
import React from "react";
import Navbar from "./Navbar";

const NavbarProvider = () => {
  const pathname = usePathname();

  const hideNavbar =
    pathname.startsWith("/dashboard") ||
    pathname === "/sign-in" ||
    pathname === "/sign-up";

  if (hideNavbar) return null;

  return <Navbar />;
};

export default NavbarProvider;
