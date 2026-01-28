# Sistema Gestione Appuntamenti - Challenge Infocube

Soluzione avanzata per la ricerca e visualizzazione dinamica di slot liberi in agenda, sviluppata con Node.js

## Funzionalità principali
- **Algoritmo di calcolo dinamico**: Identifica gli spazi liberi incrociando l'orario lavorativo (08:00-18:00) con gli impegni esistenti.
- **Interfaccia Timeline**: Visualizzazione chiara e intuitiva degli slot occupati (rosso) e disponibili (verde).
- **Validazione Real-time**: Protezione lato server contro la selezione di date passate.
- **UX Interattiva**: Selezione dello slot con feedback visivo e pulsante di conferma dinamico.
- **Statistiche Giornaliere**: Riepilogo immediato del carico di lavoro della giornata selezionata.

## Stack Tecnico
- **Backend**: Node.js, Express.js.
- **Gestione Date**: Luxon (per la massima precisione nella manipolazione degli oggetti DateTime).
- **Frontend**: HTML5, CSS3 (Flexbox/Grid), JavaScript ES6.

## Installazione e Avvio
1. Scarica o clona la cartella.
2. Installa le dipendenze:
   ```bash
   npm install
