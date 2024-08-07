"use client";

import { Story, User } from "@prisma/client";
import Image from "next/image";
import { useEffect } from "react";

type StoryProp = Story & { user: User };

const ViewStory = ({ stories, openView, setOpenView }: { stories: StoryProp; openView: boolean; setOpenView: any }) => {
  console.log(stories, "<---diviewstory");

  useEffect(() => {
    if (openView) {
      const timer = setTimeout(() => {
        setOpenView(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [openView, setOpenView, stories]);

  return (
    <div className="bg-neutral-950/70 backdrop-blur-lg absolute h-[100dvh] w-[99dvw] -top-[7.5rem] -left-[29.2rem] flex items-center justify-center">
      <Image src={stories.img} alt="Story" width={384} height={384} className="w-96 h-96 object-cover" />
    </div>
  );
};

export default ViewStory;
