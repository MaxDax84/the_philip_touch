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
  "Potrei darti ragione, ma poi avremmo torto in due.",
  "Ti ascolto con tutto l'interesse che meriti — e in questo momento non riesco a fare altro.",
  "Non è che non capisca il tuo punto di vista: è che capirlo non cambia nulla.",
  "Sei il tipo di persona a cui si dice 'ottima osservazione' per evitare di spiegare perché non lo è.",
  "La tua sicurezza sarebbe ammirevole, se non fosse così accuratamente priva di fondamento.",
  "Mi fermo un momento ad apprezzare quanto tu sia convinto di te stesso. Un momento è sufficiente.",
  "Non ti contraddirei mai — mi basterebbe aspettare che lo faccia la realtà al posto mio.",
  "Hai un'opinione su tutto. Peccato che tutto abbia un'opinione migliore di te.",
  "Parli come chi ha letto la quarta di copertina e si ritiene pronto a tenere una conferenza.",
  "La cosa più generosa che si possa dire di te è che probabilmente non te ne rendi conto.",
];

export function getRandomInsult(): string {
  return PHILOSOPHICAL_INSULTS[Math.floor(Math.random() * PHILOSOPHICAL_INSULTS.length)];
}

export function buildPrompt(input: string): string {
  return `Contesto: "${input}". Genera un insulto diretto, elegante e tagliente rivolto alla persona o alla situazione descritta. Scrivi in seconda persona singolare (tu/lei) o come osservazione diretta, senza mai ripetere o citare le parole del contesto. L'insulto deve sembrare una verità detta con distacco aristocratico — cinico, sottile, mai volgare. Una o due frasi al massimo, in italiano.`;
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

function wrapInContext(_input: string): string {
  const templates = [
    "Hai raggiunto quella rara perfezione per cui ogni sforzo di miglioramento sembrerebbe, a questo punto, una forma di ottimismo mal riposto.",
    "La tua presenza intellettuale ricorda quella di un piattino da caffè — sufficiente per contenere qualcosa, insufficiente per impressionare chiunque.",
    "Parli molto. Dici poco. Un'equazione che, in ambito matematico, si chiamerebbe errore di calcolo.",
    "Non ti mancano le opinioni. Ti mancano le ragioni per averle.",
    "Hai l'entusiasmo di chi non sa abbastanza per essere cauto — e si vede, con dolorosa chiarezza.",
    "La tua autostima e le tue capacità reali conducono vite parallele, senza mai incontrarsi.",
    "Ogni tua certezza è un'intuizione mai sottoposta al rigore del dubbio. Il risultato è esattamente quello che sembra.",
    "Hai il dono di trasformare ogni conversazione in un monumento al nulla — elegante nella forma, vuoto nella sostanza.",
    "Non è che tu sia noioso — è che la tua compagnia offre una qualità di vuoto difficilmente replicabile.",
    "Il tuo contributo è sempre proporzionato alla tua comprensione — e questo, sfortunatamente, spiega tutto.",
  ];
  return templates[Math.floor(Math.random() * templates.length)];
}

function simulateDelay(): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, 900 + Math.random() * 600));
}
