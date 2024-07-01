import { SignUp } from "@clerk/nextjs";
import Image from "next/image";

export default function Page() {
  return (
    <>
      <div className="bg-sky-600 h-screen flex items-center">
        <div className="bg-violet-500 w-1/2 flex justify-center">
          <SignUp />
        </div>
        <div className="bg-rose-500 w-1/2">
          <Image src="/register.svg" alt="Login" width={600} height={600} />
        </div>
      </div>
    </>
  );
}
