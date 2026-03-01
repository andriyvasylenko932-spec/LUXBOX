import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { BoxSchema } from "@/lib/validators";

export async function GET() {
  const boxes = await prisma.box.findMany({ orderBy: { createdAt: "desc" } });
  return NextResponse.json(boxes);
}

export async function POST(req: Request) {
  const body = await req.json();
  const parsed = BoxSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: parsed.error.message }, { status: 400 });

  const b = parsed.data;
  const created = await prisma.box.create({
    data: {
      ...b,
      gallery: JSON.stringify(b.gallery || []),
      interests: JSON.stringify(b.interests || [])
    }
  });
  return NextResponse.json(created);
}
