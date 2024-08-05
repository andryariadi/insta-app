"use client";

import { useFormStatus } from "react-dom";

const AddPostBtn = () => {
  const { pending } = useFormStatus();
  return (
    <button disabled={pending} type="submit" className="bg-blue-500 disabled:bg-blue-300 disabled:cursor-not-allowed text-white text-xs p-2 rounded-lg">
      {pending ? "Sending..." : "Send"}
    </button>
  );
};

export default AddPostBtn;
