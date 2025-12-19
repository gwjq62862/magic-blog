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
  const containerRef = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const scrollTop = container.scrollTop;
      const scrollHeight = container.scrollHeight - container.clientHeight;

      const scrolled = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;

      setScroll(scrolled);
    };

    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="relative">
      {/* Progress bar */}
      <div
        className="fixed top-0 left-0 h-1.5 z-50 bg-indigo-600 transition-all duration-200"
        style={{ width: `${scroll}%` }}
      />

      {/* Scrollable content */}
      <div
        ref={containerRef}
        className="h-[calc(100vh-64px)] overflow-y-auto relative"
      >
        <Link href={"/blog"} className="absolute left-4 top-5">
          <Button size="sm" className="absolue left-4 top-2 ">
            <ArrowLeftSquare className="mr-1.5" /> <span>Back</span>
          </Button>
        </Link>
        {children}
      </div>
    </div>
  );
}
