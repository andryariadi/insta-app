import Image from "next/image";

const Stories = () => {
  return (
    <>
      <div className="stories bg-white p-4 rounded-lg shadow-md overflow-x-scroll text-xs">
        <div className="bg-violet-700 flex gap-8 w-max">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item) => (
            <div key={item} className="flex flex-col items-center gap-2 cursor-pointer">
              <Image src="https://images.pexels.com/photos/3913025/pexels-photo-3913025.jpeg?auto=compress&cs=tinysrgb&w=600" alt="Stories" width={80} height={80} className="w-20 h-20 rounded-full ring-2" />
              <span>Andry</span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Stories;
