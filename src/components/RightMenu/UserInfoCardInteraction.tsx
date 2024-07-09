"use client";

import { switchFollow } from "@/libs/action";
import { useOptimistic, useState } from "react";
import { MdBlock } from "react-icons/md";

type UserProps = {
  userId: string;
  clerkId: string | null;
  isUserBlocked: boolean;
  isFollowing: boolean;
  isFollowingSent: boolean;
};

const UserInfoCardInteraction = ({ userId, clerkId, isUserBlocked, isFollowing, isFollowingSent }: UserProps) => {
  const [userState, setUserState] = useState({
    following: isFollowing,
    blocked: isUserBlocked,
    followingRequestSent: isFollowingSent,
  });

  const follow = async () => {
    switchOptimisticFollow("");
    try {
      await switchFollow(userId);
      setUserState((prev) => ({
        ...prev,
        following: prev.following && false,
        followingRequestSent: !prev.following && !prev.followingRequestSent ? true : false,
      }));
    } catch (error) {
      console.log(error);
    }
  };

  const [optimisticFollow, switchOptimisticFollow] = useOptimistic(userState, (state) => ({
    ...state,
    following: state.following && false,
    followingRequestSent: state.following ? false : state.followingRequestSent,
  }));

  return (
    <>
      <form action={follow}>
        <button className="bg-sky-500 w-full text-white text-xs p-2 rounded-md">{optimisticFollow.following ? "Following" : optimisticFollow.followingRequestSent ? "Friend Request Sent" : "Follow"}</button>
      </form>

      <form action="" className="self-end">
        <div className="flex items-center gap-1 text-rose-500 text-xs cursor-pointer">
          <MdBlock size={18} />
          <span>{optimisticFollow.blocked ? "Unblock User" : "Block User"}</span>
        </div>
      </form>
    </>
  );
};

export default UserInfoCardInteraction;
