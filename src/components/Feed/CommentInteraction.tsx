"use client";

import { switchLikeComment } from "@/libs/action";
import { useAuth } from "@clerk/nextjs";
import { Comment, User } from "@prisma/client";
import { log } from "console";
import Image from "next/image";
import { useOptimistic, useState } from "react";

// type CommentProps = Comment & { user: User };

const CommentInteraction = ({ commentId, likes }: { commentId: string; likes: string[] }) => {
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

  const likeAction = async (commentId: string) => {
    switchOptimisticLike("");

    try {
      switchLikeComment(commentId);
      setLikeState((state) => ({
        likeCount: state.isLiked ? state.likeCount - 1 : state.likeCount + 1,
        isLiked: !state.isLiked,
      }));
    } catch (error) {
      console.log();
    }
  };

  return (
    <div className="flex items-center gap-5 text-xs text-gray-500 mt-2">
      <div className="bg-slate-50 dark:bg-n-8 border dark:border-n-1/10 p-2 rounded-xl flex items-center gap-2">
        <form action={() => likeAction(commentId)}>
          <button>
            <Image src={optimisticLike.isLiked ? "/liked.png" : "/like.png"} alt="Like" width={16} height={16} className="cursor-pointer" />
          </button>
        </form>
        <span className="text-gray-300">|</span>
        <span className="text-gray-500">
          {likeState.likeCount} <span className="hidden md:inline ml-1">Likes</span>
        </span>
      </div>
      <div>Reply</div>
    </div>
  );
};

export default CommentInteraction;
