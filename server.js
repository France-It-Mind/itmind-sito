// server.js — ITMind Assistenza IT
// Server Node.js + Express per la landing page e la gestione dei messaggi di contatto.
// I messaggi arrivano su POST /api/contact e vengono salvati in messages.json.

const express = require('express');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// --- Middleware ---
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname)));

// --- API: salva messaggio di contatto ---
app.post('/api/contact', (req, res) => {
  const { nome, email, telefono, messaggio } = req.body;

  // Validazione campi obbligatori
  if (!nome || !email || !messaggio) {
    return res.status(400).json({
      success: false,
      error: 'Nome, email e messaggio sono obbligatori.'
    });
  }

  // Crea record
  const record = {
    id: Date.now(),
    nome: nome.trim(),
    email: email.trim(),
    telefono: telefono ? telefono.trim() : '',
    messaggio: messaggio.trim(),
    data: new Date().toISOString(),
    letto: false
  };

  // Salva su file messages.json
  const file = path.join(__dirname, 'messages.json');
  let messaggi = [];

  try {
    if (fs.existsSync(file)) {
      messaggi = JSON.parse(fs.readFileSync(file, 'utf8'));
    }
  } catch (e) {
    messaggi = [];
  }

  messaggi.push(record);
  fs.writeFileSync(file, JSON.stringify(messaggi, null, 2), 'utf8');

  console.log(`📩 Nuovo messaggio da ${record.email} (${record.nome}) — ${new Date().toLocaleString()}`);

  res.json({
    success: true,
    message: 'Grazie! Il tuo messaggio è stato ricevuto.'
  });
});

// --- Avvio server ---
app.listen(PORT, () => {
  console.log(`
🚀 ITMind Assistenza IT — Server avviato
   🌐 http://localhost:${PORT}
   📩 POST /api/contact
   📁 Messaggi salvati in: messages.json
  `);
});
