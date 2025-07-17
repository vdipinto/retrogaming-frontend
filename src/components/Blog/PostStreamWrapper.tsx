"use client";

import dynamic from "next/dynamic";

const PostStream = dynamic(() => import("./PostStream"), {
  ssr: false, // ✅ now this is safe
});

export default function PostStreamWrapper() {
  return <PostStream />;
}
