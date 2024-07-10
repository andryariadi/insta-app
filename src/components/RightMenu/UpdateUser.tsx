"use client";

import { User } from "@prisma/client";
import { useState } from "react";

const UpdateUser = ({ user }: { user: User }) => {
  const [open, setOpen] = useState(true);
  return (
    <div>
      <span className="text-sky-500 text-xs cursor-pointer" onClick={() => setOpen(!open)}>
        Update
      </span>
      {open && <div className="bg-logo backdrop-blur absolute -left-[59rem] -top-6 w-[95dvw] h-screen flex items-center justify-center">Andry</div>}
    </div>
  );
};

export default UpdateUser;
