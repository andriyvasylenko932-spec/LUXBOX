import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const body = await req.json();
  const status = String(body.status || "").toUpperCase();
  const allowed = ["NEW", "CONFIRMED", "PAID", "SHIPPED", "CANCELED"];
  if (!allowed.includes(status)) return NextResponse.json({ error: "Invalid status" }, { status: 400 });

  const updated = await prisma.order.update({ where: { id: params.id }, data: { status } });
  return NextResponse.json(updated);
}
