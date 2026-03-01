import { z } from "zod";

const UrlOrPath = z.string().min(1).refine((v) => {
  // allow absolute URLs and local paths like /uploads/...
  if (v.startsWith("/")) return true;
  try {
    new URL(v);
    return true;
  } catch {
    return false;
  }
}, "Must be a valid URL or a local path (e.g. /uploads/image.png)");

export const BoxSchema = z.object({
  slug: z.string().min(2),
  title: z.string().min(2),
  subtitle: z.string().optional().nullable(),
  description: z.string().min(10),
  priceUah: z.number().int().min(1),
  coverImage: UrlOrPath,
  gallery: z.array(UrlOrPath).default([]),
  category: z.string().min(1),
  forWhom: z.string().default("all"),
  occasion: z.string().default("any"),
  interests: z.array(z.string()).default([]),
  isActive: z.boolean().default(true)
});

export const PromoSchema = z.object({
  code: z.string().min(2).transform((s) => s.toUpperCase().trim()),
  type: z.enum(["percent", "fixed"]),
  value: z.number().int().min(1),
  maxUses: z.number().int().min(0).default(0),
  isActive: z.boolean().default(true)
});

export const OrderSchema = z.object({
  boxId: z.string().min(1),
  promoCode: z.string().optional().nullable(),
  customerName: z.string().min(2),
  phone: z.string().min(6),
  contactPref: z.enum(["telegram", "instagram", "viber", "phone"]),
  city: z.string().min(2),
  delivery: z.enum(["nova_poshta", "ukr_poshta"]),
  branch: z.string().min(2),
  comment: z.string().optional().nullable()
});
