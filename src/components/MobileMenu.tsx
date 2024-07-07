"use client";

import Link from "next/link";
import { useState } from "react";

const MobileMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className="flex flex-col gap-[4.5px] cursor-pointer md:hidden" onClick={() => setIsOpen(!isOpen)}>
        <div className={`bg-logo w-6 h-1 rounded-sm ${isOpen ? "rotate-45" : ""} origin-left transition-transform ease-in-out duration-500`} />
        <div className={`bg-logo w-6 h-1 rounded-sm ${isOpen ? "opacity-0" : ""} transition-transform ease-in-out duration-500`} />
        <div className={`bg-logo w-6 h-1 rounded-sm ${isOpen ? "-rotate-45" : ""} origin-left transition-transform ease-in-out duration-500`} />
      </div>

      {isOpen && (
        <div className="bg-n-1/70 backdrop-blur absolute left-0 top-24 w-full h-[calc(100vh-6rem)] flex flex-col items-center justify-center gap-8 font-medium text-xl text-n-8 z-10">
          <Link href="/" className="hover:text-logo transition-all duration-300">
            Home
          </Link>
          <Link href="/" className="hover:text-logo transition-all duration-300">
            Friends
          </Link>
          <Link href="/" className="hover:text-logo transition-all duration-300">
            Groups
          </Link>
          <Link href="/" className="hover:text-logo transition-all duration-300">
            Stories
          </Link>
        </div>
      )}
    </>
  );
};

export default MobileMenu;
