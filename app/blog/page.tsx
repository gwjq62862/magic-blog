"use client";
import BlogCard from "@/components/blog/BlogCard";
import Pagination from "@/components/blog/Pagination";
import SearchInput from "@/components/blog/SearchInput";
import { api } from "@/convex/_generated/api";
import { blogData } from "@/data/dummyData";
import { usePaginatedQuery } from "convex/react";
import Link from "next/link";
import React, { useState } from "react";

const BlogPage = () => {
  const [search, setSearch] = useState("");

  const { results, status, loadMore } = usePaginatedQuery(
    api.blogPost.listPaginated,
    { search: search || undefined },
    { initialNumItems: 9 }
  );

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
      <SearchInput value={search} onChange={setSearch} />

      {/* ImageGrid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4 mt-12">
        {results?.map((post) => (
          <Link key={post._id} href={`/blog/${post._id}`} className="block">
            <BlogCard
              title={post.title}
              date={new Date(post.createdAt).toLocaleDateString()}
              description={post.description}
              image={post.imageUrl ?? "/fallback.jpg"}
            />
          </Link>
        ))}
      </div>

      {/* Pagination */}
      <Pagination
        canLoadMore={status === "CanLoadMore"}
        loading={status === "LoadingMore" || status === "LoadingFirstPage"}
        onNext={() => loadMore(9)}
      />
    </main>
  );
};

export default BlogPage;
