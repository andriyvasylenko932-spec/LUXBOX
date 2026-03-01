"use client";

import { useMemo, useState } from "react";
import BoxFilters, { Filters } from "@/components/BoxFilters";
import BoxCard from "@/components/BoxCard";

function inBudget(price: number, budget: string) {
  if (budget === "any") return true;
  const [min, max] = budget.split("-").map((n) => parseInt(n, 10));
  return price >= min && price <= max;
}

function hasInterest(interestsJson: string, interest: string) {
  if (interest === "any") return true;
  try {
    const arr = JSON.parse(interestsJson || "[]");
    if (!Array.isArray(arr)) return false;
    return arr.map(String).includes(interest);
  } catch {
    return false;
  }
}

export default function ClientCatalog({ initial }: { initial: Array<{ id: string; slug: string; title: string; subtitle?: string | null; priceUah: number; coverImage: string; category: string; forWhom: string; occasion: string; interests: string; }>; }) {
  const [f, setF] = useState<Filters>({ q: "", forWhom: "all", category: "all", occasion: "any", interest: "any", budget: "any" });

  const list = useMemo(() => {
    return initial.filter((b) => {
      const qOk = !f.q || b.title.toLowerCase().includes(f.q.toLowerCase()) || (b.subtitle || "").toLowerCase().includes(f.q.toLowerCase());
      const forOk = f.forWhom === "all" || b.forWhom === f.forWhom;
      const catOk = f.category === "all" || b.category === f.category;
      const budgetOk = inBudget(b.priceUah, f.budget);
      const interestOk = hasInterest(b.interests, f.interest);
      return qOk && forOk && catOk && budgetOk && interestOk;
    });
  }, [initial, f]);

  return (
    <>
      <div className="mt-6">
        <BoxFilters onChange={setF} />
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((b) => (
          <BoxCard key={b.id} box={{ slug: b.slug, title: b.title, subtitle: b.subtitle, priceUah: b.priceUah, coverImage: b.coverImage, category: b.category, forWhom: b.forWhom }} />
        ))}
      </div>

      {list.length === 0 ? (
        <div className="mt-10 text-sm text-zinc-700">Нічого не знайдено. Спробуй змінити фільтри.</div>
      ) : null}
    </>
  );
}
