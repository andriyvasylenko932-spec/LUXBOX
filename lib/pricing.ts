import { prisma } from "@/lib/prisma";

export async function applyPromo(basePrice: number, code?: string | null) {
  const trimmed = (code || "").trim().toUpperCase();
  if (!trimmed) return { finalPrice: basePrice, promo: null as null | { code: string; discount: number } };

  const promo = await prisma.promoCode.findUnique({ where: { code: trimmed } });
  if (!promo || !promo.isActive) return { finalPrice: basePrice, promo: null };

  if (promo.maxUses > 0 && promo.usedCount >= promo.maxUses) {
    return { finalPrice: basePrice, promo: null };
  }

  let discount = 0;
  if (promo.type === "percent") discount = Math.round((basePrice * promo.value) / 100);
  if (promo.type === "fixed") discount = promo.value;

  const finalPrice = Math.max(1, basePrice - discount);
  return { finalPrice, promo: { code: promo.code, discount } };
}
