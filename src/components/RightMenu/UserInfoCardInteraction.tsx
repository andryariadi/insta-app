"use client";

import { switchBlock, switchFollow } from "@/libs/action";
import { useOptimistic, useState } from "react";
import { MdBlock } from "react-icons/md";

type UserProps = {
  userId: string;
  isUserBlocked: boolean;
  isFollowing: boolean;
  isFollowingSent: boolean;
};

const UserInfoCardInteraction = ({ userId, isUserBlocked, isFollowing, isFollowingSent }: UserProps) => {
  const [userState, setUserState] = useState({
    following: isFollowing, //nilai awal false
    blocked: isUserBlocked, //nilai awal false
    followingRequestSent: isFollowingSent, //nilai awal false
  });

  const follow = async () => {
    switchOptimisticState("follow");
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

  const block = async () => {
    switchOptimisticState("block");
    try {
      await switchBlock(userId);
      setUserState((prev) => ({
        ...prev,
        blocked: !prev.blocked,
      }));
    } catch (error) {
      console.log(error);
    }
  };

  const [optimisticState, switchOptimisticState] = useOptimistic(userState, (state, value: "follow" | "block") =>
    value === "follow"
      ? {
          ...state,
          following: state.following && false,
          followingRequestSent: state.following ? false : state.followingRequestSent,
        }
      : {
          ...state,
          blocked: !state.blocked,
        }
  );

  return (
    <>
      <form action={follow}>
        <button className="bg-sky-500 w-full text-white text-xs p-2 rounded-md">{optimisticState.following ? "Following" : optimisticState.followingRequestSent ? "Friend Request Sent" : "Follow"}</button>
      </form>

      <form action={block} className="self-end">
        <button className="flex items-center gap-1 text-rose-500 text-xs cursor-pointer">
          {optimisticState.blocked ? <MdBlock /> : null}
          <span>{optimisticState.blocked ? "Unblock User" : "Block User"}</span>
        </button>
      </form>
    </>
  );
};

export default UserInfoCardInteraction;
