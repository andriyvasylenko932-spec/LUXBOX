import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const boxes = [
    {
      slug: "sense-box-him",
      title: "SENSE BOX: Для нього",
      subtitle: "Стриманий, стильний, практичний",
      description:
        "Преміальний бокс з продуманим наповненням. Без випадкових речей — лише те, що реально хочеться отримати.",
      priceUah: 1499,
      coverImage:
        "https://images.unsplash.com/photo-1520975958221-98f1e33f442c?auto=format&fit=crop&w=1200&q=80",
      category: "gift",
      forWhom: "him",
      occasion: "any",
      interests: JSON.stringify(["style", "gadget", "selfcare"])
    },
    {
      slug: "sense-box-her",
      title: "SENSE BOX: Для неї",
      subtitle: "Естетика та комфорт",
      description:
        "Красиве оформлення, приємні деталі, відчуття турботи з першого погляду.",
      priceUah: 1699,
      coverImage:
        "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1200&q=80",
      category: "beauty",
      forWhom: "her",
      occasion: "any",
      interests: JSON.stringify(["beauty", "selfcare", "home"])
    },
    {
      slug: "sense-box-geek",
      title: "SENSE BOX: Geek",
      subtitle: "Для гіків та фанатів деталей",
      description:
        "Тематичний бокс з характером. Ідеальний подарунок тим, хто любить «вау» від дрібниць.",
      priceUah: 1899,
      coverImage:
        "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80",
      category: "geek",
      forWhom: "all",
      occasion: "birthday",
      interests: JSON.stringify(["geek", "games", "tech"])
    }
  ];

  for (const b of boxes) {
    await prisma.box.upsert({
      where: { slug: b.slug },
      update: {},
      create: b as any
    });
  }

  await prisma.promoCode.upsert({
    where: { code: "WELCOME10" },
    update: {},
    create: { code: "WELCOME10", type: "percent", value: 10, maxUses: 100, isActive: true }
  });
}

main()
  .then(async () => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
