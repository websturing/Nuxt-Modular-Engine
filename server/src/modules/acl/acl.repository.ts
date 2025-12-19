import { db } from '@db';
import { modelHasRoles, permissions, roleHasPermissions, roles } from '@db/migrations/schema';
import { modules } from '@schema/modules/schema';
import { and, count, eq } from 'drizzle-orm';

// Ambil semua Permission milik User (via Role)
export const getUserPermissionsRepo = async (userId: number) => {
    // Logic Spatie: User -> model_has_roles -> roles -> role_has_permissions -> permissions

    const result = await db.select({
        permissionName: permissions.name
    })
        .from(modelHasRoles)
        // Join ke Roles (memastikan role-nya ada)
        .innerJoin(roles, eq(modelHasRoles.roleId, roles.id))
        // Join ke Penghubung Permission
        .innerJoin(roleHasPermissions, eq(roles.id, roleHasPermissions.roleId))
        // Join ke Tabel Permission (untuk ambil namanya)
        .innerJoin(permissions, eq(roleHasPermissions.permissionId, permissions.id))
        .where(
            and(
                eq(modelHasRoles.modelId, userId),
                eq(modelHasRoles.modelType, 'App\\Models\\User') // ⚠️ PENTING: Sesuaikan dengan namespace Laravel
            )
        );

    // Hasilnya: [{ permissionName: 'stock-in.view' }, { permissionName: 'stock-in.create' }]
    // Kita ratakan jadi array string: ['stock-in.view', 'stock-in.create']
    return result.map(r => r.permissionName);
};

// Ambil Role User (Opsional, kalau butuh cek Role doang)
export const getUserRolesRepo = async (userId: number) => {
    const result = await db.select({
        roleName: roles.name
    })
        .from(modelHasRoles)
        .innerJoin(roles, eq(modelHasRoles.roleId, roles.id))
        .where(
            and(
                eq(modelHasRoles.modelId, userId),
                eq(modelHasRoles.modelType, 'App\\Models\\User')
            )
        );

    return result.map(r => r.roleName);
};


export const moduleRepository = {
    async findMany(params: { offset: number; limit: number }) {
        return await db.query.modules.findMany({
            limit: params.limit,
            offset: params.offset,
            orderBy: (modules, { asc }) => [asc(modules.name)],
            with: {
                parent: true,
                children: true
            }
        })
    },


    async count() {
        const [result] = await db
            .select({ value: count() })
            .from(modules)

        return result?.value || 0
    }
}
