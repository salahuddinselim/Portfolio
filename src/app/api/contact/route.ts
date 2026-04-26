import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase";
import { Resend } from "resend";

export async function POST(request: Request) {
  try {
    const { name, email, message } = await request.json();

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    const supabase = createClient();
    const resendApiKey = process.env.RESEND_API_KEY;

    // 1. Save message to database
    if (supabase) {
      try {
        const { error: dbError } = await supabase
          .from("messages")
          .insert({
            name,
            email,
            message,
          });

        if (dbError) {
          console.error("Database error:", dbError);
          // Continue anyway - email is more important
        }
      } catch (dbErr) {
        console.error("DB insert error:", dbErr);
      }
    }

    // 2. Send email notification
    const adminEmail = process.env.ADMIN_EMAIL || "selimsalahuddin19@gmail.com";

    if (resendApiKey) {
      const resend = new Resend(resendApiKey);
      
      try {
        const result = await resend.emails.send({
          from: "Portfolio <onboarding@resend.dev>",
          to: adminEmail,
          replyTo: email,
          subject: `New Contact from ${name}`,
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <h2 style="color: #06b6d4;">📬 New Contact Form Submission</h2>
              <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <p><strong style="color: #334155;">Name:</strong> ${name}</p>
                <p><strong style="color: #334155;">Email:</strong> <a href="mailto:${email}">${email}</a></p>
              </div>
              <div style="background: #f1f5f9; padding: 20px; border-radius: 8px;">
                <p style="color: #334155; white-space: pre-wrap;">${message}</p>
              </div>
              <hr style="margin: 20px 0; border: none; border-top: 1px solid #e2e8f0;" />
              <p style="color: #64748b; font-size: 12px;">
                Sent from your portfolio website: <a href="https://salahuddinselim-pi.vercel.app">salahuddinselim-pi.vercel.app</a>
              </p>
            </div>
          `,
          text: `New Contact from ${name}\n\nEmail: ${email}\n\nMessage:\n${message}`,
        });

        console.log("Email sent:", result);
      } catch (emailError: any) {
        console.error("Email error:", emailError?.message || emailError);
        // Still return success since message might be saved
      }
    } else {
      console.log("RESEND_API_KEY not configured, skipping email");
    }

    return NextResponse.json({ success: true, message: "Message sent!" });
  } catch (error) {
    console.error("Contact error:", error);
    return NextResponse.json(
      { error: "Failed to process message" },
      { status: 500 }
    );
  }
}