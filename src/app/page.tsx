import LeftMenu from "@/components/LeftMenu";
import RightMenu from "@/components/RightMenu";
import Stories from "@/components/Stories";

const Homepage = () => {
  return (
    <>
      <div className="bg-amber-500 flex gap-5">
        {/* Left */}
        <div className="bg-sky-500 hidden xl:block w-[20%]">
          <LeftMenu />
        </div>

        {/* Center */}
        <div className="bg-violet-500 w-full lg:w-[70%] xl:w-[50%]">
          <Stories />
        </div>

        {/* Right */}
        <div className="bg-teal-500 hidden lg:block w-[30%]">
          <RightMenu />
        </div>
      </div>
    </>
  );
};

export default Homepage;
