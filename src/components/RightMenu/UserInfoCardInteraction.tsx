"use client";

import { switchFollow } from "@/libs/action";
import { useState } from "react";
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

  return (
    <>
      <form action={follow}>
        <button className="bg-sky-500 w-full text-white text-xs p-2 rounded-md">{userState.following ? "Following" : userState.followingRequestSent ? "Friend Request Sent" : "Follow"}</button>
      </form>

      <form action="" className="self-end">
        <div className="flex items-center gap-1 text-rose-500 text-xs cursor-pointer">
          <MdBlock size={18} />
          <span>{userState.blocked ? "Unblock User" : "Block User"}</span>
        </div>
      </form>
    </>
  );
};

export default UserInfoCardInteraction;
