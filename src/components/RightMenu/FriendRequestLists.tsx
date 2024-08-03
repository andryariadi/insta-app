"use client";

import { acceptFollowReq, declineFollowReq } from "@/libs/action";
import { FollowRequest, User } from "@prisma/client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useOptimistic, useState } from "react";

type RequestAndUser = FollowRequest & { sender: User };

const FriendRequestLists = ({ requests }: { requests: RequestAndUser[] }) => {
  const [requestState, setRequestState] = useState(requests);
  // const router = useRouter();

  const accept = async (requestId: string, userId: string) => {
    removeOptimisticRequest(requestId);
    try {
      await acceptFollowReq(userId);
      setRequestState((prev) => prev.filter((req) => req.id !== requestId));
    } catch (error) {
      console.log(error);
    }
  };

  const decline = async (requestId: string, userId: string) => {
    removeOptimisticRequest(requestId);
    try {
      await declineFollowReq(userId);
      setRequestState((prev) => prev.filter((req) => req.id !== requestId));
    } catch (error) {
      console.log(error);
    }
  };

  const [optimisticRequest, removeOptimisticRequest] = useOptimistic(requestState, (state, value: string) => state.filter((req) => req.id !== value));

  console.log(requests, "<----direquestlist");

  return (
    <>
      {optimisticRequest.map((request) => (
        <div key={request.id} className="bg-ambr-500 flex items-center justify-between">
          <div className="bg-sy-600 flex items-center gap-4">
            <Image src={request.sender.avatar || "/noAvatar.png"} alt="User" width={40} height={40} className="w-10 h-10 rounded-full object-cover" />
            <span className="font-semibold cursor-pointer">{request.sender.name && request.sender.surname ? `${request.sender.name} ${request.sender.surname}` : request.sender.username}</span>
          </div>
          <div className="bg-gren-600 flex items-center gap-3">
            <form action={() => accept(request.id, request.senderId)}>
              <button>
                <Image src="/accept.png" alt="User" width={20} height={20} className="cursor-pointer" />
              </button>
            </form>

            <form action={() => decline(request.id, request.senderId)}>
              <button>
                <Image src="/reject.png" alt="User" width={20} height={20} className="cursor-pointer" />
              </button>
            </form>
          </div>
        </div>
      ))}
    </>
  );
};

export default FriendRequestLists;
