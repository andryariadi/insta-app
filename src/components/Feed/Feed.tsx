import { auth } from "@clerk/nextjs/server";
import Post from "./Post";
import prisma from "@/libs/client";

const Feed = async ({ username }: { username?: string }) => {
  console.log(username, "<----difeed");

  let posts: any[] = [];

  const { userId: clerkId } = auth();

  // Fetch post in profile page
  if (username) {
    posts = await prisma.post.findMany({
      where: {
        user: {
          username: username,
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
  }

  // Fetch post in home page
  if (!username && clerkId) {
    const following = await prisma.follower.findMany({
      where: {
        followerId: clerkId,
      },
      select: {
        followingId: true,
      },
    });

    const followingIds = following.map((f) => f.followingId);

    posts = await prisma.post.findMany({
      where: {
        clerkId: {
          in: followingIds,
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
  }

  // console.log(posts, "<----difeed");

  return (
    <>
      <div className="bg-n-1/60 backdrop-blur p-4 rounded-lg shadow-sm flex flex-col gap-12">{posts.length ? posts.map((post) => <Post key={post.id} post={post} />) : <div>No posts found</div>}</div>
    </>
  );
};

export default Feed;
