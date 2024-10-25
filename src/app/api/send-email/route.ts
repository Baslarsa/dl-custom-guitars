import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const { name, email, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json(
        { message: "Required fields are missing" },
        { status: 400 }
      );
    }

    const transporter = nodemailer.createTransport({
      host: "send.one.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: `DL Custom Guitars Website <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER_RECEIVER,
      subject: `Form Submission from ${name} (${email})`,
      text: message,
    };

    await transporter.sendMail(mailOptions);

    // Optional delay of 2 seconds
    await new Promise((resolve) => setTimeout(resolve, 2000));

    return NextResponse.json(
      { message: "Email sent!", status: "OK" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json(
      { message: "Failed to send email" },
      { status: 500 }
    );
  }
}
