import jwt from "jsonwebtoken";
import connectToDatabase from "@/library/db";
import { NextResponse } from "next/server";
import { serialize } from "cookie"; // Correct import for 'serialize'
import User from "@/library/modals/User";

const JWT_SECRET = process.env.JWT_SECRET;

export async function POST(req: Request) {
  await connectToDatabase();

  try {
    const { email, otp } = await req.json();

    // Find the user with the matching email and otp
    const user = await User.findOne({ email, otp });

    if (!user) {
      return NextResponse.json({ success: false, message: "Invalid OTP" }, { status: 400 });
    }

    // Mark user as verified
    user.isVerified = true;
    user.otp = undefined; // Clear OTP after successful verification
    await user.save();

    // Generate JWT token with username, email, and hashed password
    const token = jwt.sign(
      { userId: user._id, username: user.username, email: user.email, password: user.password },
      JWT_SECRET as string,
      { expiresIn: "7d" } // Token expires in 7 days
    );

    // Set cookie with serialized token
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
