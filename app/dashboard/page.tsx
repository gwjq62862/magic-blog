"use client";

import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import Link from "next/link";
import { Id } from "@/convex/_generated/dataModel";

export const dynamic = "force-dynamic";

export default function DashboardPage() {
  const blogs = useQuery(api.blogPost.listPaginated, {
    search: undefined,
    paginationOpts: { numItems: 50, cursor: null },
  });

  const deletePost = useMutation(api.blogPost.deleteBlogPost);

  if (blogs === undefined) {
    return <div className="p-6 text-[#a19db9]">Loading posts…</div>;
  }

  const items = blogs.page;

  const handleDelete = async (id: Id<"blogs">) => {
    if (!confirm("Delete this post? This cannot be undone.")) return;
    await deletePost({ id });
  };

  return (
    <main className="p-6 space-y-4">
      <h1 className="text-2xl font-semibold text-white">Dashboard</h1>

      <div className="flex justify-between items-center">
        <p className="text-sm text-[#a19db9]">Total posts: {items.length}</p>
        <Link
          href="/dashboard/create-blog"
          className="px-3 py-2 rounded-lg bg-primary text-sm font-medium"
        >
          New post
        </Link>
      </div>

      <div className="mt-4 space-y-3">
        {items.map((post) => (
          <div
            key={post._id}
            className="flex items-center justify-between rounded-lg bg-[#141220] px-4 py-3 hover:bg-[#1b1829] transition"
          >
            <Link
              href={`/dashboard/posts/${post._id}`}
              className="flex-1 min-w-0"
            >
              <p className="text-sm font-medium text-white line-clamp-1">
                {post.title}
              </p>
              <p className="text-xs text-[#7b7694] mt-1 line-clamp-1">
                {new Date(post.createdAt).toLocaleString()}
              </p>
            </Link>

            <span className="mx-3 text-xs text-[#a19db9]">
              {post.imageUrl ? "🖼" : "—"}
            </span>

            <div className="flex gap-2">
              <Link
                href={`/dashboard/posts/${post._id}/edit`}
                className="px-2 py-1 rounded-md text-xs bg-[#2a253d] text-[#d2cfec] hover:bg-[#3a3354]"
              >
                Edit
              </Link>
              <button
                onClick={() => handleDelete(post._id)}
                className="px-2 py-1 rounded-md text-xs bg-red-600/80 text-white hover:bg-red-500"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
