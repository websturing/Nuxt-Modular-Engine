import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

// Setup Path
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ambil nama fitur dari argumen
const featureName = process.argv[2];

if (!featureName) {
    console.error('\x1b[31m%s\x1b[0m', '❌ Error: Mohon sebutkan nama fitur.');
    console.log('👉 Contoh: npm run feature stock-in');
    process.exit(1);
}

// Convert kebab-case (stock-in) to PascalCase (StockIn)
const toPascalCase = (str) =>
    str.replace(/(^\w|-\w)/g, (text) => text.replace(/-/, '').toUpperCase());

const featureNamePascal = toPascalCase(featureName);

// Lokasi folder features (Root/app/features)
// Asumsi script ini ada di root project. Jika script di folder 'scripts', sesuaikan '../app/features'
const featuresDir = path.resolve(process.cwd(), 'app/features');
const targetDir = path.join(featuresDir, featureName);

const subFolders = ['components', 'composables', 'types', 'utils', 'pages', 'schemas'];

// Cek Existing
if (fs.existsSync(targetDir)) {
    console.error('\x1b[31m%s\x1b[0m', `❌ Error: Fitur "${featureName}" sudah ada!`);
    process.exit(1);
}

console.log(`🔨 Membuat fitur: ${featureName} (${featureNamePascal})...`);
fs.mkdirSync(targetDir, { recursive: true });

// Loop pembuatan folder & file
subFolders.forEach((folder) => {
    const folderPath = path.join(targetDir, folder);
    fs.mkdirSync(folderPath);

    // --- 1. COMPOSABLES ---
    if (folder === 'composables') {
        const compName = `use${featureNamePascal}`;
        const content =
            `export const ${compName} = () => {
    const state = ref('Hello ${featureNamePascal}');
    return { state };
}`;
        fs.writeFileSync(path.join(folderPath, `${compName}.ts`), content);
    }

    // --- 2. COMPONENTS ---
    else if (folder === 'components') {
        // Nama file unik: StockInContainer.vue (Supaya aman auto-import)
        const compName = `${featureNamePascal}Container`;
        const content =
            `<script setup lang="ts">
// Component Logic Here
</script>

<template>
  <div class="p-4 border border-dashed border-gray-300 rounded-lg">
    <h3 class="font-bold text-lg">${featureNamePascal} Container</h3>
    <p class="text-gray-500">Component ini ada di app/features/${featureName}/components</p>
  </div>
</template>`;
        fs.writeFileSync(path.join(folderPath, `${compName}.vue`), content);
    }

    // --- 3. PAGES ---
    else if (folder === 'pages') {
        // PENTING: Selalu buat index.vue agar URL-nya bersih (Example: /stock-in)
        const fileName = 'index.vue';
        const content =
            `<script setup lang="ts">
// Page: /${featureName}
</script>

<template>
  <div class="space-y-4">
    <div class="flex items-center justify-between">
        <h1 class="text-2xl font-bold text-gray-800">${featureNamePascal} Feature</h1>
        <UiButton label="Action" />
    </div>
    
    <${featureNamePascal}Container />
  </div>
</template>`;
        fs.writeFileSync(path.join(folderPath, fileName), content);
    }
});

console.log('\x1b[32m%s\x1b[0m', `✅ Sukses! Fitur "${featureName}" siap digunakan.`);
console.log(`👉 Akses URL: http://localhost:3000/${featureName}`);