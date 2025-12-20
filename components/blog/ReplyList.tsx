import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react";
import CommentItem from "./CommentItem";

type ReplyListProps = {
  parentId: Id<"comments">;
  depth?: number;
};

const ReplyList = ({ parentId, depth = 1 }: ReplyListProps) => {
  const replies = useQuery(api.comment.getReplies, {
    parentCommentId: parentId,
  });

  if (!replies?.length) return null;

  return (
    <div className="mt-4 space-y-3">
      {replies.map((reply) => (
        <CommentItem key={reply._id} comment={reply} depth={depth} />
      ))}
    </div>
  );
};

export default ReplyList;
