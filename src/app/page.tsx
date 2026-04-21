"use client";

import { useState, useTransition } from "react";
import { Shuffle, Copy, Check, Feather } from "lucide-react";
import { generateFromInput, generateRandom } from "@/app/actions/generate";

export default function Home() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [isPending, startTransition] = useTransition();

  function handleGenerate() {
    startTransition(async () => {
      const insult = await generateFromInput(input);
      setResult(insult);
      setCopied(false);
    });
  }

  function handleRandom() {
    startTransition(async () => {
      const insult = await generateRandom();
      setResult(insult);
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
          <Feather size={12} className="text-[#c5a059]" />
          <div className="h-px w-10 bg-[#c5a059]" />
        </div>
        <p className="font-sans text-[10px] tracking-[0.35em] text-[#c5a059] uppercase mb-1">
          The Phil Thing
        </p>
        <h1 className="font-serif text-3xl md:text-4xl font-semibold text-[#f5f0e6] leading-tight tracking-tight">
          L&apos;Arte dell&apos;Offesa Elegante
        </h1>
        <p className="font-sans text-xs text-[#c8baa6] tracking-wide mt-2">
          Perché certe verità meritano di essere dette con stile.
        </p>
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
                handleGenerate();
              }
            }}
            placeholder="Descrivi la vittima o la situazione (es. collega logorroico)..."
            rows={5}
            className="
              w-full bg-[#181818] border border-[#383838] rounded-sm
              px-5 py-4 text-[#e0d8c8] font-sans text-sm leading-relaxed
              placeholder:text-[#786858] resize-none outline-none
              focus:border-[rgba(197,160,89,0.7)] transition-colors duration-300
              tracking-wide
            "
          />

          <div className="flex gap-3">
            <button
              onClick={handleGenerate}
              disabled={isPending}
              className="
                flex-1 bg-[#c5a059] text-[#0a0a0a] font-sans font-semibold
                text-xs tracking-[0.2em] uppercase px-6 py-3.5 rounded-sm
                hover:bg-[#d4b06a] active:bg-[#b8924d]
                disabled:opacity-50 disabled:cursor-not-allowed
                transition-all duration-200
              "
            >
              {isPending
                ? <span className="animate-shimmer">Elaborazione…</span>
                : "Evolvi l'Offesa"
              }
            </button>

            <button
              onClick={handleRandom}
              disabled={isPending}
              title="Ispirazione Casuale"
              className="
                border border-[#484848] text-[#c8baa6] px-4 py-3.5 rounded-sm
                hover:border-[#c5a059] hover:text-[#c5a059]
                disabled:opacity-40 disabled:cursor-not-allowed
                transition-all duration-200 flex items-center gap-2
              "
            >
              <Shuffle size={14} />
              <span className="font-sans text-xs tracking-widest uppercase hidden sm:inline">
                Casuale
              </span>
            </button>
          </div>

          {/* Hint */}
          <p className="font-sans text-[10px] tracking-widest text-[#786858] uppercase text-center">
            Invio per generare · Shift+Invio per andare a capo
          </p>
        </section>

        {/* Right — Result card (always visible) */}
        <section className="relative">

          {/* Empty state */}
          {!result && !isPending && (
            <div className="border border-[#2a2a2a] rounded-sm p-8 text-center flex flex-col items-center justify-center min-h-[220px]">
              <span className="text-[#c5a059] opacity-30 text-3xl mb-4">❧</span>
              <p className="font-sans text-[11px] tracking-[0.3em] text-[#686058] uppercase">
                L&apos;insulto apparirà qui
              </p>
            </div>
          )}

          {/* Loading state */}
          {isPending && (
            <div className="border border-[#383838] rounded-sm p-8 text-center flex flex-col items-center justify-center min-h-[220px]">
              <span className="text-[#c5a059] opacity-60 text-3xl mb-4 animate-shimmer">❧</span>
              <p className="font-sans text-[11px] tracking-[0.3em] text-[#a09080] uppercase animate-shimmer">
                Affilando il pensiero…
              </p>
            </div>
          )}

          {/* Result */}
          {result && !isPending && (
            <div className="relative bg-[#141414] border border-[rgba(197,160,89,0.5)] rounded-sm p-7 animate-fade-in-up">
              <span className="absolute top-3 left-3 text-[#c5a059] opacity-70 text-xs">❧</span>
              <span className="absolute top-3 right-3 text-[#c5a059] opacity-70 text-xs rotate-180">❧</span>
              <span className="absolute bottom-3 left-3 text-[#c5a059] opacity-70 text-xs rotate-180">❧</span>
              <span className="absolute bottom-3 right-3 text-[#c5a059] opacity-70 text-xs">❧</span>

              <div className="text-center mb-5 pb-4 border-b border-[#303030]">
                <p className="font-sans text-[11px] tracking-[0.4em] text-[#b8a890] uppercase">
                  Nota per il destinatario
                </p>
              </div>

              <blockquote className="font-serif text-lg text-[#f5f0e6] leading-relaxed tracking-wide text-center italic">
                {result}
              </blockquote>

              <div className="text-center mt-5 pt-4 border-t border-[#303030]">
                <p className="font-sans text-[11px] tracking-[0.3em] text-[#a09080] uppercase">
                  con sincero disprezzo
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
                      <span className="text-[#c5a059]">Consegnato</span>
                    </>
                  ) : (
                    <>
                      <Copy size={11} />
                      Copia per il destinatario
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
          <div className="h-px w-8 bg-[#383838]" />
          <div className="w-1 h-1 rounded-full bg-[#484848]" />
          <div className="h-px w-8 bg-[#383838]" />
        </div>
        <p className="font-sans text-[10px] tracking-[0.3em] text-[#786858] uppercase">
          Elegance is the only true luxury
        </p>
      </footer>

    </main>
  );
}
