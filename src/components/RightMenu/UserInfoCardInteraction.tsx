"use client";

import { MdBlock } from "react-icons/md";

type UserProps = {
  userId: string;
  clerkId: string | null;
  isUserBlocked: boolean;
  isFollowing: boolean;
  isFollowingSent: boolean;
};

const UserInfoCardInteraction = ({ userId, clerkId, isUserBlocked, isFollowing, isFollowingSent }: UserProps) => {
  return (
    <>
      <button className="bg-sky-500 text-white text-xs p-2 rounded-md">{isFollowing ? "Following" : isFollowingSent ? "Friend Request Sent" : "Follow"}</button>
      <div className="flex items-center gap-1 self-end text-rose-500 text-xs cursor-pointer">
        <MdBlock size={18} />
        <span>{isUserBlocked ? "Unblock User" : "Block User"}</span>
      </div>
    </>
  );
};

export default UserInfoCardInteraction;
