import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useMutation } from "convex/react";
import React from "react";
import { useForm } from "react-hook-form";

interface FormData {
  text: string;
}
const CreateComment = ({ blogId }: { blogId: Id<"blogs"> }) => {
  const { register, handleSubmit, reset } = useForm<FormData>();
  const [isLoading, setisLoading] = React.useState(false);
  const createComment = useMutation(api.comment.createComment);
  const onSubmit = async (formData: FormData) => {
    setisLoading(true);
    try {
      await createComment({ blogId, text: formData.text });
      reset();
    } catch (error) {
      console.error("Failed to create comment:", error);
    } finally {
      setisLoading(false);
    }
  };
  return (
    <div className="relative max-w-2xl mx-auto mt-16 rounded-xl border border-[#2a253d] bg-[#0f0e13]/90 backdrop-blur-sm shadow-lg">
      {/* Label */}
      <div className="absolute -top-3 left-4 inline-flex items-center rounded-md bg-indigo-500/90 px-3 py-1">
        <h2 className="text-xs font-semibold tracking-wide text-white uppercase">
          Discussion
        </h2>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="px-4 pt-6 pb-4 sm:px-6 sm:pt-7 sm:pb-5"
      >
        <div className="mb-3">
          <label
            htmlFor="comment"
            className="mb-2 block text-xs font-medium uppercase tracking-wide text-[#a19db9]"
          >
            Add your comment
          </label>
          <textarea
            {...register("text", { required: true })}
            id="comment"
            placeholder="Share your thoughts about this post..."
            className="w-full h-28 rounded-lg border border-[#2a253d] bg-[#0f0e13] px-3 py-2 text-sm text-white font-myanmar
                   placeholder:text-[#5f5a78] focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500
                   scrollbar-thin scrollbar-track-transparent scrollbar-thumb-[#2f2a45]"
          />
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isLoading}
            className={`inline-flex items-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm font-medium text-white
    hover:bg-indigo-400 transition-colors duration-150 disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer`}
          >
            {isLoading && (
              <div className="w-5 h-5 border-4 border-white mr-2 border-t-transparent rounded-full animate-spin"></div>
            )}
            Comment
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateComment;
