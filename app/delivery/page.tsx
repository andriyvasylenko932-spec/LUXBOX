import { Container, Card } from "@/components/UI";

export default function DeliveryPage() {
  return (
    <section className="bg-white">
      <Container className="py-12">
        <h1 className="text-2xl font-semibold">Доставка і оплата</h1>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <Card className="p-6">
            <div className="text-sm font-semibold">Як працює оплата</div>
            <ol className="mt-3 list-decimal pl-5 text-sm text-zinc-600">
              <li>Ви оформлюєте замовлення на сайті</li>
              <li>Менеджер підтверджує деталі</li>
              <li>Надсилаємо реквізити/посилання для оплати</li>
              <li>Після оплати — збір і відправка</li>
            </ol>
          </Card>

          <Card className="p-6">
            <div className="text-sm font-semibold">Доставка</div>
            <div className="mt-3 text-sm text-zinc-600">
              Доставляємо по Україні:
              <ul className="mt-2 list-disc pl-5">
                <li>Нова Пошта</li>
                <li>Укрпошта</li>
              </ul>
              <div className="mt-4 text-xs text-zinc-500">
                Термін та вартість доставки залежать від перевізника.
              </div>
            </div>
          </Card>
        </div>
      </Container>
    </section>
  );
}
