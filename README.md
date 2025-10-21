
# Codeine

### Descrizione

**Codeine** è un editor di codice minimalista basato su browser, progettato per essere veloce, portatile e potente. È
costruito come un singolo file `.html`, il che significa che puoi scaricarlo e aprirlo ovunque, anche offline, senza
bisogno di un server web o di un'installazione.

Il cuore di Codeine è **Monaco Editor**, il motore di editing che alimenta VS Code. Questo ci dà funzionalità di livello
professionale (come l'evidenziazione della sintassi, il completamento automatico e altro) in un pacchetto super leggero.

### Caratteristiche Principali

* **Editor Potente**: Basato su Monaco Editor (VS Code).
* **Gestione a Tab**: Apri e lavora su più file contemporaneamente.
* **Temi Chiaro/Scuro**: Cambia tema al volo. La tua preferenza viene salvata nel `localStorage` del browser.
* **Sidebar Collassabile**: Massimizza lo spazio di lavoro. Anche lo stato (aperto/chiuso) viene salvato.
* **Gestione File**:
* **Nuovo File**: Crea una nuova tab con un file vuoto (`Ctrl+N`).
* **Apri File**: Carica file dal tuo computer (`Ctrl+O`).
* **Salva File**: Salva il tuo lavoro utilizzando la moderna File System Access API (`Ctrl+S`).
* **Download**: Un'opzione di fallback per scaricare il file se il salvataggio nativo non è supportato.
* **Rilevamento Lingua**: La sintassi viene evidenziata automaticamente in base all'estensione del file (es. `.js`,
`.css`, `.html`).
* **Zero Installazione**: È un singolo file HTML. Scaricalo e aprilo.
* **Interfaccia Pulita**: Design minimalista ispirato ai temi "Ayu".
* **Modalità Fullscreen**: Per un'esperienza di programmazione immersiva (`F11`).

### Scorciatoie da Tastiera

Per velocizzare il tuo flusso di lavoro, abbiamo implementato queste scorciatoie:

* `Ctrl + N` : Crea un nuovo file (apre una nuova tab).
* `Ctrl + O` : Apri un file esistente (apre una nuova tab).
* `Ctrl + S` : Salva il file nella tab attiva.
* `Ctrl + B` : Mostra o nascondi la sidebar.
* `F11` : Attiva o disattiva la modalità fullscreen.

### Tecnologie Utilizzate

* **HTML5**: Struttura della pagina.
* **CSS3**: Stile (con Variabili CSS per la gestione dei temi).
* **JavaScript (ES6+)**: Tutta la logica dell'applicazione.
* **Monaco Editor**: Il componente principale dell'editor di testo.
