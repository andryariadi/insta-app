import { User } from "@prisma/client";
import Ads from "./Ads";
import Birthdays from "./Birthdays";
import FriendRequests from "./FriendRequests";
import UserInfoCard from "./UserInfoCard";
import UserMediaCard from "./UserMediaCard";
import { Suspense } from "react";
import dynamic from "next/dynamic";
import { Loading } from "../Loading";

// const Loading = dynamic(() => import("../Loading"), { ssr: false });

const RightMenu = ({ user }: { user?: User }) => {
  console.log(user, "<----rightmenu");

  return (
    <div className="bg-violt-600 flex flex-col gap-6">
      {user ? (
        <>
          <Suspense fallback={<Loading />}>
            <UserInfoCard user={user} />
          </Suspense>
          <Suspense fallback={<Loading />}>
            <UserMediaCard user={user} />
          </Suspense>
        </>
      ) : null}
      <FriendRequests />
      <Birthdays />
      <Ads size="lg" />
    </div>
  );
};

export default RightMenu;
