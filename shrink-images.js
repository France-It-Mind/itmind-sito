// shrink-images.js — Rimpicciolisce le immagini della gallery con Sharp
// Riduce la risoluzione a max 800px width, converte in WebP (~30-50% più leggero)
// Sovrascrive i file originali con versioni ottimizzate.

const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const images = [
  { src: 'assets/web-1668927_640.jpg', label: 'web-1668927_640' },
  { src: 'assets/images.jpeg', label: 'images' }
];

(async () => {
  console.log('🔧 Avvio ottimizzazione immagini con Sharp...\n');

  for (const img of images) {
    const src = path.resolve(img.src);

    if (!fs.existsSync(src)) {
      console.log(`❌ Non trovata: ${img.src}`);
      continue;
    }

    // Leggi i metadati prima
    const meta = await sharp(src).metadata();

    console.log(`📷 ${img.label}: ${meta.width}×${meta.height}px, ${Math.round(meta.size / 1024)} KB → ottimizzazione...`);

    // Rimpicciolisci a max 800px width (senza ingrandire se più piccola)
    await sharp(src)
      .resize({ width: 800, withoutEnlargement: true })
      .webp({ quality: 85, effort: 6 })
      .toFile(src.replace(/\.(jpg|jpeg|png)$/i, '.webp'));

    // Verifica dimensione risultante
    const result = await sharp(src.replace(/\.(jpg|jpeg|png)$/i, '.webp')).metadata();
    const origKB = Math.round(meta.size / 1024);
    const resultKB = Math.round(result.size / 1024);
    const saved = origKB - resultKB;
    const pct = Math.round((1 - result.size / meta.size) * 100);

    console.log(`   ✅ ${img.label}.webp: ${result.width}×${result.height}px, ${resultKB} KB (risparmiato ${saved} KB / ${pct}%)`);
    console.log(`   → File originale preservato come .jpg/.jpeg\n`);
  }

  console.log('✨ Done — le immagini ottimizzate sono in assets/');
  console.log('   • web-1668927_640.webp');
  console.log('   • images.webp');
})().catch(err => {
  console.error('❌ Errore:', err);
  process.exit(1);
});
