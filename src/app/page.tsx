"use client";

import { useState, useTransition } from "react";
import { Shuffle, Copy, Check, Feather } from "lucide-react";
import { generateFromInput, generateRandom } from "@/app/actions/generate";

export default function Home() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [isPending, startTransition] = useTransition();

  function handleRandom() {
    startTransition(async () => {
      const insult = await generateRandom();
      setResult(insult);
      setCopied(false);
    });
  }

  function handleGenerate() {
    startTransition(async () => {
      const insult = await generateFromInput(input);
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
          The Philip Touch
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

        {/* Left — Controls */}
        <section className="flex flex-col gap-4">

          {/* Primary CTA — Random */}
          <button
            onClick={handleRandom}
            disabled={isPending}
            className="
              w-full flex items-center justify-center gap-3
              bg-[#c5a059] text-[#0a0a0a] font-sans font-semibold
              text-sm tracking-[0.2em] uppercase px-6 py-5 rounded-sm
              hover:bg-[#d4b06a] active:bg-[#b8924d]
              disabled:opacity-50 disabled:cursor-not-allowed
              transition-all duration-200
            "
          >
            <Shuffle size={16} />
            {isPending ? "Elaborazione…" : "Genera insulto casuale"}
          </button>

          {/* Divider */}
          <div className="flex items-center gap-3">
            <div className="flex-1 h-px bg-[#2e2b27]" />
            <span className="font-sans text-[10px] tracking-[0.3em] text-[#786858] uppercase whitespace-nowrap">
              oppure personalizza
            </span>
            <div className="flex-1 h-px bg-[#2e2b27]" />
          </div>

          {/* Customization panel */}
          <div className="flex flex-col gap-3">
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
                rows={4}
                className="
                  w-full bg-[#211e1a] border border-[#38342e] rounded-sm
                  px-5 py-4 text-[#e0d8c8] font-sans text-sm leading-relaxed
                  placeholder:text-[#786858] resize-none outline-none
                  focus:border-[rgba(197,160,89,0.7)] transition-colors duration-300
                  tracking-wide
                "
              />
              <button
                onClick={handleGenerate}
                disabled={isPending}
                className="
                  w-full border border-[#c5a059] text-[#c5a059] font-sans font-semibold
                  text-xs tracking-[0.2em] uppercase px-6 py-3.5 rounded-sm
                  hover:bg-[#c5a059] hover:text-[#0a0a0a]
                  disabled:opacity-50 disabled:cursor-not-allowed
                  transition-all duration-200
                "
              >
                {isPending ? "Elaborazione…" : "Evolvi l'Offesa"}
              </button>
              <p className="font-sans text-[10px] tracking-widest text-[#786858] uppercase text-center">
                Invio per generare · Shift+Invio per andare a capo
              </p>
          </div>
        </section>

        {/* Right — Result card */}
        <section>

          {/* Empty state */}
          {!result && !isPending && (
            <div className="border border-[#2e2b27] rounded-sm p-8 text-center flex flex-col items-center justify-center min-h-[200px]">
              <span className="text-[#c5a059] opacity-25 text-3xl mb-4">❧</span>
              <p className="font-sans text-[11px] tracking-[0.3em] text-[#686058] uppercase">
                L&apos;insulto apparirà qui
              </p>
            </div>
          )}

          {/* Loading */}
          {isPending && (
            <div className="border border-[#38342e] rounded-sm p-8 text-center flex flex-col items-center justify-center min-h-[200px]">
              <span className="text-[#c5a059] opacity-60 text-3xl mb-4 animate-shimmer">❧</span>
              <p className="font-sans text-[11px] tracking-[0.3em] text-[#a09080] uppercase animate-shimmer">
                Affilando il pensiero…
              </p>
            </div>
          )}

          {/* Result */}
          {result && !isPending && (
            <div className="relative bg-[#211e1a] border border-[rgba(197,160,89,0.5)] rounded-sm p-7 animate-fade-in-up">
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
          <div className="h-px w-8 bg-[#2e2b27]" />
          <div className="w-1 h-1 rounded-full bg-[#3a3530]" />
          <div className="h-px w-8 bg-[#2e2b27]" />
        </div>
        <p className="font-sans text-[10px] tracking-[0.3em] text-[#786858] uppercase">
          Elegance is the only true luxury
        </p>
      </footer>

    </main>
  );
}
