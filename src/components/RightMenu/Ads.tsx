import Image from "next/image";
import { BsThreeDots } from "react-icons/bs";

const Ads = ({ size }: { size: "sm" | "md" | "lg" }) => {
  return (
    <>
      <div className="bg-n-1/60 dark:bg-n-7 border dark:border-n-1/10 backdrop-blur p-2 rounded-lg shadow-sm text-sm flex flex-col gap-4">
        {/* Top */}
        <div className="bg-sy-600 flex items-center justify-between text-gray-500">
          <span className="font-medium">Sponsored Ads</span>
          <BsThreeDots size={24} className="cursor-pointer" />
        </div>

        {/* Bottom */}
        <div className={`bg-violt-500 flex flex-col ${size === "sm" ? "gap-2" : "gap-4"}`}>
          <div className={`relative w-full ${size === "sm" ? "h-14" : size === "md" ? "h-20" : "h-28"}`}>
            <Image src="https://images.pexels.com/photos/8721342/pexels-photo-8721342.jpeg?auto=compress&cs=tinysrgb&w=600" alt="Ads" fill className="rounded-lg object-cover" />
          </div>
          <div className="flex items-center gap-4">
            <Image src="https://images.pexels.com/photos/8721342/pexels-photo-8721342.jpeg?auto=compress&cs=tinysrgb&w=600" alt="Ads" width={24} height={24} className="w-6 h-6 rounded-full object-cover" />
            <span className="text-sky-500 font-medium">Metaverse</span>
          </div>
          <p className={size === "sm" ? "text-xs" : "text-sm"}>
            {size === "sm"
              ? "Lorem ipsum dolor sit amet consectetur adipisicing elit."
              : size === "md"
              ? "Lorem ipsum dolor sit amet consectetur adipisicing elit.  Lorem ipsum dolor sit amet consectetur adipisicing elit."
              : "Lorem ipsum dolor sit amet consectetur adipisicing elit.  Lorem ipsum dolor sit amet consectetur adipisicing elit.  Lorem ipsum dolor sit amet consectetur adipisicing elit."}
          </p>
          <button className="bg-gray-200 text-gray-500 p-2 text-xs rounded-lg">Learn more</button>
        </div>
      </div>
    </>
  );
};

export default Ads;
