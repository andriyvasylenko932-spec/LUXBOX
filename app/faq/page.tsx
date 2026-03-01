import { Container, Card } from "@/components/UI";

const items = [
  { q: "Чому оплата після підтвердження менеджером?", a: "Щоб підтвердити деталі доставки, побажання та терміни збору. Після цього надсилаємо реквізити/посилання для оплати." },
  { q: "Коли відправляєте?", a: "Після підтвердження та оплати. Зазвичай збір починається одразу." },
  { q: "Чи можна додати підпис на листівці?", a: "Так. Напишіть текст у полі “Коментар” при оформленні." }
];

export default function FAQPage() {
  return (
    <section className="bg-white">
      <Container className="py-12">
        <h1 className="text-2xl font-semibold">FAQ</h1>
        <div className="mt-6 grid gap-4">
          {items.map((i) => (
            <Card key={i.q} className="p-6">
              <div className="text-sm font-semibold">{i.q}</div>
              <div className="mt-2 text-sm text-zinc-600">{i.a}</div>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
}
