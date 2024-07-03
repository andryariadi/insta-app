import Ads from "./Ads";
import Birthdays from "./Birthdays";
import FriendRequests from "./FriendRequests";
import UserInfoCard from "./UserInfoCard";
import UserMediaCard from "./UserMediaCard";

const RightMenu = ({ userId }: { userId: string }) => {
  return (
    <>
      <div className="bg-gray-600 flex flex-col gap-6">
        {userId ? (
          <>
            <UserInfoCard userId={userId} />
            <UserMediaCard userId={userId} />
          </>
        ) : null}
        <FriendRequests />
        <Birthdays />
        <Ads size="lg" />
      </div>
    </>
  );
};

export default RightMenu;
