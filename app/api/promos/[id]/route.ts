import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { PromoSchema } from "@/lib/validators";

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const body = await req.json();
  const parsed = PromoSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: parsed.error.message }, { status: 400 });

  const updated = await prisma.promoCode.update({ where: { id: params.id }, data: parsed.data });
  return NextResponse.json(updated);
}

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  await prisma.promoCode.delete({ where: { id: params.id } });
  return NextResponse.json({ ok: true });
}
