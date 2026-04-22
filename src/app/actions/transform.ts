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

Il tuo compito è trasformarlo in una risposta solare, leggera e disarmante che:
- Ha un tono caldo, positivo e quasi ingenuo — come se non avessi capito la tensione
- Può cambiare completamente argomento in modo naturale, distogliendo l'attenzione dalla situazione
- Non contiene alcuna aggressività, disappunto o giudizio
- È così gentile e fuori contesto da risultare disarmante
- Può fare riferimento a qualcosa di piacevole, banale o quotidiano (il tempo, il caffè, un ricordo, una cosa bella)
- Non può essere usata come prova di aggressione o offesa
- È di una o due frasi al massimo, in italiano

Esempi di tono: "Sai, stamattina ho visto un cane con un maglione arancione e mi ha reso la giornata." oppure "Ho appena pensato che non mangio una buona pizza da troppo tempo. Tu hai un posto preferito?"

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
    "Sai, stamattina ho visto un cane con un maglione arancione e mi ha reso la giornata.",
    "A proposito, hai mai assaggiato un cornetto caldo alle sei di mattina? Cambia tutto.",
    "Mi è appena tornato in mente che non guardo un tramonto decente da mesi. Dobbiamo rimediare.",
    "Comunque, ho sentito che il weekend arriva il sole. Già mi sento meglio.",
    "Sai cosa non ho ancora fatto? Ordinare quella cosa che voglio da settimane. Lo faccio adesso.",
    "Hai presente quella canzone che non riesci a toglierti dalla testa per giorni? Ecco, è successa di nuovo.",
    "Pensavo proprio di prendermi un caffè. L'hai già preso oggi?",
  ];
  return phrases[Math.floor(Math.random() * phrases.length)];
}
