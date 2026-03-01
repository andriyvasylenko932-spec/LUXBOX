import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { OrderSchema } from "@/lib/validators";
import { applyPromo } from "@/lib/pricing";

export async function GET() {
  const orders = await prisma.order.findMany({ orderBy: { createdAt: "desc" } });
  return NextResponse.json(orders);
}

export async function POST(req: Request) {
  const body = await req.json();
  const parsed = OrderSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: parsed.error.message }, { status: 400 });

  const d = parsed.data;
  const box = await prisma.box.findUnique({ where: { id: d.boxId } });
  if (!box) return NextResponse.json({ error: "Box not found" }, { status: 404 });

  const { finalPrice, promo } = await applyPromo(box.priceUah, d.promoCode);

  if (promo) {
    await prisma.promoCode.update({
      where: { code: promo.code },
      data: { usedCount: { increment: 1 } }
    });
  }

  const created = await prisma.order.create({
    data: {
      boxId: box.id,
      boxTitle: box.title,
      boxPriceUah: box.priceUah,
      finalPriceUah: finalPrice,
      promoCode: promo?.code || null,
      customerName: d.customerName,
      phone: d.phone,
      contactPref: d.contactPref,
      city: d.city,
      delivery: d.delivery,
      branch: d.branch,
      comment: d.comment || null
    }
  });

  return NextResponse.json({ id: created.id });
}
