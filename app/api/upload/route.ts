import { NextResponse } from "next/server";
import { mkdir, writeFile } from "fs/promises";
import path from "path";

export const dynamic = "force-dynamic";

function safeName(name: string) {
  return name.toLowerCase().replace(/[^a-z0-9._-]+/g, "-").replace(/-+/g, "-").replace(/^-+|-+$/g, "");
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const filename = String(body.filename || "image.png");
    const dataUrl = String(body.dataUrl || "");

    if (!dataUrl.startsWith("data:image/")) {
      return NextResponse.json({ error: "Потрібне зображення (data:image/...)" }, { status: 400 });
    }

    const base64 = dataUrl.split(",")[1] || "";
    const buffer = Buffer.from(base64, "base64");

    if (buffer.length > 5 * 1024 * 1024) {
      return NextResponse.json({ error: "Файл завеликий (макс 5MB)" }, { status: 400 });
    }

    const lower = filename.toLowerCase();
    const ext =
      lower.endsWith(".png") ? ".png" :
      (lower.endsWith(".jpg") || lower.endsWith(".jpeg")) ? ".jpg" :
      lower.endsWith(".webp") ? ".webp" : ".png";

    const stamp = Date.now();
    const finalName = `${safeName(path.parse(filename).name)}-${stamp}${ext}`;

    const uploadDir = path.join(process.cwd(), "public", "uploads");
    await mkdir(uploadDir, { recursive: true });
    await writeFile(path.join(uploadDir, finalName), buffer);

    return NextResponse.json({ url: `/uploads/${finalName}` });
  } catch (e) {
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}
