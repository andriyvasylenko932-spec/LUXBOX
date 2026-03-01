import { prisma } from "@/lib/prisma";
import { Container, Card } from "@/components/UI";
import CheckoutForm from "./ui";

export const dynamic = "force-dynamic";

export default async function CheckoutPage({ searchParams }: { searchParams: { box?: string } }) {
  const slug = searchParams.box || "";
  const box = slug ? await prisma.box.findUnique({ where: { slug } }) : null;

  if (!box) {
    return (
      <Container className="py-16">
        <div className="text-sm text-zinc-600">Спочатку обери бокс у каталозі.</div>
      </Container>
    );
  }

  return (
    <section className="bg-white">
      <Container className="py-10">
        <h1 className="text-2xl font-semibold">Оформлення</h1>
        <p className="mt-2 text-sm text-zinc-600">
          Оплата після підтвердження менеджером. Кнопка: <span className="font-medium text-zinc-900">“Замовити”</span>.
        </p>

        <div className="mt-6 grid gap-6 md:grid-cols-2">
          <Card className="p-6">
            <div className="text-sm font-semibold">{box.title}</div>
            <div className="mt-2 text-sm text-zinc-600">Ціна: {box.priceUah} ₴</div>
            <div className="mt-4 text-xs text-zinc-500">
              Після заявки менеджер підтвердить деталі і надішле реквізити для оплати.
            </div>
          </Card>

          <Card className="p-6">
            <CheckoutForm box={{ id: box.id, title: box.title, priceUah: box.priceUah }} />
          </Card>
        </div>
      </Container>
    </section>
  );
}
