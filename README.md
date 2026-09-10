# Sito personale — ITMind

Sito moderno e minimal, costruito con HTML/CSS puro.
Nessuna dipendenza, niente build, gira da solo.

## Struttura

- `index.html` — homepage
- `style.css` — stile e layout
- `assets/` — immagini e risorse future
- `assets/videos/` — video animato di sottofondo (WebM, loop)

## Video animato

È presente un video animato di sottofondo (motion background) nella cartella `public/assets/videos/`:
- `motion-background.webm` — animazione loop, colori viola/rosa, light burst (3.4 MB)

Il video è integrato come decorazione visiva a schermo intero con la classe `.bg-video` (CSS: `position: fixed`, `object-fit: cover`, `z-index: -1`, `opacity: 0.45`). È presente anche un override per `prefers-reduced-motion` che lo nasconde per accessibilità.

Per abilitarlo: assicurati che `public/index.html` includa il tag `<video class="bg-video" autoplay muted loop playsinline>`.

## Come modificare

Modifica `index.html` per cambiare contenuto, `style.css` per cambiare aspetto.
Per visualizzare: apri `index.html` nel browser, o usa un server locale.

## Server

È presente un server Node.js (Express) per gestire i messaggi di contatto via POST `/api/contact` — i messaggi vengono salvati localmente in `messages.json`. Il server non è obbligatorio per visualizzare il sito.
