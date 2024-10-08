import Image from "next/image";
import Link from "next/link";
import MobileMenu from "./MobileMenu";
import { GoHome } from "react-icons/go";
import { HiOutlineUserGroup } from "react-icons/hi2";
import { TbCircleDashedPlus } from "react-icons/tb";
import { PiUserCircleThin } from "react-icons/pi";
import { ClerkLoaded, ClerkLoading, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";
import { IoIosNotificationsOutline } from "react-icons/io";
import Search from "./Search";
import { LoaderAuth } from "./Loading";
import ThemeSwitch from "./ThemeSwitch";

const Navbar = () => {
  return (
    <>
      <div className="bg--8 h-24 flex items-center justify-between">
        {/* Left */}
        <div className="bg-ros-500 w-1/2 md:w-[20%] h-full flex md:hidden lg:flex items-center">
          <Link href="/" className="hover:scale-105 transition-all duration-300">
            <Image src="/logo.svg" alt="Gramify" width={100} height={100} />
          </Link>
        </div>

        {/* Center */}
        <div className="bg-violt-500 md:w-[75%] h-full hidden md:flex justify-between text-sm">
          <div className="bg-tal-600 flex gap-10">
            <Link href="/" className="flex items-center gap-1 hover:text-logo transition-all duration-300">
              <GoHome size={22} />
              <span>Home</span>
            </Link>
            <Link href="/" className="flex items-center gap-1 hover:text-logo transition-all duration-300">
              <HiOutlineUserGroup size={22} />
              <span>Friends</span>
            </Link>
            <Link href="/" className="flex items-center gap-1 hover:text-logo transition-all duration-300">
              <TbCircleDashedPlus size={22} />
              <span>Stories</span>
            </Link>
          </div>
          <div className="bg-ambr-500 hidden md:flex items-center justify-center">
            <Search />
          </div>
        </div>

        {/* Right */}
        <div className="bg-tal-500 w-1/2 md:w-[25%] h-full flex items-center justify-end gap-3">
          <ClerkLoading>
            <LoaderAuth />
          </ClerkLoading>

          <ClerkLoaded>
            <SignedIn>
              <div className="bg-ros-500 flex items-center gap-6">
                <div className="hidden md:flex items-center gap-4">
                  <ThemeSwitch />
                  <HiOutlineUserGroup size={25} className="cursor-pointer hover:text-logo hover:scale-110 transition-all duration-300" />
                  <IoChatbubbleEllipsesOutline size={25} className="cursor-pointer hover:text-logo hover:scale-110 transition-all duration-300" />
                  <IoIosNotificationsOutline size={25} className="cursor-pointer hover:text-logo hover:scale-110 transition-all duration-300" />
                </div>
                <UserButton />
              </div>
            </SignedIn>

            <SignedOut>
              <Link href="/sign-in" className="flex items-center gap-2 text-sm">
                <PiUserCircleThin size={22} />
                <span>Login/Register</span>
              </Link>
            </SignedOut>
          </ClerkLoaded>

          <MobileMenu />
        </div>
      </div>
    </>
  );
};

export default Navbar;
