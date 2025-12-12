"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";

interface NavbarLinkProps {
  navbarLinks: { title: string; href: string }[];
}

const MobileNavbar = ({ navbarLinks }: NavbarLinkProps) => {
  const [open, setOpen] = useState(false);
  const pathName = usePathname();

  return (
    <div className="md:hidden relative">
      {/* Toggle */}
      <button
        onClick={() => setOpen(!open)}
        className="p-2 rounded-lg text-white hover:bg-white/10 transition"
      >
        {open ? <X size={22} /> : <Menu size={22} />}
      </button>

      {/* Dropdown */}
      {open && (
        <div
          className="absolute right-0 mt-3 w-44 rounded-xl p-3
  bg-white/10 backdrop-blur-3xl border border-white/20 shadow-xl
  animate-dropdown"
        >
          <div className="flex flex-col space-y-1">
            {navbarLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={`px-3 py-2 text- rounded-md text-sm font-medium transition
                  ${
                    pathName === item.href
                      ? "text-white bg-white/15 border border-white/20"
                      : "text-white/90 "
                  }`}
              >
                {item.title}
              </Link>
            ))}

            {/* Sign in */}
            <Link
              href="/signin"
              onClick={() => setOpen(false)}
              className="px-3 py-2 rounded-md text-sm font-medium 
              text-white/80 hover:text-white hover:bg-white/5 flex items-center gap-2 
              pt-2 border-t border-white/10"
            >
             Sign in
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default MobileNavbar;
