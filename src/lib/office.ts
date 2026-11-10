import type { Lang } from "./translations";

// Generatori a template, tutto locale: nessuna API, nessun costo.

type Pools = Record<Lang, string[]>;

function pick<T>(arr: readonly T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

// ---------- Scuse aziendali (4 x 5 x 8 x 5 = 800 combinazioni per lingua) ----------

const EXCUSE_OPEN: Pools = {
  it: ["Gentili colleghi,", "Buongiorno a tutti,", "Ciao team,", "Gentile team,"],
  en: ["Dear colleagues,", "Good morning all,", "Hi team,", "Dear team,"],
};

const EXCUSE_ACTION: Pools = {
  it: [
    "Purtroppo non potrò partecipare alla riunione di lunedì mattina",
    "Dovrò saltare il consueto sync settimanale",
    "Non sarò disponibile per la call delle 9:00",
    "Dovrò declinare, mio malgrado, l’invito al weekly",
    "Non riuscirò a unirmi al kickoff di inizio settimana",
  ],
  en: [
    "Unfortunately I won’t be able to attend Monday morning’s meeting",
    "I will have to skip the usual weekly sync",
    "I will not be available for the 9:00 call",
    "I must regretfully decline the invitation to the weekly",
    "I will not be able to join the start-of-week kickoff",
  ],
};

const EXCUSE_CAUSE: Pools = {
  it: [
    "a causa di una sovrapposizione critica con un’attività a forte impatto trasversale",
    "per via di un allineamento non rimandabile con uno stakeholder chiave",
    "in seguito a una riprioritizzazione dell’agenda che mi vede coinvolto su un tavolo parallelo",
    "a causa di un’urgenza operativa che richiede la mia presenza in modalità deep work",
    "per un imprevisto di natura logistica con ricadute sull’intera catena del valore",
    "dovendo presidiare un filone progettuale in fase di forte accelerazione",
    "per il sopraggiungere di una scadenza interna che richiede la massima focalizzazione",
    "dovendo gestire una criticità emersa durante la revisione dei processi",
  ],
  en: [
    "due to a critical overlap with a high-impact cross-functional activity",
    "because of a non-deferrable alignment with a key stakeholder",
    "following a reprioritization of my agenda that places me at a parallel table",
    "owing to an operational urgency that requires my presence in deep work mode",
    "due to a logistical contingency with repercussions across the entire value chain",
    "as I need to oversee a workstream in a phase of strong acceleration",
    "owing to an internal deadline that demands maximum focus",
    "as I must handle a critical issue that emerged during the process review",
  ],
};

const EXCUSE_CLOSE: Pools = {
  it: [
    "Vi aggiornerò offline appena possibile.",
    "Confido che il verbale mi darà piena visibilità sugli esiti.",
    "Resto a disposizione per un eventuale follow-up asincrono.",
    "Il mio contributo, se necessario, può essere considerato implicito.",
    "Sono certo che il gruppo saprà procedere con la consueta efficacia anche senza di me.",
  ],
  en: [
    "I will catch up offline as soon as possible.",
    "I trust the minutes will give me full visibility on the outcomes.",
    "I remain available for an asynchronous follow-up.",
    "My contribution, if needed, may be considered implicit.",
    "I am sure the group will proceed with its usual effectiveness even without me.",
  ],
};

export function generateExcuse(lang: Lang): string {
  return `${pick(EXCUSE_OPEN[lang])} ${pick(EXCUSE_ACTION[lang])} ${pick(EXCUSE_CAUSE[lang])}. ${pick(EXCUSE_CLOSE[lang])}`;
}

// ---------- Email passivo-aggressive (13 situazioni, 81 combinazioni ciascuna per lingua) ----------

type Parts = { open: string[]; body: string[]; sting: string[]; close: string[] };

type Scenario = {
  id: string;
  to: "client" | "colleague";
  label: Record<Lang, string>;
  it: Parts;
  en: Parts;
};

const SCENARIOS: Scenario[] = [
  {
    id: "unpaid",
    to: "client",
    label: { it: "Non paga", en: "Won’t pay" },
    it: {
      open: [
        "Mi permetto di scriverle in merito alla fattura rimasta in sospeso, che a questo punto ha assunto un valore quasi affettivo.",
        "Le scrivo per riprendere il discorso sul pagamento, che deve essersi perso tra le sue molte e più importanti priorità.",
        "Torno sull’argomento fattura, nella certezza che si tratti di una semplice dimenticanza durata qualche settimana.",
      ],
      body: [
        "Immagino sia un periodo intenso, e per questo allego nuovamente il documento, nel caso il precedente invio fosse finito in un luogo da cui non si torna.",
        "Ho verificato più volte i miei registri e risulta ancora tutto dovuto, il che mi fa pensare a un malinteso o a una dimenticanza particolarmente tenace.",
        "Le ricordo che il termine concordato è trascorso da un po’, e che la puntualità, come la fiducia, si apprezza soprattutto quando manca.",
      ],
      sting: [
        "Sono certo che vorrà sistemare la questione nel più breve tempo possibile.",
        "Confido che la regolarizzazione avvenga prima che il ricordo del lavoro svolto svanisca del tutto.",
        "Le sarei grato di un riscontro entro venerdì, giorno che mi sono permesso di rendere simbolico.",
      ],
      close: [
        "Resto a disposizione per qualsiasi chiarimento, anche telefonico.",
        "Nel frattempo la ringrazio per una collaborazione di cui ricordo con piacere la prima parte.",
        "Con la consueta cordialità, che comincio però a razionare.",
      ],
    },
    en: {
      open: [
        "I am writing about the outstanding invoice, which by now has taken on an almost sentimental value.",
        "I am following up on the payment, which must have been lost among your many, more important priorities.",
        "I am returning to the subject of the invoice, certain it is a simple oversight that has lasted a few weeks.",
      ],
      body: [
        "I imagine it is a busy period, so I am attaching the document again, in case the previous one ended up somewhere from which there is no return.",
        "I have checked my records several times and everything still appears to be due, which suggests a misunderstanding or a particularly tenacious oversight.",
        "May I remind you that the agreed deadline passed some time ago, and that punctuality, like trust, is mostly appreciated when it is missing.",
      ],
      sting: [
        "I am certain you will want to settle the matter as soon as possible.",
        "I trust the payment will be made before the memory of the work done fades completely.",
        "I would be grateful for a reply by Friday, a day I have taken the liberty of making symbolic.",
      ],
      close: [
        "I remain available for any clarification, even by phone.",
        "In the meantime, thank you for a collaboration whose first part I remember fondly.",
        "With my usual cordiality, which I am beginning to ration.",
      ],
    },
  },
  {
    id: "late",
    to: "client",
    label: { it: "Risponde in ritardo", en: "Replies late" },
    it: {
      open: [
        "Ho ricevuto la sua risposta e la ringrazio per la sorprendente tempestività.",
        "La ringrazio per avermi risposto: avevo iniziato a pensare che la mia email fosse andata smarrita in un altro fuso orario.",
        "Grazie per il riscontro, giunto proprio quando avevo ormai concluso il progetto con altri mezzi.",
      ],
      body: [
        "Nel frattempo ho preso la libertà di procedere in autonomia, come immagino avrebbe fatto anche lei.",
        "A distanza di tre settimane, alcune delle sue domande hanno trovato risposta da sole.",
        "Riprendo il filo del discorso, per quanto sia ormai un filo piuttosto lungo.",
      ],
      sting: [
        "Per evitare altri ritardi, le propongo di rispondere entro due giorni lavorativi; ne sarei davvero colpito.",
        "Se riesce a confermare entro domani, considererò la cosa un nuovo inizio.",
        "D’ora in avanti mi permetto di indicarle una scadenza, per aiutarla a organizzarsi.",
      ],
      close: [
        "Resto in attesa, con una pazienza che ritenevo infinita.",
        "La ringrazio per l’attenzione, ovunque fosse stata fino ad ora.",
        "Cordialità, e a presto, per quanto il tempo sia relativo.",
      ],
    },
    en: {
      open: [
        "I have received your reply and thank you for its surprising promptness.",
        "Thank you for replying: I had begun to think my email had been lost in another time zone.",
        "Thank you for your feedback, which arrived just when I had finished the project by other means.",
      ],
      body: [
        "In the meantime I took the liberty of proceeding on my own, as I imagine you would have done too.",
        "After three weeks, some of your questions have answered themselves.",
        "I am picking up the thread of the conversation, though it is by now quite a long thread.",
      ],
      sting: [
        "To avoid further delays, I suggest replying within two working days; I would be genuinely impressed.",
        "If you can confirm by tomorrow, I will consider it a fresh start.",
        "From now on I will take the liberty of giving you a deadline, to help you plan.",
      ],
      close: [
        "I remain waiting, with a patience I believed to be infinite.",
        "Thank you for your attention, wherever it has been until now.",
        "Kind regards, and see you soon, though time is relative.",
      ],
    },
  },
  {
    id: "meeting",
    to: "colleague",
    label: { it: "Riunione inutile", en: "Pointless meeting" },
    it: {
      open: [
        "Grazie per l’invito alla riunione di giovedì, che ho letto con grande attenzione.",
        "Ho visto l’invito alla call di un’ora e mezza, alla quale ho dedicato qualche minuto di sincera riflessione.",
        "Ti ringrazio per avermi incluso nella riunione di domani, ennesima occasione di allineamento.",
      ],
      body: [
        "Mi chiedevo se il contenuto non potesse essere riassunto in una email di quattro righe, che mi impegno a leggere con entusiasmo.",
        "L’agenda mi sembra ricca di argomenti che, a una prima lettura, si risolverebbero con un semplice sì.",
        "Non vedo un ordine del giorno, il che lascia presagire una conversazione ampia e fortemente aperta.",
      ],
      sting: [
        "Parteciperò se ritieni che la mia presenza aggiunga valore; in tal caso ti chiedo di indicarmi quale.",
        "Se la decisione è già presa, possiamo risparmiare a tutti il piacere di discuterla.",
        "Propongo di rimandare la riunione al momento in cui avremo qualcosa da dire.",
      ],
      close: [
        "Resto comunque disponibile, con la rassegnazione di sempre.",
        "Grazie per la sensibilità verso il tempo di tutti, soprattutto il tuo.",
        "A presto, o meglio, a lungo.",
      ],
    },
    en: {
      open: [
        "Thank you for the invitation to Thursday’s meeting, which I read with great attention.",
        "I saw the invitation to the ninety-minute call, to which I devoted a few minutes of sincere reflection.",
        "Thank you for including me in tomorrow’s meeting, yet another opportunity for alignment.",
      ],
      body: [
        "I was wondering whether the content could be summed up in a four-line email, which I promise to read with enthusiasm.",
        "The agenda seems full of topics that, at first reading, would be solved by a simple yes.",
        "I see no agenda at all, which suggests a wide-ranging and wonderfully open conversation.",
      ],
      sting: [
        "I will attend if you believe my presence adds value; in that case, please tell me which.",
        "If the decision has already been made, we can spare everyone the pleasure of discussing it.",
        "I suggest postponing the meeting until we have something to say.",
      ],
      close: [
        "I remain available nonetheless, with my usual resignation.",
        "Thank you for your sensitivity to everyone’s time, especially yours.",
        "See you soon, or rather, at length.",
      ],
    },
  },
  {
    id: "scope",
    to: "client",
    label: { it: "Richieste extra gratis", en: "Free extra requests" },
    it: {
      open: [
        "Grazie per le nuove richieste, che mostrano un entusiasmo davvero contagioso.",
        "Ho letto con interesse l’elenco delle modifiche aggiuntive, rientrate per sbaglio nel progetto originale.",
        "Le scrivo in merito alle ultime richieste, che immagino siano state pensate come inclusive.",
      ],
      body: [
        "Mi permetto di ricordare che il preventivo condiviso descriveva un perimetro preciso, per quanto il perimetro sia un concetto interpretabile.",
        "Ognuna di queste attività è realizzabile, ed è con piacere che allego anche una stima dei relativi costi.",
        "Le novità rientrano a pieno titolo nella categoria delle cose aggiuntive, che hanno un loro listino.",
      ],
      sting: [
        "Procederò non appena riceverò conferma dell’integrazione al budget.",
        "Se preferisce mantenere le condizioni attuali, sono lieto di restare fedele a quanto concordato.",
        "Resto in attesa di un suo cenno, possibilmente accompagnato da un importo.",
      ],
      close: [
        "Sono sempre felice di crescere insieme ai miei clienti, almeno finché cresce anche la fattura.",
        "Grazie per la fiducia, che considero un valore non quantificabile e quindi non fatturabile.",
        "Cordialmente, e con la massima flessibilità, entro i limiti del contratto.",
      ],
    },
    en: {
      open: [
        "Thank you for the new requests, which show a truly contagious enthusiasm.",
        "I read with interest the list of additional changes, which slipped into the original project by mistake.",
        "I am writing about your latest requests, which I assume were meant to be all-inclusive.",
      ],
      body: [
        "May I remind you that the quote we shared described a precise scope, though scope is admittedly an open-minded concept.",
        "Each of these activities is feasible, and I am happy to attach an estimate of the related costs.",
        "These novelties fall squarely into the category of additional things, which have their own price list.",
      ],
      sting: [
        "I will proceed as soon as I receive confirmation of the budget extension.",
        "If you prefer to keep the current terms, I am glad to stay faithful to what we agreed.",
        "I await your reply, ideally accompanied by an amount.",
      ],
      close: [
        "I am always happy to grow together with my clients, at least as long as the invoice grows too.",
        "Thank you for your trust, which I consider priceless and therefore unbillable.",
        "Kind regards, and with maximum flexibility, within the limits of the contract.",
      ],
    },
  },
  {
    id: "urgent",
    to: "client",
    label: { it: "Urgenza dell’ultimo minuto", en: "Last-minute urgency" },
    it: {
      open: [
        "Ho ricevuto la sua richiesta urgente delle 17:55 di venerdì, che mi ha colto con una puntualità quasi artistica.",
        "Grazie per aver pensato a me con un preavviso così generoso.",
        "Leggo ora il suo messaggio, contrassegnato come urgentissimo, dopo quelli di tre settimane fa.",
      ],
      body: [
        "Capisco che la scadenza sia imminente, anche se non vi è traccia di quando lo è diventata.",
        "Vorrei aiutarla, e per questo mi permetto di ricordare che l’urgenza altrui non è automaticamente il mio piano di lavoro.",
        "Posso fare molto in poco tempo, ma non posso fare tutto in nessun tempo.",
      ],
      sting: [
        "Posso intervenire lunedì, che nel mio calendario è un giorno ancora completamente disponibile.",
        "Se la priorità è davvero così alta, immagino sia previsto anche un adeguamento della tariffa.",
        "Le propongo di anticipare la prossima richiesta di tre giorni, giusto per sperimentare.",
      ],
      close: [
        "Faccio il possibile, e a volte anche un po’ meno.",
        "La ringrazio per la fiducia e per la fantasia con cui gestisce i tempi.",
        "Con la serenità di chi ha un calendario.",
      ],
    },
    en: {
      open: [
        "I received your urgent request of 5:55 pm on Friday, which caught me with almost artistic timing.",
        "Thank you for thinking of me with such generous notice.",
        "I am only now reading your message, marked as extremely urgent, after the ones from three weeks ago.",
      ],
      body: [
        "I understand the deadline is imminent, though there is no trace of when it became so.",
        "I would like to help, and so I gently remind you that someone else’s urgency is not automatically my work plan.",
        "I can do a lot in a little time, but I cannot do everything in no time.",
      ],
      sting: [
        "I can step in on Monday, which in my calendar is still a completely free day.",
        "If the priority is really that high, I assume a rate adjustment is also planned.",
        "I suggest sending your next request three days earlier, just to experiment.",
      ],
      close: [
        "I will do what I can, and sometimes a little less.",
        "Thank you for your trust and for the imagination with which you manage deadlines.",
        "With the serenity of someone who owns a calendar.",
      ],
    },
  },
  {
    id: "feedback",
    to: "client",
    label: { it: "Cambia idea di continuo", en: "Keeps changing their mind" },
    it: {
      open: [
        "Grazie per le nuove indicazioni, che ribaltano con grande coerenza quelle della settimana scorsa.",
        "Ho letto il suo ultimo feedback e ne ho apprezzato la novità rispetto al precedente.",
        "Le scrivo dopo aver studiato le sue ultime correzioni, che contraddicono le penultime.",
      ],
      body: [
        "Per evitare equivoci, allego la versione che lei stesso aveva approvato, così possiamo ricostruire il percorso.",
        "Seguire una direzione che cambia così spesso è una sfida che affronto con curiosità e con la cronologia delle email.",
        "Sono felice di tornare alla prima soluzione, che nel frattempo ha riconquistato il suo fascino.",
      ],
      sting: [
        "Le chiedo di confermarmi la versione definitiva, intendendo quella che resterà tale per almeno due giorni.",
        "Ogni ulteriore variazione sarà trattata come un nuovo progetto, con tutta la considerazione che merita.",
        "Propongo di fissare un punto fermo prima di procedere: una decisione, una firma, un giorno.",
      ],
      close: [
        "Resto in attesa dell’idea successiva.",
        "Le auguro di trovare presto una direzione che le piaccia quanto la prossima.",
        "Cordialità, e buona fortuna con la decisione.",
      ],
    },
    en: {
      open: [
        "Thank you for the new directions, which reverse last week’s with great consistency.",
        "I read your latest feedback and appreciated how novel it is compared to the previous one.",
        "I am writing after studying your latest corrections, which contradict the second-to-last ones.",
      ],
      body: [
        "To avoid misunderstandings, I am attaching the version you yourself approved, so we can reconstruct the journey.",
        "Following a direction that changes this often is a challenge I take on with curiosity and the email history.",
        "I am happy to return to the first solution, which in the meantime has regained its charm.",
      ],
      sting: [
        "Please confirm the final version, meaning one that will remain final for at least two days.",
        "Any further change will be treated as a new project, with all the consideration it deserves.",
        "I suggest fixing a fixed point before proceeding: one decision, one signature, one day.",
      ],
      close: [
        "I await the next idea.",
        "I hope you soon find a direction you like as much as the next one.",
        "Kind regards, and good luck with the decision.",
      ],
    },
  },
  {
    id: "colleague",
    to: "colleague",
    label: { it: "Collega che scarica il lavoro", en: "Colleague dumping work" },
    it: {
      open: [
        "Grazie per avermi girato il file con la dicitura «da guardare al volo».",
        "Ho visto che mi hai assegnato il compito, con un entusiasmo che ho apprezzato molto da lontano.",
        "Ti scrivo in merito al lavoro che mi hai passato, con la fiducia che si riserva a chi ha il calendario libero.",
      ],
      body: [
        "Mi sembra di capire che la parte iniziale fosse tua, ma deve essere rimasta in un posto sicuro.",
        "Sono felice di dare una mano, ma vorrei capire quali parti sono mie e quali sono semplicemente ancora tue.",
        "Ho notato che il documento si ferma proprio dove la tua parte comincia a diventare la mia.",
      ],
      sting: [
        "Per chiarezza ti mando l’elenco delle attività: quelle con il tuo nome sono le prime.",
        "Se ci dividiamo il lavoro a metà, propongo di partire dal tuo pezzo.",
        "Metterò il mio nome sulle parti che faccio, ti suggerisco di fare lo stesso.",
      ],
      close: [
        "Un abbraccio, sinceramente collaborativo.",
        "Grazie per lo spirito di squadra, che ammiro soprattutto quando lo vedo da fuori.",
        "Fammi sapere, quando avrai un momento.",
      ],
    },
    en: {
      open: [
        "Thank you for forwarding me the file marked “just take a quick look”.",
        "I see you have assigned me the task, with an enthusiasm I greatly appreciated from afar.",
        "I am writing about the work you passed me, with the trust reserved for those with a free calendar.",
      ],
      body: [
        "I gather the initial part was yours, but it must have been kept somewhere safe.",
        "I am happy to help, but I would like to understand which parts are mine and which are simply still yours.",
        "I noticed the document stops exactly where your part starts becoming mine.",
      ],
      sting: [
        "For clarity, I am sending the list of tasks: the ones with your name come first.",
        "If we split the work in half, I suggest we start with your half.",
        "I will put my name on the parts I do; I suggest you do the same.",
      ],
      close: [
        "A hug, sincerely collaborative.",
        "Thank you for the team spirit, which I admire most when I see it from outside.",
        "Let me know when you have a moment.",
      ],
    },
  },
  {
    id: "replyall",
    to: "colleague",
    label: { it: "Risponde a tutti", en: "Reply-all offender" },
    it: {
      open: [
        "Ti ringrazio per aver condiviso la tua risposta con le centoventi persone in copia.",
        "Ho ricevuto il tuo messaggio, che ormai conosce tutta l’azienda.",
        "Vedo che hai risposto a tutti, creando una piacevole sensazione di comunità.",
      ],
      body: [
        "Sono sicuro che i colleghi di altri reparti abbiano apprezzato di sapere se sarai in ufficio giovedì.",
        "Il pulsante «rispondi» ha una sorella più discreta, che ti presento con molto piacere.",
        "Da una rapida verifica, tutti sanno ora che sei d’accordo, ed è un traguardo importante.",
      ],
      sting: [
        "La prossima volta potremmo limitare la platea a chi ha davvero bisogno di leggere.",
        "Ti propongo di rispondere solo al mittente: l’impatto sarà minore, ma molto più riservato.",
        "Ho disattivato le notifiche del thread, ma ti ringrazio comunque per l’impegno.",
      ],
      close: [
        "Buona giornata a te e ai centoventi destinatari.",
        "A presto, in copia o in privato.",
        "Cordialità, senza copia nascosta.",
      ],
    },
    en: {
      open: [
        "Thank you for sharing your reply with the hundred and twenty people in copy.",
        "I received your message, which the whole company now knows.",
        "I see you replied to all, creating a pleasant sense of community.",
      ],
      body: [
        "I am sure colleagues in other departments appreciated knowing whether you will be in the office on Thursday.",
        "The “reply” button has a more discreet sister, whom I am delighted to introduce.",
        "A quick check shows everyone now knows you agree, which is an important milestone.",
      ],
      sting: [
        "Next time we could limit the audience to those who actually need to read it.",
        "I suggest replying only to the sender: the impact will be smaller, but far more private.",
        "I have muted the thread, but thank you for the effort all the same.",
      ],
      close: [
        "Have a good day, you and the hundred and twenty recipients.",
        "See you soon, in copy or in private.",
        "Kind regards, with no blind copy.",
      ],
    },
  },
  {
    id: "discount",
    to: "client",
    label: { it: "Chiede lo sconto", en: "Asks for a discount" },
    it: {
      open: [
        "La ringrazio per aver pensato a me per questo progetto e per la visibilità che mi promette in cambio.",
        "Ho letto la richiesta di sconto, che mi ha dato modo di riflettere sul valore del mio tempo.",
        "Grazie per la proposta, che ha il merito di essere molto convincente per chi la fa.",
      ],
      body: [
        "Purtroppo la visibilità non è ancora accettata dal mio fornitore di energia elettrica né dal mio proprietario di casa.",
        "Il prezzo indicato riflette competenze maturate in anni di lavoro e include già uno sconto che non le ho detto.",
        "Posso offrirle un’alternativa: un perimetro più ristretto, per un costo proporzionato.",
      ],
      sting: [
        "Resto disponibile a lavorare alle condizioni indicate, oppure a un progetto più piccolo.",
        "Se il budget è ridotto, riduciamo il progetto, non il valore.",
        "Non faccio sconti sul prezzo, ma sono disposto a ridurre ciò che si ottiene.",
      ],
      close: [
        "Grazie per la comprensione, che spero sia reciproca.",
        "Cordiali saluti, e buona visibilità.",
        "Resto a disposizione, alle stesse condizioni.",
      ],
    },
    en: {
      open: [
        "Thank you for thinking of me for this project and for the exposure you promise in return.",
        "I read your discount request, which gave me a chance to reflect on the value of my time.",
        "Thank you for the proposal, which has the merit of being very persuasive for the person making it.",
      ],
      body: [
        "Unfortunately, exposure is not yet accepted by my electricity provider or my landlord.",
        "The price quoted reflects skills built over years of work and already includes a discount I haven’t mentioned.",
        "I can offer an alternative: a narrower scope, at a proportionate cost.",
      ],
      sting: [
        "I remain available to work on the stated terms, or on a smaller project.",
        "If the budget is smaller, let us shrink the project, not the value.",
        "I don’t discount the price, but I am willing to reduce what you receive.",
      ],
      close: [
        "Thank you for your understanding, which I hope is mutual.",
        "Kind regards, and good exposure.",
        "I remain available, on the same terms.",
      ],
    },
  },
  {
    id: "revisions",
    to: "client",
    label: { it: "Revisioni infinite", en: "Endless revisions" },
    it: {
      open: [
        "Ho ricevuto la sua undicesima revisione, che mi conferma quanto il progetto le stia a cuore.",
        "Grazie per le ulteriori modifiche, giunte quando pensavo fossimo ormai alla fine.",
        "Le scrivo dopo aver implementato l’ultima correzione, che sarà sicuramente anche la penultima.",
      ],
      body: [
        "Il contratto prevedeva tre revisioni, un numero che ricordo bene perché lo abbiamo superato da un po’.",
        "Ogni singolo cambiamento è comprensibile, e tutti insieme formano un progetto diverso da quello iniziale.",
        "Sto iniziando a pensare che questo lavoro non finirà mai, il che per me sarebbe quasi poetico.",
      ],
      sting: [
        "Da questa revisione in avanti applicherò la tariffa oraria, per mantenere un ordine di grandezza ragionevole.",
        "Le propongo di raccogliere tutte le modifiche in un unico elenco, così da affrontarle in un solo passaggio.",
        "Le chiedo di approvare la versione attuale prima di inviarmi la dodicesima.",
      ],
      close: [
        "Con immutata pazienza, di cui rimane poco.",
        "Grazie per la dedizione al dettaglio.",
        "Cordialità, in attesa della prossima.",
      ],
    },
    en: {
      open: [
        "I received your eleventh revision, which confirms how much the project matters to you.",
        "Thank you for the further changes, which arrived just when I thought we were nearly done.",
        "I am writing after implementing the latest correction, which will surely also be the second-to-last.",
      ],
      body: [
        "The contract provided for three revisions, a number I remember well because we passed it a while ago.",
        "Each individual change is understandable, and together they make a project different from the original one.",
        "I am beginning to think this job will never end, which for me would be almost poetic.",
      ],
      sting: [
        "From this revision onward I will apply the hourly rate, to keep the order of magnitude reasonable.",
        "I suggest gathering all changes into a single list, so we can handle them in one pass.",
        "Please approve the current version before sending me the twelfth.",
      ],
      close: [
        "With unchanged patience, of which little remains.",
        "Thank you for your dedication to detail.",
        "Kind regards, awaiting the next one.",
      ],
    },
  },
  {
    id: "afterhours",
    to: "colleague",
    label: { it: "Messaggi fuori orario", en: "After-hours messages" },
    it: {
      open: [
        "Ho ricevuto il tuo messaggio delle 23:40 di domenica, che ho letto con la massima attenzione la mattina dopo.",
        "Grazie per il messaggio inviato nel fine settimana, quando il mio telefono riposava, e io con lui.",
        "Ho visto la tua email di stanotte, che mi conferma quanto il lavoro non dorma mai.",
      ],
      body: [
        "Mi fa piacere sapere che hai idee anche a quell’ora, io purtroppo le ho solo in orario d’ufficio.",
        "Rispondo all’inizio dell’orario di lavoro, per coerenza con quanto indica il contratto.",
        "Il tuo messaggio non conteneva nulla che non potesse attendere le 9:00, come d’altronde la maggior parte delle cose.",
      ],
      sting: [
        "Per il futuro suggerisco di programmare l’invio al mattino: il contenuto arriverebbe uguale, ma il mio weekend resterebbe intatto.",
        "Se qualcosa è davvero urgente, ti prego di chiamarmi, così so con certezza che lo è.",
        "Ti ricordo che le email non hanno bisogno di una risposta immediata, ma un riposo sì.",
      ],
      close: [
        "Buon inizio settimana, il mio è appena cominciato.",
        "Cordialità, e buona notte, anche se è già mattina.",
        "A presto, preferibilmente in orario.",
      ],
    },
    en: {
      open: [
        "I received your message of 11:40 pm on Sunday, which I read with the utmost attention the next morning.",
        "Thank you for the message sent over the weekend, when my phone was resting, and so was I.",
        "I saw your email from last night, which confirms that work never sleeps.",
      ],
      body: [
        "I am glad to know you have ideas at that hour; sadly, I only have them during office hours.",
        "I am replying at the start of working hours, in keeping with what my contract states.",
        "Your message contained nothing that could not wait until 9:00, as with most things.",
      ],
      sting: [
        "In future I suggest scheduling the send for the morning: the content would arrive just the same, but my weekend would stay intact.",
        "If something is truly urgent, please call me, so I know for certain that it is.",
        "May I remind you that emails don’t need an immediate reply, but people need rest.",
      ],
      close: [
        "Have a good start to the week; mine has just begun.",
        "Kind regards, and good night, even though it is already morning.",
        "See you soon, preferably during working hours.",
      ],
    },
  },
  {
    id: "quote",
    to: "client",
    label: { it: "Preventivo senza risposta", en: "Unanswered quote" },
    it: {
      open: [
        "Le scrivo per sapere se il preventivo inviato un mese fa ha trovato un buon posto dove riposare.",
        "Ho notato che il mio preventivo non ha ancora ricevuto risposta, e mi sono permesso di immaginare mille motivi nobili.",
        "Torno sul preventivo inviato, che deve essere stato assorbito dalla sua casella di posta in modo molto profondo.",
      ],
      body: [
        "Se la proposta non la convince, un «no» è una risposta perfettamente accettabile, e anche piuttosto rapida.",
        "Capisco che il silenzio sia una forma di risposta, ma purtroppo non riesco né a fatturarlo né a pianificarlo.",
        "Il preventivo ha una validità di trenta giorni, termine che sta per diventare un cortese ricordo.",
      ],
      sting: [
        "Le sarei grato di un cenno, anche solo un pollice in su, per sapere che l’email è arrivata.",
        "Se non riceverò risposta entro venerdì, interpreterò il silenzio come un «ci penseremo in futuro».",
        "Dopo questa data libererò il suo spazio in agenda per qualcuno che risponde.",
      ],
      close: [
        "Cordiali saluti, con la speranza di una risposta, di qualunque colore.",
        "Resto in ascolto, con grande attenzione al silenzio.",
        "A presto, o a mai, ma a saperlo.",
      ],
    },
    en: {
      open: [
        "I am writing to ask whether the quote I sent a month ago has found a nice place to rest.",
        "I noticed my quote has not yet received a reply, and I have taken the liberty of imagining a thousand noble reasons.",
        "I am returning to the quote I sent, which must have been absorbed very deeply by your inbox.",
      ],
      body: [
        "If the proposal doesn’t convince you, a “no” is a perfectly acceptable answer, and quite a fast one too.",
        "I understand silence is a form of reply, but I can neither invoice it nor plan around it.",
        "The quote is valid for thirty days, a term about to become a polite memory.",
      ],
      sting: [
        "I would be grateful for a sign, even just a thumbs up, to know the email arrived.",
        "If I receive no reply by Friday, I will take your silence as “we’ll think about it in the future”.",
        "After that date I will free your slot in my calendar for someone who replies.",
      ],
      close: [
        "Kind regards, hoping for a reply of any colour.",
        "I remain listening, with close attention to the silence.",
        "See you soon, or never, but I’d like to know.",
      ],
    },
  },
  {
    id: "holiday",
    to: "colleague",
    label: { it: "Richiesta durante le ferie", en: "Request during holidays" },
    it: {
      open: [
        "Ho ricevuto il tuo messaggio mentre ero in ferie, un dettaglio che il mio risponditore automatico aveva segnalato con grande chiarezza.",
        "Grazie per la richiesta, arrivata nel momento giusto per la tua agenda e meno per la mia.",
        "Ti rispondo dalla spiaggia, in senso metaforico, perché ufficialmente non ci sono.",
      ],
      body: [
        "Il mio messaggio di assenza indicava una data di rientro che mi risulta ancora valida.",
        "Posso occuparmene al mio rientro, con la stessa dedizione e un po’ di abbronzatura.",
        "Sono sicuro che nessuna questione di questa settimana sia così delicata da non reggere qualche giorno di attesa.",
      ],
      sting: [
        "Per qualsiasi emergenza reale ti consiglio di rivolgerti a chi è in ufficio, che sarà felicissimo.",
        "Rimanderò ogni risposta al mio ritorno, quando avrò tempo, energie e un’opinione ricaricata.",
        "Ti ricordo gentilmente che le ferie sono un diritto, e che intendo esercitarlo fino all’ultimo giorno.",
      ],
      close: [
        "Buon lavoro a te, e buone vacanze a me.",
        "A presto, appena sarò tornato.",
        "Cordialità, da un luogo con poca copertura.",
      ],
    },
    en: {
      open: [
        "I received your message while on holiday, a detail my auto-reply had pointed out with great clarity.",
        "Thank you for the request, which arrived at the right moment for your calendar and less so for mine.",
        "I am replying from the beach, metaphorically, because officially I am not here.",
      ],
      body: [
        "My out-of-office message stated a return date that, as far as I can tell, is still valid.",
        "I can take care of it when I return, with the same dedication and a bit of a tan.",
        "I am sure nothing this week is so delicate that it cannot withstand a few days of waiting.",
      ],
      sting: [
        "For any real emergency I suggest contacting whoever is in the office, who will be delighted.",
        "I will postpone any answer until my return, when I will have time, energy and a recharged opinion.",
        "May I gently remind you that holidays are a right, and I intend to exercise mine until the last day.",
      ],
      close: [
        "Good luck with work, and happy holidays to me.",
        "See you soon, as soon as I am back.",
        "Kind regards, from a place with poor reception.",
      ],
    },
  },
];

export type MailScenario = (typeof SCENARIOS)[number]["id"];

export const DEFAULT_MAIL_SCENARIO: MailScenario = SCENARIOS[0].id;

export function mailScenarioOptions(lang: Lang): { id: MailScenario; label: string }[] {
  return SCENARIOS.map((s) => ({ id: s.id, label: s.label[lang] }));
}

export function generateMail(scenario: MailScenario, name: string, lang: Lang): string {
  const s = SCENARIOS.find((x) => x.id === scenario) ?? SCENARIOS[0];
  const m = s[lang];
  const who = name.trim();
  const fallbackIt = s.to === "client" ? "cliente" : "collega";
  const fallbackEn = s.to === "client" ? "client" : "colleague";
  const greeting = lang === "en" ? `Dear ${who || fallbackEn},` : `Gentile ${who || fallbackIt},`;
  const sign = lang === "en" ? "Kind regards" : "Cordiali saluti";
  return [
    greeting,
    `${pick(m.open)} ${pick(m.body)}`,
    `${pick(m.sting)} ${pick(m.close)}`,
    sign,
  ].join("\n\n");
}
