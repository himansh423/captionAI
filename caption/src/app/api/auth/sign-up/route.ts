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
      subject: "OTP from Booleanix",
      text: `Your OTP code is ${otp}, use it within 15 minutes.`,
      html: `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>OTP Verification</title>
        </head>
        <body style="margin: 0; padding: 0; background-color: #000000; color: #E0E0E0; font-family: Arial, sans-serif; line-height: 1.6;">
          <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px; margin: 0 auto; background-color: #1A1A1A; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
            <tr>
              <td style="padding: 40px 30px; text-align: center; background-color: #4B0082;">
                <h1 style="color: #FFFFFF; margin: 0; font-size: 28px; font-weight: bold;">OTP Verification</h1>
              </td>
            </tr>
            <tr>
              <td style="padding: 30px;">
                <p style="margin-bottom: 20px; font-size: 16px;">Hello ${name},</p>
                <p style="margin-bottom: 20px; font-size: 16px;">Your OTP code is:</p>
                <p style="background-color: #4B0082; color: #FFFFFF; font-size: 24px; font-weight: bold; padding: 10px; text-align: center; border-radius: 4px; margin-bottom: 20px;">${otp}</p>
                <p style="margin-bottom: 20px; font-size: 16px;">Please use this code within the next 5 minutes to verify your account.</p>
                <p style="margin-bottom: 20px; font-size: 14px; color: #B0B0B0;">If you did not request this OTP, please ignore this email.</p>
                <hr style="border: none; border-top: 1px solid #333333; margin: 30px 0;">
                <p style="margin-bottom: 10px; font-size: 16px;">Thanks,</p>
                <p style="margin-bottom: 0; font-size: 16px; color: #9370DB;">The Booleanix Team</p>
              </td>
            </tr>
            <tr>
              <td style="background-color: #4B0082; padding: 20px; text-align: center;">
                <p style="margin: 0; font-size: 14px; color: #FFFFFF;">&copy; 2024 Booleanix. All rights reserved.</p>
              </td>
            </tr>
          </table>
        </body>
        </html>
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
          subject: "Signup Expired - Booleanix",
          text: `Hello ${name}, since you did not verify your email within 2 minutes, your signup process was canceled. Please try signing up again.`,
          html: `
            <!DOCTYPE html>
            <html lang="en">
            <head>
              <meta charset="UTF-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <title>Signup Expired - Booleanix</title>
            </head>
            <body style="margin: 0; padding: 0; background-color: #000000; color: #E0E0E0; font-family: Arial, sans-serif; line-height: 1.6;">
              <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px; margin: 20px auto; background-color: #1A1A1A; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
                <tr>
                  <td style="padding: 40px 30px; text-align: center; background-color: #4B0082;">
                    <h1 style="color: #FFFFFF; margin: 0; font-size: 28px; font-weight: bold;">Signup Expired</h1>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 30px;">
                    <p style="margin-bottom: 20px; font-size: 16px;">Hello ${name},</p>
                    <p style="margin-bottom: 20px; font-size: 16px;">We regret to inform you that your signup process has expired.</p>
                    <div style="background-color: #2D0047; border-left: 4px solid #9370DB; padding: 15px; margin-bottom: 20px;">
                      <p style="margin: 0; font-size: 16px;">Since you did not verify your email within 2 minutes, your signup process was canceled and your data has been deleted.</p>
                    </div>
                    <p style="margin-bottom: 20px; font-size: 16px;">To create your account, please try signing up again.</p>
                    <a href="#" style="display: inline-block; background-color: #4B0082; color: #FFFFFF; text-decoration: none; padding: 10px 20px; border-radius: 4px; font-size: 16px; font-weight: bold;">Sign Up Again</a>
                    <hr style="border: none; border-top: 1px solid #333333; margin: 30px 0;">
                    <p style="margin-bottom: 10px; font-size: 16px;">Thanks,</p>
                    <p style="margin-bottom: 0; font-size: 16px; color: #9370DB;">The Booleanix Team</p>
                  </td>
                </tr>
                <tr>
                  <td style="background-color: #4B0082; padding: 20px; text-align: center;">
                    <p style="margin: 0; font-size: 14px; color: #FFFFFF;">&copy; 2024 Booleanix. All rights reserved.</p>
                  </td>
                </tr>
              </table>
            </body>
            </html>
          `,
        });
      }
    }, 5 * 60 * 1000); // 5 minutes

    return NextResponse.json({ success: true, message: "OTP sent to your email" }, { status: 200 });
  } catch (error) {
    if(error instanceof Error){
      return NextResponse.json({ message: "Server error", error:  error }, { status: 500 });
    }
   
  }
} 