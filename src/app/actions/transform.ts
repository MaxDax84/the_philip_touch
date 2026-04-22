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

Il tuo compito è trasformarlo in una frase che:
- Sia pertinente alla situazione o alla persona descritta — non cambiare argomento
- Abbia un tono positivo, proattivo e di apertura — come se vedessi un'opportunità dove altri vedono un problema
- Non contenga aggressività, giudizio o sarcasmo
- Suggerisca un passo avanti, una prospettiva costruttiva o una possibilità concreta
- Sia adatta a essere detta ad alta voce in qualsiasi contesto senza conseguenze
- Sia di una o due frasi al massimo, in italiano

Rispondi solo con la frase, niente altro.`,
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
    "Forse c'è un modo per trasformare questa situazione in qualcosa di utile — a volte le difficoltà aprono porte inaspettate.",
    "Capisco la frustrazione, e sono sicuro che troveremo un punto di incontro se ci proviamo insieme.",
    "Magari vale la pena fermarsi un momento e vedere se c'è qualcosa di positivo da cui ripartire.",
    "Sono convinto che con un po' di dialogo aperto si possano trovare soluzioni migliori di quanto sembri adesso.",
    "È una situazione complicata, ma credo ci siano margini reali per migliorarla — partiamo da lì.",
  ];
  return phrases[Math.floor(Math.random() * phrases.length)];
}
