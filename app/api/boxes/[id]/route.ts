import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { BoxSchema } from "@/lib/validators";

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const body = await req.json();
  const parsed = BoxSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: parsed.error.message }, { status: 400 });

  const b = parsed.data;
  const updated = await prisma.box.update({
    where: { id: params.id },
    data: {
      ...b,
      gallery: JSON.stringify(b.gallery || []),
      interests: JSON.stringify(b.interests || [])
    }
  });
  return NextResponse.json(updated);
}

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  await prisma.box.delete({ where: { id: params.id } });
  return NextResponse.json({ ok: true });
}
