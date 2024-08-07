import prisma from "@/libs/client";
import { User } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";

const UserMediaCard = async ({ user }: { user: User }) => {
  const postInMedia = await prisma.post.findMany({
    where: {
      clerkId: user.clerkId,
      img: {
        not: null,
      },
    },
    take: 8,
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="bg-n-1/60 dark:bg-n-7 border dark:border-n-1/10 backdrop-blur p-2 rounded-lg shadow-sm text-sm flex flex-col gap-4">
      {/* Title */}
      <div className="bg-ros-500 flex items-center justify-between font-medium">
        <span className="text-gray-500">User Media</span>
        <Link href="/" className="text-sky-500 text-xs">
          See All
        </Link>
      </div>

      {/* Media */}
      <div className="bg-ambr-500 flex items-center justify-center flex-wrap gap-4">
        {postInMedia.length
          ? postInMedia.map((post) => (
              <div key={post.id} className="relative w-1/5 h-20">
                <Image src={post.img!} alt="User" fill className="rounded-lg object-cover" />
              </div>
            ))
          : "No media found!"}
      </div>
    </div>
  );
};

export default UserMediaCard;
