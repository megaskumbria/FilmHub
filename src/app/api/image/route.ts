import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const path = request.nextUrl.searchParams.get("path");

  if (!path) {
    return new NextResponse("Missing path", { status: 400 });
  }

  const response = await fetch(`http://localhost:3001/images?path=${path}`);

  if (!response.ok) {
    return new NextResponse("Image not found", { status: 404 });
  }

  const buffer = await response.arrayBuffer();
  const contentType = response.headers.get("content-type") ?? "image/jpeg";

  return new NextResponse(buffer, {
    headers: { "content-type": contentType },
  });
}
