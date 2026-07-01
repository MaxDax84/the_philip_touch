import type { Metadata } from "next";
import { Playfair_Display, Cormorant_Garamond } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

export const metadata: Metadata = {
  title: "The Philip Touch – Insulti eleganti e sfoghi civili",
  description:
    "Genera insulti raffinati e taglienti oppure trasforma uno sfogo rabbioso in una frase elegante e presentabile, in italiano o inglese.",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "The Philip Touch",
  description:
    "Genera insulti eleganti e raffinati oppure trasforma uno sfogo rabbioso in una frase civile e presentabile, in italiano o inglese.",
  applicationCategory: "EntertainmentApplication",
  operatingSystem: "Any",
  inLanguage: ["it", "en"],
  author: {
    "@type": "Person",
    name: "Massimo Dassano",
    url: "https://www.massimodassano.it",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="it" className={`${playfair.variable} ${cormorant.variable} h-full`}>
      <body className="min-h-full flex flex-col bg-[#2a2520] text-[#e8e0d0] antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
          }}
        />
        {children}
      </body>
    </html>
  );
}
