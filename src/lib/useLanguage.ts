"use client";

import { useState, useEffect } from "react";
import type { Lang } from "./translations";

export function useLanguage() {
  const [lang, setLang] = useState<Lang>("it");

  useEffect(() => {
    const stored = localStorage.getItem("tpt-lang") as Lang;
    if (stored === "en" || stored === "it") setLang(stored);
  }, []);

  function toggleLang() {
    const next: Lang = lang === "it" ? "en" : "it";
    setLang(next);
    localStorage.setItem("tpt-lang", next);
  }

  return { lang, toggleLang };
}
