"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const NotFound = () => {
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => {
      router.push("/");
    }, 7000);
  });

  return (
    <div className="flex items-center justify-center h-[calc(100vh-6rem)]">
      <Image src="/error.svg" alt="Error" width={700} height={700} />
    </div>
  );
};

export default NotFound;
