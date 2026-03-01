import Link from "next/link";
import { Container, Card } from "@/components/UI";

export default function AdminHome() {
  return (
    <section className="bg-white">
      <Container className="py-10">
        <h1 className="text-2xl font-semibold">Admin</h1>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {[
            ["Бокси", "/admin/boxes"],
            ["Промокоди", "/admin/promos"],
            ["Заявки", "/admin/orders"]
          ].map(([t, href]) => (
            <Link key={href} href={href}>
              <Card className="p-6 transition hover:-translate-y-1">
                <div className="text-sm font-semibold">{t}</div>
                <div className="mt-2 text-sm text-zinc-600">Відкрити →</div>
              </Card>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
