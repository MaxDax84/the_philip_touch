"use server";

import { generateInsult, getRandomInsult } from "@/lib/engine";

export async function generateFromInput(input: string): Promise<string> {
  if (!input.trim()) return getRandomInsult();
  return generateInsult(input.trim());
}

export async function generateRandom(): Promise<string> {
  return getRandomInsult();
}

export async function checkApiAvailability(): Promise<boolean> {
  return !!process.env.GEMINI_API_KEY;
}

export async function listAvailableModels(): Promise<string> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return "Nessuna API key trovata.";
  try {
    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`
    );
    const data = await res.json();
    if (!res.ok) return `Errore ${res.status}: ${JSON.stringify(data)}`;
    const names = data.models?.map((m: { name: string }) => m.name).join("\n") ?? "Nessun modello trovato";
    return names;
  } catch (e) {
    return `Errore: ${String(e)}`;
  }
}
