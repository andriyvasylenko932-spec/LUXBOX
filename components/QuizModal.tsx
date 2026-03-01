"use client";

import { useMemo, useState } from "react";
import { Card, Button, Badge } from "@/components/UI";

type Answers = { forWhom: string; occasion: string; interest: string; budget: string; };

export default function QuizModal({ open, onClose, onApply }: { open: boolean; onClose: () => void; onApply: (a: Answers) => void; }) {
  const [a, setA] = useState<Answers>({ forWhom: "all", occasion: "any", interest: "any", budget: "any" });

  const steps = useMemo(() => [
    { title: "Для кого?", key: "forWhom", options: [["him","Він"],["her","Вона"],["kid","Дитина"],["colleague","Колега"],["team","Команда"],["all","Неважливо"]] },
    { title: "Привід", key: "occasion", options: [["birthday","День народження"],["newyear","Новий рік"],["8march","8 березня"],["anniversary","Річниця"],["any","Просто так"]] },
    { title: "Інтереси", key: "interest", options: [["beauty","Бʼюті"],["geek","Гік"],["sport","Спорт"],["selfcare","Догляд"],["gadget","Гаджети"],["any","Будь-які"]] },
    { title: "Бюджет", key: "budget", options: [["0-999","до 1 000"],["1000-1999","1 000–1 999"],["2000-999999","2 000+"],["any","Неважливо"]] }
  ], []);

  const [step, setStep] = useState(0);
  if (!open) return null;
  const current: any = steps[step];

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-black/40 p-4">
      <Card className="w-full max-w-xl p-6">
        <div className="flex items-center justify-between">
          <div className="text-sm font-semibold">Підібрати бокс</div>
          <button onClick={onClose} className="text-sm text-zinc-500 hover:text-zinc-900">Закрити</button>
        </div>

        <div className="mt-6">
          <div className="text-sm font-semibold">{current.title}</div>
          <div className="mt-4 flex flex-wrap gap-2">
            {current.options.map(([value, label]: [string, string]) => {
              const selected = (a as any)[current.key] === value;
              return (
                <button
                  key={value}
                  onClick={() => setA((prev) => ({ ...prev, [current.key]: value } as Answers))}
                  className={[
                    "rounded-full border px-4 py-2 text-sm transition",
                    selected ? "border-zinc-900 bg-zinc-900 text-white" : "border-zinc-200 bg-white text-zinc-700 hover:bg-zinc-100"
                  ].join(" ")}
                >
                  {label}
                </button>
              );
            })}
          </div>

          <div className="mt-6 flex flex-wrap gap-2">
            <Badge>Крок {step + 1} / {steps.length}</Badge>
            <Badge>Оплата після підтвердження</Badge>
          </div>
        </div>

        <div className="mt-8 flex items-center justify-between">
          <Button variant="ghost" onClick={() => setStep((s) => Math.max(0, s - 1))} disabled={step === 0}>Назад</Button>
          {step < steps.length - 1 ? (
            <Button onClick={() => setStep((s) => Math.min(steps.length - 1, s + 1))}>Далі</Button>
          ) : (
            <Button onClick={() => { onApply(a); onClose(); }}>Показати варіанти</Button>
          )}
        </div>
      </Card>
    </div>
  );
}
