import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Pixel from "@/components/Pixel";

export const metadata: Metadata = {
  title: "LUXBOX — преміальні бокси",
  description: "Преміальні бокси з чесним наповненням. Оплата після підтвердження менеджером."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="uk">
      <body>
        <Pixel />
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
