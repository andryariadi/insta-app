import prisma from "@/libs/client";
import CommentLists from "./CommentLists";

const Comments = async ({ postId }: { postId: string }) => {
  const comments = await prisma.comment.findMany({
    where: {
      postId,
    },
    include: {
      user: true,
      likes: {
        select: {
          clerkId: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  // console.log(comments, "<----dicomments");

  return (
    <>
      <div className="flex flex-col gap-2">
        <CommentLists comments={comments} postId={postId} />
      </div>
    </>
  );
};

export default Comments;
