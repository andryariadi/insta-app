import prisma from "@/libs/client";
import { auth } from "@clerk/nextjs/server";
import { User } from "@prisma/client";
import Link from "next/link";
import { FaLink, FaRegCalendarAlt } from "react-icons/fa";
import { IoSchoolSharp } from "react-icons/io5";
import { MdLocationPin, MdWork } from "react-icons/md";
import UserInfoCardInteraction from "./UserInfoCardInteraction";
import UpdateUser from "./UpdateUser";

const UserInfoCard = async ({ user }: { user: User }) => {
  const createdAt = new Date(user.createdAt);

  const formattedDate = createdAt.toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  let isUserBlocked = false;
  let isFollowing = false;
  let isFollowingSent = false;

  const { userId: clerkId } = auth();

  if (clerkId) {
    const blockRes = await prisma.block.findFirst({
      where: {
        blockerId: clerkId,
        blockedId: user.clerkId,
      },
    });
    blockRes ? (isUserBlocked = true) : (isUserBlocked = false);

    const followRes = await prisma.follower.findFirst({
      where: {
        followerId: clerkId,
        followingId: user.clerkId,
      },
    });
    followRes ? (isFollowing = true) : (isFollowing = false);

    const followReqRes = await prisma.followRequest.findFirst({
      where: {
        senderId: clerkId,
        receiverId: user.clerkId,
      },
    });
    followReqRes ? (isFollowingSent = true) : (isFollowingSent = false);
  }

  return (
    <div className="bg-n-1/60 dark:bg-n-7/90 border dark:border-n-1/10 backdrop-blur sticky top-28 h-max z-10 p-2 rounded-lg shadow-sm text-sm flex flex-col gap-4">
      {/* Title */}
      <div className="bg-ros-500 flex items-center justify-between font-medium">
        <span className="text-gray-500">User Information</span>
        {clerkId === user.clerkId ? (
          <UpdateUser user={user} />
        ) : (
          <Link href="/" className="text-sky-500 text-xs">
            See All
          </Link>
        )}
      </div>

      {/* Information */}
      <div className="bg-violt-500 flex flex-col gap-4 text-gray-500">
        <div className="flex items-center justify-center flex-wrap gap-1">
          <span className="text-base text-n-7 dark:text-white">{user.name && user.surname ? `${user.name} ${user.surname}` : user.username}</span>
          <span className="text-xs">@{user.username}</span>
        </div>
        {user.description && <p>{user.description}</p>}
        <div className="bg-ambr-500 flex flex-col gap-4 text-xs">
          {user.city && (
            <div className="flex items-center gap-2 cursor-pointer">
              <MdLocationPin size={18} />
              <span>
                Living in <strong>{user.city}</strong>
              </span>
            </div>
          )}
          {user.school && (
            <div className="flex items-center gap-2 cursor-pointer">
              <IoSchoolSharp size={18} />
              <span>
                Went to <strong>{user.school}</strong>
              </span>
            </div>
          )}
          {user.work && (
            <div className="flex items-center gap-2 cursor-pointer">
              <MdWork size={18} />
              <span>
                Work at <strong>{user.work}</strong>
              </span>
            </div>
          )}
        </div>
        <div className="flex items-center justify-between">
          {user.website && (
            <Link href={user.website} className="flex items-center gap-1 cursor-pointer">
              <FaLink size={16} />
              <span className="text-sky-500 font-medium">{user.website}</span>
            </Link>
          )}
          <div className="flex items-center gap-1 cursor-pointer">
            <FaRegCalendarAlt size={16} />
            <span>Joined {formattedDate}</span>
          </div>
        </div>
        {clerkId && clerkId !== user.clerkId && <UserInfoCardInteraction userId={user.id} isUserBlocked={isUserBlocked} isFollowing={isFollowing} isFollowingSent={isFollowingSent} />}
      </div>
    </div>
  );
};

export default UserInfoCard;
