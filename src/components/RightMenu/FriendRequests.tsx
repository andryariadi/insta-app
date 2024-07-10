import prisma from "@/libs/client";
import { auth } from "@clerk/nextjs/server";
import Image from "next/image";
import Link from "next/link";
import FriendRequestLists from "./FriendRequestLists";

const FriendRequests = async () => {
  const { userId: clerkId } = auth();

  if (!clerkId) return null;

  const requests = await prisma.followRequest.findMany({
    where: {
      receiverId: clerkId,
    },
    include: {
      sender: true,
    },
  });

  if (requests.length === 0) return null;

  return (
    <>
      <div className="bg-n-1/60 backdrop-blur sticky top-28 h-max z-10 p-2 rounded-lg shadow-sm text-sm flex flex-col gap-4">
        {/* Title */}
        <div className="bg-ros-500 flex items-center justify-between font-medium">
          <span className="text-gray-500">Friend Requests</span>
          <Link href="/" className="text-sky-500 text-xs">
            See All
          </Link>
        </div>

        {/* User */}
        <FriendRequestLists requests={requests} />
      </div>
    </>
  );
};

export default FriendRequests;
