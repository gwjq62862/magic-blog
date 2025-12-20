"use client";

import React, { useState, ChangeEvent } from "react";
import { useForm, Controller } from "react-hook-form";
import { SimpleEditor } from "@/components/tiptap-templates/simple/simple-editor";
import Button from "@/components/ui/Button";
import Image from "next/image";
import { X } from "lucide-react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { showToast } from "nextjs-toast-notify";
import { useRouter } from "next/navigation";

type BlogFormValues = {
  title: string;
  description: string; // HTML from Tiptap
};

const CreateBlog = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    control,
    formState: { isSubmitting },
    reset,
  } = useForm<BlogFormValues>({
    defaultValues: {
      title: "",
      description: "",
    },
  });

  const [coverFile, setCoverFile] = useState<File | null>(null);
  const [coverPreview, setCoverPreview] = useState<string | null>(null);

  const generateCoverUploadUrl = useMutation(
    api.blogPost.generateCoverUploadUrl
  );
  const createBlogPost = useMutation(api.blogPost.createBlogPost);

  const handleCoverChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) {
      setCoverFile(null);
      setCoverPreview(null);
      return;
    }
    setCoverFile(file);
    const url = URL.createObjectURL(file);
    setCoverPreview(url);
  };

  const onSubmit = async (data: BlogFormValues) => {
    try {
      let coverImageStorageId;

      if (coverFile) {
   
        const postUrl = await generateCoverUploadUrl();

   
        const uploadRes = await fetch(postUrl, {
          method: "POST",
          headers: { "Content-Type": coverFile.type },
          body: coverFile,
        });

        if (!uploadRes.ok) {
          throw new Error("Cover image upload failed");
        }

        //read storageId from response
        const { storageId } = await uploadRes.json();
        coverImageStorageId = storageId as Id<"_storage">;
      }

      //create blog post in Convex
      await createBlogPost({
        title: data.title,
        description: data.description,
        coverImageStorageId,
      });
      showToast.success("blog created successfully!");
     
      reset();
      setCoverFile(null);
      setCoverPreview(null);
       router.push("/blog");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      {/* heading */}
      <div className="w-full flex flex-col items-center justify-center mb-6">
        <h2 className="text-4xl font-semibold tracking-tight text-pretty text-white sm:text-5xl">
          Create New Blog
        </h2>
        <p className="mt-2 text-lg/8 text-gray-300">
          Share Your toughts about phycology
        </p>
      </div>

      <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
        {/* Title Input */}
        <div className="flex flex-col gap-2 mb-3">
          <label className="text-sm text-gray-300">Title</label>
          <input
            type="text"
            placeholder="Enter blog title"
            className="w-full rounded-lg bg-white/10 border border-white/20 px-4 py-3 text-white outline-none focus:border-white/40"
            {...register("title", { required: true })}
          />
        </div>

        {/* Cover Image with preview */}
        <div className="flex flex-col gap-2 mt-4">
          <label className="text-sm text-gray-300">Cover Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleCoverChange}
            className="w-full text-sm text-gray-300
              file:mr-4 file:rounded-full file:border-0
              file:bg-(--color-primary) file:px-4 file:py-2
              file:text-white file:font-semibold
              hover:file:bg-(--color-primary)/90"
          />
          {coverPreview && (
            <div className="relative w-full max-h-64 aspect-video rounded-lg overflow-hidden border border-white/20">
              <Image
                src={coverPreview}
                alt="Cover preview"
                fill
                className="object-cover"
              />
              <button
                type="button"
                onClick={() => {
                  setCoverFile(null);
                  setCoverPreview(null);
                }}
              >
                <span className="bg-red-500 size-5 rounded-full absolute top-2 right-2 cursor-pointer ">
                  <X className="size-full text-white " />
                </span>
              </button>
            </div>
          )}
        </div>

        {/* Description using Tiptap */}
        <div className="flex flex-col gap-2 flex-1 mt-4">
          <label className="text-sm text-gray-300">Description</label>
          <Controller
            name="description"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <SimpleEditor
                initialContent={field.value || undefined}
                onChange={(value: string) => field.onChange(value)}
              />
            )}
          />
        </div>

        {/* Submit Button */}
        <div className="flex justify-center w-full mt-4">
          <Button
            className="w-full"
            size="lg"
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Publishing..." : "Publish Blog"}
          </Button>
        </div>
      </form>
    </>
  );
};

export default CreateBlog;
