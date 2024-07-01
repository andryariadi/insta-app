import Image from "next/image";
import Link from "next/link";
import MobileMenu from "./MobileMenu";
import { GoHome } from "react-icons/go";
import { HiOutlineUserGroup } from "react-icons/hi2";
import { TbCircleDashedPlus } from "react-icons/tb";
import { PiUserCircleThin } from "react-icons/pi";

const Navbar = () => {
  return (
    <>
      <div className="bg-amber-500 h-24 flex items-center justify-between">
        {/* Left */}
        <div className="bg-rose-500 w-[20%] md:hidden lg:block">
          <Link href="/">
            <Image src="/logo.svg" alt="Gramify" width={100} height={100} />
          </Link>
        </div>

        {/* Center */}
        <div className="bg-sky-500 w-[50%] hidden md:flex gap-6 text-sm">
          <Link href="/" className="flex items-center gap-2">
            <GoHome size={22} />
            <span>Home</span>
          </Link>
          <Link href="/" className="flex items-center gap-2">
            <HiOutlineUserGroup size={22} />
            <span>Friends</span>
          </Link>
          <Link href="/" className="flex items-center gap-2">
            <TbCircleDashedPlus size={22} />
            <span>Stories</span>
          </Link>
        </div>

        {/* Right */}
        <div className="bg-violet-500 w-[30%] flex items-center justify-end">
          <Link href="/" className="flex items-center gap-2 text-sm">
            <PiUserCircleThin size={22} />
            <span>Login/Register</span>
          </Link>
          <MobileMenu />
        </div>
      </div>
    </>
  );
};

export default Navbar;
