import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react";

const ReplyList = ({ parentId }: { parentId: Id<"comments"> }) => {
  const replies = useQuery(api.comment.getReplies, {
    parentCommentId: parentId,
  });

  if (!replies?.length) return null;

  return (
    <div className="mt-4 ml-6 space-y-3 border-l border-white/10 pl-4">
      {replies.map(reply => (
        <div key={reply._id}>
          <p className="text-sm text-[#d2cfec]">{reply.text}</p>
        </div>
      ))}
    </div>
  );
};
export default ReplyList;