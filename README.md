1. Modello dei Dati
Il sistema gestisce due entità principali:

Eventi Esistenti (Input): Un array di oggetti recuperati dal "database" simulato, dove ogni evento ha un id, un titolo e, soprattutto, i timestamp di inizio (start) e fine (end) in formato ISO 8601.

Slot Disponibili (Output): Una lista di intervalli temporali calcolati dinamicamente. Ogni slot ha una proprietà start, end, e uno stato available (boolean) che determina se può essere mostrato come prenotabile.

2. Assunzioni Fatte
Durante lo sviluppo ho assunto che:

Orario Lavorativo Fisso: Il calendario opera in un range predefinito (08:00 - 18:00).

Dati Coerenti: Si assume che gli eventi già presenti nel sistema non si sovrappongano tra loro all'origine.

Granularità: La durata minima di uno slot è definita dall'utente (es. 30, 60, 90 min), e il sistema arrotonda i calcoli al minuto.

3. Trade-off Scelti
Architettura Monolitica vs Microservizi: Ho scelto una struttura monolitica semplice (Express + Vanilla JS). Sebbene i microservizi siano più scalabili, per questo esercizio un'architettura leggera riduce la complessità di avvio e overhead.

Librerie Esterne: Ho scelto di includere Luxon per la gestione delle date. Il trade-off è l'aggiunta di una dipendenza esterna, ma il vantaggio in termini di precisione dei calcoli e protezione da errori sui fusi orari è enormemente superiore rispetto all'uso dell'oggetto Date nativo di JS.

In-Memory Storage: Per i dati ho usato una variabile in memoria invece di un database reale. Questo velocizza il test e la valutazione, pur sapendo che in produzione andrebbe sostituito con un sistema persistente (es. MongoDB).
