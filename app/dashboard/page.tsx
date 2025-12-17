// app/dashboard/page.tsx
"use client";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import Link from "next/link";

export default function DashboardPage() {
  // simple list; later you can switch to paginated if needed
  const blogs = useQuery(api.blogPost.listPaginated, {
    search: undefined,
    paginationOpts: {
      numItems: 50,
      cursor: null,
    },
  });

  if (blogs === undefined) {
    return <div className="p-6 text-[#a19db9]">Loading posts…</div>;
  }

  const items = blogs.page;

  return (
    <main className="p-6 space-y-4">
      <h1 className="text-2xl font-semibold text-white">Dashboard</h1>

      <div className="flex justify-between items-center">
        <p className="text-sm text-[#a19db9]">
          Total posts: {items.length}
        </p>
        <Link
          href="/dashboard/create-blog"
          className="px-3 py-2 rounded-lg bg-primary text-sm font-medium"
        >
          New post
        </Link>
      </div>

      <div className="mt-4 space-y-3">
        {items.map((post) => (
          <Link
            key={post._id}
            href={`/dashboard/posts/${post._id}`}
            className="flex items-center justify-between rounded-lg bg-[#141220] px-4 py-3 hover:bg-[#1b1829] transition"
          >
            <div>
              <p className="text-sm font-medium text-white line-clamp-1">
                {post.title}
              </p>
              <p className="text-xs text-[#7b7694] mt-1 line-clamp-1">
                {new Date(post.createdAt).toLocaleString()}
              </p>
            </div>
            <span className="text-xs text-[#a19db9]">
              {post.imageUrl ? "🖼" : "—"}
            </span>
          </Link>
        ))}
      </div>
    </main>
  );
}
