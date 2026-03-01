import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { Container, Card } from "@/components/UI";

export const dynamic = "force-dynamic";

export default async function AdminBoxes() {
  const boxes = await prisma.box.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <Container className="py-10">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Бокси</h1>
        <Link href="/admin/boxes/new" className="rounded-2xl bg-zinc-900 px-4 py-2 text-sm text-white">
          Додати
        </Link>
      </div>

      <div className="mt-6 grid gap-3">
        {boxes.map((b) => (
          <Link key={b.id} href={`/admin/boxes/${b.id}`}>
            <Card className="p-5">
              <div className="text-sm font-semibold">{b.title}</div>
              <div className="mt-1 text-xs text-zinc-500">
                {b.slug} • {b.priceUah} ₴ • {b.isActive ? "active" : "hidden"}
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </Container>
  );
}
