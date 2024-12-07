import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import cookie from "cookie";
import connectToDatabase from "@/library/db";
import User from "@/library/modals/User";

const JWT_SECRET = process.env.JWT_SECRET 

export async function POST(req: Request) {
  await connectToDatabase();

  try {
    const { email, password } = await req.json();

    // Check if the user exists
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return NextResponse.json({ message: "Invalid credentials" }, { status: 400 });
    }

    // Compare the password
    const isPasswordValid = await bcrypt.compare(password, existingUser.password);
    if (!isPasswordValid) {
      return NextResponse.json({ message: "Invalid credentials" }, { status: 400 });
    }

    // Generate a JWT token that contains the user's id, username, and email
    const token = jwt.sign(
      { userId: existingUser._id, username: existingUser.username, email: existingUser.email },
      JWT_SECRET as string,
      { expiresIn: '7d' } // Token valid for 7 days
    );

    // Create the response and set the JWT token in an HTTP-only cookie
    const response = NextResponse.json({
      success:true,
      message: "Login successful",
      userId: existingUser._id,
      username: existingUser.username, // Pass user data to frontend if needed
      email: existingUser.email
    });

    // Set the cookie with the token
    response.headers.set('Set-Cookie', cookie.serialize('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', // Ensure cookie is sent over HTTPS in production
      maxAge: 7 * 24 * 60 * 60, // 7 days in seconds
      sameSite: 'strict', // Protect against CSRF
      path: '/' // Cookie valid across the entire domain
    }));

    return response;

  } catch (error) {
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}