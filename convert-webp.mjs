// convert-webp.mjs — Convert all portfolio JPGs to WebP
// Run: node convert-webp.mjs
import sharp from 'sharp';
import { readdir } from 'fs/promises';
import { join, extname, basename } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const publicDir = join(__dirname, 'public');

const FILES = [
  'hero_mockup.jpg',
  'project_heona.jpg',
  'project_clinic.jpg',
  'project_education.jpg',
  'project_realestate.jpg',
  'project_studio.jpg',
  'fen_portrait.jpg',
  'og-image.jpg',
];

console.log('🔄 Converting images to WebP...\n');

let totalSaved = 0;

for (const file of FILES) {
  const inputPath = join(publicDir, file);
  const outputName = file.replace(/\.jpg$/, '.webp');
  const outputPath = join(publicDir, outputName);

  try {
    const inputInfo = await sharp(inputPath).metadata();
    
    await sharp(inputPath)
      .webp({ quality: 82, effort: 6 })
      .toFile(outputPath);

    const { size: inputSize } = await import('fs').then(fs =>
      fs.promises.stat(inputPath)
    );
    const { size: outputSize } = await import('fs').then(fs =>
      fs.promises.stat(outputPath)
    );

    const saved = inputSize - outputSize;
    const pct = Math.round((saved / inputSize) * 100);
    totalSaved += saved;

    console.log(`✅ ${file}`);
    console.log(`   ${(inputSize / 1024).toFixed(0)}KB → ${(outputSize / 1024).toFixed(0)}KB  (-${pct}%)`);
    console.log(`   Saved: ${(saved / 1024).toFixed(0)}KB\n`);
  } catch (err) {
    console.error(`❌ ${file}: ${err.message}`);
  }
}

console.log(`\n🎉 Total saved: ${(totalSaved / 1024).toFixed(0)}KB (${(totalSaved / 1024 / 1024).toFixed(2)}MB)`);
