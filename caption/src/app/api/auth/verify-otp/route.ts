import jwt from "jsonwebtoken";
import connectToDatabase from "@/library/db";
import { NextResponse } from "next/server";
import { serialize } from "cookie";
import User from "@/library/modals/User";

const JWT_SECRET = process.env.JWT_SECRET;

export async function POST(req: Request) {
  await connectToDatabase();

  try {
    const { email, otp } = await req.json();

    // Finding the user with the matching email and otp
    const user = await User.findOne({ email, otp });

    if (!user) {
      return NextResponse.json({ success: false, message: "Invalid OTP" }, { status: 400 });
    }

    // Marking user as verified
    user.isVerified = true;
    user.otp = undefined; 
    await user.save();

    // Generating JWT token with username, email, and hashed password
    const token = jwt.sign(
      { userId: user._id, username: user.username, email: user.email, password: user.password },
      JWT_SECRET as string,
      { expiresIn: "7d" } 
    );

  
    const serializedCookie = serialize("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 7 * 24 * 60 * 60, // 7 days
      sameSite: "strict",
      path: "/",
    });

    const response = NextResponse.json(
      { success: true, message: "OTP verified, login successful" },
      { status: 200 }
    );

    response.headers.set("Set-Cookie", serializedCookie);

    return response;
  } catch (error) {
    if (error instanceof Error) {
      console.error(error);
    }
    return NextResponse.json({ message: "Server error", error: "An unknown error occurred" }, { status: 500 });
  }
}
