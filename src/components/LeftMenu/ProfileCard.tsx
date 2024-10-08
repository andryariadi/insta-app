import prisma from "@/libs/client";
import { auth } from "@clerk/nextjs/server";
import Image from "next/image";
import Link from "next/link";

const ProfileCard = async () => {
  const { userId: clerkId } = auth();

  if (!clerkId) return null;

  const user = await prisma.user.findFirst({
    where: { clerkId: clerkId },
    include: {
      _count: {
        select: {
          followers: true,
          followings: true,
        },
      },
    },
  });

  if (!user) return null;

  // console.log(user, "<---diprofilcard");

  return (
    <>
      <div className="bg-n-1/60 dark:bg-n-7/90 border dark:border-n-1/10 backdrop-blur sticky top-28 h-max z-10 p-2 rounded-lg shadow-sm text-sm flex flex-col gap-2">
        <div className="relative h-20">
          <Image src={user.cover || "/noCover.png"} alt="Profile" fill className="rounded-md object-cover" />
          <Image src={user.avatar || "/noAvatar.png"} alt="Profile" width={48} height={48} className="rounded-full object-cover w-12 h-12 absolute left-0 right-0 m-auto -bottom-6 ring-1 ring-white" />
        </div>
        <div className="flex flex-col items-center gap-2 mt-7">
          <span className="font-semibold">{user.name && user.surname ? user.name + " " + user.surname : user.username}</span>
          <div className="flex items-center gap-3">
            <div className="flex items-center">
              <Image src="https://cdn.pixabay.com/photo/2022/10/04/21/26/virtual-reality-7499161_640.jpg" alt="Metaverse" width={12} height={12} className="rounded-full w-3 h-3" />
              <Image src="https://cdn.pixabay.com/photo/2022/10/04/21/26/virtual-reality-7499161_640.jpg" alt="Metaverse" width={12} height={12} className="rounded-full w-3 h-3" />
              <Image src="https://cdn.pixabay.com/photo/2022/10/04/21/26/virtual-reality-7499161_640.jpg" alt="Metaverse" width={12} height={12} className="rounded-full w-3 h-3" />
            </div>
            <span className="text-gray-500 text-xs">{user._count.followers} Followers</span>
          </div>
          <Link href={`/profile/${user.username}`} className="bg-sky-500 text-white text-xs p-2 rounded-md">
            My Profile
          </Link>
        </div>
      </div>
    </>
  );
};

export default ProfileCard;
