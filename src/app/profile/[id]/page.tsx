import Feed from "@/components/Feed/Feed";
import LeftMenu from "@/components/LeftMenu/LeftMenu";
import RightMenu from "@/components/RightMenu/RightMenu";
import Image from "next/image";

const ProfilePage = () => {
  return (
    <>
      <div className="bg-ambr-500 flex gap-5 pt-6">
        {/* Left */}
        <div className="bg-sy-500 hidden xl:block w-[20%]">
          <LeftMenu type="profile" />
        </div>

        {/* Center */}
        <div className="bg-violt-500 w-full lg:w-[70%] xl:w-[50%]">
          <div className="bg-ros-500 flex flex-col gap-6">
            <div className="bg-n-1/60 backdrop-blur rounded-md flex flex-col items-center justify-center">
              <div className="relative w-full h-64">
                <Image src="https://cdn.pixabay.com/photo/2024/04/25/06/44/ai-generated-8719074_1280.png" alt="Profile" fill className="object-cover rounded-t-md" />
                <Image
                  src="https://cdn.pixabay.com/photo/2024/04/19/08/58/ai-generated-8705789_640.jpg"
                  alt="Metaverse"
                  width={96}
                  height={96}
                  className="rounded-full object-cover w-24 h-24 absolute left-0 right-0 m-auto -bottom-12 ring-2 ring-white"
                />
              </div>
              <h1 className="mt-16 mb-3 text-xl font-medium">Andry Ariadi</h1>
              <div className="flex items-center justify-center gap-10">
                <div className="flex flex-col items-center">
                  <span className="font-medium">145</span>
                  <span className="text-sm">Posts</span>
                </div>
                <div className="flex flex-col items-center">
                  <span className="font-medium">1.6k</span>
                  <span className="text-sm">Followers</span>
                </div>
                <div className="flex flex-col items-center">
                  <span className="font-medium">1.3k</span>
                  <span className="text-sm">Following</span>
                </div>
              </div>
            </div>
            <Feed />
          </div>
        </div>

        {/* Right */}
        <div className="bg-tal-500 hidden lg:block w-[30%]">
          <RightMenu userId="test" />
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
