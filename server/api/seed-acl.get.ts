import { db } from '@db';
import { modules } from '@schema/modules/schema';
import { count } from 'drizzle-orm';

export default defineEventHandler(async () => {
    // Check existing
    const [existing] = await db.select({ value: count() }).from(modules);
    if (existing.value > 0) {
        return { message: 'Database already seeded', count: existing.value };
    }

    const dummyData = Array.from({ length: 25 }).map((_, i) => ({
        name: `Module ${i + 1}`,
        slug: `module-${i + 1}`,
        icon: 'heroicons:squares-2x2',
        order: i + 1,
        isActive: 1,
        createdAt: '2025-12-18 10:00:00',
        updatedAt: '2025-12-18 10:00:00'
    }));

    await db.insert(modules).values(dummyData);

    return { success: true, message: 'Seeded 25 modules' };
});
