"use client";

import { useState } from "react";
import { useDebounce } from "use-debounce";
import Link from "next/link";
import { usePaginatedQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import type { Id } from "@/convex/_generated/dataModel";

import BlogCard from "./BlogCard";
import Pagination from "./Pagination";
import SearchInput from "./SearchInput";

// ---- Types for the paginated result ----

// Shape of a single blog item returned by listPaginated
type BlogItem = {
  _id: Id<"blogs">;
  _creationTime: number;
  title: string;
  description: string;
  searchText: string;
  authorId: string;
  createdAt: number;
  imageUrl: string | null;
  coverImageStorageId?: Id<"_storage"> | null;
};

// Shape of the full paginated page returned by listPaginated
type ListPage = {
  page: BlogItem[];
  isDone: boolean;
  continueCursor: string | null;
};

// Props from the server component
type Props = {
  initialPage: ListPage;
};

export default function BlogClient({ initialPage }: Props) {
  const [search, setSearch] = useState("");
  const [debouncedSearch] = useDebounce(search, 300);

  const usingSearch = debouncedSearch.trim().length > 0;

  // Client-side pagination for the non-search case
  const { results, status, loadMore } = usePaginatedQuery(
    api.blogPost.listPaginated,
    { search: undefined },
    { initialNumItems: 9 }
  );

  // For first render, use SSR data; after that, use hook results
  const visiblePosts: BlogItem[] = usingSearch
    ? [] // search handling can be added later
    : results.length
    ? (results as BlogItem[])
    : initialPage.page;

  return (
    <main className="mt-12 sm:mt-16">
      <SearchInput value={search} onChange={setSearch} />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
        {visiblePosts.map((post: BlogItem) => (
          <Link key={post._id} href={`/blog/${post._id}`}>
            <BlogCard
              title={post.title}
              date={new Date(post.createdAt).toLocaleDateString()}
              image={post.imageUrl ?? "/fallback.jpg"}
              description={post.description}
            />
          </Link>
        ))}
      </div>

      {!usingSearch && (
        <Pagination
          canLoadMore={status === "CanLoadMore"}
          loading={status === "LoadingMore"}
          onNext={() => loadMore(9)}
        />
      )}
    </main>
  );
}
