"use client";

import { useState } from "react";
import { Button, Input, Textarea } from "@/components/UI";

export default function CheckoutForm({ box }: { box: { id: string; title: string; priceUah: number } }) {
  const [loading, setLoading] = useState(false);
  const [promoCode, setPromoCode] = useState("");
  const [form, setForm] = useState({
    customerName: "",
    phone: "",
    contactPref: "telegram",
    city: "",
    delivery: "nova_poshta",
    branch: "",
    comment: ""
  });

  async function submit() {
    setLoading(true);
    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ boxId: box.id, promoCode: promoCode || null, ...form })
      });

      if (!res.ok) {
        const j = await res.json().catch(() => ({}));
        alert(j?.error || "Помилка. Перевір дані.");
        return;
      }
      const j = await res.json();
      window.location.href = `/thanks?id=${encodeURIComponent(j.id)}`;
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-3">
      <Input placeholder="Ім’я" value={form.customerName} onChange={(e) => setForm((p) => ({ ...p, customerName: e.target.value }))} />
      <Input placeholder="Телефон" value={form.phone} onChange={(e) => setForm((p) => ({ ...p, phone: e.target.value }))} />

      <div className="grid gap-3 md:grid-cols-2">
        <select className="rounded-2xl border border-zinc-200 px-4 py-3 text-sm" value={form.contactPref}
          onChange={(e) => setForm((p) => ({ ...p, contactPref: e.target.value }))}>
          <option value="telegram">Telegram</option>
          <option value="instagram">Instagram</option>
          <option value="viber">Viber</option>
          <option value="phone">Телефон</option>
        </select>

        <select className="rounded-2xl border border-zinc-200 px-4 py-3 text-sm" value={form.delivery}
          onChange={(e) => setForm((p) => ({ ...p, delivery: e.target.value }))}>
          <option value="nova_poshta">Нова Пошта</option>
          <option value="ukr_poshta">Укрпошта</option>
        </select>
      </div>

      <Input placeholder="Місто" value={form.city} onChange={(e) => setForm((p) => ({ ...p, city: e.target.value }))} />
      <Input placeholder="Відділення / адреса" value={form.branch} onChange={(e) => setForm((p) => ({ ...p, branch: e.target.value }))} />
      <Input placeholder="Промокод (за потреби)" value={promoCode} onChange={(e) => setPromoCode(e.target.value.toUpperCase())} />

      <Textarea placeholder="Коментар (побажання, підпис на листівці тощо)" rows={4} value={form.comment}
        onChange={(e) => setForm((p) => ({ ...p, comment: e.target.value }))} />

      <div className="pt-2">
        <Button onClick={submit} disabled={loading}>
          {loading ? "Відправляємо…" : "Замовити"}
        </Button>
        <div className="mt-2 text-xs text-zinc-500">
          Натискаючи “Замовити”, ви створюєте заявку. Оплата — після підтвердження менеджером.
        </div>
      </div>
    </div>
  );
}
