"use server";

import { generateInsult, getRandomInsult } from "@/lib/engine";

export async function generateFromInput(input: string, lang = "it"): Promise<string> {
  if (!input.trim()) return getRandomInsult(lang);
  return generateInsult(input.trim(), lang);
}

export async function generateRandom(lang = "it"): Promise<string> {
  return getRandomInsult(lang);
}

export async function checkApiAvailability(): Promise<boolean> {
  return !!process.env.GEMINI_API_KEY;
}

