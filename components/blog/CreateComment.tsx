"use client";

import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useMutation } from "convex/react";
import { useForm } from "react-hook-form";

type Props = {
  blogId: Id<"blogs">;
  parentCommentId?: Id<"comments">;
  onDone?: () => void;
};

type FormData = {
  text: string;
};

const CreateComment = ({ blogId, parentCommentId, onDone }: Props) => {
  const { register, handleSubmit, reset } = useForm<FormData>();
  const createComment = useMutation(api.comment.createComment);

  const onSubmit = async (data: FormData) => {
    if (!data.text.trim()) return;

    await createComment({
      blogId,
      text: data.text.trim(),
      parentCommentId,
    });

    reset();
    onDone?.();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mt-3 space-y-2">
      <textarea
        {...register("text", { required: true })}
        placeholder={parentCommentId ? "Write a reply..." : "Write a comment..."}
        className="w-full min-h-20 rounded-lg border border-zinc-700 bg-[#0f0e13] px-3 py-2 text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />
      <div className="flex justify-end gap-2">
        {onDone && (
          <button
            type="button"
            onClick={onDone}
            className="text-xs text-gray-400 hover:text-gray-300"
          >
            Cancel
          </button>
        )}
        <button
          type="submit"
          className="rounded-md bg-indigo-500 px-3 py-1 text-xs font-medium text-white hover:bg-indigo-400"
        >
          {parentCommentId ? "Reply" : "Comment"}
        </button>
      </div>
    </form>
  );
};

export default CreateComment;