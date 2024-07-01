import { SignIn } from "@clerk/nextjs";
import Image from "next/image";

export default function Page() {
  return (
    <>
      <div className="bg-sky-600 h-[calc(100vh-6rem)] flex items-center">
        <div className="bg-rose-500 w-1/2">
          <Image src="/login.svg" alt="Login" width={600} height={600} />
        </div>
        <div className="bg-violet-500 w-1/2 flex justify-center">
          <SignIn />
        </div>
      </div>
    </>
  );
}
