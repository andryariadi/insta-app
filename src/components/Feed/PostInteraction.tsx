"use client";

import { switchLikePost } from "@/libs/action";
import { useAuth } from "@clerk/nextjs";
import Image from "next/image";
import { useOptimistic, useState } from "react";

const PostInteraction = ({ postId, likes, commentNumber }: { postId: string; likes: string[]; commentNumber: number }) => {
  const { isLoaded, userId: clerkId } = useAuth();

  const [likeState, setLikeState] = useState({
    likeCount: likes.length,
    isLiked: clerkId ? likes.includes(clerkId) : false,
  });

  const [optimisticLike, switchOptimisticLike] = useOptimistic(likeState, (state, value) => {
    return {
      likeCount: state.isLiked ? state.likeCount - 1 : state.likeCount + 1,
      isLiked: !state.isLiked,
    };
  });

  const likeAction = async () => {
    switchOptimisticLike("");

    try {
      switchLikePost(postId);
      setLikeState((state) => ({
        likeCount: state.isLiked ? state.likeCount - 1 : state.likeCount + 1,
        isLiked: !state.isLiked,
      }));
    } catch (error) {
      console.log(error);
    }
  };
  // console.log(optimisticLike, "<---dipostinteraction");

  return (
    <div className="bg-ros-500 flex items-center justify-between my-4 text-sm">
      <div className="flex items-center gap-8">
        <div className="bg-slate-50 p-2 rounded-xl flex items-center gap-2">
          <form action={likeAction}>
            <button>
              <Image src={optimisticLike.isLiked ? "/liked.png" : "/like.png"} alt="Like" width={16} height={16} className="cursor-pointer" />
            </button>
          </form>
          <span className="text-gray-300">|</span>
          <span className="text-gray-500">
            {likeState.likeCount}
            <span className="hidden md:inline ml-1">Likes</span>
          </span>
        </div>
        <div className="bg-slate-50 p-2 rounded-xl flex items-center gap-2">
          <Image src="/comment.png" alt="Comment" width={16} height={16} className="cursor-pointer" />
          <span className="text-gray-300">|</span>
          <span className="text-gray-500">
            {commentNumber}
            <span className="hidden md:inline ml-1">Comments</span>
          </span>
        </div>
      </div>
      <div>
        <div className="bg-slate-50 p-2 rounded-xl flex items-center gap-2">
          <Image src="/share.png" alt="Share" width={16} height={16} className="cursor-pointer" />
          <span className="text-gray-300">|</span>
          <span className="text-gray-500">
            <span className="hidden md:inline ml-1">Share</span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default PostInteraction;
