"use server";

export async function transformRage(input: string): Promise<string> {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) return fallback();

  try {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent?key=${apiKey}`;

    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: `Hai ricevuto questo sfogo privato (può contenere volgarità, insulti, rabbia): "${input}"

Il tuo compito è trasformarlo in una frase gentile, pacata e diplomatica che:
- Trasmette lo stesso senso di insoddisfazione o disappunto
- Non contiene alcuna volgarità, insulto o aggressività
- È adatta a essere detta ad alta voce in qualsiasi contesto pubblico o professionale
- Non può essere usata come prova di aggressione o offesa
- Ha un tono calmo, civile, anche leggermente malinconico o rassegnato
- È di una o due frasi al massimo

Rispondi solo con la frase trasformata, niente altro.`,
          }],
        }],
        generationConfig: {
          maxOutputTokens: 200,
          temperature: 0.7,
          thinkingConfig: { thinkingBudget: 0 },
        },
      }),
    });

    if (!response.ok) return fallback();

    const data = await response.json();
    const parts = data.candidates?.[0]?.content?.parts ?? [];
    const text = parts
      .filter((p: { text?: string }) => p.text)
      .map((p: { text: string }) => p.text)
      .join("").trim();

    return text || fallback();
  } catch {
    return fallback();
  }
}

function fallback(): string {
  const phrases = [
    "Apprezzo la tua prospettiva, anche se la mia è piuttosto diversa.",
    "Credo che potremmo trovare un punto di incontro, con un po' di tempo e buona volontà.",
    "Non sono del tutto d'accordo con questa situazione, ma resto aperto al dialogo.",
    "Mi rendo conto che ci sono margini di miglioramento che entrambi potremmo considerare.",
    "Preferisco non esprimere un giudizio definitivo in questo momento.",
  ];
  return phrases[Math.floor(Math.random() * phrases.length)];
}
