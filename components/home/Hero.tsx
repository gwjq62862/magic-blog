import React from "react";
import Button from "../ui/Button";
import Link from "next/link";

const Hero = () => {
  return (
    <section className="text-center py-24 md:py-32">
      <div className="relative flex flex-col items-center gap-8 max-w-4xl mx-auto">
        <h1 className="text-5xl md:text-7xl font-black tracking-tighter bg-clip-text text-transparent bg-gradient-to-br from-white to-gray-400">
          Unlock the Magic of the Mind
        </h1>
        <p className="text-lg md:text-xl font-normal text-gray-400 max-w-2xl">
          Mind tricks, illusions, psychology hacks, and mind-expanding concepts.
        </p>
        <div className="flex flex-wrap gap-4 justify-center mt-4">
          <Link href={'/blog'}>
            <Button size="lg" color="primary">
              Read Articles
            </Button>
          </Link>
         
        </div>
      </div>
    </section>
  );
};

export default Hero;
