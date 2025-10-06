import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const { sender, gift, value } = await req.json();

    await resend.emails.send({
      from: "onboarding@resend.dev",
      to: "matheuscapraro@gmail.com",
      subject: "Hello World",
      html: "<p>Congrats on sending your <strong>first email</strong>!</p>",
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { success: false, message: "Error sendin email" },
      { status: 500 }
    );
  }
}
