import { User } from "@prisma/client";
import Ads from "./Ads";
import Birthdays from "./Birthdays";
import FriendRequests from "./FriendRequests";
import UserInfoCard from "./UserInfoCard";
import UserMediaCard from "./UserMediaCard";

const RightMenu = ({ user }: { user?: User }) => {
  return (
    <>
      <div className="bg-violt-600 flex flex-col gap-6">
        {user ? (
          <>
            <UserInfoCard user={user} />
            <UserMediaCard user={user} />
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
