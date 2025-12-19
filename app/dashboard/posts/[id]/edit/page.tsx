// app/blog/[id]/edit/page.tsx
import EditBlogForm from "@/components/dashboard/component/EditBlogForm";
import { Id } from "@/convex/_generated/dataModel";


export default async function Page({
  params,
}: {
  params: Promise<{ id: Id<"blogs"> }>;
}) {
  const { id } = await params;

  return <EditBlogForm blogId={id} />;
}
