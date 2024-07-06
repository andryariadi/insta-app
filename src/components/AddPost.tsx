import { auth } from "@clerk/nextjs/server";
import Image from "next/image";
import { BsEmojiWinkFill } from "react-icons/bs";

const AddPost = () => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md flex justify-between gap-4 text-sm">
      {/* Avatar */}
      <div className="bg-amber-500">
        <Image src="https://images.pexels.com/photos/8717366/pexels-photo-8717366.jpeg?auto=compress&cs=tinysrgb&w=600" alt="Avatar" width={48} height={48} className="w-12 h-12 rounded-full object-cover" />
      </div>

      {/* Post */}
      <div className="bg-violet-500 flex-1">
        <form className="bg-teal-500 flex gap-4">
          <textarea name="desc" placeholder="What's on your mind?" className="flex-1 bg-slate-100 p-2 rounded-lg focus:outline-none"></textarea>
          <BsEmojiWinkFill size={24} className="text-amber-500 self-end cursor-pointer" />
          <button type="submit" className="bg-blue-500 text-white p-2 rounded-lg">
            Sendd
          </button>
        </form>

        {/* Post Options */}
        <div className="bg-sky-500 flex flex-wrap items-center gap-4 mt-4 text-gray-400">
          <div className="flex items-center gap-2">
            <Image src="/addImage.png" alt="Add Photo" width={20} height={20} className="w-5 h-5 cursor-pointer" />
            <span>Photo</span>
          </div>
          <div className="flex items-center gap-2">
            <Image src="/addVideo.png" alt="Add Video" width={20} height={20} className="w-5 h-5 cursor-pointer" />
            <span>Video</span>
          </div>
          <div className="flex items-center gap-2">
            <Image src="/poll.png" alt="Add Poll" width={20} height={20} className="w-5 h-5 cursor-pointer" />
            <span>Poll</span>
          </div>
          <div className="flex items-center gap-2">
            <Image src="/addEvent.png" alt="Add Event" width={20} height={20} className="w-5 h-5 cursor-pointer" />
            <span>Event</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddPost;
