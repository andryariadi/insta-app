import Image from "next/image";
import { BsThreeDots } from "react-icons/bs";
import Comments from "./Comments";
import type { Post, User } from "@prisma/client";
import PostInteraction from "./PostInteraction";

type PostType = Post & { user: User } & { likes: [{ clerkId: string }] } & { _count: { comments: number } };

const Post = ({ post }: { post: PostType }) => {
  console.log(post, "<----dipost");

  return (
    <>
      <div className="flex flex-col gap-4">
        {/* User */}
        <div className="bg-ambr-500 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Image src={post.user.avatar || "/noAvatar.png"} alt="Feed" width={40} height={40} className="w-10 h-10 rounded-full" />
            <span className="font-medium">({post.user.name && post.user.surname ? `${post.user.name} ${post.user.surname}` : post.user.username})</span>
          </div>
          <BsThreeDots size={24} className="text-gray-400 cursor-pointer" />
        </div>

        {/* Desc */}
        <div className="bg-violt-500 flex flex-col gap-4">
          {post.img && (
            <div className="w-full min-h-96 relative">
              <Image src="https://images.pexels.com/photos/6498726/pexels-photo-6498726.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="Feed" fill className="object-cover rounded-md" />
            </div>
          )}
          <p>{post.desc}</p>
        </div>

        {/* Interaction */}
        <PostInteraction postId={post.id} likes={post.likes.map((like) => like.clerkId)} commentNumber={post._count.comments} />

        {/* Comments */}
        <Comments />
      </div>
    </>
  );
};

export default Post;
