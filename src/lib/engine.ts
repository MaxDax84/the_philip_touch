export const PHILOSOPHICAL_INSULTS: string[] = [
  "La sua profondità intellettuale ricorda quella di un piattino da caffè — sufficiente per contenere qualcosa, insufficiente per impressionare chiunque.",
  "Ha il raro talento di trasformare ogni conversazione in un'opera di bonario nulla, degna di incorniciamento e immediato smaltimento.",
  "La sua presenza in una stanza non è tanto soffocante quanto decorativamente inutile, come un lampadario spento in piena estate.",
  "Parla molto. Dice poco. Un'equazione che, in ambito matematico, si chiamerebbe errore di calcolo.",
  "Il suo ottimismo è così impermeabile alla realtà da sembrare quasi un dono. Quasi.",
  "Non è stupido — è qualcosa di più raffinato: è il risultato logico di un pensiero mai portato a termine.",
  "Ha la straordinaria capacità di riempire il silenzio senza mai aggiungere nulla ad esso.",
  "Ogni sua idea è un'opera prima e, con fortuna, anche un'opera ultima.",
  "La mediocrità, in lui, ha raggiunto una tale perfezione da diventare quasi un'arte.",
  "Ascoltarlo è come leggere le istruzioni di un elettrodomestico: necessario in teoria, deprimente in pratica.",
  "Ha l'entusiasmo di chi non sa abbastanza per essere cauto.",
  "Il suo contributo alla conversazione è sempre proporzionato alla sua comprensione di essa — e ciò spiega molto.",
  "Non manca di opinioni. Manca di ragioni per averle.",
  "È il tipo di persona che confonde la verbosità con l'eloquenza, e il volume con l'autorevolezza.",
  "Il suo senso dell'umorismo è come un'opera d'arte astratta: nessuno capisce esattamente cosa rappresenti, ma tutti annuiscono educatamente.",
  "Ha un talento naturale per l'ovvio che, in altri contesti, potrebbe quasi essere considerato un mestiere.",
  "La sua autostima e le sue capacità reali conducono vite parallele, senza mai incontrarsi.",
  "Non è che sia noioso — è che la sua compagnia offre una qualità di vuoto difficilmente replicabile.",
  "Ogni sua certezza è un'intuizione mai sottoposta al rigore del dubbio — e si vede.",
  "Ha trovato nel conformismo la sua forma di ribellione, senza accorgersi dell'ironia.",
];

export function getRandomInsult(): string {
  return PHILOSOPHICAL_INSULTS[Math.floor(Math.random() * PHILOSOPHICAL_INSULTS.length)];
}

export function buildPrompt(input: string): string {
  return `Trasforma questo concetto in un commento cinico, distaccato, privo di volgarità e molto sofisticato: "${input}". Il commento deve essere un insulto elegante e filosofico, mai volgare, che colpisca l'intelletto e l'ego con precisione clinica. Scrivi in italiano, in una sola frase o due al massimo.`;
}

export async function generateInsult(input: string): Promise<string> {
  const apiKey = process.env.ANTHROPIC_API_KEY;

  if (!apiKey) {
    await simulateDelay();
    return wrapInContext(input);
  }

  try {
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-haiku-4-5-20251001",
        max_tokens: 300,
        messages: [
          {
            role: "user",
            content: buildPrompt(input),
          },
        ],
        system:
          "Sei un maestro dell'ironia sofisticata e del cinismo elegante. Non usi mai volgarità. I tuoi commenti sono acuti, distaccati e profondamente raffinati — come un editoriale del New Yorker scritto con malevolenza contenuta.",
      }),
    });

    if (!response.ok) throw new Error("API error");

    const data = await response.json();
    return data.content?.[0]?.text ?? wrapInContext(input);
  } catch {
    await simulateDelay();
    return wrapInContext(input);
  }
}

function wrapInContext(input: string): string {
  const templates = [
    `Descrivere "${input}" come mediocre sarebbe un elogio immeritato — è qualcosa di molto più preciso: è esattamente ciò che ci si aspetta da chi non si aspetta nulla da sé stesso.`,
    `"${input}" — un concetto che, con la giusta illuminazione e una certa pietà intellettuale, potrebbe quasi essere scambiato per un pensiero.`,
    `Chi incarna "${input}" ha raggiunto quella rara perfezione per cui ogni sforzo di miglioramento sembrerebbe, a questo punto, una forma di ottimismo mal riposto.`,
    `"${input}" è il tipo di caratteristica che si nota immediatamente e si dimentica difficilmente — non perché impressioni, ma perché delude con tale costanza da diventare quasi affidabile.`,
    `Nel vasto catalogo delle qualità umane, "${input}" occupa quella posizione discreta e immobile che nessuno rivendica e che, tuttavia, qualcuno inevitabilmente rappresenta.`,
  ];
  return templates[Math.floor(Math.random() * templates.length)];
}

function simulateDelay(): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, 900 + Math.random() * 600));
}
