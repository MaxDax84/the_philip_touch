import Link from "next/link";
import { Feather, Wind } from "lucide-react";

export default function LandingPage() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen px-6 py-12">

      {/* Header */}
      <header className="text-center mb-12">
        <div className="flex items-center justify-center gap-3 mb-3">
          <div className="h-px w-10 bg-[#c5a059]" />
          <div className="w-1 h-1 rounded-full bg-[#c5a059]" />
          <div className="h-px w-10 bg-[#c5a059]" />
        </div>
        <p className="font-sans text-[10px] tracking-[0.4em] text-[#c5a059] uppercase mb-2">
          The Philip Touch
        </p>
        <h1 className="font-serif text-4xl md:text-5xl font-semibold text-[#f5f0e6] leading-tight tracking-tight">
          Scegli la tua arma
        </h1>
        <p className="font-sans text-xs text-[#c8baa6] tracking-wide mt-3 max-w-sm mx-auto">
          Due modi diversi di dire la stessa cosa. Entrambi legali.
        </p>
      </header>

      {/* Two big cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-3xl">

        {/* Card 1 — The Philip Touch */}
        <Link href="/touch" className="group block">
          <div className="
            relative border border-[rgba(197,160,89,0.3)] rounded-sm p-10
            bg-[#211e1a] hover:border-[rgba(197,160,89,0.7)]
            hover:bg-[#261f19] transition-all duration-300
            flex flex-col items-center text-center gap-5 min-h-[280px] justify-center
          ">
            <div className="
              w-14 h-14 rounded-full border border-[rgba(197,160,89,0.4)]
              flex items-center justify-center
              group-hover:border-[#c5a059] transition-colors duration-300
            ">
              <Feather size={22} className="text-[#c5a059]" />
            </div>
            <div>
              <p className="font-sans text-[10px] tracking-[0.3em] text-[#c5a059] uppercase mb-2">
                Modalità elegante
              </p>
              <h2 className="font-serif text-2xl text-[#f5f0e6] mb-3">
                L&apos;Offesa Elegante
              </h2>
              <p className="font-sans text-xs text-[#b8ac9c] leading-relaxed">
                Insulti cinici, raffinati e chirurgici. Colpisci l&apos;intelletto, risparmia la galera.
              </p>
            </div>
            <span className="font-sans text-[10px] tracking-[0.3em] text-[#786858] uppercase group-hover:text-[#c5a059] transition-colors duration-300">
              Entra →
            </span>
          </div>
        </Link>

        {/* Card 2 — La Valvola */}
        <Link href="/calma" className="group block">
          <div className="
            relative border border-[#2e2b27] rounded-sm p-10
            bg-[#1a1714] hover:border-[rgba(197,160,89,0.4)]
            hover:bg-[#1e1b18] transition-all duration-300
            flex flex-col items-center text-center gap-5 min-h-[280px] justify-center
          ">
            <div className="
              w-14 h-14 rounded-full border border-[#2e2b27]
              flex items-center justify-center
              group-hover:border-[rgba(197,160,89,0.4)] transition-colors duration-300
            ">
              <Wind size={22} className="text-[#786858] group-hover:text-[#c5a059] transition-colors duration-300" />
            </div>
            <div>
              <p className="font-sans text-[10px] tracking-[0.3em] text-[#786858] uppercase mb-2 group-hover:text-[#c5a059] transition-colors duration-300">
                Modalità sopravvivenza
              </p>
              <h2 className="font-serif text-2xl text-[#f5f0e6] mb-3">
                La Valvola di Sfogo
              </h2>
              <p className="font-sans text-xs text-[#b8ac9c] leading-relaxed">
                Scrivi quello che pensi davvero. Noi lo traduciamo in qualcosa che non ti costi una denuncia.
              </p>
            </div>
            <span className="font-sans text-[10px] tracking-[0.3em] text-[#786858] uppercase group-hover:text-[#c5a059] transition-colors duration-300">
              Entra →
            </span>
          </div>
        </Link>
      </div>

      {/* Footer */}
      <footer className="mt-16 text-center">
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
