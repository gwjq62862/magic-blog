"use client";

import { usePathname } from "next/navigation";
import React from "react";
import Navbar from "./Navbar";

const NavbarProvider = () => {
  const pathName = usePathname();
  const isHomeRoute = pathName === "/";
  return isHomeRoute && <Navbar />;
};

export default NavbarProvider;
