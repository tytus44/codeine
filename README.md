# Codeine

Un editor di codice minimalista e veloce, direttamente nel browser. Codeine offre un'esperienza di editing moderna con supporto per HTML, CSS, JavaScript e file di testo.

## ✨ Caratteristiche

- **Editor avanzato**: Basato su Monaco Editor con syntax highlighting per molteplici linguaggi
- **Tema chiaro e scuro**: Tema Ayu personalizzato sia in modalità light che dark
- **Gestione tab**: Crea, apri, chiudi e naviga tra file contemporaneamente
- **Salvataggio veloce**: Salva i tuoi file localmente con la File System API (o scarica come fallback)
- **Barra laterale espandibile**: Accesso rapido alle principali funzionalità
- **Monitoraggio stato**: Status bar con informazioni su riga, colonna, linguaggio e modifiche
- **Scorciatoie tastiera**: Ctrl+N (nuovo), Ctrl+O (apri), Ctrl+S (salva), F11 (fullscreen), Ctrl+B (toggle sidebar)
- **Fullscreen**: Immergiti completamente nella scrittura del codice
- **Responsive**: Optimizzato per desktop e tablet

## 🚀 Come usare

### Avvio
Apri semplicemente il file `index.html` nel tuo browser.

### Operazioni principali
- **Nuovo file**: Clicca sull'icona "Nuovo" o premi `Ctrl+N`
- **Apri file**: Clicca su "Apri" o premi `Ctrl+O` (supporta .html, .css, .js, .txt)
- **Salva file**: Clicca su "Salva" o premi `Ctrl+S`
- **Scarica file**: Clicca su "Download" per scaricare il file corrente
- **Cambia tema**: Clicca sull'icona tema per alternare tra light e dark
- **Fullscreen**: Premi `F11` o clicca l'icona fullscreen

## 🎨 Design

Codeine utilizza il tema **Ayu** con una palette di colori accuratamente selezionata:
- Colori vivaci e contrastati per migliore leggibilità
- Interfaccia minimalista e intuitiva
- Font monospazio Fira Code per il codice

## 🛠️ Linguaggi supportati

- HTML
- CSS
- JavaScript
- Testo semplice

Il linguaggio viene riconosciuto automaticamente dall'estensione del file.

## 💾 Salvataggio e persistenza

- **Tema preferito**: Salvato in localStorage
- **Stato sidebar**: Memorizzato per la sessione successiva
- **File System API**: Salva direttamente nel tuo computer (dove supportato)
- **Download**: Alternativa universale per scaricare i file

## ⌨️ Scorciatoie tastiera

| Scorciatoia | Azione |
|---|---|
| `Ctrl+N` | Nuovo file |
| `Ctrl+O` | Apri file |
| `Ctrl+S` | Salva file |
| `Ctrl+B` | Toggle sidebar |
| `F11` | Fullscreen |

## 📋 Requisiti

- Browser moderno con supporto per:
  - Monaco Editor (CDN cdnjs)
  - File System API (per salvataggio nativo)
  - ES6+ JavaScript

## 📦 Dipendenze

- **Monaco Editor** (v0.45.0): Editor di codice da Microsoft
- **Google Fonts**: Font Fira Code per il codice

Tutte le dipendenze vengono caricate da CDN.

## 📝 Note di sviluppo

- L'interfaccia è completamente italiana
- Supporto per temi personalizzabili
- Sistema di tab indipendente e gestito via JavaScript
- Monitoraggio automatico di modifiche e avvisi prima della chiusura

## 🔒 Privacy

Codeine non richiede registrazione e non invia dati ai server. Tutti i file rimangono sul tuo computer.

## 📄 Licenza

Questo progetto è disponibile come software libero. Puoi utilizzarlo, modificarlo e distribuirlo secondo le tue esigenze.

---

Buona programmazione con Codeine! ✨