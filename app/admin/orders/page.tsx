"use client";

import { useEffect, useState } from "react";
import { Container, Card, Button, Badge } from "@/components/UI";

type Order = {
  id: string;
  boxTitle: string;
  finalPriceUah: number;
  customerName: string;
  phone: string;
  contactPref: string;
  city: string;
  delivery: string;
  branch: string;
  status: string;
  createdAt: string;
};

const statuses = ["NEW", "CONFIRMED", "PAID", "SHIPPED", "CANCELED"] as const;

export default function OrdersPage() {
  const [list, setList] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  async function load() {
    setLoading(true);
    const res = await fetch("/api/orders");
    setList(await res.json());
    setLoading(false);
  }

  useEffect(() => { load(); }, []);

  async function setStatus(id: string, status: string) {
    await fetch(`/api/orders/${id}`, {
      method: "PUT",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ status })
    });
    await load();
  }

  return (
    <Container className="py-10">
      <h1 className="text-2xl font-semibold">Заявки</h1>

      <div className="mt-6 grid gap-3">
        {loading ? <div>Завантаження…</div> : null}
        {list.map((o) => (
          <Card key={o.id} className="p-5">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <div className="text-sm font-semibold">{o.boxTitle} • {o.finalPriceUah} ₴</div>
                <div className="mt-1 text-xs text-zinc-500">
                  {o.customerName} • {o.phone} • {o.contactPref}
                </div>
                <div className="mt-1 text-xs text-zinc-500">
                  {o.city} • {o.delivery} • {o.branch}
                </div>
                <div className="mt-2 flex flex-wrap gap-2">
                  <Badge>Статус: {o.status}</Badge>
                  <Badge>ID: {o.id}</Badge>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                {statuses.map((s) => (
                  <Button key={s} variant="ghost" onClick={() => setStatus(o.id, s)} disabled={o.status === s}>
                    {s}
                  </Button>
                ))}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </Container>
  );
}
