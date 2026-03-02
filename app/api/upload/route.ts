import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

async function sha1Hex(input: string) {
  const enc = new TextEncoder();
  const buf = await crypto.subtle.digest("SHA-1", enc.encode(input));
  return Array.from(new Uint8Array(buf)).map((b) => b.toString(16).padStart(2, "0")).join("");
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const filename = String(body.filename || "image.png");
    const dataUrl = String(body.dataUrl || "");

    if (!dataUrl.startsWith("data:image/")) {
      return NextResponse.json({ error: "Потрібне зображення (data:image/...)" }, { status: 400 });
    }

    const cloud = process.env.CLOUDINARY_CLOUD_NAME || "";
    const key = process.env.CLOUDINARY_API_KEY || "";
    const secret = process.env.CLOUDINARY_API_SECRET || "";
    if (!cloud || !key || !secret) {
      return NextResponse.json({ error: "Cloudinary env missing" }, { status: 500 });
    }

    const folder = "luxbox";
    const timestamp = Math.floor(Date.now() / 1000);

    const baseName = filename
      .replace(/\.[^.]+$/, "")
      .toLowerCase()
      .replace(/[^a-z0-9_-]+/g, "-")
      .replace(/-+/g, "-")
      .replace(/^-+|-+$/g, "");

    const publicId = `${folder}/${baseName}-${Date.now()}`;

    const toSign = `folder=${folder}&public_id=${publicId}&timestamp=${timestamp}${secret}`;
    const signature = await sha1Hex(toSign);

    const form = new URLSearchParams();
    form.set("file", dataUrl);
    form.set("api_key", key);
    form.set("timestamp", String(timestamp));
    form.set("folder", folder);
    form.set("public_id", publicId);
    form.set("signature", signature);

    const up = await fetch(`https://api.cloudinary.com/v1_1/${cloud}/image/upload`, {
      method: "POST",
      body: form
    });

    const j = await up.json();
    if (!up.ok) {
      return NextResponse.json({ error: j?.error?.message || "Cloudinary upload failed" }, { status: 500 });
    }

    return NextResponse.json({ url: j.secure_url });
  } catch {
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}
