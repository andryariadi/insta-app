import Post from "./Post";

const Feed = () => {
  return (
    <>
      <div className="bg-n-1/60 backdrop-blur p-4 rounded-lg shadow-sm flex flex-col gap-12">
        <Post />
        <Post />
        <Post />
      </div>
    </>
  );
};

export default Feed;
