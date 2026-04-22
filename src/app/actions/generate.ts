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

