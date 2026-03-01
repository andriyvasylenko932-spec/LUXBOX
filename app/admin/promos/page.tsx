"use client";

import { useEffect, useState } from "react";
import { Container, Card, Button, Input } from "@/components/UI";

type Promo = { id: string; code: string; type: "percent" | "fixed"; value: number; maxUses: number; usedCount: number; isActive: boolean; };

export default function PromosPage() {
  const [list, setList] = useState<Promo[]>([]);
  const [form, setForm] = useState({ code: "", type: "percent", value: 10, maxUses: 0, isActive: true });
  const [loading, setLoading] = useState(true);

  async function load() {
    setLoading(true);
    const res = await fetch("/api/promos");
    setList(await res.json());
    setLoading(false);
  }

  useEffect(() => { load(); }, []);

  async function create() {
    const res = await fetch("/api/promos", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ ...form, code: form.code.toUpperCase().trim(), value: Number(form.value), maxUses: Number(form.maxUses) })
    });
    if (!res.ok) {
      const j = await res.json().catch(() => ({}));
      alert(j?.error || "Помилка");
      return;
    }
    setForm({ code: "", type: "percent", value: 10, maxUses: 0, isActive: true });
    await load();
  }

  async function toggle(p: Promo) {
    await fetch(`/api/promos/${p.id}`, {
      method: "PUT",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ code: p.code, type: p.type, value: p.value, maxUses: p.maxUses, isActive: !p.isActive })
    });
    await load();
  }

  async function remove(id: string) {
    if (!confirm("Видалити промокод?")) return;
    await fetch(`/api/promos/${id}`, { method: "DELETE" });
    await load();
  }

  return (
    <Container className="py-10">
      <h1 className="text-2xl font-semibold">Промокоди</h1>

      <Card className="mt-6 p-6">
        <div className="grid gap-3 md:grid-cols-2">
          <Input placeholder="CODE (наприклад WELCOME10)" value={form.code} onChange={(e) => setForm((p) => ({ ...p, code: e.target.value }))} />
          <select className="rounded-2xl border border-zinc-200 px-4 py-3 text-sm" value={form.type} onChange={(e) => setForm((p) => ({ ...p, type: e.target.value as any }))}>
            <option value="percent">Percent</option>
            <option value="fixed">Fixed UAH</option>
          </select>
          <Input type="number" placeholder="Value" value={form.value} onChange={(e) => setForm((p) => ({ ...p, value: Number(e.target.value) }))} />
          <Input type="number" placeholder="Max uses (0 = unlimited)" value={form.maxUses} onChange={(e) => setForm((p) => ({ ...p, maxUses: Number(e.target.value) }))} />
          <label className="flex items-center gap-2 text-sm text-zinc-700">
            <input type="checkbox" checked={form.isActive} onChange={(e) => setForm((p) => ({ ...p, isActive: e.target.checked }))} />
            Активний
          </label>
        </div>

        <div className="mt-4">
          <Button onClick={create}>Створити</Button>
        </div>
      </Card>

      <div className="mt-6 grid gap-3">
        {loading ? <div>Завантаження…</div> : null}
        {list.map((p) => (
          <Card key={p.id} className="p-5">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <div className="text-sm font-semibold">{p.code}</div>
                <div className="mt-1 text-xs text-zinc-500">
                  {p.type} • {p.value} • uses {p.usedCount}/{p.maxUses === 0 ? "∞" : p.maxUses}
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="ghost" onClick={() => toggle(p)}>{p.isActive ? "Вимкнути" : "Увімкнути"}</Button>
                <Button variant="ghost" onClick={() => remove(p.id)}>Видалити</Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </Container>
  );
}
