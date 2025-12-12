// Dynamic Icon Loader for Vue + Nuxt

const LIB_MAP: Record<string, () => Promise<any>> = {
    fluent: () => import('@vicons/fluent'),
    carbon: () => import('@vicons/carbon'),
    material: () => import('@vicons/material'),
    ionicons5: () => import('@vicons/ionicons5'),
    tabler: () => import('@vicons/tabler'),
    antd: () => import('@vicons/antd'),
    fa: () => import('@vicons/fa'),
    ionicons4: () => import('@vicons/ionicons4'),
};

// Cache for loaded libraries to avoid re-importing
const loadedLibs: Record<string, any> = {};

// Persist icon locations (IconName -> LibName) to speed up future lookups
const CACHE_KEY = 'nuxt-ui-icon-map';
let iconMapCache: Record<string, string> = {};

if (typeof window !== 'undefined') {
    try {
        const stored = localStorage.getItem(CACHE_KEY);
        if (stored) iconMapCache = JSON.parse(stored);
    } catch (e) {
        // Ignore storage errors
    }
}

const saveToCache = (icon: string, lib: string) => {
    if (iconMapCache[icon] === lib) return;
    iconMapCache[icon] = lib;
    if (typeof window !== 'undefined') {
        try {
            localStorage.setItem(CACHE_KEY, JSON.stringify(iconMapCache));
        } catch (e) { }
    }
};

export const getIcon = async (name: string | undefined) => {
    if (!name) return null;

    // 1. Direct "lib:icon" mode
    if (name.includes(':')) {
        const [lib, icon] = name.split(':');
        if (!lib || !icon) return null;
        if (!LIB_MAP[lib]) {
            console.warn(`[UiIcon] Unknown library: ${lib}`);
            return null;
        }
        return loadFromLib(lib, icon);
    }

    // 2. Optimized: Check Cache Strategy First
    if (iconMapCache[name]) {
        const cachedLib = iconMapCache[name];
        const icon = await loadFromLib(cachedLib, name);
        if (icon) return icon;
        // If cached lookup failed (e.g. lib changed), fall through to search
    }

    // 3. Search in already loaded libraries (Fastest network-wise)
    for (const lib in loadedLibs) {
        if (loadedLibs[lib][name]) {
            saveToCache(name, lib);
            return loadedLibs[lib][name];
        }
    }

    // 4. Waterfall Search through remaining libraries
    for (const lib in LIB_MAP) {
        if (loadedLibs[lib]) continue; // Already checked

        try {
            const icon = await loadFromLib(lib, name);
            if (icon) {
                saveToCache(name, lib);
                return icon;
            }
        } catch (err) {
            console.warn(`[UiIcon] Error scanning lib ${lib}`, err);
        }
    }

    console.warn(`[UiIcon] Icon not found in any library: ${name}`);
    return null;
};

// Helper to load a specific icon from a library safely
const loadFromLib = async (libName: string, iconName: string) => {
    try {
        if (!loadedLibs[libName]) {
            loadedLibs[libName] = await LIB_MAP[libName]();
        }
        return loadedLibs[libName][iconName] ?? null;
    } catch (err) {
        return null;
    }
};
