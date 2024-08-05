"use client";

import { useFormStatus } from "react-dom";
import { LoaderBtn } from "../Loading";

const AddPostBtn = () => {
  const { pending } = useFormStatus();
  return (
    <button disabled={pending} type="submit" className={`bg-logo disabled:cursor-not-allowed text-white text-xs p-2 rounded-lg`}>
      {pending ? <LoaderBtn /> : "Send"}
    </button>
  );
};

export default AddPostBtn;
