import { auth } from "@clerk/nextjs/server";
import Image from "next/image";
import { BsEmojiWinkFill } from "react-icons/bs";

const AddPost = () => {
  return (
    <div className="bg-n-1/60 backdrop-blur p-4 rounded-lg shadow-sm flex justify-between gap-4 text-sm">
      {/* Avatar */}
      <div className="bg-ambr-500">
        <Image src="https://images.pexels.com/photos/8717366/pexels-photo-8717366.jpeg?auto=compress&cs=tinysrgb&w=600" alt="Avatar" width={48} height={48} className="w-12 h-12 rounded-full object-cover" />
      </div>

      {/* Post */}
      <div className="bg-violt-500 flex-1">
        <form className="bg-tal-500 flex gap-4 items-center">
          <textarea name="desc" placeholder="What's on your mind?" className="flex-1 bg-slate-100 p-2 rounded-lg focus:outline-none"></textarea>
          <div className="flex flex-col gap-2">
            <BsEmojiWinkFill size={18} className="text-amber-500 self-end cursor-pointer" />
            <button type="submit" className="bg-blue-500 text-white text-xs p-2 rounded-lg">
              Send
            </button>
          </div>
        </form>

        {/* Post Options */}
        <div className="bg-sy-500 flex flex-wrap items-center justify-center md:justify-start gap-4 mt-4 text-gray-400">
          <div className="flex bg-ambr-500 items-center gap-2">
            <Image src="/addImage.png" alt="Add Photo" width={20} height={20} className="w-5 h-5 cursor-pointer" />
            <span>Photo</span>
          </div>
          <div className="flex bg-ambr-500 items-center gap-2">
            <Image src="/addVideo.png" alt="Add Video" width={20} height={20} className="w-5 h-5 cursor-pointer" />
            <span>Video</span>
          </div>
          <div className="flex bg-ambr-500 items-center gap-2">
            <Image src="/poll.png" alt="Add Poll" width={20} height={20} className="w-5 h-5 cursor-pointer" />
            <span>Poll</span>
          </div>
          <div className="flex bg-ambr-500 items-center gap-2">
            <Image src="/addEvent.png" alt="Add Event" width={20} height={20} className="w-5 h-5 cursor-pointer" />
            <span>Event</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddPost;
