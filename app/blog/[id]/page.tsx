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
    // no such blog
    notFound();
  }

  return (
    <main className="mt-12 sm:mt-16 px-4 max-w-3xl mx-auto">
      {/* Cover image */}
      {post.imageUrl && (
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
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-2">
        {post.title}
      </h1>
      <p className="text-[#a19db9] text-sm mb-6">
        {new Date(post.createdAt).toLocaleDateString()}
      </p>

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
