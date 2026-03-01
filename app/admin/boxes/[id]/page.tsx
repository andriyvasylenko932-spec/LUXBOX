"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Container, Card, Button, Input, Textarea, Badge } from "@/components/UI";

type Box = {
  id: string;
  slug: string;
  title: string;
  subtitle: string | null;
  description: string;
  priceUah: number;
  coverImage: string;
  category: string;
  forWhom: string;
  occasion: string;
  interests: string; // JSON
  isActive: boolean;
};

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

export default function EditBoxPage({ params }: { params: { id: string } }) {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [box, setBox] = useState<Box | null>(null);
  const [interests, setInterests] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    (async () => {
      const res = await fetch("/api/boxes");
      const all = (await res.json()) as Box[];
      const found = all.find((b) => b.id === params.id) || null;
      setBox(found);
      try {
        setInterests(found ? JSON.parse(found.interests || "[]").join(", ") : "");
      } catch {
        setInterests("");
      }
      setLoading(false);
    })();
  }, [params.id]);

  async function pickAndUpload(file?: File) {
    const f = file || fileRef.current?.files?.[0];
    if (!f || !box) return;
    setUploading(true);
    try {
      const url = await uploadImage(f);
      setBox({ ...box, coverImage: url });
    } catch (e: any) {
      alert(e?.message || "Помилка завантаження");
    } finally {
      setUploading(false);
    }
  }

  async function save() {
    if (!box) return;
    setSaving(true);
    try {
      const res = await fetch(`/api/boxes/${box.id}`, {
        method: "PUT",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          slug: box.slug,
          title: box.title,
          subtitle: box.subtitle,
          description: box.description,
          priceUah: Number(box.priceUah),
          coverImage: box.coverImage,
          gallery: [],
          category: box.category,
          forWhom: box.forWhom,
          occasion: box.occasion,
          interests: interests ? interests.split(",").map((s) => s.trim()).filter(Boolean) : [],
          isActive: Boolean(box.isActive)
        })
      });
      if (!res.ok) {
        const j = await res.json().catch(() => ({}));
        alert(j?.error || "Помилка збереження");
        return;
      }
      alert("Збережено");
    } finally {
      setSaving(false);
    }
  }

  async function remove() {
    if (!box) return;
    if (!confirm("Видалити бокс?")) return;
    const res = await fetch(`/api/boxes/${box.id}`, { method: "DELETE" });
    if (res.ok) window.location.href = "/admin/boxes";
  }

  if (loading) return <Container className="py-10">Завантаження…</Container>;
  if (!box) return <Container className="py-10">Не знайдено</Container>;

  return (
    <Container className="py-10">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Редагувати бокс</h1>
        <Link href="/admin/boxes" className="text-sm underline">Назад</Link>
      </div>

      <Card className="mt-6 p-6">
        <div className="grid gap-4">
          <div>
            <div className="text-sm font-semibold">Slug</div>
            <div className="mt-2">
              <Input value={box.slug} onChange={(e) => setBox((p) => (p ? { ...p, slug: e.target.value } : p))} />
            </div>
          </div>

          <div>
            <div className="text-sm font-semibold">Назва</div>
            <div className="mt-2">
              <Input value={box.title} onChange={(e) => setBox((p) => (p ? { ...p, title: e.target.value } : p))} />
            </div>
          </div>

          <div>
            <div className="text-sm font-semibold">Підзаголовок</div>
            <div className="mt-2">
              <Input value={box.subtitle || ""} onChange={(e) => setBox((p) => (p ? { ...p, subtitle: e.target.value || null } : p))} />
            </div>
          </div>

          <div>
            <div className="text-sm font-semibold">Опис</div>
            <div className="mt-2">
              <Textarea rows={5} value={box.description} onChange={(e) => setBox((p) => (p ? { ...p, description: e.target.value } : p))} />
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <div className="text-sm font-semibold">Ціна (грн)</div>
              <div className="mt-2">
                <Input type="number" value={box.priceUah} onChange={(e) => setBox((p) => (p ? { ...p, priceUah: Number(e.target.value) } : p))} />
              </div>
            </div>

            <div>
              <div className="text-sm font-semibold">Категорія</div>
              <div className="mt-2">
                <Input value={box.category} onChange={(e) => setBox((p) => (p ? { ...p, category: e.target.value } : p))} />
              </div>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <div className="text-sm font-semibold">Для кого</div>
              <div className="mt-2">
                <Input value={box.forWhom} onChange={(e) => setBox((p) => (p ? { ...p, forWhom: e.target.value } : p))} />
              </div>
            </div>

            <div>
              <div className="text-sm font-semibold">Привід</div>
              <div className="mt-2">
                <Input value={box.occasion} onChange={(e) => setBox((p) => (p ? { ...p, occasion: e.target.value } : p))} />
              </div>
            </div>
          </div>

          <div>
            <div className="text-sm font-semibold">Інтереси</div>
            <div className="mt-2">
              <Input value={interests} onChange={(e) => setInterests(e.target.value)} />
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <div className="text-sm font-semibold">Фото обкладинки</div>
              {box.coverImage ? <Badge>OK</Badge> : <Badge>потрібно</Badge>}
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

                {box.coverImage ? (
                  <div className="mt-3 text-xs text-zinc-600">Збережено: <span className="font-semibold">{box.coverImage}</span></div>
                ) : null}
              </div>

              <div className="rounded-3xl border border-zinc-200/70 bg-white/70 p-5 text-sm text-zinc-700">
                <div className="font-semibold">Порада</div>
                <div className="mt-2 text-sm text-zinc-600">
                  На хостингу для збереження фото може знадобитись “persistent disk” або S3.
                  Для локально — працює одразу.
                </div>
              </div>
            </div>
          </div>

          <label className="flex items-center gap-2 text-sm text-zinc-700">
            <input type="checkbox" checked={box.isActive} onChange={(e) => setBox((p) => (p ? { ...p, isActive: e.target.checked } : p))} />
            Активний
          </label>

          <div className="flex flex-wrap gap-3">
            <Button onClick={save} disabled={saving || uploading}>{saving ? "Зберігаємо…" : "Зберегти"}</Button>
            <Button variant="glass" onClick={remove}>Видалити</Button>
          </div>
        </div>
      </Card>
    </Container>
  );
}
