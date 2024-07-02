import Post from "./Post";

const Feed = () => {
  return (
    <>
      <div className="bg-white p-4 rounded-lg shadow-md flex flex-col gap-12">
        <Post />
        <Post />
        <Post />
      </div>
    </>
  );
};

export default Feed;
