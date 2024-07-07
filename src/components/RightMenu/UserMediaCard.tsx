import Image from "next/image";
import Link from "next/link";

const UserMediaCard = ({ userId }: { userId: string }) => {
  return (
    <div className="bg-n-1/60 backdrop-blur p-2 rounded-lg shadow-sm text-sm flex flex-col gap-4">
      {/* Title */}
      <div className="bg-ros-500 flex items-center justify-between font-medium">
        <span className="text-gray-500">User Media</span>
        <Link href="/" className="text-sky-500 text-xs">
          See All
        </Link>
      </div>

      {/* Media */}
      <div className="bg-ambr-500 flex items-center justify-center flex-wrap gap-4">
        {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
          <div key={item} className="relative w-1/5 h-20">
            <Image src="https://images.pexels.com/photos/6940563/pexels-photo-6940563.jpeg?auto=compress&cs=tinysrgb&w=600" alt="Media" fill className="object-cover rounded-md" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserMediaCard;
