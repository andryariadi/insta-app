import Image from "next/image";
import ProfileCard from "./ProfileCard";
import Link from "next/link";
import Ads from "../RightMenu/Ads";

const LeftMenu = ({ type }: { type: "home" | "profile" }) => {
  return (
    <>
      <div className="flex flex-col gap-6">
        {type === "home" && <ProfileCard />}

        <div className="bg-n-1/60 backdrop-blur p-2 rounded-lg shadow-sm text-sm text-gray-500 flex flex-col gap-2">
          <Link href="/" className="flex items-center gap-4 p-2 rounded-lg hover:bg-slate-200 transition-all duration-300">
            <Image src="/posts.png" alt="Post" width={20} height={20} />
            <span>My Posts</span>
          </Link>
          <hr className="border-t-1 border-gray-50 w-36 self-center" />
          <Link href="/" className="flex items-center gap-4 p-2 rounded-lg hover:bg-slate-200 transition-all duration-300">
            <Image src="/activity.png" alt="Post" width={20} height={20} />
            <span>Activity</span>
          </Link>
          <hr className="border-t-1 border-gray-50 w-36 self-center" />
          <Link href="/" className="flex items-center gap-4 p-2 rounded-lg hover:bg-slate-200 transition-all duration-300">
            <Image src="/market.png" alt="Post" width={20} height={20} />
            <span>Marketplace</span>
          </Link>
          <hr className="border-t-1 border-gray-50 w-36 self-center" />
          <Link href="/" className="flex items-center gap-4 p-2 rounded-lg hover:bg-slate-200 transition-all duration-300">
            <Image src="/events.png" alt="Post" width={20} height={20} />
            <span>Events</span>
          </Link>
          <hr className="border-t-1 border-gray-50 w-36 self-center" />
          <Link href="/" className="flex items-center gap-4 p-2 rounded-lg hover:bg-slate-200 transition-all duration-300">
            <Image src="/albums.png" alt="Post" width={20} height={20} />
            <span>Albums</span>
          </Link>
          <hr className="border-t-1 border-gray-50 w-36 self-center" />
          <Link href="/" className="flex items-center gap-4 p-2 rounded-lg hover:bg-slate-200 transition-all duration-300">
            <Image src="/videos.png" alt="Post" width={20} height={20} />
            <span>Videos</span>
          </Link>
          <hr className="border-t-1 border-gray-50 w-36 self-center" />
          <Link href="/" className="flex items-center gap-4 p-2 rounded-lg hover:bg-slate-200 transition-all duration-300">
            <Image src="/news.png" alt="Post" width={20} height={20} />
            <span>News</span>
          </Link>
          <hr className="border-t-1 border-gray-50 w-36 self-center" />
          <Link href="/" className="flex items-center gap-4 p-2 rounded-lg hover:bg-slate-200 transition-all duration-300">
            <Image src="/courses.png" alt="Post" width={20} height={20} />
            <span>Courses</span>
          </Link>
          <hr className="border-t-1 border-gray-50 w-36 self-center" />
          <Link href="/" className="flex items-center gap-4 p-2 rounded-lg hover:bg-slate-200 transition-all duration-300">
            <Image src="/lists.png" alt="Post" width={20} height={20} />
            <span>Lists</span>
          </Link>
          <hr className="border-t-1 border-gray-50 w-36 self-center" />
          <Link href="/" className="flex items-center gap-4 p-2 rounded-lg hover:bg-slate-200 transition-all duration-300">
            <Image src="/settings.png" alt="Post" width={20} height={20} />
            <span>Settings</span>
          </Link>
        </div>
        <Ads size="sm" />
      </div>
    </>
  );
};

export default LeftMenu;
