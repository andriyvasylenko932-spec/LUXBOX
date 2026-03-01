import Link from "next/link";
import { Container } from "@/components/UI";

const TG = process.env.NEXT_PUBLIC_TELEGRAM_URL || "https://t.me/yourname";
const IG = process.env.NEXT_PUBLIC_INSTAGRAM_URL || "https://instagram.com/yourbrand";
const EMAIL = process.env.NEXT_PUBLIC_EMAIL || "hello@luxbox.ua";

export default function Footer() {
  return (
    <footer className="border-t border-white/40 bg-white/50 backdrop-blur">
      <Container className="py-10">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <div className="text-sm font-semibold">LUXBOX 🇺🇦</div>
            <p className="mt-2 text-sm text-zinc-600">
              Преміальні бокси з чесним наповненням. Оплата — тільки після підтвердження менеджером.
            </p>
          </div>

          <div className="text-sm">
            <div className="font-semibold">Сторінки</div>
            <div className="mt-3 flex flex-col gap-2 text-zinc-600">
              <Link href="/catalog" className="hover:text-zinc-900">Каталог</Link>
              <Link href="/delivery" className="hover:text-zinc-900">Доставка і оплата</Link>
              <Link href="/returns" className="hover:text-zinc-900">Обмін/повернення</Link>
              <Link href="/privacy" className="hover:text-zinc-900">Політика</Link>
            </div>
          </div>

          <div className="text-sm">
            <div className="font-semibold">Контакти</div>
            <div className="mt-3 flex flex-col gap-2 text-zinc-600">
              <a className="hover:text-zinc-900" href={TG} target="_blank" rel="noreferrer">Telegram</a>
              <a className="hover:text-zinc-900" href={IG} target="_blank" rel="noreferrer">Instagram</a>
              <a className="hover:text-zinc-900" href={`mailto:${EMAIL}`}>{EMAIL}</a>
              <span className="text-xs text-zinc-500">Зміни TG/IG/Email у .env</span>
            </div>
          </div>
        </div>

        <div className="mt-10 text-xs text-zinc-500">© {new Date().getFullYear()} LUXBOX. Всі права захищені.</div>
      </Container>
    </footer>
  );
}
