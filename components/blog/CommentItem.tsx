import { useState, useEffect } from "react";
import CreateComment from "./CreateComment";
import ReplyList from "./ReplyList";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Heart } from "lucide-react";
import Image from "next/image";
function timeAgo(timestamp: number) {
  const diffMs = Date.now() - timestamp;
  const diffSec = Math.floor(diffMs / 1000);
  const diffMin = Math.floor(diffSec / 60);
  const diffHr = Math.floor(diffMin / 60);
  const diffDay = Math.floor(diffHr / 24);

  if (diffSec < 60) return "Just now";
  if (diffMin < 60) return `${diffMin} min ago`;
  if (diffHr < 24) return `${diffHr} hour${diffHr > 1 ? "s" : ""} ago`;
  return `${diffDay} day${diffDay > 1 ? "s" : ""} ago`;
}
const CommentItem = ({ comment }: any) => {
  const [showReply, setShowReply] = useState(false);
  const [liked, setLiked] = useState<boolean>(comment.likedByMe ?? false);
  const likeComment = useMutation(api.comment.likeComment);

  const [likesCount, setLikesCount] = useState<number>(comment.likesCount ?? 0);

  useEffect(() => {
    setLiked(comment.likedByMe ?? false);
    setLikesCount(comment.likesCount ?? 0);
  }, [comment.likedByMe, comment.likesCount]);

  const handleLike = async () => {
    try {
      const res = await likeComment({ commentId: comment._id });
      if (res?.liked) {
        setLiked(true);
        setLikesCount((c) => c + 1);
      } else {
        setLiked(false);
        setLikesCount((c) => Math.max(c - 1, 0));
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
   <div className="max-w-2xl mx-auto rounded-xl border border-[#2a253d] bg-[#0f0e13]/90 px-4 py-4">
      {/* Header: avatar + name + time */}
      <div className="mb-3 flex items-center">
        <div className="mr-3 h-9 w-9 overflow-hidden rounded-full bg-[#2a253d] flex items-center justify-center text-xs text-[#a19db9]">
          {comment.author?.profileImage ? (
            <Image
              src={comment.author.profileImage}
              alt={comment.author.name ?? "User avatar"}
              width={36}
              height={36}
              className="h-9 w-9 rounded-full object-cover"
            />
          ) : (
            <span>
              {(comment.author?.name ?? "U")
                .trim()
                .charAt(0)
                .toUpperCase()}
            </span>
          )}
        </div>

        <div className="flex flex-col">
          <span className="text-sm font-medium text-white">
            {comment.author?.name ?? "Anonymous"}
          </span>
          <span className="text-[11px] text-[#7b7694]">
            {timeAgo(comment.createdAt)}
          </span>
        </div>
      </div>

      {/* Text */}
      <p className="text-sm text-[#d2cfec]">{comment.text}</p>

      {/* Actions */}
      <div className="mt-3 flex gap-4 text-xs text-[#a19db9]">
        <button onClick={handleLike} className="flex items-center gap-1">
          <Heart
            className={
              liked
                ? "text-red-500 fill-red-600"
                : "text-[#a19db9]"
            }
          />
          <span>{likesCount}</span>
        </button>

        <button onClick={() => setShowReply((v) => !v)}>Reply</button>
      </div>

      {showReply && (
        <CreateComment
          blogId={comment.blogId}
          parentCommentId={comment._id}
          onDone={() => setShowReply(false)}
        />
      )}

      <ReplyList parentId={comment._id} />
    </div>
  );
};

export default CommentItem;
