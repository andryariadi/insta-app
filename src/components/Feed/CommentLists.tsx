"use client";

import { addComment } from "@/libs/action";
import { useUser } from "@clerk/nextjs";
import { Comment, User } from "@prisma/client";
import Image from "next/image";
import { useOptimistic, useState } from "react";
import { BsEmojiWinkFill, BsThreeDots } from "react-icons/bs";

type CommentProps = Comment & { user: User };

const CommentLists = ({ comments, postId }: { comments: CommentProps[]; postId: string }) => {
  const { user } = useUser();
  const [commentState, setCommentState] = useState(comments);
  const [desc, setDesc] = useState("");

  const handleComment = async () => {
    if (!user || !desc) return;

    addOptimisticComment({
      id: Math.random().toString(),
      desc,
      createdAt: new Date(Date.now()),
      updatedAt: new Date(Date.now()),
      postId,
      clerkId: user.id,
      user: {
        id: user.id,
        clerkId: user.id,
        username: "Sending please wait...",
        avatar: user.imageUrl || "/noAvatar.png",
        cover: "",
        name: "",
        surname: "",
        description: "",
        city: "",
        school: "",
        work: "",
        website: "",
        createdAt: new Date(Date.now()),
      },
    });

    try {
      const createdComment = await addComment(desc, postId);
      setCommentState((prev) => [...prev, createdComment]);
    } catch (error) {
      console.log();
    }
  };

  const [optimisticComments, addOptimisticComment] = useOptimistic(commentState, (state, value: CommentProps) => [...state, value]);

  console.log({ commentState, desc, optimisticComments }, "<----dicommentList");

  return (
    <>
      {/* Write Comment */}
      {user && (
        <div className="bg-ros-500 flex items-center gap-4">
          <Image src={user.imageUrl || "/noAvatar.png"} alt="Comment" width={32} height={32} className="w-8 h-8 rounded-full" />

          <form action={handleComment} className="flex flex-1 items-center justify-between bg-slate-100 px-6 py-2 rounded-xl">
            <input type="text" name="desc" placeholder="Write a comment..." onChange={(e) => setDesc(e.target.value)} className="flex-1 bg-transparent rounded-sm border-none outline-none placeholder:text-sm" />
            <BsEmojiWinkFill size={16} className="text-amber-500 cursor-pointer" />
          </form>
        </div>
      )}

      {/* Comment */}
      {optimisticComments.map((comment) => (
        <div key={comment.id} className="bg-ros-500 flex justify-between gap-4 mt-5">
          {/* Avatar */}
          <Image src={comment.user.avatar || "/noAvatar.png"} alt="Comment" width={40} height={40} className="w-10 h-10 rounded-full" />

          {/* Desc */}
          <div className="bg-ambr-500 flex flex-col gap-2">
            <span className="font-medium">{comment.user.name && comment.user.surname ? `${comment.user.name} ${comment.user.surname}` : comment.user.username}</span>
            <p>{comment.desc}</p>
            <div className="flex items-center gap-5 text-xs text-gray-500 mt-2">
              <div className="bg-slate-50 p-2 rounded-xl flex items-center gap-2">
                <Image src="/like.png" alt="Like" width={16} height={16} className="cursor-pointer" />
                <span className="text-gray-300">|</span>
                <span className="text-gray-500">
                  0<span className="hidden md:inline ml-1">Likes</span>
                </span>
              </div>
              <div>Reply</div>
            </div>
          </div>

          {/* Icons */}
          <div className="">
            <BsThreeDots size={24} className="text-gray-400 cursor-pointer" />
          </div>
        </div>
      ))}
    </>
  );
};

export default CommentLists;
