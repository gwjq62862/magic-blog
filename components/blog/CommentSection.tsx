"use client";
import React from "react";
import CreateComment from "./CreateComment";
import { Id } from "@/convex/_generated/dataModel";
import { usePaginatedQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { int } from "better-auth";
import Pagination from "./Pagination";

const CommentSection = ({ blogId }: { blogId: Id<"blogs"> }) => {
  const {
    loadMore,
    status,
    results: comments,
  } = usePaginatedQuery(
    api.comment.getCommentByPostId,
    { blogId },
    { initialNumItems: 5 }
  );
  return (
    <>
      <div className="space-y-4 mt-6">
        {comments.map((comment) => (
          <div
            key={comment._id}
            className="max-w-2xl mx-auto rounded-xl border border-[#2a253d] bg-[#0f0e13]/90 px-4 py-4 shadow-md"
          >
            {/* Header */}
            <div className="flex items-center mb-3">
              <div className="mr-3 h-10 w-10 rounded-full bg-[#2a253d] flex items-center justify-center text-xs text-[#a19db9]">
                MM
              </div>
              <div>
                <p className="text-sm font-medium text-white">User</p>
                <p className="text-xs text-[#7b7694]">
                  {new Date(comment.createdAt).toLocaleString()}
                </p>
              </div>
            </div>

            {/* Body */}
            <p className="text-sm text-[#d2cfec] font-myanmar">
              {comment.text}
            </p>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <Pagination
        canLoadMore={status === "CanLoadMore"}
        loading={status === "LoadingMore"}
        onNext={() => loadMore(5)}
      />

      <CreateComment blogId={blogId} />
    </>
  );
};

export default CommentSection;
