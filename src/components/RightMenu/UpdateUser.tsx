"use client";

import { updateProfile } from "@/libs/action";
import { User } from "@prisma/client";
import Image from "next/image";
import { useState } from "react";
import { CiLocationOn, CiUser } from "react-icons/ci";
import { GoLink } from "react-icons/go";
import { IoIosCloseCircle } from "react-icons/io";
import { IoSchoolOutline } from "react-icons/io5";
import { PiBagThin, PiTextAlignLeftThin } from "react-icons/pi";

const UpdateUser = ({ user }: { user: User }) => {
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(!open);
  };
  return (
    <div>
      <span className="text-sky-500 text-xs cursor-pointer" onClick={() => setOpen(!open)}>
        Update
      </span>
      {open && (
        <div className="bg-logo backdrop-blur absolute -left-[59rem] -top-6 w-[95dvw] h-screen flex items-center justify-center">
          <form action={updateProfile} className="relative p-12 bg-white rounded-lg shadow-md flex flex-col gap-5 w-full md:w-[40%]">
            {/* Title */}
            <h1 className="text-lg">Update Profile</h1>
            <span className="text-gray-500 text-xs">Use the navbar profile to change the avatar or username</span>
            {/* Cover Picture */}
            <div className="bg-ambr-500 flex flex-col gap-3">
              <label htmlFor="" className="text-xs text-n-3">
                Cover Picture
              </label>
              <div className="flex items-center gap-2">
                <Image src={user.cover || "/noCover.png"} alt="Profile" width={56} height={40} className="w-14 h-10 rounded-md object-cover" />
                <span className="text-gray-500 text-xs cursor-pointer underline hover:text-sky-500 transition-all duration-300">Change</span>
              </div>
            </div>

            {/* Fields Input */}
            <div className="bg-tal-500 flex flex-wrap items-center justify-between gap-x-5 gap-y-7 text-n-3">
              <div className="bg-ambr-500 flex flex-col gap-2">
                <label htmlFor="" className="text-xs">
                  First Name
                </label>
                <div className="bg-slate-100 p-3 rounded-lg flex items-center gap-2 border border-slate-100 hover:border-logo transition-all duration-300">
                  <input type="text" name="name" placeholder={user.name || "Your first name"} className="bg-transparent focus:outline-none placeholder:text-xs placeholder:text-n-2" />
                  <CiUser size={20} className="text-gray-500" />
                </div>
              </div>
              <div className="bg-ambr-500 flex flex-col gap-2">
                <label htmlFor="" className="text-xs">
                  Surname
                </label>
                <div className="bg-slate-100 p-3 rounded-lg flex items-center gap-2 border border-slate-100 hover:border-logo transition-all duration-300">
                  <input type="text" name="surname" placeholder={user.surname || "Your last name"} className="bg-transparent focus:outline-none placeholder:text-xs placeholder:text-n-2" />
                  <CiUser size={20} className="text-gray-500" />
                </div>
              </div>
              <div className="bg-ambr-500 flex flex-col gap-2">
                <label htmlFor="" className="text-xs">
                  Description
                </label>
                <div className="bg-slate-100 p-3 rounded-lg flex items-center gap-2 border border-slate-100 hover:border-logo transition-all duration-300">
                  <input type="text" name="description" placeholder={user.description || "Life is beautiful..."} className="bg-transparent focus:outline-none placeholder:text-xs placeholder:text-n-2" />
                  <PiTextAlignLeftThin size={20} className="text-gray-500" />
                </div>
              </div>
              <div className="bg-ambr-500 flex flex-col gap-2">
                <label htmlFor="" className="text-xs">
                  City
                </label>
                <div className="bg-slate-100 p-3 rounded-lg flex items-center gap-2 border border-slate-100 hover:border-logo transition-all duration-300">
                  <input type="text" name="city" placeholder={user.city || "Anywhere..."} className="bg-transparent focus:outline-none placeholder:text-xs placeholder:text-n-2" />
                  <CiLocationOn size={20} className="text-gray-500" />
                </div>
              </div>
              <div className="bg-ambr-500 flex flex-col gap-2">
                <label htmlFor="" className="text-xs">
                  School
                </label>
                <div className="bg-slate-100 p-3 rounded-lg flex items-center gap-2 border border-slate-100 hover:border-logo transition-all duration-300">
                  <input type="text" name="school" placeholder={user.school || "Place your grow up"} className="bg-transparent focus:outline-none placeholder:text-xs placeholder:text-n-2" />
                  <IoSchoolOutline size={20} className="text-gray-500" />
                </div>
              </div>
              <div className="bg-ambr-500 flex flex-col gap-2">
                <label htmlFor="" className="text-xs">
                  Work
                </label>
                <div className="bg-slate-100 p-3 rounded-lg flex items-center gap-2 border border-slate-100 hover:border-logo transition-all duration-300">
                  <input type="text" name="work" placeholder={user.work || "Place your make money"} className="bg-transparent focus:outline-none placeholder:text-xs placeholder:text-n-2" />
                  <PiBagThin size={20} className="text-gray-500" />
                </div>
              </div>
              <div className="bg-ambr-500 flex flex-col gap-2">
                <label htmlFor="">Website</label>
                <div className="bg-slate-100 p-3 rounded-lg flex items-center gap-2 border border-slate-100 hover:border-logo transition-all duration-300">
                  <input type="text" name="website" placeholder={user.website || "link.dev"} className="bg-transparent focus:outline-none placeholder:text-xs placeholder:text-n-2" />
                  <GoLink size={18} className="text-gray-500" />
                </div>
              </div>
            </div>
            <button className="bg-sky-500 text-white text-xs p-3 rounded-md">Update</button>
            <IoIosCloseCircle size={20} onClick={handleClose} className="absolute cursor-pointer top-3 right-3 text-gray-500" />
          </form>
        </div>
      )}
    </div>
  );
};

export default UpdateUser;
