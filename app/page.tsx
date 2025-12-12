import Button from "@/components/home/Button";
import CategorySection from "@/components/home/CategorySection";
import Footer from "@/components/home/Footer";
import Hero from "@/components/home/Hero";
import React from "react";

const page = () => {
  return (
    <>
      <div className="relative w-full min-h-screen">
        <div className="absolute top-0 left-0 w-full h-full  -z-10 overflow-hidden">
          <div className="absolute -top-1/4 -left-1/4 w-1/2 h-1/2 bg-purple-600/30 rounded-full filter blur-3xl opacity-50 animate-pulse"></div>
          <div className="absolute -bottom-1/4 -right-1/4 w-1/2 h-1/2 bg-blue-500/30 rounded-full filter blur-3xl opacity-50 animate-pulse animation-delay-4000"></div>
        </div>
        <main className="flex flex-col items-center">
          <Hero />
          <CategorySection />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default page;
