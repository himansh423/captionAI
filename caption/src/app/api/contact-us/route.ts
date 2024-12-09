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
    from: process.env.EMAIL_USER,
    to: "himanshuchau423@gmail.com",
    subject: `Booleanix Form Submission from ${payload.name}`,
    text: `
      Name: ${payload.name}
      Email: ${payload.email}
      Message: ${payload.message}
    `,
    html: `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Booleanix Form Submission</title>
      </head>
      <body style="margin: 0; padding: 0; background-color: #000000; font-family: Arial, sans-serif;">
        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px; margin: 20px auto; background-color: #1A1A1A; border-radius: 8px; overflow: hidden;">
          <tr>
            <td style="padding: 40px 30px; text-align: center; background-color: #4B0082;">
              <h1 style="color: #FFFFFF; margin: 0; font-size: 28px; font-weight: bold;">Booleanix Form Submission</h1>
            </td>
          </tr>
          <tr>
            <td style="padding: 30px;">
              <table border="0" cellpadding="0" cellspacing="0" width="100%">
                <tr>
                  <td style="padding: 10px 0; border-bottom: 1px solid #333333;">
                    <p style="margin: 0; font-size: 16px; color: #9370DB;">Name:</p>
                    <p style="margin: 5px 0 0; font-size: 18px; color: #FFFFFF;">${payload.name}</p>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 10px 0; border-bottom: 1px solid #333333;">
                    <p style="margin: 0; font-size: 16px; color: #9370DB;">Email:</p>
                    <p style="margin: 5px 0 0; font-size: 18px; color: #FFFFFF;">${payload.email}</p>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 10px 0;">
                    <p style="margin: 0; font-size: 16px; color: #9370DB;">Message:</p>
                    <p style="margin: 5px 0 0; font-size: 18px; color: #FFFFFF; white-space: pre-wrap;">${payload.message}</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td style="background-color: #4B0082; padding: 20px; text-align: center;">
              <p style="margin: 0; font-size: 14px; color: #FFFFFF;">&copy; 2023 Booleanix. All rights reserved.</p>
            </td>
          </tr>
        </table>
      </body>
      </html>
    `
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
