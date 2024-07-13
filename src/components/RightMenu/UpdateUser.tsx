"use client";

import { updateProfile } from "@/libs/action";
import { User } from "@prisma/client";
import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useActionState, useState } from "react";
import { CiLocationOn, CiUser } from "react-icons/ci";
import { GoLink } from "react-icons/go";
import { IoIosCloseCircle } from "react-icons/io";
import { IoSchoolOutline } from "react-icons/io5";
import { PiBagThin, PiTextAlignLeftThin } from "react-icons/pi";
import UpdateButton from "./UpdateButton";
import { BackgroundBeams } from "../ui/background-beams";

const UpdateUser = ({ user }: { user: User }) => {
  const [open, setOpen] = useState(false);
  const [cover, setCover] = useState<any>(false);

  const router = useRouter();

  const [state, formAction] = useActionState(updateProfile, { success: false, error: false, errors: {} });

  const hanldeUpdateProfile = (formData: FormData) => {
    formAction({ formData, cover: cover?.secure_url || "" });
  };

  const handleClose = () => {
    setOpen(!open);
    state.success && router.refresh();
  };

  // console.log(state, "<----diupdateuser");

  return (
    <div>
      <span className="text-sky-500 text-xs cursor-pointer" onClick={() => setOpen(!open)}>
        Update
      </span>

      {open && (
        <div className="bg-neutral-950/70 antialiased backdrop-blur-lg absolute lg:-left-[45.9rem] xl:-left-[51.5rem] 2xl:-left-[59rem] -top-6 w-[95dvw] h-[100dvh] flex items-center justify-center">
          <form action={hanldeUpdateProfile} className="relative p-12 bg-white rounded-lg shadow-md flex flex-col gap-x-5 lg:gap-y-3 xl:gap-y-5 w-full lg:w-[60%] xl:w-[50%] 2xl:w-[45%]">
            {/* Title */}
            <h1 className="text-lg">Update Profile</h1>
            <span className="text-gray-500 text-xs">Use the navbar profile to change the avatar or username</span>

            {/* Cover Picture */}
            <CldUploadWidget uploadPreset="gramify" onSuccess={(result) => setCover(result.info)}>
              {({ open }) => {
                return (
                  <div className="bg-ambr-500 flex flex-col gap-3" onClick={() => open?.()}>
                    <label htmlFor="" className="text-xs text-n-3">
                      Cover Picture
                    </label>
                    <div className="flex items-center gap-2">
                      <Image src={user.cover || "/noCover.png"} alt="Profile" width={56} height={40} className="w-14 h-10 rounded-md object-cover" />
                      <span className="text-gray-500 text-xs cursor-pointer underline hover:text-sky-500 transition-all duration-300">Change</span>
                    </div>
                  </div>
                );
              }}
            </CldUploadWidget>

            {/* Fields Input */}
            <div className="bg-tal-500 flex flex-wrap items-center justify-between gap-x-5 gap-y-5 xl:gap-y-7 text-n-3 mb-2">
              <div className="bg-ambr-500 flex flex-1 flex-col gap-2 relative">
                <label htmlFor="" className="text-xs">
                  First Name
                </label>
                <div className="bg-slate-100 p-3 rounded-lg flex items-center gap-2 border border-slate-100 hover:border-logo transition-all duration-300">
                  <input type="text" name="name" placeholder={user.name || "Your first name"} className="flex-1 bg-transparent focus:outline-none placeholder:text-xs placeholder:text-n-2" />
                  <CiUser size={20} className="text-gray-500" />
                </div>
                {state.error && state.errors?.name && <span className="text-rose-500 text-xs absolute -bottom-5">{state.errors.name}</span>}
              </div>

              <div className="bg-ambr-500 flex flex-1 flex-col gap-2 relative">
                <label htmlFor="" className="text-xs">
                  Surname
                </label>
                <div className="bg-slate-100 p-3 rounded-lg flex items-center gap-2 border border-slate-100 hover:border-logo transition-all duration-300">
                  <input type="text" name="surname" placeholder={user.surname || "Your last name"} className="flex-1 bg-transparent focus:outline-none placeholder:text-xs placeholder:text-n-2" />
                  <CiUser size={20} className="text-gray-500" />
                </div>
                {state.error && state.errors?.surname && <span className="text-rose-500 text-xs absolute -bottom-5">{state.errors.surname}</span>}
              </div>

              <div className="bg-ambr-500 flex flex-1 flex-col gap-2 relative">
                <label htmlFor="">Website</label>
                <div className="bg-slate-100 p-3 rounded-lg flex items-center gap-2 border border-slate-100 hover:border-logo transition-all duration-300">
                  <input type="text" name="website" placeholder={user.website || "link.dev"} className="flex-1 bg-transparent focus:outline-none placeholder:text-xs placeholder:text-n-2" />
                  <GoLink size={18} className="text-gray-500" />
                </div>
                {state.error && state.errors?.website && <span className="text-rose-500 text-xs absolute -bottom-5">{state.errors.website}</span>}
              </div>

              <div className="bg-ambr-500 flex flex-1 flex-col gap-2 relative">
                <label htmlFor="" className="text-xs">
                  City
                </label>
                <div className="bg-slate-100 p-3 rounded-lg flex items-center gap-2 border border-slate-100 hover:border-logo transition-all duration-300">
                  <input type="text" name="city" placeholder={user.city || "Anywhere..."} className="flex-1 bg-transparent focus:outline-none placeholder:text-xs placeholder:text-n-2" />
                  <CiLocationOn size={20} className="text-gray-500" />
                </div>
                {state.error && state.errors?.city && <span className="text-rose-500 text-xs absolute -bottom-5">{state.errors.city}</span>}
              </div>

              <div className="bg-ambr-500 flex flex-1 flex-col gap-2 relative">
                <label htmlFor="" className="text-xs">
                  School
                </label>
                <div className="bg-slate-100 p-3 rounded-lg flex items-center gap-2 border border-slate-100 hover:border-logo transition-all duration-300">
                  <input type="text" name="school" placeholder={user.school || "Place your grow up"} className="flex-1 bg-transparent focus:outline-none placeholder:text-xs placeholder:text-n-2" />
                  <IoSchoolOutline size={20} className="text-gray-500" />
                </div>
                {state.error && state.errors?.school && <span className="text-rose-500 text-xs absolute -bottom-5">{state.errors.school}</span>}
              </div>

              <div className="bg-ambr-500 flex flex-1 flex-col gap-2 relative">
                <label htmlFor="" className="text-xs">
                  Work
                </label>
                <div className="bg-slate-100 p-3 rounded-lg flex items-center gap-2 border border-slate-100 hover:border-logo transition-all duration-300">
                  <input type="text" name="work" placeholder={user.work || "Your work..."} className="flex-1 bg-transparent focus:outline-none placeholder:text-xs placeholder:text-n-2" />
                  <PiBagThin size={20} className="text-gray-500" />
                </div>
                {state.error && state.errors?.work && <span className="text-rose-500 text-xs absolute -bottom-5">{state.errors.work}</span>}
              </div>

              <div className="bg-ambr-500 flex flex-1 flex-col gap-2 relative">
                <label htmlFor="" className="text-xs">
                  Description
                </label>
                <div className="bg-slate-100 p-3 rounded-lg flex items-center gap-2 border border-slate-100 hover:border-logo transition-all duration-300">
                  <input type="text" name="description" placeholder={user.description || "Life is beautiful..."} className="flex-1 bg-transparent focus:outline-none placeholder:text-xs placeholder:text-n-2" />
                  <PiTextAlignLeftThin size={20} className="text-gray-500" />
                </div>
                {state.error && state.errors?.description && <span className="text-rose-500 text-xs absolute -bottom-5">{state.errors.description}</span>}
              </div>
            </div>

            <UpdateButton />

            {state.success && <span className="text-green-500 text-xs">User profile updated successfully!</span>}

            <IoIosCloseCircle size={20} onClick={handleClose} className="absolute cursor-pointer top-3 right-3 text-gray-500" />
          </form>

          <BackgroundBeams />
        </div>
      )}
    </div>
  );
};

export default UpdateUser;
