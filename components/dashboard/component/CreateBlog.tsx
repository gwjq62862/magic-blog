"use client";

import React, { useState, ChangeEvent } from "react";
import { SimpleEditor } from "@/components/tiptap-templates/simple/simple-editor";
import Button from "@/components/ui/Button";
import Image from "next/image";
import { X } from "lucide-react";

const CreateBlog = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState<string>("");
  const [coverFile, setCoverFile] = useState<File | null>(null);
  const [coverPreview, setCoverPreview] = useState<string | null>(null);

  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

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

  const handlePublish = () => {
    console.log({
      title,
      description, // rich text HTML from Tiptap
      coverFile,
    });
    // TODO: send to your API / Convex / DB
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

      {/* Title Input */}
      <div className="flex flex-col gap-2 mb-3">
        <label className="text-sm text-gray-300">Title</label>
        <input
          type="text"
          value={title}
          onChange={handleTitleChange}
          placeholder="Enter blog title"
          className="w-full rounded-lg bg-white/10 border border-white/20 px-4 py-3 text-white outline-none focus:border-white/40"
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
              fill // Image will fill the parent container
              className="object-cover" // Ensures the image covers the area without stretching
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
        <SimpleEditor
          initialContent={description || undefined}
          onChange={(value: string) => {
            setDescription(value);
          }}
        />
      </div>

      {/* Submit Button */}
      <div className="flex justify-center w-full mt-4">
        <Button className="w-full " size="lg" onClick={handlePublish}>
          Publish Blog
        </Button>
      </div>
    </>
  );
};

export default CreateBlog;
