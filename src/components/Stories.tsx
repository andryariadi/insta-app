import prisma from "@/libs/client";
import { auth } from "@clerk/nextjs/server";
import Image from "next/image";
import StoryLists from "./StoryLists";

const Stories = async () => {
  const { userId: clerkId } = auth();

  if (!clerkId) return null;

  const stories = await prisma.story.findMany({
    where: {
      expiresAt: {
        gt: new Date(),
      },
      OR: [
        {
          user: {
            followers: {
              some: {
                followingId: clerkId,
              },
            },
          },
        },
        {
          clerkId: clerkId,
        },
      ],
    },
    include: {
      user: true,
    },
  });

  // console.log(stories, "<---distories");

  return (
    <>
      <div className="bg-n-1/60 backdrop-blur p-4 rounded-lg shadow-sm text-xs">
        <div className="bg-ambr-500 stories overflow-x-scroll p-1">
          <div className="bg-violt-700 flex gap-8 w-max mb-1">
            <StoryLists stories={stories} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Stories;
