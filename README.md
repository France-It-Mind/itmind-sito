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
- `55683383_MotionElements_radiant-purple-pink-light-burst-hd.webm` — animazione loop, colori viola/rosa, light burst

Il video è usato come decorazione visiva a schermo intero (se integrato nell'HTML con un `<video autoplay muted loop playsinline>`).

## Come modificare

Modifica `index.html` per cambiare contenuto, `style.css` per cambiare aspetto.
Per visualizzare: apri `index.html` nel browser, o usa un server locale.

## Server

È presente un server Node.js (Express) per gestire i messaggi di contatto via POST `/api/contact` — i messaggi vengono salvati localmente in `messages.json`. Il server non è obbligatorio per visualizzare il sito.
