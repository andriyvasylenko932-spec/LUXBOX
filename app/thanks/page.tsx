import Link from "next/link";
import { Container, Card, Badge } from "@/components/UI";

export default function ThanksPage({ searchParams }: { searchParams: { id?: string } }) {
  return (
    <section className="bg-white">
      <Container className="py-16">
        <Card className="p-8">
          <Badge>Заявку прийнято ✅</Badge>
          <h1 className="mt-4 text-2xl font-semibold">Дякуємо!</h1>
          <p className="mt-2 text-sm text-zinc-600">
            Менеджер зв’яжеться з вами, підтвердить деталі та надішле реквізити/посилання для оплати.
          </p>
          {searchParams.id ? <p className="mt-4 text-xs text-zinc-500">ID заявки: {searchParams.id}</p> : null}
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/catalog" className="rounded-2xl bg-zinc-900 px-5 py-3 text-sm font-medium text-white">
              В каталог
            </Link>
            <Link href="/delivery" className="rounded-2xl border border-zinc-200 px-5 py-3 text-sm">
              Доставка і оплата
            </Link>
          </div>
        </Card>
      </Container>
    </section>
  );
}
