"use client";

import Button from "@/components/ui/Button";
import { ArrowLeftSquare } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function ScrollProgressContainer({
  children,
}: {
  children: React.ReactNode;
}) {
  const [scroll, setScroll] = React.useState(0);

  React.useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const scrollHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;

      const scrolled = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;

      setScroll(scrolled);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="relative">
      <div
        className="fixed top-0 left-0 h-1.5 z-50 bg-indigo-600 transition-all duration-200"
        style={{ width: `${scroll}%` }}
      />

      <div className="relative">
        <Link
          href={"/blog"}
          className="fixed sm:absolute left-3 sm:left-4 top-20 sm:top-2 z-10"
        >
          <Button
            size="sm"
            className="px-2.5 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm h-8 sm:h-8"
          >
            <ArrowLeftSquare className="mr-1 sm:mr-1.5 size-4 sm:size-5" />
            <span className="hidden sm:inline">Back</span>
          </Button>
        </Link>
        {children}
      </div>
    </div>
  );
}
