// app/blog/[id]/page.tsx
"use client";

import { useParams, notFound } from "next/navigation";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import Image from "next/image";
import { Id } from "@/convex/_generated/dataModel";

const BlogDetailPage = () => {
  const params = useParams();
  const idParam = params?.id as string | undefined;
  const convexId = idParam as Id<"blogs">;

  const post = useQuery(
    api.blogPost.getById,
    convexId ? { id: convexId } : "skip"
  );

  if (post === undefined) {
    // still loading
    return <div className="p-4 text-white">Loading...</div>;
  }

  if (post === null) {
    return <div>notFound</div>;
  }

  return (
    <main className="mt-12 sm:mt-16 px-4 max-w-3xl mx-auto">
      {/* Cover image */}
      {post?.imageUrl && (
        <div className="w-full aspect-video relative rounded-xl overflow-hidden mb-6">
          <Image
            src={post.imageUrl}
            alt={post.title}
            fill
            className="object-cover"
          />
        </div>
      )}

      {/* Title & meta */}
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-white mb-3 leading-snug">
        {post?.title}
      </h1>
      <div className="flex justify-between overflow-hidden">
        <p className="text-[#a19db9] text-sm mb-6 mt-10">
          {new Date(post.createdAt).toLocaleDateString()}
        </p>

        <Image
          alt={post.author?.name || "Author"}
          width={24}
          height={24}
          src={post.author?.profileImage || ""}
          className="inline-block size-6 rounded-full ring-2 ring-gray-900 outline -outline-offset-1 outline-white/10"
        />
      </div>

      {/* Content (HTML from Tiptap) */}

      <article className="prose prose-invert max-w-none">
        <div
          className="tiptap"
          dangerouslySetInnerHTML={{ __html: post.description }}
        />
      </article>
    </main>
  );
};

export default BlogDetailPage;
