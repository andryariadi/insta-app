import Feed from "@/components/Feed/Feed";
import LeftMenu from "@/components/LeftMenu/LeftMenu";
import RightMenu from "@/components/RightMenu/RightMenu";

const ProfilePage = () => {
  return (
    <>
      <div className="bg-amber-500 flex gap-5 pt-6">
        {/* Left */}
        <div className="bg-sky-500 hidden xl:block w-[20%]">
          <LeftMenu />
        </div>

        {/* Center */}
        <div className="bg-violet-500 w-full lg:w-[70%] xl:w-[50%]">
          <div className="bg-rose-500 flex flex-col gap-6">
            <Feed />
          </div>
        </div>

        {/* Right */}
        <div className="bg-teal-500 hidden lg:block w-[30%]">
          <RightMenu userId="test" />
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
