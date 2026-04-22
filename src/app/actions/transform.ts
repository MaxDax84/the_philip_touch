"use server";

export async function transformRage(input: string, lang = "it"): Promise<string> {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) return fallback(lang);

  const prompt = lang === "en"
    ? `You received this private outburst (may contain profanity, insults, rage): "${input}"

Your task is to transform it into a sentence that:
- Is pertinent to the described situation or person — do not change the subject
- Has a positive, proactive and open tone — as if you see an opportunity where others see a problem
- Contains no aggression, judgment or sarcasm
- Suggests a way forward, a constructive perspective or a concrete possibility
- Is suitable to be said out loud in any context without consequences
- Is one or two sentences maximum, in English

Respond only with the transformed sentence, nothing else.`
    : `Hai ricevuto questo sfogo privato (può contenere volgarità, insulti, rabbia): "${input}"

Il tuo compito è trasformarlo in una frase che:
- Sia pertinente alla situazione o alla persona descritta — non cambiare argomento
- Abbia un tono positivo, proattivo e di apertura — come se vedessi un'opportunità dove altri vedono un problema
- Non contenga aggressività, giudizio o sarcasmo
- Suggerisca un passo avanti, una prospettiva costruttiva o una possibilità concreta
- Sia adatta a essere detta ad alta voce in qualsiasi contesto senza conseguenze
- Sia di una o due frasi al massimo, in italiano

Rispondi solo con la frase, niente altro.`;

  try {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent?key=${apiKey}`;

    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: {
          maxOutputTokens: 200,
          temperature: 0.7,
          thinkingConfig: { thinkingBudget: 0 },
        },
      }),
    });

    if (!response.ok) return fallback(lang);

    const data = await response.json();
    const parts = data.candidates?.[0]?.content?.parts ?? [];
    const text = parts
      .filter((p: { text?: string }) => p.text)
      .map((p: { text: string }) => p.text)
      .join("").trim();

    return text || fallback(lang);
  } catch {
    return fallback(lang);
  }
}

function fallback(lang = "it"): string {
  const it = [
    "Forse c'è un modo per trasformare questa situazione in qualcosa di utile — a volte le difficoltà aprono porte inaspettate.",
    "Capisco la frustrazione, e sono sicuro che troveremo un punto di incontro se ci proviamo insieme.",
    "Magari vale la pena fermarsi un momento e vedere se c'è qualcosa di positivo da cui ripartire.",
    "Sono convinto che con un po' di dialogo aperto si possano trovare soluzioni migliori di quanto sembri adesso.",
    "È una situazione complicata, ma credo ci siano margini reali per migliorarla — partiamo da lì.",
  ];
  const en = [
    "Perhaps there's a way to turn this situation into something useful — difficulties often open unexpected doors.",
    "I understand the frustration, and I'm sure we can find common ground if we try together.",
    "It might be worth pausing for a moment to see if there's something positive to build on.",
    "I believe that with a little open dialogue, we can find better solutions than it might seem right now.",
    "It's a complicated situation, but I think there's real room to improve it — let's start there.",
  ];
  const arr = lang === "en" ? en : it;
  return arr[Math.floor(Math.random() * arr.length)];
}
