import type { EventHandler, EventHandlerRequest } from 'h3'
import humps from 'humps'

export const defineApiHandler = <T extends EventHandlerRequest, D>(
    handler: EventHandler<T, D>
): EventHandler<T, any> => {
    return defineEventHandler(async (event) => {
        // 1. Ambil Query Asli (Snake Case)
        const rawQuery = getQuery(event)

        // 2. Cek apakah ada isinya
        if (rawQuery && Object.keys(rawQuery).length > 0) {

            // Convert ke Plain Object & CamelCase
            const plainQuery = { ...rawQuery }
            const camelQuery = humps.camelizeKeys(plainQuery)

            // --- DEBUG WRAPPER (Pastikan ini muncul di log) ---
            console.log('✅ Wrapper Converted:', camelQuery)

            // --- 🔥 LANGKAH 1: TIMPA ISI RAW QUERY (MUTASI REFERENCE) ---
            // Kita hapus semua key snake_case dari object asli
            Object.keys(rawQuery).forEach(key => delete rawQuery[key])
            // Kita masukkan key camelCase ke object asli
            Object.assign(rawQuery, camelQuery)

            // --- 🔥 LANGKAH 2: TIMPA CONTEXT H3 (MEMAKSA CACHE) ---
            // Ini adalah tempat rahasia H3 menyimpan cache query
            event.context.query = rawQuery

            // Jaga-jaga jika versi H3 kamu menggunakan _query (undescore)
            // @ts-ignore
            event.context._query = rawQuery
        }

        try {
            // 3. Jalankan Controller
            const response = await handler(event)

            // 4. Convert Response (Camel -> Snake)
            if (response && typeof response === 'object') {
                return humps.decamelizeKeys(response)
            }

            return response
        } catch (err) {
            throw err
        }
    })
}