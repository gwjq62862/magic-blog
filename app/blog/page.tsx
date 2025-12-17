// app/blog/page.tsx
import { fetchQuery } from "convex/nextjs";
import { api } from "@/convex/_generated/api";
import BlogClient from "@/components/blog/BlogClinet";


export default async function BlogPage() {
    const me = await fetchQuery(api.user.getCurrentUserWithProfile, {});
    console.log("ME IN BLOG PAGE", me);
  const initialPage = await fetchQuery(api.blogPost.listPaginated, {
    search: undefined,
    paginationOpts: {
      numItems: 9,
      cursor: null,
    },
  });

  // initialPage has { page, isDone, continueCursor, ... }

  return <BlogClient initialPage={initialPage} />;
}
