"use client";

import Link from "next/link";
import { Feather, Wind, Briefcase, Mail } from "lucide-react";
import { useLanguage } from "@/lib/useLanguage";
import { t } from "@/lib/translations";

export default function LandingPage() {
  const { lang, toggleLang } = useLanguage();
  const tr = t[lang];

  const cards = [
    { href: "/touch", Icon: Feather, mode: tr.card1mode, title: tr.card1title, desc: tr.card1desc },
    { href: "/calma", Icon: Wind, mode: tr.card2mode, title: tr.card2title, desc: tr.card2desc },
    { href: "/scuse", Icon: Briefcase, mode: tr.card3mode, title: tr.card3title, desc: tr.card3desc },
    { href: "/mail", Icon: Mail, mode: tr.card4mode, title: tr.card4title, desc: tr.card4desc },
  ];

  return (
    <main className="flex flex-col items-center justify-center min-h-screen px-6 py-12 relative">

      {/* Language toggle */}
      <button
        onClick={toggleLang}
        className="absolute top-6 right-6 font-sans text-xs text-[#b0a898] hover:text-[#f5f0e6] transition-colors duration-200 flex items-center gap-1.5"
        title={lang === "it" ? "Switch to English" : "Passa all'italiano"}
      >
        <img
          src={lang === "it" ? "https://flagcdn.com/w40/gb.png" : "https://flagcdn.com/w40/it.png"}
          alt={lang === "it" ? "English" : "Italiano"}
          width={24}
          height={16}
          className="rounded-sm opacity-80 hover:opacity-100 transition-opacity"
        />
      </button>

      {/* Header */}
      <header className="text-center mb-12">
        <div className="flex items-center justify-center gap-3 mb-3">
          <div className="h-px w-10 bg-[#e8b84b]" />
          <div className="w-1 h-1 rounded-full bg-[#e8b84b]" />
          <div className="h-px w-10 bg-[#e8b84b]" />
        </div>
        <p className="font-sans text-[10px] tracking-[0.4em] text-[#f5f0e6] uppercase mb-2">
          {tr.tagline}
        </p>
        <h1 className="font-serif text-4xl md:text-5xl font-semibold text-[#f5f0e6] leading-tight tracking-tight">
          {tr.headline}
        </h1>
        <p className="font-sans text-xs text-[#d8d2c8] tracking-wide mt-3 max-w-sm mx-auto">
          {tr.subheadline}
        </p>
      </header>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-3xl">
        {cards.map(({ href, Icon, mode, title, desc }) => (
          <Link key={href} href={href} className="group block">
            <div className="
              relative border border-[rgba(232,184,75,0.3)] rounded-sm p-10
              bg-[#332e28] hover:border-[rgba(232,184,75,0.7)]
              hover:bg-[#3a342d] transition-all duration-300
              flex flex-col items-center text-center gap-5 min-h-[280px] justify-center h-full
            ">
              <div className="
                w-14 h-14 rounded-full border border-[rgba(232,184,75,0.4)]
                flex items-center justify-center
                group-hover:border-[#e8b84b] transition-colors duration-300
              ">
                <Icon size={22} className="text-[#f5f0e6]" />
              </div>
              <div>
                <p className="font-sans text-[10px] tracking-[0.3em] text-[#f5f0e6] uppercase mb-2">
                  {mode}
                </p>
                <h2 className="font-serif text-2xl text-[#f5f0e6] mb-3">{title}</h2>
                <p className="font-sans text-xs text-[#d8d2c8] leading-relaxed">{desc}</p>
              </div>
              <span className="font-sans text-[10px] tracking-[0.3em] text-[#b0a898] uppercase group-hover:text-[#f5f0e6] transition-colors duration-300">
                {tr.enter}
              </span>
            </div>
          </Link>
        ))}
      </div>

      {/* Footer */}
      <footer className="mt-16 text-center">
        <div className="flex items-center justify-center gap-3 mb-2">
          <div className="h-px w-8 bg-[#2e2b27]" />
          <div className="w-1 h-1 rounded-full bg-[#3a3530]" />
          <div className="h-px w-8 bg-[#2e2b27]" />
        </div>
        <p className="font-sans text-[10px] tracking-[0.3em] text-[#b0a898] uppercase">
          {tr.footer}
        </p>
        <p className="font-sans text-[10px] text-[#6b6560] mt-2">
          Site by{" "}
          <a
            href="https://www.massimodassano.it"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-[#b0a898] transition-colors"
          >
            Massimo Dassano
          </a>
        </p>
      </footer>

    </main>
  );
}
