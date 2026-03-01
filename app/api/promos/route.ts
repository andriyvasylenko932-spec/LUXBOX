import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { PromoSchema } from "@/lib/validators";

export async function GET() {
  const promos = await prisma.promoCode.findMany({ orderBy: { createdAt: "desc" } });
  return NextResponse.json(promos);
}

export async function POST(req: Request) {
  const body = await req.json();
  const parsed = PromoSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: parsed.error.message }, { status: 400 });

  const created = await prisma.promoCode.create({ data: parsed.data });
  return NextResponse.json(created);
}
