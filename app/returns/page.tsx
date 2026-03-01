import { Container, Card } from "@/components/UI";

export default function Page() {
  return (
    <section className="bg-white">
      <Container className="py-12">
        <h1 className="text-2xl font-semibold">Обмін / повернення</h1>
        <Card className="mt-6 p-6">
          <div className="text-sm text-zinc-600 space-y-3">
            <p>Обмін або повернення можливі, якщо була відправлена неробоча річ або товар має нетоварний вигляд. Потрібно надати підтвердження (фото/відео). Після перевірки — обмін або повернення коштів.</p>
          </div>
        </Card>
      </Container>
    </section>
  );
}
