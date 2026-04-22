"use client";

import { useState, useTransition } from "react";
import { Copy, Check, Feather, Wind } from "lucide-react";
import { transformRage } from "@/app/actions/transform";
import Link from "next/link";

export default function CalmMachine() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [isPending, startTransition] = useTransition();

  function handleTransform() {
    if (!input.trim()) return;
    startTransition(async () => {
      const calm = await transformRage(input.trim());
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
      <header className="text-center mb-8">
        <div className="flex items-center justify-center gap-3 mb-3">
          <div className="h-px w-10 bg-[#c5a059]" />
          <Wind size={12} className="text-[#c5a059]" />
          <div className="h-px w-10 bg-[#c5a059]" />
        </div>
        <p className="font-sans text-[10px] tracking-[0.35em] text-[#c5a059] uppercase mb-1">
          The Philip Touch
        </p>
        <h1 className="font-serif text-3xl md:text-4xl font-semibold text-[#f5f0e6] leading-tight tracking-tight">
          La Valvola di Sfogo
        </h1>
        <p className="font-sans text-xs text-[#c8baa6] tracking-wide mt-2">
          Di' quello che pensi davvero. Noi lo rendiamo presentabile.
        </p>
        <Link
          href="/"
          className="inline-block mt-3 font-sans text-[10px] tracking-[0.25em] text-[#786858] uppercase hover:text-[#c5a059] transition-colors duration-200"
        >
          ← Torna alla scelta
        </Link>
      </header>

      {/* Two-column layout */}
      <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6 items-start">

        {/* Left — Input */}
        <section className="flex flex-col gap-4">
          <div className="border border-[#38342e] rounded-sm px-4 py-2">
            <p className="font-sans text-[10px] tracking-[0.25em] text-[#786858] uppercase">
              Sfogati liberamente — nessuno leggerà questo
            </p>
          </div>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleTransform();
              }
            }}
            placeholder="Scrivi quello che vorresti davvero dire (anche le peggiori parolacce)..."
            rows={7}
            className="
              w-full bg-[#211e1a] border border-[#38342e] rounded-sm
              px-5 py-4 text-[#e0d8c8] font-sans text-sm leading-relaxed
              placeholder:text-[#786858] resize-none outline-none
              focus:border-[rgba(197,160,89,0.5)] transition-colors duration-300
              tracking-wide
            "
          />
          <button
            onClick={handleTransform}
            disabled={isPending || !input.trim()}
            className="
              w-full bg-[#c5a059] text-[#0a0a0a] font-sans font-semibold
              text-xs tracking-[0.2em] uppercase px-6 py-4 rounded-sm
              hover:bg-[#d4b06a] active:bg-[#b8924d]
              disabled:opacity-40 disabled:cursor-not-allowed
              transition-all duration-200
            "
          >
            {isPending ? "Elaborazione…" : "Trasforma in qualcosa di presentabile"}
          </button>
          <p className="font-sans text-[10px] tracking-widest text-[#786858] uppercase text-center">
            Invio per trasformare · Shift+Invio per andare a capo
          </p>
        </section>

        {/* Right — Result */}
        <section>
          {!result && !isPending && (
            <div className="border border-[#2e2b27] rounded-sm p-8 text-center flex flex-col items-center justify-center min-h-[200px]">
              <span className="text-[#c5a059] opacity-25 text-3xl mb-4">❧</span>
              <p className="font-sans text-[11px] tracking-[0.3em] text-[#686058] uppercase">
                La versione presentabile apparirà qui
              </p>
            </div>
          )}

          {isPending && (
            <div className="border border-[#38342e] rounded-sm p-8 text-center flex flex-col items-center justify-center min-h-[200px]">
              <span className="text-[#c5a059] opacity-60 text-3xl mb-4 animate-shimmer">❧</span>
              <p className="font-sans text-[11px] tracking-[0.3em] text-[#a09080] uppercase animate-shimmer">
                Addomesticando la rabbia…
              </p>
            </div>
          )}

          {result && !isPending && (
            <div className="relative bg-[#211e1a] border border-[rgba(197,160,89,0.5)] rounded-sm p-7 animate-fade-in-up">
              <span className="absolute top-3 left-3 text-[#c5a059] opacity-70 text-xs">❧</span>
              <span className="absolute top-3 right-3 text-[#c5a059] opacity-70 text-xs rotate-180">❧</span>
              <span className="absolute bottom-3 left-3 text-[#c5a059] opacity-70 text-xs rotate-180">❧</span>
              <span className="absolute bottom-3 right-3 text-[#c5a059] opacity-70 text-xs">❧</span>

              <div className="text-center mb-5 pb-4 border-b border-[#303030]">
                <p className="font-sans text-[11px] tracking-[0.4em] text-[#b8a890] uppercase">
                  Versione civilizzata
                </p>
              </div>

              <blockquote className="font-serif text-lg text-[#f5f0e6] leading-relaxed tracking-wide text-center italic">
                {result}
              </blockquote>

              <div className="text-center mt-5 pt-4 border-t border-[#303030]">
                <p className="font-sans text-[11px] tracking-[0.3em] text-[#a09080] uppercase">
                  inattaccabile e legalmente sicura
                </p>
              </div>

              <div className="flex justify-center mt-5">
                <button
                  onClick={handleCopy}
                  className="
                    flex items-center gap-2 font-sans text-[11px] tracking-[0.25em] uppercase
                    text-[#b8a890] hover:text-[#c5a059] transition-colors duration-200
                    border border-[#484848] hover:border-[#c5a059]
                    px-5 py-2.5 rounded-sm
                  "
                >
                  {copied ? (
                    <>
                      <Check size={11} className="text-[#c5a059]" />
                      <span className="text-[#c5a059]">Copiato</span>
                    </>
                  ) : (
                    <>
                      <Copy size={11} />
                      Copia e usa in tutta sicurezza
                    </>
                  )}
                </button>
              </div>
            </div>
          )}
        </section>
      </div>

      {/* Footer */}
      <footer className="text-center mt-8">
        <div className="flex items-center justify-center gap-3 mb-2">
          <div className="h-px w-8 bg-[#2e2b27]" />
          <div className="w-1 h-1 rounded-full bg-[#3a3530]" />
          <div className="h-px w-8 bg-[#2e2b27]" />
        </div>
        <p className="font-sans text-[10px] tracking-[0.3em] text-[#786858] uppercase">
          La rabbia è umana. Le conseguenze legali no.
        </p>
      </footer>

    </main>
  );
}
