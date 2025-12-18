import { db } from '@db';
import { modules } from '@db/migrations/schema';
import { asc } from 'drizzle-orm';

export const getAllModulesWithPermissionsRepo = async () => {
    // Query: Select * from modules + permissions order by 'order'
    return await db.query.modules.findMany({
        with: {
            modulePermissions: true
        },
        orderBy: [asc(modules.order)]
    });
};