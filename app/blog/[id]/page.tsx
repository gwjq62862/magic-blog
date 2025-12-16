import { notFound } from "next/navigation";
import Image from "next/image";
import { api } from "@/convex/_generated/api";
import { fetchQuery } from "convex/nextjs";
import { Id } from "@/convex/_generated/dataModel";

export default async function BlogDetailPage({
  params,
}: {
  params: Promise<{ id?: string }>;
}) {
  const { id } = await params;
    if (!id) {
   return notFound();
  }
  const post = await fetchQuery(api.blogPost.getById, {
    id: id as Id<"blogs">,
  });

  if (!post) notFound();

  return (
    <main className="mt-12 sm:mt-16 px-4 max-w-3xl mx-auto">
      {post.imageUrl && (
        <div className="w-full aspect-video relative rounded-xl overflow-hidden mb-6">
          <Image
            src={post.imageUrl}
            alt={post.title}
            fill
            priority
            sizes="(max-width: 768px) 100vw, 768px"
            className="object-cover"
          />
        </div>
      )}

      <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-white mb-3">
        {post.title}
      </h1>

      <div className="flex justify-between items-center mb-6">
        <p className="text-[#a19db9] text-sm">
          {new Date(post.createdAt).toLocaleDateString()}
        </p>

        {post.author?.profileImage && (
          <Image
            src={post.author.profileImage}
            alt={post.author.name}
            width={24}
            height={24}
            className="rounded-full"
          />
        )}
      </div>

      <article className="prose prose-invert max-w-none contain-content">
        <div dangerouslySetInnerHTML={{ __html: post.description }} />
      </article>
    </main>
  );
}
