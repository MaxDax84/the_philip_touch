"use client";

import { useState, useTransition } from "react";
import { Copy, Check, Wind } from "lucide-react";
import { transformRage } from "@/app/actions/transform";
import Link from "next/link";
import { useLanguage } from "@/lib/useLanguage";
import { t } from "@/lib/translations";

export default function CalmMachine() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [isPending, startTransition] = useTransition();
  const { lang, toggleLang } = useLanguage();
  const tr = t[lang];

  function handleTransform() {
    if (!input.trim()) return;
    startTransition(async () => {
      const calm = await transformRage(input.trim(), lang);
      setResult(calm);
      setCopied(false);
    });
  }

  async function handleCopy() {
    if (!result) return;
    await navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  }

  return (
    <main className="flex flex-col min-h-screen px-6 md:px-12 py-8 max-w-5xl mx-auto w-full">

      {/* Header */}
      <header className="text-center mb-8 relative">
        {/* Language toggle */}
        <button
          onClick={toggleLang}
          className="absolute top-0 right-0 font-sans text-xs text-[#b0a898] hover:text-[#f5f0e6] transition-colors duration-200 flex items-center gap-1.5"
          title={lang === "it" ? "Switch to English" : "Passa all'italiano"}
        >
          <span className="text-base">{lang === "it" ? "🇬🇧" : "🇮🇹"}</span>
          <span className="tracking-widest uppercase text-[10px]">{lang === "it" ? "EN" : "IT"}</span>
        </button>

        <div className="flex items-center justify-center gap-3 mb-3">
          <div className="h-px w-10 bg-[#e8b84b]" />
          <Wind size={12} className="text-[#f5f0e6]" />
          <div className="h-px w-10 bg-[#e8b84b]" />
        </div>
        <p className="font-sans text-[10px] tracking-[0.35em] text-[#f5f0e6] uppercase mb-1">
          {tr.tagline}
        </p>
        <h1 className="font-serif text-3xl md:text-4xl font-semibold text-[#f5f0e6] leading-tight tracking-tight">
          {tr.calmTitle}
        </h1>
        <p className="font-sans text-xs text-[#d8d2c8] tracking-wide mt-2">
          {tr.calmSubtitle}
        </p>
        <Link
          href="/"
          className="inline-block mt-3 font-sans text-[10px] tracking-[0.25em] text-[#b0a898] uppercase hover:text-[#f5f0e6] transition-colors duration-200"
        >
          {tr.homepage}
        </Link>
      </header>

      {/* Two-column layout */}
      <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6 items-start">

        {/* Left — Input */}
        <section className="flex flex-col gap-4">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleTransform();
              }
            }}
            placeholder={tr.calmPlaceholder}
            rows={7}
            className="
              w-full bg-[#332e28] border border-[#38342e] rounded-sm
              px-5 py-4 text-[#e0d8c8] font-sans text-sm leading-relaxed
              placeholder:text-[#908880] resize-none outline-none
              focus:border-[rgba(232,184,75,0.5)] transition-colors duration-300
              tracking-wide
            "
          />
          <button
            onClick={handleTransform}
            disabled={isPending || !input.trim()}
            className="
              w-full border border-[#e8b84b] text-[#f5f0e6] font-sans font-semibold
              text-xs tracking-[0.2em] uppercase px-6 py-3.5 rounded-sm
              hover:bg-[#e8b84b] hover:text-[#0a0a0a]
              disabled:opacity-40 disabled:cursor-not-allowed
              transition-all duration-200
            "
          >
            {isPending ? tr.processing : tr.calmBtn}
          </button>
          <p className="font-sans text-[10px] tracking-widest text-[#b0a898] uppercase text-center">
            {tr.calmHint}
          </p>
        </section>

        {/* Right — Result */}
        <section>
          {!result && !isPending && (
            <div className="border border-[#2e2b27] rounded-sm p-8 text-center flex flex-col items-center justify-center min-h-[200px]">
              <span className="text-[#e8b84b] opacity-25 text-3xl mb-4">❧</span>
              <p className="font-sans text-[11px] tracking-[0.3em] text-[#a09890] uppercase">
                {tr.calmEmptyState}
              </p>
            </div>
          )}

          {isPending && (
            <div className="border border-[#38342e] rounded-sm p-8 text-center flex flex-col items-center justify-center min-h-[200px]">
              <span className="text-[#e8b84b] opacity-60 text-3xl mb-4 animate-shimmer">❧</span>
              <p className="font-sans text-[11px] tracking-[0.3em] text-[#c0b8b0] uppercase animate-shimmer">
                {tr.calmLoading}
              </p>
            </div>
          )}

          {result && !isPending && (
            <div className="relative bg-[#332e28] border border-[rgba(232,184,75,0.5)] rounded-sm p-7 animate-fade-in-up">
              <span className="absolute top-3 left-3 text-[#e8b84b] opacity-70 text-xs">❧</span>
              <span className="absolute top-3 right-3 text-[#e8b84b] opacity-70 text-xs rotate-180">❧</span>
              <span className="absolute bottom-3 left-3 text-[#e8b84b] opacity-70 text-xs rotate-180">❧</span>
              <span className="absolute bottom-3 right-3 text-[#e8b84b] opacity-70 text-xs">❧</span>

              <div className="text-center mb-5 pb-4 border-b border-[#303030]">
                <p className="font-sans text-[11px] tracking-[0.4em] text-[#d0c8be] uppercase">
                  {tr.calmCardHeader}
                </p>
              </div>

              <blockquote className="font-serif text-lg text-[#f5f0e6] leading-relaxed tracking-wide text-center italic">
                {result}
              </blockquote>

              <div className="text-center mt-5 pt-4 border-t border-[#303030]">
                <p className="font-sans text-[11px] tracking-[0.3em] text-[#c0b8b0] uppercase">
                  {tr.calmCardFooter}
                </p>
              </div>

              <div className="flex justify-center mt-5">
                <button
                  onClick={handleCopy}
                  className="
                    flex items-center gap-2 font-sans text-[11px] tracking-[0.25em] uppercase
                    text-[#d0c8be] hover:text-[#f5f0e6] transition-colors duration-200
                    border border-[#484848] hover:border-[#e8b84b]
                    px-5 py-2.5 rounded-sm
                  "
                >
                  {copied ? (
                    <>
                      <Check size={11} className="text-[#f5f0e6]" />
                      <span className="text-[#f5f0e6]">{tr.copied}</span>
                    </>
                  ) : (
                    <>
                      <Copy size={11} />
                      {tr.calmCopyBtn}
                    </>
                  )}
                </button>
              </div>
            </div>
          )}
        </section>
      </div>

      {/* Footer */}
      <footer className="text-center mt-8 space-y-4">
        <Link
          href="/"
          className="inline-block font-sans text-[10px] tracking-[0.3em] text-[#b0a898] uppercase hover:text-[#f5f0e6] transition-colors duration-200 border border-[#2e2b27] hover:border-[rgba(232,184,75,0.4)] px-5 py-2.5 rounded-sm"
        >
          {tr.homepage}
        </Link>
        <div className="flex items-center justify-center gap-3">
          <div className="h-px w-8 bg-[#2e2b27]" />
          <div className="w-1 h-1 rounded-full bg-[#3a3530]" />
          <div className="h-px w-8 bg-[#2e2b27]" />
        </div>
        <p className="font-sans text-[10px] tracking-[0.3em] text-[#b0a898] uppercase">
          {tr.calmFooter}
        </p>
      </footer>

    </main>
  );
}
