export type ThemeName = 'blue' | 'emerald' | 'indigo';

interface ThemeDefinition {
    name: string;
    label: string;
}

const availableThemes: ThemeDefinition[] = [
    { name: 'blue', label: 'Professional Blue' },
    { name: 'emerald', label: 'Emerald Green' },
    { name: 'indigo', label: 'Indigo Purple' },
];

export const useTheme = () => {
    // State
    const currentTheme = useState<ThemeName>('theme-color', () => 'blue');

    /**
     * Apply theme to <html> tag using useHead
     * This handles both SSR and Client-side hydration
     */
    useHead({
        htmlAttrs: {
            'data-theme': computed(() => currentTheme.value)
        }
    });

    /**
     * Set active theme and save to preference
     */
    const setTheme = (theme: ThemeName) => {
        if (!availableThemes.find(t => t.name === theme)) return;

        currentTheme.value = theme;

        if (import.meta.client) {
            localStorage.setItem('user-theme', theme);
        }
    };

    /**
     * Initialize theme from local storage
     * (Run this once on app mount)
     */
    const initTheme = () => {
        if (import.meta.client) {
            const savedTheme = localStorage.getItem('user-theme') as ThemeName;
            if (savedTheme && availableThemes.find(t => t.name === savedTheme)) {
                currentTheme.value = savedTheme;
            }
        }
    };

    return {
        currentTheme,
        availableThemes,
        setTheme,
        initTheme
    };
};