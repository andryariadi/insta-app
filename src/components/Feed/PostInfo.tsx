"use client";

import { deletePost } from "@/libs/action";
import { useState } from "react";
import { useFormStatus } from "react-dom";
import { BsThreeDots } from "react-icons/bs";
import { LoaderBtn } from "../Loading";
import { AiFillDelete } from "react-icons/ai";

const PostInfo = ({ postId }: { postId: string }) => {
  const [open, setOpen] = useState(false);
  const { pending } = useFormStatus();

  const handleDelete = deletePost.bind(null, postId);

  return (
    <div className="relative">
      <BsThreeDots size={24} className="text-gray-400 cursor-pointer" onClick={() => setOpen(!open)} />

      {open && (
        <div className="bg-white absolute right-0 top-5 z-40 p-4 rounded-lg shadow-lg flex flex-col items-center justify-center gap-2">
          <form action={handleDelete} className="flex items-center justify-center">
            <button>{pending ? <LoaderBtn /> : <AiFillDelete size={22} className="cursor-pointer text-red-500" />}</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default PostInfo;
