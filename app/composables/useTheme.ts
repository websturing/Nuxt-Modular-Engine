// composables/useTheme.js

import { computed, ref } from 'vue';

// Definisikan pilihan tema yang tersedia (misalnya nama kelas Tailwind)
const availableThemes: any = {
    blue: {
        sidebarBg: 'bg-gray-700', // Warna latar belakang sidebar
        sidebarText: '!text-white', // Warna teks
        activeBg: 'bg-blue-200', // Warna latar belakang menu aktif
    },
    emerald: {
        sidebarBg: 'bg-emerald-600',
        sidebarText: 'text-white',
        activeBg: 'bg-emerald-700',
    },
    // Anda bisa tambahkan tema lain seperti 'indigo', 'gray', dll.
};

// State yang akan menyimpan tema yang sedang aktif
// Gunakan ref untuk membuatnya reaktif.
const currentThemeName = ref('blue'); // Default theme

/**
 * Composable untuk mengelola tema aplikasi.
 */
export function useTheme() {

    // Fungsi untuk mengubah tema
    const setTheme = (themeName: any) => {
        if (availableThemes[themeName]) {
            currentThemeName.value = themeName;
            // Opsional: Simpan ke LocalStorage agar pilihan tetap tersimpan
            if (process.client) {
                localStorage.setItem('sidebarTheme', themeName);
            }
        }
    };

    // Hitung objek tema saat ini (reactive getter)
    const themeClasses = computed(() => {
        return availableThemes[currentThemeName.value];
    });

    // Ambil tema dari LocalStorage saat pertama kali load
    if (process.client) {
        const savedTheme = localStorage.getItem('sidebarTheme');
        if (savedTheme && availableThemes[savedTheme]) {
            currentThemeName.value = savedTheme;
        }
    }

    return {
        currentThemeName,
        themeClasses,
        availableThemes,
        setTheme,
    };
}