"use client";

import { useUser } from "@clerk/nextjs";
import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";
import { useState } from "react";
import { BsEmojiWinkFill } from "react-icons/bs";
import AddPostBtn from "./Feed/AddPostBtn";
import { addPost } from "@/libs/action";
import { Loading } from "./Loading";

const AddPost = () => {
  const { user, isLoaded } = useUser();
  const [desc, setDesc] = useState("");
  const [img, setImg] = useState<any>("");

  if (!isLoaded) return <Loading />;

  const handlePost = (formData: FormData) => {
    addPost(formData, img?.secure_url || "");
  };

  console.log(isLoaded, user, "<---diaddpost");

  return (
    <div className="bg-n-1/60 dark:bg-n-7 border dark:border-n-1/10 backdrop-blur p-4 rounded-lg shadow-sm flex justify-between gap-4 text-sm">
      {/* Avatar */}
      <div className="bg-ambr-500">
        <Image src={user?.imageUrl || "/noAvatar.png"} alt="Avatar" width={48} height={48} className="w-12 h-12 rounded-full object-cover" />
      </div>

      {/* Post */}
      <div className="bg-violt-500 flex-1">
        <form action={handlePost} className="bg-tal-500 flex gap-4 items-center">
          <textarea name="desc" placeholder="What's on your mind?" onChange={(e) => setDesc(e.target.value)} className="flex-1 bg-slate-100 dark:bg-n-8 border dark:border-n-1/10 p-2 rounded-lg focus:outline-none"></textarea>
          <div className="flex flex-col gap-2">
            <BsEmojiWinkFill size={18} className="text-amber-500 self-end cursor-pointer" />
            <AddPostBtn />
          </div>
        </form>

        {/* Post Options */}
        <div className="bg-sy-500 flex flex-wrap items-center justify-center md:justify-start gap-4 mt-4 text-gray-400">
          <CldUploadWidget
            uploadPreset="gramify"
            onSuccess={(result, { widget }) => {
              setImg(result.info);
              widget.close();
            }}
          >
            {({ open }) => {
              return (
                <div className="flex bg-ambr-500 items-center gap-2" onClick={() => open()}>
                  <Image src="/addImage.png" alt="Add Photo" width={20} height={20} className="w-5 h-5 cursor-pointer" />
                  <span>Photo</span>
                </div>
              );
            }}
          </CldUploadWidget>

          <div className="flex bg-ambr-500 items-center gap-2">
            <Image src="/addVideo.png" alt="Add Video" width={20} height={20} className="w-5 h-5 cursor-pointer" />
            <span>Video</span>
          </div>

          <div className="flex bg-ambr-500 items-center gap-2">
            <Image src="/poll.png" alt="Add Poll" width={20} height={20} className="w-5 h-5 cursor-pointer" />
            <span>Poll</span>
          </div>

          <div className="flex bg-ambr-500 items-center gap-2">
            <Image src="/addEvent.png" alt="Add Event" width={20} height={20} className="w-5 h-5 cursor-pointer" />
            <span>Event</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddPost;
