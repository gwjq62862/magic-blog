"use client";

import Image from "next/image";
import { Play, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function AboutSection() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');
        
        * {
          font-family: 'Poppins', sans-serif;
        }
      `}</style>

      <section className="flex flex-col md:flex-row items-center justify-center gap-10 max-md:px-4 mt-10">
        {/* Left: preview image */}
        <div className="relative w-[280px] md:w-[360px] aspect-square rounded-2xl overflow-hidden">
          <Image
            src="/magic-blog.jpg"
            alt="Magic Mind Blog preview"
            fill
            sizes="(max-width: 768px) 280px, 360px"
            className="object-cover"
            priority
          />
        </div>

        {/* Right: text content */}
        <div className="text-sm text-slate-600 max-w-lg">
          <h1 className="text-xl uppercase font-semibold text-slate-700">
            About Magic Mind Blog
          </h1>
          <div className="w-24 h-[3px] rounded-full bg-gradient-to-r from-indigo-600 to-[#DDD9FF]" />

          <p className="mt-8 text-white">
            Magic Mind Blog is a calm corner of the internet where psychology
            meets everyday life. Articles focus on mental health, emotions, and
            behavior in a way that feels practical and human, not clinical or
            overwhelming. [conversation_history:1]
          </p>

          <p className="mt-4 text-white">
            You&apos;ll find simple, grounded posts about anxiety, confidence,
            relationships, overthinking, and stress — all written in clear
            language so you can actually apply the ideas to real situations, not
            just understand them in theory. [conversation_history:1]
          </p>

          <p className="mt-4 text-white">
            The goal of Magic Mind Blog is to help you understand your mind a
            little better, respond to difficult moments with more awareness, and
            design calmer, more intentional days. Think of it as a friendly
            guide that sits between self‑help and real psychology, created for
            people who want depth without complexity. [conversation_history:1]
          </p>

          <Link href="/blog">
            <button className="flex cursor-pointer items-center gap-2 mt-8 hover:-translate-y-0.5 transition bg-gradient-to-r from-indigo-600 to-[#8A7DFF] py-3 px-8 rounded-full text-white">
              <span>Read the latest stories</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </Link>
        </div>
      </section>
    </>
  );
}
