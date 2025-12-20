import { notFound } from "next/navigation";
import Image from "next/image";
import { api } from "@/convex/_generated/api";
import { fetchQuery } from "convex/nextjs";
import { Id } from "@/convex/_generated/dataModel";
import { ReadMoreDescription } from "@/components/blog/ReadMoreDescription";
import type { Metadata } from "next";

// Enable static generation with revalidation
export const revalidate = 300; // Revalidate every 5 minutes

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id?: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  if (!id) {
    return {};
  }

  // Try to fetch metadata directly from Convex instead of API route for better performance
  try {
    const post = await fetchQuery(api.blogPost.getById, {
      id: id as Id<"blogs">,
    });

    if (!post) {
      return {
        title: "Magic Mind Blog",
        description:
          "Magic Mind Blog is a Burmese-language psychology and mental health blog.",
      };
    }

    const plain = post.description.replace(/<[^>]+>/g, "");
    const short =
      plain.length > 150 ? plain.slice(0, 150).trimEnd() + "…" : plain;

    return {
      title: `${post.title} – Magic Mind Blog`,
      description: short,
      openGraph: {
        title: `${post.title} – Magic Mind Blog`,
        description: short,
        type: "article",
        images: post.imageUrl ? [{ url: post.imageUrl }] : undefined,
      },
      twitter: {
        card: "summary_large_image",
        title: `${post.title} – Magic Mind Blog`,
        description: short,
        images: post.imageUrl ? [post.imageUrl] : undefined,
      },
    };
  } catch (error) {
    // Fallback to API route if direct fetch fails
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/api/blog/${id}/metadata`,
        {
          next: { revalidate: 300 }, // Cache for 5 minutes
        }
      );

      if (!res.ok) {
        return {
          title: "Magic Mind Blog",
          description:
            "Magic Mind Blog is a Burmese-language psychology and mental health blog.",
        };
      }

      const data: {
        title: string;
        description: string;
        image?: string | null;
      } = await res.json();

      return {
        title: `${data.title} – Magic Mind Blog`,
        description: data.description,
        openGraph: {
          title: `${data.title} – Magic Mind Blog`,
          description: data.description,
          type: "article",
          images: data.image ? [{ url: data.image }] : undefined,
        },
        twitter: {
          card: "summary_large_image",
          title: `${data.title} – Magic Mind Blog`,
          description: data.description,
          images: data.image ? [data.image] : undefined,
        },
      };
    } catch {
      return {
        title: "Magic Mind Blog",
        description:
          "Magic Mind Blog is a Burmese-language psychology and mental health blog.",
      };
    }
  }
}

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

  if (!post) return notFound();

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

      <ReadMoreDescription blogId={id as Id<"blogs">} html={post.description} />
    </main>
  );
}
