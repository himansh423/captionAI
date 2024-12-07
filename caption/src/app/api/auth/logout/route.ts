import { NextResponse } from "next/server";
import * as cookie from "cookie"; // Import all to access serialize

export async function POST() {
  const response = NextResponse.json({ message: "Logout successful" });

  // Set the cookie header with the serialized token removal
  response.headers.set(
    "Set-Cookie",
    cookie.serialize("token", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      expires: new Date(0), // This effectively removes the cookie
      sameSite: "strict",
      path: "/",
    })
  );

  return response;
}
