// app/blog/page.tsx
import { fetchQuery } from "convex/nextjs";
import { api } from "@/convex/_generated/api";
import BlogClient from "@/components/blog/BlogClinet";


export const revalidate = 60; 

export default async function BlogPage() {
  const initialPage = await fetchQuery(api.blogPost.listPaginated, {
    search: undefined,
    paginationOpts: {
      numItems: 9,
      cursor: null,
    },
  });



  return <BlogClient initialPage={initialPage} />;
}
