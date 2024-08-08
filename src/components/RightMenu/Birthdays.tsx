import prisma from "@/libs/client";
import { auth } from "@clerk/nextjs/server";
import Image from "next/image";
import Link from "next/link";

const Birthdays = async () => {
  const { userId: clerkId } = auth();

  if (!clerkId) return;

  const followers = await prisma.follower.findMany();

  const selectedFollowers = followers.filter((f) => f.followerId !== clerkId);

  const follower = selectedFollowers.map((f) => f.followerId);

  // const ids = [clerkId, ...follower];

  // console.log({ followers, selectedFollowers, follower }, "<----difeed");

  const posts = await prisma.post.findMany({
    where: {
      clerkId: {
        in: follower,
      },
    },
    include: {
      user: true,
      likes: {
        select: {
          clerkId: true,
        },
      },
      _count: {
        select: {
          comments: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  // console.log(posts, "<----dibirth");

  return (
    <>
      <div className="bg-n-1/60 dark:bg-n-7 border dark:border-n-1/10 backdrop-blur p-2 rounded-lg shadow-sm text-sm flex flex-col gap-4">
        {/* Title */}
        <div className="bg-ros-500 flex items-center justify-between font-medium">
          <span className="text-gray-500">Birtdays</span>
        </div>

        {/* User */}
        <div className="bg-ambr-500 flex items-center justify-between">
          <div className="bg-sk-600 flex items-center gap-4">
            <Image src={posts[0].user.avatar || "/noAvatar.png"} alt="User" width={40} height={40} className="w-10 h-10 rounded-full object-cover" />
            <span className="font-semibold">{posts[0].user.username}</span>
          </div>
          <div className="bg-gren-600 flex items-center gap-3">
            <button className="bg-sky-500 text-white text-xs px-2 py-1 rounded-md">Celebrate</button>
          </div>
        </div>

        {/* Upcoming */}
        <div className="bg-slate-100 dark:bg-n-8 p-4 rounded-lg flex items-center gap-4">
          <Image src="/gift.png" alt="User" width={24} height={24} />
          <Link href="/" className="flex flex-col gap-1 text-xs">
            <span className="text-gray-700 dark:text-white font-semibold">Upcoming Birtdays</span>
            <span className="text-gray-500">See other 16 upcoming birtdays</span>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Birthdays;
