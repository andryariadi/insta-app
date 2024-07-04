import Image from "next/image";

const ProfileCard = () => {
  return (
    <>
      <div className="bg-n-1/60 backdrop-blur sticky top-28 h-max z-10 p-2 rounded-lg shadow-sm text-sm flex flex-col gap-2">
        <div className="relative h-20">
          <Image src="https://cdn.pixabay.com/photo/2022/06/01/11/49/metaverse-7235541_640.jpg" alt="Metaverse" fill className="rounded-md object-cover" />
          <Image
            src="https://cdn.pixabay.com/photo/2022/10/04/21/26/virtual-reality-7499161_960_720.jpg"
            alt="Metaverse"
            width={48}
            height={48}
            className="rounded-full object-cover w-12 h-12 absolute left-0 right-0 m-auto -bottom-6 ring-1 ring-white"
          />
        </div>
        <div className="flex flex-col items-center gap-2 mt-7">
          <span className="font-semibold">Andry Ariadi</span>
          <div className="flex items-center gap-3">
            <div className="flex items-center">
              <Image src="https://cdn.pixabay.com/photo/2022/10/04/21/26/virtual-reality-7499161_640.jpg" alt="Metaverse" width={12} height={12} className="rounded-full w-3 h-3" />
              <Image src="https://cdn.pixabay.com/photo/2022/10/04/21/26/virtual-reality-7499161_640.jpg" alt="Metaverse" width={12} height={12} className="rounded-full w-3 h-3" />
              <Image src="https://cdn.pixabay.com/photo/2022/10/04/21/26/virtual-reality-7499161_640.jpg" alt="Metaverse" width={12} height={12} className="rounded-full w-3 h-3" />
            </div>
            <span className="text-gray-500 text-xs">666 Followers</span>
          </div>
          <button className="bg-sky-500 text-white text-xs p-2 rounded-md">My Profile</button>
        </div>
      </div>
    </>
  );
};

export default ProfileCard;
