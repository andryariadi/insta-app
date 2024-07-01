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

const Navbar = () => {
  return (
    <>
      <div className="bg-n-8 h-24 flex items-center justify-between">
        {/* Left */}
        <div className="bg-rose-500 w-1/2 md:w-[20%] h-full flex md:hidden lg:flex items-center">
          <Link href="/">
            <Image src="/logo.svg" alt="Gramify" width={100} height={100} />
          </Link>
        </div>

        {/* Center */}
        <div className="bg-sky-500 md:w-[60%] h-full hidden md:flex justify-between text-sm">
          <div className="bg-teal-600 flex gap-10">
            <Link href="/" className="flex items-center gap-1">
              <GoHome size={22} />
              <span>Home</span>
            </Link>
            <Link href="/" className="flex items-center gap-1">
              <HiOutlineUserGroup size={22} />
              <span>Friends</span>
            </Link>
            <Link href="/" className="flex items-center gap-1">
              <TbCircleDashedPlus size={22} />
              <span>Stories</span>
            </Link>
          </div>
          <div className="bg-amber-500 hidden lg:flex items-center justify-center">
            <Search />
          </div>
        </div>

        {/* Right */}
        <div className="bg-violet-500 w-1/2 md:w-[20%] h-full flex items-center justify-end gap-3">
          <ClerkLoading>
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white" />
          </ClerkLoading>

          <ClerkLoaded>
            <SignedIn>
              <div className="bg-rose-500 flex items-center gap-6">
                <div className="hidden md:flex items-center gap-6">
                  <HiOutlineUserGroup size={25} />
                  <IoChatbubbleEllipsesOutline size={25} />
                  <IoIosNotificationsOutline size={25} />
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
