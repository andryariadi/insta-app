import prisma from "@/libs/client";
import { auth } from "@clerk/nextjs/server";
import Link from "next/link";
import FriendRequestLists from "./FriendRequestLists";

const FriendRequests = async () => {
  const { userId: clerkId } = auth();

  if (!clerkId) return null;

  const user = await prisma.user.findUnique({
    where: {
      clerkId,
    },
  });

  const requests = await prisma.followRequest.findMany({
    where: {
      receiverId: user?.id,
    },
    include: {
      sender: true,
    },
  });

  // if (requests.length === 0) return null;

  console.log(requests, "<----difriendrequest");

  return (
    <>
      <div className="bg-n-1/60 backdrop-blur p-2 rounded-lg shadow-sm text-sm flex flex-col gap-4">
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
