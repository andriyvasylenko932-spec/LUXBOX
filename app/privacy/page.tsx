import { Container, Card } from "@/components/UI";

export default function PrivacyPage() {
  return (
    <section className="bg-white">
      <Container className="py-12">
        <h1 className="text-2xl font-semibold">Політика конфіденційності</h1>
        <Card className="mt-6 p-6">
          <div className="space-y-3 text-sm text-zinc-600">
            <p>Ми збираємо лише дані, необхідні для обробки замовлення: ім’я, телефон, місто, доставку.</p>
            <p>Дані не передаються третім особам, окрім служб доставки та сервісів аналітики/реклами (за наявності пікселів).</p>
            <p>Ви можете попросити видалити ваші дані, написавши менеджеру.</p>
          </div>
        </Card>
      </Container>
    </section>
  );
}
