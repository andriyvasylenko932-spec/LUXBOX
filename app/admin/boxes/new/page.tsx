"use client";

import { useMemo, useRef, useState } from "react";
import Link from "next/link";
import { Container, Card, Button, Input, Textarea, Badge } from "@/components/UI";

async function fileToDataUrl(file: File) {
  return await new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

async function uploadImage(file: File) {
  const dataUrl = await fileToDataUrl(file);
  const res = await fetch("/api/upload", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ filename: file.name, dataUrl })
  });
  if (!res.ok) {
    const j = await res.json().catch(() => ({}));
    throw new Error(j?.error || "Upload error");
  }
  const j = await res.json();
  return String(j.url);
}

export default function NewBoxPage() {
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const [form, setForm] = useState({
    slug: "",
    title: "",
    subtitle: "",
    description: "",
    priceUah: 1000,
    coverImage: "",
    category: "gift",
    forWhom: "all",
    occasion: "any",
    interests: "gadget, selfcare",
    isActive: true
  });

  const tips = useMemo(
    () => ({
      slug: "Латиниця + дефіси. Напр: surprise-box-1",
      interests: "Через кому. Напр: beauty, geek, sport, selfcare, gadget"
    }),
    []
  );

  async function pickAndUpload(file?: File) {
    const f = file || fileRef.current?.files?.[0];
    if (!f) return;
    setUploading(true);
    try {
      const url = await uploadImage(f);
      setForm((p) => ({ ...p, coverImage: url }));
    } catch (e: any) {
      alert(e?.message || "Помилка завантаження");
    } finally {
      setUploading(false);
    }
  }

  async function create() {
    if (!form.coverImage) { alert('Додай фото обкладинки (перетягни файл або обери).'); return; }

    setLoading(true);
    try {
      const res = await fetch("/api/boxes", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          ...form,
          subtitle: form.subtitle || null,
          priceUah: Number(form.priceUah),
          gallery: [],
          interests: form.interests
            ? form.interests.split(",").map((s) => s.trim()).filter(Boolean)
            : [],
          isActive: Boolean(form.isActive)
        })
      });
      if (!res.ok) {
        const j = await res.json().catch(() => ({}));
        alert(j?.error || "Помилка створення");
        return;
      }
      window.location.href = "/admin/boxes";
    } finally {
      setLoading(false);
    }
  }

  return (
    <Container className="py-10">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Додати бокс</h1>
        <Link href="/admin/boxes" className="text-sm underline">Назад</Link>
      </div>

      <Card className="mt-6 p-6">
        <div className="grid gap-4">
          <div>
            <div className="text-sm font-semibold">Slug</div>
            <div className="mt-1 text-xs text-zinc-500">{tips.slug}</div>
            <div className="mt-2">
              <Input value={form.slug} onChange={(e) => setForm((p) => ({ ...p, slug: e.target.value }))} />
            </div>
          </div>

          <div>
            <div className="text-sm font-semibold">Назва</div>
            <div className="mt-2">
              <Input value={form.title} onChange={(e) => setForm((p) => ({ ...p, title: e.target.value }))} />
            </div>
          </div>

          <div>
            <div className="text-sm font-semibold">Підзаголовок</div>
            <div className="mt-2">
              <Input value={form.subtitle} onChange={(e) => setForm((p) => ({ ...p, subtitle: e.target.value }))} />
            </div>
          </div>

          <div>
            <div className="text-sm font-semibold">Опис</div>
            <div className="mt-2">
              <Textarea rows={5} value={form.description} onChange={(e) => setForm((p) => ({ ...p, description: e.target.value }))} />
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <div className="text-sm font-semibold">Ціна (грн)</div>
              <div className="mt-2">
                <Input type="number" value={form.priceUah} onChange={(e) => setForm((p) => ({ ...p, priceUah: Number(e.target.value) }))} />
              </div>
            </div>

            <div>
              <div className="text-sm font-semibold">Категорія</div>
              <div className="mt-1 text-xs text-zinc-500">Напр: gift, beauty, geek, sport, kids, corporate, surprise</div>
              <div className="mt-2">
                <Input value={form.category} onChange={(e) => setForm((p) => ({ ...p, category: e.target.value }))} />
              </div>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <div className="text-sm font-semibold">Для кого</div>
              <div className="mt-1 text-xs text-zinc-500">him / her / kid / colleague / team / all</div>
              <div className="mt-2">
                <Input value={form.forWhom} onChange={(e) => setForm((p) => ({ ...p, forWhom: e.target.value }))} />
              </div>
            </div>

            <div>
              <div className="text-sm font-semibold">Привід</div>
              <div className="mt-1 text-xs text-zinc-500">birthday / newyear / 8march / anniversary / any</div>
              <div className="mt-2">
                <Input value={form.occasion} onChange={(e) => setForm((p) => ({ ...p, occasion: e.target.value }))} />
              </div>
            </div>
          </div>

          <div>
            <div className="text-sm font-semibold">Інтереси</div>
            <div className="mt-1 text-xs text-zinc-500">{tips.interests}</div>
            <div className="mt-2">
              <Input value={form.interests} onChange={(e) => setForm((p) => ({ ...p, interests: e.target.value }))} />
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <div className="text-sm font-semibold">Фото обкладинки</div>
              {form.coverImage ? <Badge>OK</Badge> : <Badge>потрібно</Badge>}
            </div>

            <div className="mt-2 grid gap-3 md:grid-cols-2">
              <div className="rounded-3xl border border-dashed border-zinc-300 bg-white/60 p-5 text-sm text-zinc-700"
                   onDragOver={(e) => e.preventDefault()}
                   onDrop={async (e) => { e.preventDefault(); const file = e.dataTransfer.files?.[0]; if (file) await pickAndUpload(file); }}>
                <div className="font-semibold">Перетягни фото сюди</div>
                <div className="mt-1 text-xs text-zinc-500">PNG/JPG/WEBP, до 5MB</div>

                <div className="mt-4 flex flex-wrap gap-2">
                  <Button type="button" variant="glass" onClick={() => fileRef.current?.click()} disabled={uploading}>
                    {uploading ? "Завантаження…" : "Обрати файл"}
                  </Button>
                  <input ref={fileRef} type="file" accept="image/*" hidden onChange={() => pickAndUpload()} />
                </div>

                {form.coverImage ? (
                  <div className="mt-3 text-xs text-zinc-600">Збережено: <span className="font-semibold">{form.coverImage}</span></div>
                ) : null}
              </div>

              <div className="rounded-3xl border border-zinc-200/70 bg-white/70 p-5 text-sm text-zinc-700">
                <div className="font-semibold">Порада</div>
                <div className="mt-2 text-sm text-zinc-600">
                  Після завантаження фото, посилання автоматично підставиться в “coverImage”.
                </div>
              </div>
            </div>
          </div>

          <label className="flex items-center gap-2 text-sm text-zinc-700">
            <input type="checkbox" checked={form.isActive} onChange={(e) => setForm((p) => ({ ...p, isActive: e.target.checked }))} />
            Активний (видимий на сайті)
          </label>

          <Button onClick={create} disabled={loading || uploading}>
            {loading ? "Створюємо…" : "Зберегти"}
          </Button>
        </div>
      </Card>
    </Container>
  );
}
