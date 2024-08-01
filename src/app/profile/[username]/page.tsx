import Feed from "@/components/Feed/Feed";
import LeftMenu from "@/components/LeftMenu/LeftMenu";
import RightMenu from "@/components/RightMenu/RightMenu";
import prisma from "@/libs/client";
import { auth } from "@clerk/nextjs/server";
import Image from "next/image";
import { notFound } from "next/navigation";

const ProfilePage = async ({ params }: { params: { username: string } }) => {
  const { username } = params;

  const user = await prisma.user.findFirst({
    where: { username },
    include: {
      _count: {
        select: {
          followers: true,
          followings: true,
          posts: true,
        },
      },
    },
  });

  if (!user) return notFound();

  const { userId: clerkId } = auth();

  let isBlocked;

  if (clerkId) {
    const res = await prisma.block.findFirst({
      where: {
        blockerId: user.id,
        blockedId: clerkId,
      },
    });

    if (res) isBlocked = true;
  } else {
    isBlocked = false;
  }

  // if (isBlocked) return notFound();

  // console.log(username, user, clerkId, "<---profilpage");

  return (
    <>
      <div className="bg-ambr-500 flex gap-5 pt-6">
        {/* Left */}
        <div className="bg-sy-500 hidden xl:block w-[20%]">
          <LeftMenu type="profile" />
        </div>

        {/* Center */}
        <div className="bg-violt-500 w-full lg:w-[70%] xl:w-[50%]">
          <div className="bg-ros-500 flex flex-col gap-6">
            <div className="bg-n-1/60 backdrop-blur rounded-md flex flex-col items-center justify-center">
              <div className="relative w-full h-64">
                <Image src={user.cover || "/noCover.png"} alt="Profile" fill className="object-cover rounded-t-md" />
                <Image src={user.avatar || "/noAvatar.png"} alt="Profile" width={96} height={96} className="rounded-full object-cover w-24 h-24 absolute left-0 right-0 m-auto -bottom-12 ring-2 ring-white" />
              </div>
              <h1 className="mt-16 mb-3 text-xl font-medium">{user.name && user.surname ? `${user.name} ${user.surname}` : user.username}</h1>
              <div className="flex items-center justify-center gap-10 mb-3">
                <div className="flex flex-col items-center">
                  <span className="font-medium">{user._count.posts}</span>
                  <span className="text-sm">Posts</span>
                </div>
                <div className="flex flex-col items-center">
                  <span className="font-medium">{user._count.followers}</span>
                  <span className="text-sm">Followers</span>
                </div>
                <div className="flex flex-col items-center">
                  <span className="font-medium">{user._count.followings}</span>
                  <span className="text-sm">Following</span>
                </div>
              </div>
            </div>
            <Feed username={username} />
          </div>
        </div>

        {/* Right */}
        <div className="bg-tal-500 hidden lg:block w-[30%]">
          <RightMenu user={user} />
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
