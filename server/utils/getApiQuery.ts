// server/utils/getApiQuery.ts
import type { H3Event } from 'h3'

export const getApiQuery = (event: H3Event) => {
    // Ambil dari context (tempat wrapper menyimpan hasil camelCase)
    // Kalau kosong (misal lupa pasang wrapper), fallback ke getQuery biasa
    return event.context.query || getQuery(event)
}