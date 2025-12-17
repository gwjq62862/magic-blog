import { Search } from "lucide-react";
import React from "react";
import CateogroyCard from "./CateogroyCard";
type Props = {
  value: string;
  onChange: (v: string) => void;
};
const SearchInput = ({ value, onChange }: Props) => {
  return (
    <div className="mt-10 sm:mt-12 space-y-6 px-4">
      <label className="flex flex-col min-w-40 h-14 w-full max-w-2xl mx-auto">
        <div className="relative flex w-full flex-1 items-stretch rounded-xl h-full shadow-lg group">
          <div className="absolute inset-0 bg-linear-to-r from-primary/50 to-cyan-500/50 rounded-xl blur-lg opacity-40 group-hover:opacity-60 transition-opacity "></div>
          <div className="text-[#a19db9] flex glassmorphism items-center justify-center px-2 rounded-l-xl border-none z-10 ">
            <Search />
          </div>
          <input
            className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-r-xl text-white focus:outline-0 focus:ring-2 focus:ring-(--color-primary)/80 border-none bg-transparent glassmorphism h-full placeholder:text-[#a19db9] px-4 pl-2 text-base font-normal leading-normal z-10"
            placeholder="Search articles..."
            value={value}
            onChange={(e) => onChange(e.target.value)}
          />
        </div>
      </label>
 
    </div>
  );
};

export default SearchInput;
