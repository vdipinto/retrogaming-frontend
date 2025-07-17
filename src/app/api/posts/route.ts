// This is the API route that fetches the posts from the WordPress database.
//Why not fetch directly in client?
// getAllPosts() uses server-only logic

import { getAllPosts } from "@/queries/posts/getAllPosts";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);

  const limit = parseInt(searchParams.get("limit") || "10", 10);
  const after = searchParams.get("after") || undefined;

  try {
    const { posts } = await getAllPosts(limit, after);

    return NextResponse.json({ posts });
  } catch (error) {
    console.error("Failed to fetch posts:", error);
    return NextResponse.json(
      { error: "Failed to fetch posts" },
      { status: 500 }
    );
  }
}
