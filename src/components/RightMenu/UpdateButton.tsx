"use client";

import { useFormStatus } from "react-dom";

const UpdateButton = () => {
  const { pending } = useFormStatus();

  return (
    <button className="bg-sky-500 text-white text-xs p-3 rounded-md disabled:opacity-50 disabled:cursor-not-allowed" disabled={pending}>
      {pending ? "Updating..." : "Update"}
    </button>
  );
};

export default UpdateButton;
