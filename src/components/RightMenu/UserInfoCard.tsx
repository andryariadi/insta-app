import Link from "next/link";
import { FaLink, FaRegCalendarAlt } from "react-icons/fa";
import { IoSchoolSharp } from "react-icons/io5";
import { MdBlock, MdLocationPin, MdWork } from "react-icons/md";

const UserInfoCard = ({ userId }: { userId: string }) => {
  return (
    <div className="bg-white p-2 rounded-lg shadow-sm text-sm flex flex-col gap-4">
      {/* Title */}
      <div className="bg-rose-500 flex items-center justify-between font-medium">
        <span className="text-gray-500">User Information</span>
        <Link href="/" className="text-sky-500 text-xs">
          See All
        </Link>
      </div>

      {/* Information */}
      <div className="bg-violet-500 flex flex-col gap-4 text-gray-500">
        <div className="flex items-center gap-2">
          <span className="text-lg text-n-7">Andry Ariadi</span>
          <span className="text-sm">@andryariadi</span>
        </div>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi consequatur ducimus dicta.</p>
        <div className="bg-amber-500 flex flex-col gap-4 text-xs">
          <div className="flex items-center gap-2">
            <MdLocationPin size={18} />
            <span>
              Living in <strong>Malang City</strong>
            </span>
          </div>
          <div className="flex items-center gap-2">
            <IoSchoolSharp size={18} />
            <span>
              Went to <strong>Hacktiv8</strong>
            </span>
          </div>
          <div className="flex items-center gap-2">
            <MdWork size={18} />
            <span>
              Work at <strong>Soon</strong>
            </span>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            <FaLink size={16} />
            <span className="text-sky-500 font-medium">andry.dev</span>
          </div>
          <div className="flex items-center gap-1">
            <FaRegCalendarAlt size={16} />
            <span>Joined July 2024</span>
          </div>
        </div>
        <button className="bg-sky-500 text-white text-xs p-2 rounded-md">Following</button>
        <div className="flex items-center gap-1 self-end text-rose-500 text-xs cursor-pointer">
          <MdBlock size={18} />
          <span>Block User</span>
        </div>
      </div>
    </div>
  );
};

export default UserInfoCard;
