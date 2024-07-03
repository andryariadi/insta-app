import Image from "next/image";
import Link from "next/link";

const FriendRequests = () => {
  return (
    <>
      <div className="bg-white sticky top-28 h-max z-10 p-2 rounded-lg shadow-sm text-sm flex flex-col gap-4">
        {/* Title */}
        <div className="bg-rose-500 flex items-center justify-between font-medium">
          <span className="text-gray-500">Friend Requests</span>
          <Link href="/" className="text-sky-500 text-xs">
            See All
          </Link>
        </div>

        {/* User */}
        {[1, 2, 3].map((item) => (
          <div key={item} className="bg-amber-500 flex items-center justify-between">
            <div className="bg-sky-600 flex items-center gap-4">
              <Image src="https://images.pexels.com/photos/5473950/pexels-photo-5473950.jpeg?auto=compress&cs=tinysrgb&w=600" alt="User" width={40} height={40} className="w-10 h-10 rounded-full object-cover" />
              <span className="font-semibold">Tasmiah</span>
            </div>
            <div className="bg-green-600 flex items-center gap-3">
              <Image src="/accept.png" alt="User" width={20} height={20} className="cursor-pointer" />
              <Image src="/reject.png" alt="User" width={20} height={20} className="cursor-pointer" />
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default FriendRequests;
