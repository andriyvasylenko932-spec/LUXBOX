import { Container, Card } from "@/components/UI";

export default function Page() {
  return (
    <section className="bg-white">
      <Container className="py-12">
        <h1 className="text-2xl font-semibold">Про нас</h1>
        <Card className="mt-6 p-6">
          <div className="text-sm text-zinc-600 space-y-3">
            <p>Ми робимо бокси з продуманим наповненням і преміальним оформленням. Ніяких випадкових речей — тільки те, що має сенс і приносить емоцію.</p>
          </div>
        </Card>
      </Container>
    </section>
  );
}
