import Image from "next/image";
import { BsThreeDots } from "react-icons/bs";

const Post = () => {
  return (
    <>
      <div className="flex flex-col gap-4">
        {/* User */}
        <div className="bg-amber-500 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Image src="https://images.pexels.com/photos/8721318/pexels-photo-8721318.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="Feed" width={40} height={40} className="w-10 h-10 rounded-full" />
            <span className="font-medium">Andry Ariadi</span>
          </div>
          <BsThreeDots size={24} className="text-gray-400 cursor-pointer" />
        </div>

        {/* Desc */}
        <div className="bg-violet-500 flex flex-col gap-4">
          <div className="w-full min-h-96 relative">
            <Image src="https://images.pexels.com/photos/6498726/pexels-photo-6498726.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="Feed" fill className="object-cover rounded-md" />
          </div>
          <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Mollitia maxime ullam vel? Culpa omnis at dicta illo natus fugiat iste nisi repudiandae, harum distinctio sit ducimus ratione, eligendi nihil exercitationem!</p>
        </div>

        {/* Interaction */}
        <div className="bg-rose-500 flex items-center justify-between mt-3 text-sm">
          <div className="flex items-center gap-8">
            <div className="bg-slate-50 p-2 rounded-xl flex items-center gap-2">
              <Image src="/like.png" alt="Like" width={16} height={16} className="cursor-pointer" />
              <span className="text-gray-300">|</span>
              <span className="text-gray-500">
                123
                <span className="hidden md:inline ml-1">Likes</span>
              </span>
            </div>
            <div className="bg-slate-50 p-2 rounded-xl flex items-center gap-2">
              <Image src="/comment.png" alt="Comment" width={16} height={16} className="cursor-pointer" />
              <span className="text-gray-300">|</span>
              <span className="text-gray-500">
                123
                <span className="hidden md:inline ml-1">Comments</span>
              </span>
            </div>
          </div>
          <div>
            <div className="bg-slate-50 p-2 rounded-xl flex items-center gap-2">
              <Image src="/share.png" alt="Share" width={16} height={16} className="cursor-pointer" />
              <span className="text-gray-300">|</span>
              <span className="text-gray-500">
                123
                <span className="hidden md:inline ml-1">Shares</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Post;
