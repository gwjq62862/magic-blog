"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import CommentSection from "./CommentSection";
import { Id } from "@/convex/_generated/dataModel";

type Props = {
  html: string;
  blogId:Id<"blogs">
};

export function ReadMoreDescription({ html,blogId }: Props) {
  const [expanded, setExpanded] = useState(false);

  return (
   <>
    <article className="relative w-full ">
      {/* Content */}
      <div
        className={`prose prose-invert font-myanmar leading-myanmar tracking-myanmar transition-all duration-300    max-w-none ${
          expanded ? "" : "line-clamp-5"
        }`}
        dangerouslySetInnerHTML={{ __html: html }}
      />

    
      {!expanded && (
        <div className="pointer-events-none absolute bottom-24 left-0 right-0 h-24 bg-linear-to-t from-[#0f172a] to-transparent" />
      )}

 
      <div className="mt-10 border-t border-white/10" />


      <div className="mt-6 flex justify-center">
        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          className="
            group inline-flex items-center gap-2
            rounded-full px-7 py-3
            text-sm font-medium
            text-indigo-300
            bg-[#0f172a]
            border border-indigo-500/30
            shadow-lg shadow-black/30
            transition-all duration-300
            hover:bg-indigo-500/15
            hover:text-indigo-200
            hover:shadow-[0_0_25px_rgba(99,102,241,0.25)]
          "
        >
          <span>{expanded ? "Read less" : "Read full article"}</span>
          {expanded ? (
            <ChevronUp size={16} />
          ) : (
            <ChevronDown size={16} />
          )}
        </button>
      </div>
    </article>
    {expanded && <CommentSection blogId={blogId} />}
   </>
   
  );
}
