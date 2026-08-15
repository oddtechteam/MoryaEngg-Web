import { NextResponse } from "next/server";

export type ContactPayload = {
  name: string;
  company?: string;
  email: string;
  phone: string;
  projectType: string;
  message: string;
};

export async function POST(request: Request) {
  let data: Partial<ContactPayload>;

  try {
    data = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const { name, email, phone, projectType, message } = data;

  if (!name || !email || !phone || !projectType || !message) {
    return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
  }

  const scriptUrl = process.env.GOOGLE_SCRIPT_URL;
  if (!scriptUrl) {
    console.error("GOOGLE_SCRIPT_URL is not configured.");
    return NextResponse.json({ error: "Server is not configured." }, { status: 500 });
  }

  try {
    const res = await fetch(scriptUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const result = await res.json().catch(() => null);

    if (!res.ok || !result?.ok) {
      console.error("Google Apps Script rejected the enquiry:", result);
      return NextResponse.json({ error: "Failed to submit enquiry." }, { status: 502 });
    }
  } catch (err) {
    console.error("Failed to reach Google Apps Script:", err);
    return NextResponse.json({ error: "Failed to submit enquiry." }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
