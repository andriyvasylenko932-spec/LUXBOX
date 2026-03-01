import Link from "next/link";
import Image from "next/image";
import { Container, Badge } from "@/components/UI";

const TG = process.env.NEXT_PUBLIC_TELEGRAM_URL || "https://t.me/yourname";
const IG = process.env.NEXT_PUBLIC_INSTAGRAM_URL || "https://instagram.com/yourbrand";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/40 bg-white/60 backdrop-blur">
      <Container className="flex items-center justify-between py-4">
        <Link href="/" className="flex items-center gap-3">
          <Image src="/logo.svg" alt="LUXBOX" width={40} height={40} className="h-10 w-10" priority />
          <div className="leading-tight">
            <div className="flex items-center gap-2 text-sm font-semibold tracking-wide">
              LUXBOX <span aria-label="Прапор України" title="Україна">🇺🇦</span>
            </div>
            <div className="text-xs text-zinc-500">преміальні бокси</div>
          </div>
        </Link>

        <nav className="hidden items-center gap-6 text-sm text-zinc-700 md:flex">
          <Link href="/catalog" className="hover:text-zinc-900">Каталог</Link>
          <Link href="/delivery" className="hover:text-zinc-900">Доставка & Оплата</Link>
          <Link href="/faq" className="hover:text-zinc-900">FAQ</Link>
          <Link href="/about" className="hover:text-zinc-900">Про нас</Link>
        </nav>

        <div className="flex items-center gap-2 md:gap-3">
          <a href={IG} target="_blank" rel="noreferrer"
             className="rounded-2xl border border-zinc-200/70 bg-white/60 px-3 py-2 text-xs font-medium text-zinc-800 hover:bg-white"
             aria-label="Instagram" title="Instagram">Instagram</a>
          <a href={TG} target="_blank" rel="noreferrer"
             className="rounded-2xl border border-zinc-200/70 bg-white/60 px-3 py-2 text-xs font-medium text-zinc-800 hover:bg-white"
             aria-label="Telegram" title="Telegram">Telegram</a>

          <Badge className="hidden md:inline-flex">Оплата після підтвердження</Badge>

          <Link href="/catalog"
                className="rounded-2xl bg-gradient-to-r from-fuchsia-600 via-violet-600 to-cyan-600 px-4 py-2 text-sm font-semibold text-white hover:brightness-110 shadow-soft">
            Замовити
          </Link>
        </div>
      </Container>
    </header>
  );
}
