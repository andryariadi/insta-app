import Ads from "./Ads";
import Birthdays from "./Birthdays";
import FriendRequests from "./FriendRequests";

const RightMenu = ({ userId }: { userId: string }) => {
  return (
    <>
      <div className="bg-gray-600 flex flex-col gap-6">
        <FriendRequests />
        <Birthdays />
        <Ads size="lg" />
      </div>
    </>
  );
};

export default RightMenu;
