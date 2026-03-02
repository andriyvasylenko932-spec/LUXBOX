import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Pixel from "@/components/Pixel";

export const metadata: Metadata = {
  title: "LUXBOX вЂ” РїСЂРµРјС–Р°Р»СЊРЅС– Р±РѕРєСЃРё",
  description: "РџСЂРµРјС–Р°Р»СЊРЅС– Р±РѕРєСЃРё Р· С‡РµСЃРЅРёРј РЅР°РїРѕРІРЅРµРЅРЅСЏРј. РћРїР»Р°С‚Р° РїС–СЃР»СЏ РїС–РґС‚РІРµСЂРґР¶РµРЅРЅСЏ РјРµРЅРµРґР¶РµСЂРѕРј."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="uk">
  <head>
    <link rel="icon" href="/favicon.png" type="image/png" />
</head>
      <body>
        <Pixel />
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}


