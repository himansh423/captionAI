import connectToDatabase from "@/library/db";
import ContactForm from "@/library/modals/ContactForm";
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  connectToDatabase();
  const payload = await req.json();
  const formData = new ContactForm(payload);

  const result = await formData.save();

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from:  process.env.EMAIL_USER,
    to: "himanshuchau423@gmail.com",
    subject: `Booleanix Form Submission from ${payload.name}`,
    text: `
      Name: ${payload.name}
      Email: ${payload.email}
      Message: ${payload.message}
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    return NextResponse.json({
      result,
      success: true,
      message: "Form submitted and email sent.",
    });
  } catch (error) {
    console.error("Failed to send email:", error);
    return NextResponse.json({
      result,
      success: false,
      message: "Form submitted but failed to send email.",
    });
  }
}
