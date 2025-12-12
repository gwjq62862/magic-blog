import { ArrowLeft, ArrowRight } from "lucide-react";
import React from "react";
import Button from "../home/Button";

const Pagination = () => {
  return (
    <div className="flex items-center justify-center gap-4 mt-16 pb-12">
      <Button color="secondary" size="sm">
        <ArrowLeft />
      </Button>
      <nav className="flex items-center gap-2">
        <a
          className="flex items-center justify-center size-10 rounded-lg text-[#a19db9] hover:bg-white/10 transition-colors"
          href="#"
        >
          1
        </a>
        <a
          className="flex items-center justify-center size-10 rounded-lg bg-primary text-white font-bold"
          href="#"
        >
          2
        </a>
        <a
          className="flex items-center justify-center size-10 rounded-lg text-[#a19db9] hover:bg-white/10 transition-colors"
          href="#"
        >
          3
        </a>
        <span className="text-[#a19db9]">...</span>
        <a
          className="flex items-center justify-center size-10 rounded-lg text-[#a19db9] hover:bg-white/10 transition-colors"
          href="#"
        >
          8
        </a>
      </nav>
      <Button color="secondary" size="sm">
        <ArrowRight />
      </Button>
    </div>
  );
};

export default Pagination;
