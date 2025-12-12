import { computed, onBeforeUnmount, onMounted, ref } from 'vue'

export function useClientTime() {
    const now = ref(new Date())
    let timer: ReturnType<typeof setInterval> | null = null

    const config = useRuntimeConfig()

    const timezone: string = config.public.timezone || 'Asia/Jakarta'
    const timeFormat: string = config.public.timeFormat || 'HH:mm:ss'
    const dateFormat: string = config.public.dateFormat || 'YYYY-MM-DD'
    const dateTimeFormat: string =
        config.public.dateTimeFormat || 'ddd, DD MMMM YYYY HH:mm:ss'

    // -------------------------------
    // Dictionaries untuk nama hari & bulan
    // -------------------------------
    const days = [
        'Minggu',
        'Senin',
        'Selasa',
        'Rabu',
        'Kamis',
        'Jumat',
        'Sabtu'
    ]

    const months = [
        'Januari',
        'Februari',
        'Maret',
        'April',
        'Mei',
        'Juni',
        'Juli',
        'Agustus',
        'September',
        'Oktober',
        'November',
        'Desember'
    ]

    // -------------------------------
    // Formatter utama
    // -------------------------------
    const formatDate = (date: Date, pattern: string): string => {
        const opts: Intl.DateTimeFormatOptions = {
            timeZone: timezone,
            hour12: false,
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        }

        const parts = new Intl.DateTimeFormat('id-ID', opts)
            .formatToParts(date)
            .reduce((acc, p) => {
                if (p.type !== 'literal') {
                    acc[p.type] = p.value
                }
                return acc
            }, {} as Record<string, string>)

        const dayIndex = date.getDay()
        const monthIndex = Number(parts.month) - 1

        return pattern
            // hari
            .replace('dddd', days[dayIndex])       // Friday
            .replace('ddd', days[dayIndex].slice(0, 3)) // Fri

            // bulan
            .replace('MMMM', months[monthIndex])  // Desember
            .replace('MMM', months[monthIndex].slice(0, 3)) // Des

            // tanggal numeric
            .replace('YYYY', parts.year ?? '')
            .replace('MM', parts.month ?? '')
            .replace('DD', parts.day ?? '')

            // waktu
            .replace('HH', parts.hour ?? '')
            .replace('mm', parts.minute ?? '')
            .replace('ss', parts.second ?? '')
    }

    // -------------------------------
    // Clock updater
    // -------------------------------
    onMounted(() => {
        timer = setInterval(() => {
            now.value = new Date()
        }, 1000)
    })

    onBeforeUnmount(() => {
        if (timer) clearInterval(timer)
    })

    return {
        now,

        // Format waktu
        time: computed(() => formatDate(now.value, timeFormat)),

        // Format tanggal
        date: computed(() => formatDate(now.value, dateFormat)),

        // Format tanggal + waktu
        dateTime: computed(() => formatDate(now.value, dateTimeFormat))
    }
}
