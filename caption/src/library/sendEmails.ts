import nodemailer from "nodemailer";

export async function sendEmail({ to, subject, text, html }: { to: string; subject: string; text: string; html: string }) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: `Booleanix - AI Caption Generator`,
    to,
    subject,
    text,
    html,
  };

  return await transporter.sendMail(mailOptions);
}