import Link from "next/link";
import Image from "next/image";
import { Card, Badge } from "@/components/UI";
import { formatUah } from "@/lib/utils";

export default function BoxCard({ box }: { box: { slug: string; title: string; subtitle?: string | null; priceUah: number; coverImage: string; category: string; forWhom: string; }; }) {
  return (
    <Link href={`/box/${box.slug}`}>
      <Card className="group overflow-hidden transition hover:-translate-y-1 hover:shadow-soft">
        <div className="relative aspect-[4/3]">
          <Image src={box.coverImage} alt={box.title} fill className="object-cover transition duration-500 group-hover:scale-[1.03]" />
          <div className="absolute left-4 top-4 flex gap-2">
            <Badge>{box.category}</Badge>
            <Badge>{box.forWhom}</Badge>
          </div>
        </div>
        <div className="p-5">
          <div className="text-sm font-semibold">{box.title}</div>
          <div className="mt-1 text-sm text-zinc-600 line-clamp-2">{box.subtitle || ""}</div>
          <div className="mt-4 flex items-center justify-between">
            <div className="text-sm font-semibold">{formatUah(box.priceUah)}</div>
            <div className="text-xs text-zinc-500">Оплата після підтвердження</div>
          </div>
        </div>
      </Card>
    </Link>
  );
}
