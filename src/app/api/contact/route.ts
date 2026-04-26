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
    const resend = new Resend(process.env.RESEND_API_KEY);

    // 1. Save message to database
    const { error: dbError } = await supabase
      .from("messages")
      .insert({
        name,
        email,
        message,
        created_at: new Date().toISOString(),
      });

    if (dbError) {
      console.error("Database error:", dbError);
    }

    // 2. Send email notification
    const adminEmail = process.env.ADMIN_EMAIL || "salahuddin.selim@gmail.com";

    if (process.env.RESEND_API_KEY) {
      try {
        await resend.emails.send({
          from: "Portfolio Contact <onboarding@resend.dev>",
          to: [adminEmail],
          subject: `New Contact: ${name}`,
          html: `
            <h2>New Contact Form Submission</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Message:</strong></p>
            <p>${message}</p>
            <hr />
            <p style="color: #666; font-size: 12px;">
              This message was sent from your portfolio website.
              <a href="https://salahuddinselim-pi.vercel.app/admin/messages">View in Admin Panel</a>
            </p>
          `,
        });
      } catch (emailError) {
        console.error("Email error:", emailError);
      }
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact error:", error);
    return NextResponse.json(
      { error: "Failed to send message" },
      { status: 500 }
    );
  }
}