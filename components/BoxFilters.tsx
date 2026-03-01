"use client";

import { useMemo, useState } from "react";
import { Input, Button, Badge } from "@/components/UI";
import QuizModal from "@/components/QuizModal";

export type Filters = {
  q: string;
  forWhom: string;
  category: string;
  occasion: string;
  interest: string;
  budget: string;
};

export default function BoxFilters({ onChange }: { onChange: (f: Filters) => void }) {
  const [open, setOpen] = useState(false);
  const [f, setF] = useState<Filters>({ q: "", forWhom: "all", category: "all", occasion: "any", interest: "any", budget: "any" });

  const categories = useMemo(() => ["all", "gift", "beauty", "geek", "sport", "kids", "corporate", "surprise"], []);
  const interests = useMemo(() => [
    ["any", "Інтереси: будь-які"],
    ["beauty", "Бʼюті"],
    ["geek", "Гік"],
    ["sport", "Спорт"],
    ["selfcare", "Догляд"],
    ["gadget", "Гаджети"]
  ], []);

  function update(next: Partial<Filters>) {
    const merged = { ...f, ...next };
    setF(merged);
    onChange(merged);
  }

  return (
    <div className="rounded-3xl border border-white/40 bg-white/60 p-4 shadow-soft backdrop-blur">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-1 items-center gap-3">
          <Input placeholder="Пошук по назві…" value={f.q} onChange={(e) => update({ q: e.target.value })} />
          <Button type="button" onClick={() => setOpen(true)} className="whitespace-nowrap">Підібрати бокс</Button>
        </div>

        <div className="flex flex-wrap gap-2">
          <select className="rounded-2xl border border-zinc-200/70 bg-white/70 px-4 py-3 text-sm backdrop-blur" value={f.forWhom} onChange={(e) => update({ forWhom: e.target.value })}>
            <option value="all">Для кого: всі</option>
            <option value="him">Він</option>
            <option value="her">Вона</option>
            <option value="kid">Дитина</option>
            <option value="colleague">Колега</option>
            <option value="team">Команда</option>
          </select>

          <select className="rounded-2xl border border-zinc-200/70 bg-white/70 px-4 py-3 text-sm backdrop-blur" value={f.category} onChange={(e) => update({ category: e.target.value })}>
            {categories.map((c) => (<option key={c} value={c}>{c === "all" ? "Категорія: всі" : c}</option>))}
          </select>

          <select className="rounded-2xl border border-zinc-200/70 bg-white/70 px-4 py-3 text-sm backdrop-blur" value={f.interest} onChange={(e) => update({ interest: e.target.value })}>
            {interests.map(([v, label]) => (<option key={v} value={v}>{label}</option>))}
          </select>

          <select className="rounded-2xl border border-zinc-200/70 bg-white/70 px-4 py-3 text-sm backdrop-blur" value={f.budget} onChange={(e) => update({ budget: e.target.value })}>
            <option value="any">Бюджет: будь-який</option>
            <option value="0-999">до 1 000</option>
            <option value="1000-1999">1 000–1 999</option>
            <option value="2000-999999">2 000+</option>
          </select>
        </div>
      </div>

      <div className="mt-3 flex flex-wrap gap-2">
        <Badge>Кнопка: “Замовити”</Badge>
        <Badge>Оплата після підтвердження</Badge>
      </div>

      <QuizModal open={open} onClose={() => setOpen(false)} onApply={(a) => update({ forWhom: a.forWhom, occasion: a.occasion, interest: a.interest, budget: a.budget })} />
    </div>
  );
}
