"use client";

import { usePathname } from "next/navigation";
import React from "react";
import Navbar from "./Navbar";

const NavbarProvider = () => {
  const pathName = usePathname();
  const isAuthRoute = pathName === "/sign-in" || pathName === "/sign-up";
  return isAuthRoute ? null : <Navbar />;
};

export default NavbarProvider;
