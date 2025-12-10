
// Import all icon sets (Note: This forces bundling of all icons, which may affect bundle size)
// To optimize, you might want to only import specific sets or icons you need.
import * as Antd from '@vicons/antd'
import * as Carbon from '@vicons/carbon'
import * as Fa from '@vicons/fa'
import * as Fluent from '@vicons/fluent'
import * as Ionicons4 from '@vicons/ionicons4'
import * as Ionicons5 from '@vicons/ionicons5'
import * as Material from '@vicons/material'
import * as Tabler from '@vicons/tabler'

// Priority order for icon lookup
const iconSets = [
    Fluent,
    Ionicons5,
    Ionicons4,
    Antd,
    Material,
    Fa,
    Tabler,
    Carbon
]

/**
 * Searches for an icon component by name across all installed icon sets.
 * Returns the first match found based on the priority order above.
 */
export const getIcon = (name: string) => {
    for (const set of iconSets) {
        if (name in set) {
            // @ts-ignore - Dynamic access
            return set[name]
        }
    }
    console.warn(`[UiIcon] Icon not found: ${name}`)
    return null
}
