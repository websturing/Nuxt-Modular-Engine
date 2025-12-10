
// Lightweight Icon Registry
// Importing * from all icon libraries causes massive bundle sizes and browser hangs (~20mb+ of JS).
// Instead, we register only the icons we use.

import { Home } from '@vicons/ionicons5'

// Registry to store allowed icons
const registry: Record<string, any> = {
    Home
}

/**
 * Searches for an icon component by name in the local registry.
 */
export const getIcon = (name: string) => {
    if (registry[name]) {
        return registry[name]
    }
    console.warn(`[UiIcon] Icon not found: ${name}. Please register it in ~/utils/icon-registry.ts`)
    return null
}

/**
 * Helper to register more icons from other files/plugins if needed
 */
export const registerIcons = (icons: Record<string, any>) => {
    Object.assign(registry, icons)
}
