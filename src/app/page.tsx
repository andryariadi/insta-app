import AddPost from "@/components/AddPost";
import Feed from "@/components/Feed/Feed";
import LeftMenu from "@/components/LeftMenu/LeftMenu";
import RightMenu from "@/components/RightMenu/RightMenu";
import Stories from "@/components/Stories";

const Homepage = () => {
  return (
    <>
      <div className="bg-ambr-500 flex gap-5 pt-6">
        {/* Left */}
        <div className="bg-sy-500 hidden xl:block w-[20%]">
          <LeftMenu type="home" />
        </div>

        {/* Center */}
        <div className="bg-violt-500 w-full lg:w-[70%] xl:w-[50%]">
          <div className="bg-ros-500 flex flex-col gap-6">
            <Stories />
            <AddPost />
            <Feed />
          </div>
        </div>

        {/* Right */}
        <div className="bg-tal-500 hidden lg:block w-[30%]">
          <RightMenu userId="" />
        </div>
      </div>
    </>
  );
};

export default Homepage;
