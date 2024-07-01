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
          <ClerkLoading>
            <div
              className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white"
              role="status"
            />
          </ClerkLoading>

          <ClerkLoaded>
            <SignedIn>
              <HiOutlineUserGroup size={22} />
              <IoChatbubbleEllipsesOutline size={22} />
              <IoIosNotificationsOutline size={22} />
              <UserButton />
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
