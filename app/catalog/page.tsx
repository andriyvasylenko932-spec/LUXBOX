import { Container, Card, Badge } from "@/components/UI";
import ClientCatalog from "./ui";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function CatalogPage() {
  let boxes: any[] = [];
  let dbOk = true;

  try {
    boxes = await prisma.box.findMany({
      where: { isActive: true },
      orderBy: { createdAt: "desc" }
    });
  } catch {
    dbOk = false;
    boxes = [];
  }

  return (
    <section className="bg-transparent">
      <Container className="py-10">
        <h1 className="text-2xl font-semibold">Каталог</h1>
        <p className="mt-2 text-sm text-zinc-700">
          Натисни <span className="font-semibold text-zinc-900">“Замовити”</span> — оплата після підтвердження менеджером.
        </p>

        {!dbOk ? (
          <Card className="mt-6 p-5">
            <Badge>Увага</Badge>
            <p className="mt-2 text-sm text-zinc-700">
              База даних ще не ініціалізована. Запусти: <span className="font-semibold">npx prisma migrate dev --name init</span>
              , потім <span className="font-semibold">npm run db:seed</span>.
            </p>
          </Card>
        ) : null}

        <ClientCatalog
          initial={boxes.map((b) => ({
            id: b.id,
            slug: b.slug,
            title: b.title,
            subtitle: b.subtitle,
            priceUah: b.priceUah,
            coverImage: b.coverImage,
            category: b.category,
            forWhom: b.forWhom,
            occasion: b.occasion || "any",
            interests: b.interests || "[]"
          }))}
        />
      </Container>
    </section>
  );
}
