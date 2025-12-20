import { NextResponse } from "next/server";
import { fetchQuery } from "convex/nextjs";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";

export const revalidate = 300;

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id?: string }> }
) {
  const { id } = await params;
  try {
    const post = await fetchQuery(api.blogPost.getById, {
      id: id as Id<"blogs">,
    });

    if (!post) {
      return NextResponse.json(null, { status: 404 });
    }

    const plain = post.description.replace(/<[^>]+>/g, "");
    const short =
      plain.length > 150 ? plain.slice(0, 150).trimEnd() + "…" : plain;

    return NextResponse.json(
      {
        title: post.title,
        description: short,
        image: post.imageUrl ?? null,
      },
      {
        headers: {
          'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600',
        },
      }
    );
  } catch (err) {
    return NextResponse.json(null, { status: 500 });
  }
}
