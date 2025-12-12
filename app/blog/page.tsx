import BlogCard from "@/components/blog/BlogCard";
import Pagination from "@/components/blog/Pagination";
import SearchInput from "@/components/blog/SearchInput";
import { blogData } from "@/data/dummyData";
import React from "react";

const BlogPage = () => {
  return (
    <main className="mt-12 sm:mt-16">
      {/* PageHeading */}
      <div className="flex flex-col items-center text-center gap-4 p-4">
        <p className="text-white text-4xl sm:text-5xl md:text-6xl font-black leading-tight tracking-[-0.033em]">
          The Magic Mind Blog
        </p>
        <p className="text-[#a19db9] text-base sm:text-lg font-normal leading-normal max-w-2xl">
          Discover articles on Mindfulness, Productivity, Technology, and more,
          exploring the fascinating intersection of mind and machine.
        </p>
      </div>

      {/* SearchBar and Chips */}
      <SearchInput />

      {/* ImageGrid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4 mt-12">
         {blogData.map((post) => (
        <BlogCard
          key={post.id}
          title={post.title}
          date={post.date}
          description={post.description}
          image={post.image}
        />
      ))}
      </div>

      {/* Pagination */}
   <Pagination/>
    </main>
  );
};

export default BlogPage;
