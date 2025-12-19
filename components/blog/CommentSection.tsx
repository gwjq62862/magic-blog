"use client";

import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { usePaginatedQuery } from "convex/react";
import { useEffect, useRef } from "react";
import CreateComment from "./CreateComment";
import CommentItem from "./CommentItem";

const PAGE_SIZE = 5;

const CommentSection = ({ blogId }: { blogId: Id<"blogs"> }) => {
  const {
    results: comments,
    status,
    loadMore,
  } = usePaginatedQuery(
    api.comment.getCommentsWithAuthors,
    { blogId },
    { initialNumItems: PAGE_SIZE }
  );

  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!loadMoreRef.current) return;

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && status === "CanLoadMore") {
        loadMore(PAGE_SIZE);
      }
    });

    observer.observe(loadMoreRef.current);
    return () => observer.disconnect();
  }, [status, loadMore]);

  return (
    <div className="mt-8 space-y-4">
      {comments.map((comment) => (
        <CommentItem key={comment._id} comment={comment} />
      ))}

      {/* Infinite scroll trigger */}
      <div ref={loadMoreRef} className="h-10" />

      <CreateComment blogId={blogId} />
    </div>
  );
};

export default CommentSection;
