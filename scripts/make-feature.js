import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

// Setup Path
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ambil nama fitur dari argumen command line
const featureName = process.argv[2];

if (!featureName) {
    console.error('\x1b[31m%s\x1b[0m', '❌ Error: Mohon sebutkan nama fitur.');
    console.log('👉 Contoh: npm run feature product-list');
    process.exit(1);
}

// Tentukan lokasi folder features (sesuaikan jika folder kamu di root, bukan di app/)
const featuresDir = path.resolve(__dirname, '../app/features');
const targetDir = path.join(featuresDir, featureName);

// Daftar sub-folder yang ingin dibuat
const subFolders = ['components', 'composables', 'types', 'utils'];

// Fungsi Helper untuk Capitalize (misal: auth -> Auth)
const capitalize = (s) => s.charAt(0).toUpperCase() + s.slice(1);

// Cek apakah fitur sudah ada
if (fs.existsSync(targetDir)) {
    console.error('\x1b[31m%s\x1b[0m', `❌ Error: Fitur "${featureName}" sudah ada!`);
    process.exit(1);
}

// 1. Buat Folder Utama Fitur
console.log(`🔨 Membuat fitur: ${featureName}...`);
fs.mkdirSync(targetDir, { recursive: true });

// 2. Buat Sub-folder dan File Placeholder
subFolders.forEach((folder) => {
    const folderPath = path.join(targetDir, folder);
    fs.mkdirSync(folderPath);

    // OPSI TAMBAHAN: Buat file contoh otomatis agar tidak kosong
    if (folder === 'composables') {
        // Buat file use[Feature].ts
        const compName = `use${capitalize(featureName.replace(/-/g, ''))}`;
        const content = `export const ${compName} = () => {\n  return {}\n}`;
        fs.writeFileSync(path.join(folderPath, `${compName}.ts`), content);
    }
    else if (folder === 'components') {
        // Buat file component dummy
        const compName = `${capitalize(featureName.replace(/-/g, ''))}Container`;
        const content = `<script setup lang="ts">\n</script>\n\n<template>\n  <div>\n    ${featureName} component\n  </div>\n</template>`;
        fs.writeFileSync(path.join(folderPath, `${compName}.vue`), content);
    }
});

console.log('\x1b[32m%s\x1b[0m', `✅ Sukses! Fitur "${featureName}" telah dibuat di app/features/${featureName}`);