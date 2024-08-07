"use client";

import { addComment } from "@/libs/action";
import { useUser } from "@clerk/nextjs";
import { Comment, User } from "@prisma/client";
import Image from "next/image";
import { useOptimistic, useState } from "react";
import { BsEmojiWinkFill, BsThreeDots } from "react-icons/bs";
import CommentInteraction from "./CommentInteraction";

type CommentProps = Comment & { user: User } & { likes: { clerkId: string }[] };

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
      likes: [
        {
          clerkId: user.id,
        },
      ],
    });

    try {
      const createdComment = await addComment(desc, postId);
      setCommentState((prev) => [...prev, createdComment] as CommentProps[]);
    } catch (error) {
      console.log();
    }
  };

  const [optimisticComments, addOptimisticComment] = useOptimistic(commentState, (state, value: CommentProps) => [...state, value]);

  // console.log(commentState, "<----dicommentList");

  return (
    <>
      {/* Write Comment */}
      {user && (
        <div className="bg-ros-500 flex items-center gap-4">
          <Image src={user.imageUrl || "/noAvatar.png"} alt="Comment" width={24} height={24} className="w-6 h-6 rounded-full" />

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
          <Image src={comment.user.avatar || "/noAvatar.png"} alt="Comment" width={32} height={32} className="w-8 h-8 rounded-full bg-sky-600" />

          {/* Desc */}
          <div className="bg-ambr-500 flex flex-1 flex-col gap-2">
            <span className="font-medium text-sm">{comment.user.name && comment.user.surname ? `${comment.user.name} ${comment.user.surname}` : comment.user.username}</span>
            <p className="text-base">{comment.desc}</p>
            <CommentInteraction commentId={comment.id} likes={comment.likes.map((like) => like.clerkId)} />
          </div>

          {/* Icons */}
          <div className="bg-tal-500">
            <BsThreeDots size={16} className="text-gray-400 cursor-pointer" />
          </div>
        </div>
      ))}
    </>
  );
};

export default CommentLists;
