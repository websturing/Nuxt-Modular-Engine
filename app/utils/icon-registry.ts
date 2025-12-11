// Dynamic Icon Loader for Vue + Nuxt

const LIB_MAP: Record<string, () => Promise<any>> = {
    fluent: () => import('@vicons/fluent'),
    ionicons5: () => import('@vicons/ionicons5'),
    antd: () => import('@vicons/antd'),
    carbon: () => import('@vicons/carbon'),
    material: () => import('@vicons/material'),
    tabler: () => import('@vicons/tabler'),
    fa: () => import('@vicons/fa'),
    ionicons4: () => import('@vicons/ionicons4'),
};

// Cache for loaded libraries to avoid re-importing
const loadedLibs: Record<string, any> = {};

export const getIcon = async (name: string) => {
    // 1. If user provides "lib:icon", loading specific library
    if (name.includes(':')) {
        const [lib, icon] = name.split(':');
        if (!lib || !icon) return null;

        if (!LIB_MAP[lib]) {
            console.warn(`[UiIcon] Unknown library: ${lib}`);
            return null;
        }

        try {
            if (!loadedLibs[lib]) {
                loadedLibs[lib] = await LIB_MAP[lib]();
            }
            return loadedLibs[lib][icon] ?? null;
        } catch (err) {
            console.error(`[UiIcon] Failed loading ${lib}`, err);
            return null;
        }
    }

    // 2. Search mode: loop until found
    for (const lib in LIB_MAP) {
        try {
            if (!loadedLibs[lib]) {
                loadedLibs[lib] = await LIB_MAP[lib]();
            }

            const module = loadedLibs[lib];
            if (module[name]) {
                return module[name];
            }
        } catch (err) {
            console.warn(`[UiIcon] Error scanning lib ${lib}`, err);
        }
    }

    console.warn(`[UiIcon] Icon not found in any library: ${name}`);
    return null;
};
