import React from "react";
import Button from "@/components/ui/Button";
import CreateBlog from "@/components/dashboard/component/CreateBlog";
import Link from "next/link";
import { ArrowLeftSquare } from "lucide-react";

const CreateBlogPage = () => {
  return (
    <div className="relative w-full min-h-screen p-6 flex flex-col gap-6">
        <Link href={'/dashboard'}>
           <Button  size="sm" className="absolue left-4 top-2 ">
           <ArrowLeftSquare className="mr-1.5"/>  <span>
            Back
           </span>
        </Button>
        </Link>
        <div className="max-w-3xl mx-auto mt-8 ">
            <CreateBlog/>
        </div>
   
    </div>
  );
};

export default CreateBlogPage;
