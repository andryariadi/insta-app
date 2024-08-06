"use client";

import { addStory } from "@/libs/action";
import { useUser } from "@clerk/nextjs";
import { Story, User } from "@prisma/client";
import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";
import { useOptimistic, useState } from "react";
import { IoMdAdd } from "react-icons/io";
import { Loading } from "./Loading";

type StoryProp = Story & { user: User };

const StoryLists = ({ stories }: { stories: StoryProp[] }) => {
  const [storyLists, setStoryLists] = useState(stories);
  const [img, setImg] = useState<any>("");

  const { user, isLoaded } = useUser();

  const [optimisticStories, addOptimisticStories] = useOptimistic(storyLists, (state, value: StoryProp) => [value, ...state]);

  if (!user && !isLoaded) return <Loading />;
  if (!user && isLoaded) return null;

  const handleStory = async () => {
    if (!img.secure_url) return;

    addOptimisticStories({
      id: Math.random().toString(),
      img: img.secure_url,
      createdAt: new Date(Date.now()),
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
      clerkId: user.id,
      user: {
        id: user.id,
        clerkId: user.id,
        username: "Sending please wait...",
        avatar: user.imageUrl || "/noAvatar.png",
        cover: "",
        name: "",
        surname: "",
        description: "",
        city: "",
        school: "",
        work: "",
        website: "",
        createdAt: new Date(Date.now()),
      },
    });

    try {
      const createdStory = await addStory(img.secure_url);
      setStoryLists((prev) => [createdStory!, ...prev]);
      setImg(null);
    } catch (error) {
      console.log(error);
    }
  };

  console.log(storyLists, "<----distorylist");
  return (
    <>
      <CldUploadWidget
        uploadPreset="gramify"
        onSuccess={(result, { widget }) => {
          setImg(result.info);
          widget.close();
        }}
      >
        {({ open }) => {
          return (
            <div className="relative flex flex-col items-center gap-2 cursor-pointer">
              <Image src={img?.secure_url || user?.imageUrl || "/noAvatar.png"} alt={user?.username || "Story"} width={80} height={80} className="w-20 h-20 rounded-full object-cover ring-2" onClick={() => open()} />

              {img ? (
                <form action={handleStory}>
                  <button className="bg-logo text-white text-xs p-1 rounded-md">Send</button>
                </form>
              ) : (
                <span>Add a Story</span>
              )}

              <IoMdAdd size={40} className="absolute top-5 text-gray-200 hover:text-logo transition-all duration-300" />
            </div>
          );
        }}
      </CldUploadWidget>
      {optimisticStories.map((story) => (
        <div key={story.id} className="flex flex-col items-center gap-2 cursor-pointer">
          <Image src={story.img || "/noAvatar.png"} alt={story.user.username} width={80} height={80} className="w-20 h-20 rounded-full object-cover ring-2" />
          <span>{story.user.name || story.user.username}</span>
        </div>
      ))}
    </>
  );
};

export default StoryLists;
