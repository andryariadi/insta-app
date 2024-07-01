import { SignUp } from "@clerk/nextjs";
import Image from "next/image";

export default function Page() {
  return (
    <>
      <div className="bg-sky-600 min-h-screen flex flex-col-reverse md:flex-row items-center justify-center">
        <div className="bg-violet-500 w-[57%] lg:w-1/2 flex justify-center">
          <SignUp />
        </div>
        <div className="bg-amber-500 w-full lg:w-1/2 h-full">
          <div className="bg-rose-500 flex w-full">
            <Image src="/register.svg" alt="Login" width={600} height={600} className="object-contain" />
          </div>
        </div>
      </div>
    </>
  );
}
