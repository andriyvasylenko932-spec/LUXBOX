import Image from "next/image";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { Container, Card, Button, Badge } from "@/components/UI";
import { formatUah, safeJsonArray } from "@/lib/utils";

export const dynamic = "force-dynamic";

export default async function BoxPage({ params }: { params: { slug: string } }) {
  const box = await prisma.box.findUnique({ where: { slug: params.slug } });
  if (!box || !box.isActive) {
    return (
      <Container className="py-16">
        <div className="text-sm text-zinc-600">Бокс не знайдено.</div>
        <Link href="/catalog" className="mt-4 inline-block text-sm font-medium underline">
          Повернутись в каталог
        </Link>
      </Container>
    );
  }

  const gallery = safeJsonArray(box.gallery);

  return (
    <section className="bg-white">
      <Container className="py-10">
        <div className="grid gap-8 md:grid-cols-2">
          <Card className="overflow-hidden">
            <div className="relative aspect-[4/3]">
              <Image src={box.coverImage} alt={box.title} fill className="object-cover" />
            </div>
            {gallery.length ? (
              <div className="grid grid-cols-3 gap-2 p-4">
                {gallery.slice(0, 3).map((src) => (
                  <div key={src} className="relative aspect-[4/3] overflow-hidden rounded-xl">
                    <Image src={src} alt="gallery" fill className="object-cover" />
                  </div>
                ))}
              </div>
            ) : null}
          </Card>

          <div>
            <div className="flex flex-wrap gap-2">
              <Badge>{box.category}</Badge>
              <Badge>{box.forWhom}</Badge>
              <Badge>Оплата після підтвердження</Badge>
            </div>

            <h1 className="mt-4 text-3xl font-semibold tracking-tight">{box.title}</h1>
            {box.subtitle ? <p className="mt-2 text-zinc-600">{box.subtitle}</p> : null}

            <div className="mt-6 text-2xl font-semibold">{formatUah(box.priceUah)}</div>
            <div className="mt-2 text-sm text-zinc-600">
              Натискаючи <span className="font-medium text-zinc-900">“Замовити”</span>, ви створюєте заявку.
              Оплата — після підтвердження менеджером.
            </div>

            <div className="mt-6 flex gap-3">
              <Link href={`/checkout?box=${box.slug}`}><Button>Замовити</Button></Link>
              <Link href="/delivery"><Button variant="ghost">Як працює</Button></Link>
            </div>

            <Card className="mt-8 p-5">
              <div className="text-sm font-semibold">Опис</div>
              <p className="mt-2 text-sm text-zinc-600 whitespace-pre-line">{box.description}</p>
            </Card>

            <Card className="mt-4 p-5">
              <div className="text-sm font-semibold">Що далі</div>
              <ol className="mt-2 list-decimal pl-5 text-sm text-zinc-600">
                <li>Заявка на сайті</li>
                <li>Менеджер підтверджує деталі</li>
                <li>Оплата по реквізитах/посиланню</li>
                <li>Збір і відправка</li>
              </ol>
            </Card>
          </div>
        </div>
      </Container>
    </section>
  );
}
