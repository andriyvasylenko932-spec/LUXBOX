import Link from "next/link";
import { Container, Button, Card, Badge } from "@/components/UI";
import Hero3D from "@/components/Hero3D";

export default function HomePage() {
  return (
    <>
      <section className="bg-transparent">
        <Container className="py-14 md:py-20">
          <div className="grid items-center gap-10 md:grid-cols-2">
            <div>
              <Badge>Преміальні бокси • без випадкового наповнення</Badge>

              <h1 className="mt-4 text-4xl font-extrabold tracking-tight md:text-5xl">
                Яскраві бокси, які реально хочеться замовити
              </h1>

              <p className="mt-4 text-base text-zinc-700">
                Естетика + користь + чесність.
                <br />
                <span className="font-semibold text-zinc-900">
                  Оплата — після підтвердження менеджером.
                </span>
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/catalog">
                  <Button>Замовити</Button>
                </Link>
                <Link href="/delivery">
                  <Button variant="glass">Як це працює</Button>
                </Link>
              </div>

              <div className="mt-8 grid grid-cols-2 gap-3 text-sm text-zinc-700">
                <Card className="p-4">
                  <div className="font-semibold text-zinc-900">Люкс-пакування</div>
                  <div className="mt-1">Вигляд “вау” з першого погляду</div>
                </Card>
                <Card className="p-4">
                  <div className="font-semibold text-zinc-900">Без “трешу”</div>
                  <div className="mt-1">Лише те, що реально хочеться</div>
                </Card>
              </div>
            </div>

            <Hero3D />
          </div>
        </Container>
      </section>

      <section className="border-t border-white/50 bg-white/30 backdrop-blur">
        <Container className="py-12">
          <div className="flex items-end justify-between gap-4">
            <div>
              <div className="text-sm font-semibold">Сценарії</div>
              <div className="mt-1 text-sm text-zinc-600">Швидкий вибір за 1 клік</div>
            </div>
            <Link
              href="/catalog"
              className="text-sm font-semibold text-zinc-900 underline underline-offset-4"
            >
              Усі бокси
            </Link>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-4">
            {[
              ["Для нього", "/catalog?forWhom=him"],
              ["Для неї", "/catalog?forWhom=her"],
              ["Для дитини", "/catalog?forWhom=kid"],
              ["Корпоратив", "/catalog?category=corporate"]
            ].map(([t, href]) => (
              <Link key={t} href={href}>
                <Card className="p-5 transition hover:-translate-y-1 hover:shadow-soft">
                  <div className="text-sm font-semibold">{t}</div>
                  <div className="mt-2 text-sm text-zinc-600">Вибрати →</div>
                </Card>
              </Link>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
