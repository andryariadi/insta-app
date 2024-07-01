import { SignIn } from "@clerk/nextjs";
import Image from "next/image";

export default function Page() {
  return (
    <>
      <div className="bg-sky-600 min-h-[calc(100vh-6rem)] flex flex-col md:flex-row items-center justify-center">
        <div className="bg-amber-500 w-full lg:w-1/2 h-full">
          <div className="bg-rose-500 flex w-full">
            <Image src="/login.svg" alt="Login" width={600} height={600} className="object-contain" />
          </div>
        </div>
        <div className="bg-violet-500 lg:w-1/2 flex justify-center">
          <SignIn />
        </div>
      </div>
    </>
  );
}
