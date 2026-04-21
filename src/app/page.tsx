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
    <main className="flex-1 flex flex-col items-center justify-center min-h-screen px-6 py-16">
      {/* Header */}
      <header className="text-center mb-16 space-y-3">
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="h-px w-12 bg-[#c5a059] opacity-60" />
          <Feather size={14} className="text-[#c5a059] opacity-70" />
          <div className="h-px w-12 bg-[#c5a059] opacity-60" />
        </div>
        <p className="font-sans text-xs tracking-[0.35em] text-[#c5a059] uppercase opacity-80">
          The Phil Thing
        </p>
        <h1 className="font-serif text-4xl md:text-5xl font-semibold text-[#e8e0d0] leading-tight tracking-tight">
          L&apos;Arte dell&apos;Offesa Elegante
        </h1>
        <p className="font-sans text-sm text-[#a09080] tracking-wide max-w-sm mx-auto mt-2">
          Perché certe verità meritano di essere dette con stile.
        </p>
      </header>

      {/* Input Section */}
      <section className="w-full max-w-xl space-y-4">
        <div className="relative">
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
            rows={3}
            className="
              w-full bg-[#111111] border border-[#1e1e1e] rounded-sm
              px-5 py-4 text-[#c8bfad] font-sans text-sm leading-relaxed
              placeholder:text-[#5a5248] resize-none outline-none
              focus:border-[rgba(197,160,89,0.35)] transition-colors duration-300
              tracking-wide
            "
          />
        </div>

        {/* Buttons */}
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
            {isPending ? (
              <span className="animate-shimmer">Elaborazione in corso…</span>
            ) : (
              "Evolvi l'Offesa"
            )}
          </button>

          <button
            onClick={handleRandom}
            disabled={isPending}
            title="Ispirazione Casuale"
            className="
              border border-[#2a2a2a] text-[#9a8f82] px-4 py-3.5 rounded-sm
              hover:border-[rgba(197,160,89,0.3)] hover:text-[#c5a059]
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
      </section>

      {/* Result Card */}
      {result && !isPending && (
        <section className="w-full max-w-xl mt-12 animate-fade-in-up">
          <div
            className="
              relative bg-[#0e0e0e] border border-[rgba(197,160,89,0.2)]
              rounded-sm p-8 md:p-10
            "
          >
            {/* Corner decorations */}
            <span className="absolute top-3 left-3 text-[#c5a059] opacity-30 text-xs">❧</span>
            <span className="absolute top-3 right-3 text-[#c5a059] opacity-30 text-xs rotate-180">❧</span>
            <span className="absolute bottom-3 left-3 text-[#c5a059] opacity-30 text-xs rotate-180">❧</span>
            <span className="absolute bottom-3 right-3 text-[#c5a059] opacity-30 text-xs">❧</span>

            {/* Card header */}
            <div className="text-center mb-6 pb-5 border-b border-[#1a1a1a]">
              <p className="font-sans text-[10px] tracking-[0.4em] text-[#7a7068] uppercase">
                Nota per il destinatario
              </p>
            </div>

            {/* Insult text */}
            <blockquote className="font-serif text-lg md:text-xl text-[#ddd5c2] leading-relaxed tracking-wide text-center italic">
              {result}
            </blockquote>

            {/* Card footer */}
            <div className="text-center mt-6 pt-5 border-t border-[#1a1a1a]">
              <p className="font-sans text-[10px] tracking-[0.3em] text-[#6a6058] uppercase">
                con sincero disprezzo
              </p>
            </div>

            {/* Copy button */}
            <div className="flex justify-center mt-6">
              <button
                onClick={handleCopy}
                className="
                  flex items-center gap-2 font-sans text-[10px] tracking-[0.25em] uppercase
                  text-[#7a7068] hover:text-[#c5a059] transition-colors duration-200
                  border border-[#2a2a2a] hover:border-[rgba(197,160,89,0.3)]
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
        </section>
      )}

      {/* Loading state */}
      {isPending && (
        <section className="w-full max-w-xl mt-12">
          <div className="border border-[#1a1a1a] rounded-sm p-10 text-center">
            <p className="font-sans text-xs tracking-[0.3em] text-[#6a6058] uppercase animate-shimmer">
              Affilando il pensiero…
            </p>
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="mt-20 text-center">
        <div className="flex items-center justify-center gap-3 mb-3">
          <div className="h-px w-8 bg-[#1e1e1e]" />
          <div className="w-1 h-1 rounded-full bg-[#2a2520]" />
          <div className="h-px w-8 bg-[#1e1e1e]" />
        </div>
        <p className="font-sans text-[10px] tracking-[0.3em] text-[#4a4540] uppercase">
          Elegance is the only true luxury
        </p>
      </footer>
    </main>
  );
}
