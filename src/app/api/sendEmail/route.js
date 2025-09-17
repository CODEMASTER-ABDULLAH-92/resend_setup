import { Resend } from "resend";

export async function POST(req) {
  try {
    const body = await req.json();
    const { name, email, message } = body;

    const resend = new Resend(process.env.RESEND_KEY);
    const userMail = await resend.emails.send({
      from: "Muhammad Abdullah <onboarding@resend.dev>", // must be verified sender
      to: email, // the user's email from the form
      subject: "✅ We received your message",
      text: `Hi ${name},\n\nThank you for contacting us. We received your message:\n\n"${message}"\n\nWe will get back to you soon.\n\n- Muhammad Abdullah`,
    });

    return new Response(
      JSON.stringify({
        success: true,
        userMail,
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error sending email:", error);
    return new Response(
      JSON.stringify({ success: false, error }),
      { status: 500 }
    );
  }
}






