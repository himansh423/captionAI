import bcrypt from "bcryptjs";

import connectToDatabase from "@/library/db";

import { NextResponse } from "next/server";
import User from "@/library/modals/User";
import { sendEmail } from "@/library/sendEmails";


export async function POST(req: Request) {
  await connectToDatabase();

  try {
    const {name, email, password } = await req.json();

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json({ success: false, message: "User already exists" }, { status: 400 });
    }
 
    const hashedPassword = await bcrypt.hash(password, 12);
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    // Save user temporarily with OTP (not yet verified)
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      otp,
      isVerified: false // Add a field to track whether the user is verified
    });

    await newUser.save();

    // Send OTP email
    await sendEmail({
      to: email,
      subject: "OTP from Clyphix",
      text: `Your OTP code is ${otp}, use it within 15 minutes.`,
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6;">
          <h2>OTP Verification</h2>
          <p>Hello ${name},</p>
          <p>Your OTP code is <strong>${otp}</strong>. Please use it within the next 15 minutes to verify your account.</p>
          <p>If you did not request this OTP, please ignore this email.</p>
          <br>
          <p>Thanks,</p>
          <p>The Clyphix Team</p>
        </div>
      `,
    });

    // Set a timeout to delete the user if OTP is not verified within 2 minutes
    setTimeout(async () => {
      const user = await User.findOne({ email });
      
      if (user && !user.isVerified) {
        await User.deleteOne({ email });

        // Send an email notifying the user that their data was deleted
        await sendEmail({
          to: email,
          subject: "Signup Expired",
          text: `Hello ${name}, since you did not verify your email within 2 minutes, your signup process was canceled. Please try signing up again.`,
          html: `
            <div style="font-family: Arial, sans-serif; line-height: 1.6;">
              <h2>Signup Expired</h2>
              <p>Hello ${name},</p>
              <p>Since you did not verify your email within 2 minutes, your signup process was canceled and your data has been deleted.</p>
              <p>Please try signing up again to create your account.</p>
              <br>
              <p>Thanks,</p>
              <p>The Clyphix Team</p>
            </div>
          `,
        });
      }
    }, 5 * 60 * 1000); // 5 minutes

    return NextResponse.json({ success: true, message: "OTP sent to your email" }, { status: 200 });
  } catch (error) {
    if(error instanceof Error){
      console.log(error)
    }
    return NextResponse.json({ message: "Server error", error:  "An unknown error occurred" }, { status: 500 });
  }
} 