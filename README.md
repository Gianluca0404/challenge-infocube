Modello dei Dati

- Input (Agenda): Array di oggetti JSON con proprietà start ed end in formato standard ISO 8601.

- Elaborazione: Conversione dei timestamp tramite Luxon per il calcolo delle differenze temporali in minuti.

- Output (Slot): Mappatura dinamica degli intervalli liberi che superano la soglia di durata (duration) richiesta dall'utente.



Assunzioni Fatte

- Finestra Temporale: Operatività limitata a una giornata lavorativa standard (08:00 - 18:00).

- Integrità Input: Gli impegni già presenti nel sistema si considerano correttamente ordinati e non sovrapposti.

- Localizzazione: I calcoli assumono il fuso orario locale dell'utente per una migliore UX.



Trade-off Scelti

- Affidabilità vs Peso (Luxon): Ho preferito includere una libreria esterna per la gestione delle date invece dell'oggetto nativo Date. Questo garantisce calcoli precisi ed evita i bug comuni dei fusi orari, a fronte di una minima dipendenza in più.

- Semplicità vs Scalabilità (In-memory): Per i dati ho utilizzato una variabile globale nel server. Questo semplifica l'avvio del test senza database esterni, pur essendo consapevole che in produzione andrebbe usata una persistenza reale (es. PostgreSQL).

- Controllo vs Velocità (Vanilla JS): Ho scelto JavaScript puro per il frontend invece di un framework. Questo dimostra padronanza del linguaggio e garantisce un caricamento istantaneo dell'interfaccia.
