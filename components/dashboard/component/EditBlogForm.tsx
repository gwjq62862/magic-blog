"use client";

import React, { useEffect, useState, ChangeEvent } from "react";
import { useForm, Controller } from "react-hook-form";
import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import Image from "next/image";
import { X } from "lucide-react";
import { useRouter } from "next/navigation";
import Button from "@/components/ui/Button";
import { SimpleEditor } from "@/components/tiptap-templates/simple/simple-editor";
import { showToast } from "nextjs-toast-notify";

type BlogFormValues = {
  title: string;
  description: string;
};

export default function EditBlogForm({
  blogId,
}: {
  blogId: Id<"blogs">;
}) {
  const router = useRouter();

  const blog = useQuery(api.blogPost.getById, {
    id: blogId,
  });

  const generateCoverUploadUrl = useMutation(
    api.blogPost.generateCoverUploadUrl
  );
  const updateBlogPost = useMutation(api.blogPost.updateBlogPost);

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { isSubmitting },
  } = useForm<BlogFormValues>({
    defaultValues: {
      title: "",
      description: "",
    },
  });

  const [coverFile, setCoverFile] = useState<File | null>(null);
  const [coverPreview, setCoverPreview] = useState<string | null>(null);
  const [existingCoverId, setExistingCoverId] =
    useState<Id<"_storage"> | null>(null);

  // Populate form when blog loads
  useEffect(() => {
    if (!blog) return;

    reset({
      title: blog.title,
      description: blog.description,
    });

    setCoverPreview(blog.imageUrl ?? null);
    setExistingCoverId(
      (blog.coverImageStorageId as Id<"_storage"> | undefined) ?? null
    );
  }, [blog, reset]);

  const handleCoverChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setCoverFile(file);
    setCoverPreview(URL.createObjectURL(file));
  };

  const onSubmit = async (data: BlogFormValues) => {
    if (!blog) return;

    try {
      let coverImageStorageId = existingCoverId ?? undefined;

      if (coverFile) {
        const uploadUrl = await generateCoverUploadUrl();

        const res = await fetch(uploadUrl, {
          method: "POST",
          headers: { "Content-Type": coverFile.type },
          body: coverFile,
        });

        if (!res.ok) {
          throw new Error("Upload failed");
        }

        const { storageId } = await res.json();
        coverImageStorageId = storageId;
      }

      await updateBlogPost({
        id: blogId,
        title: data.title,
        description: data.description,
        coverImageStorageId,
      });

      showToast.success("Blog updated!");
      router.push("/dashboard");
    } catch (err) {
      console.error(err);
      showToast.error("Failed to update blog");
    }
  };

  if (!blog) {
    return <p className="text-gray-400">Loading...</p>;
  }

  return (
    <>
      <div className="text-center mb-6">
        <h1 className="text-4xl font-semibold text-white">Edit Blog</h1>
        <p className="text-gray-400 mt-2">
          Update your article content
        </p>
      </div>

      <form
        className="flex flex-col gap-4 max-w-3xl mx-auto"
        onSubmit={handleSubmit(onSubmit)}
      >
        {/* Title */}
        <div>
          <label className="text-sm text-gray-300">Title</label>
          <input
            {...register("title", { required: true })}
            className="w-full rounded-lg bg-white/10 border px-4 py-3 text-white"
          />
        </div>

        {/* Cover */}
        <div>
          <label className="text-sm text-gray-300">Cover Image</label>
          <input type="file" onChange={handleCoverChange} />
        </div>

        {coverPreview && (
          <div className="relative h-56 rounded-lg overflow-hidden">
            <Image
              src={coverPreview}
              alt="Cover"
              fill
              className="object-cover"
            />
            <button
              type="button"
              onClick={() => {
                setCoverFile(null);
                setCoverPreview(null);
                setExistingCoverId(null);
              }}
              className="absolute top-2 right-2 bg-red-500 p-1 rounded-full"
            >
              <X className="text-white" />
            </button>
          </div>
        )}

        {/* Description */}
        <Controller
          name="description"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <SimpleEditor
              initialContent={field.value}
              onChange={field.onChange}
            />
          )}
        />

        {/* Submit */}
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Saving..." : "Save Changes"}
        </Button>
      </form>
    </>
  );
}
