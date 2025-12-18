import { getUserPermissionsRepo } from '../acl/acl.repository';
import { getAllModulesWithPermissionsRepo } from './menu.repository';
// Tipe Data untuk hasil Menu
interface MenuNode {
    id: number;
    name: string;
    slug: string | null;
    icon: string | null;
    permissions: { action: string | null; permissionName: string }[];
    children: MenuNode[];
}

// ----------------------------------------------------------------------
// 1. MAIN FUNCTION (Public)
// ----------------------------------------------------------------------
export const getStructuredMenuForUserService = async (userId: number) => {
    // Ambil semua raw data dari DB
    const allModules = await getAllModulesWithPermissionsRepo();
    const userPermissions = await getUserPermissionsRepo(userId);
    const nestedMenu = buildNestedModules(allModules, userPermissions, null);

    return nestedMenu;
};

// ----------------------------------------------------------------------
// 2. BUILD NESTED MODULES (Recursive)
// Mirip fungsi buildNestedModules di PHP
// ----------------------------------------------------------------------
const buildNestedModules = (
    allModules: any[],
    userPermissions: string[],
    parentId: number | null
): MenuNode[] => {

    // 1. Filter module berdasarkan parentId saat ini
    const currentLevelModules = allModules.filter(m => m.parentId === parentId);

    // 2. Map menjadi struktur tree
    return currentLevelModules
        .map(module => {
            // Filter permissions: Cuma ambil permission yg dimiliki user
            const filteredPermissions = module.modulePermissions
                .filter((p: any) => userPermissions.includes(p.permissionName))
                .map((p: any) => ({
                    action: p.action,
                    permissionName: p.permissionName
                }));

            // Rekursi untuk cari anak-anaknya
            const children = buildNestedModules(allModules, userPermissions, module.id);

            // Jika permission kosong DAN tidak punya anak, return null (nanti di-filter)
            // Logic ini sama persis dengan PHP: if ($filteredPermissions->isEmpty() && $children->isEmpty())
            if (filteredPermissions.length === 0 && children.length === 0) {
                return null;
            }

            return {
                id: module.id,
                name: module.name,
                slug: module.slug,
                icon: module.icon,
                permissions: filteredPermissions,
                children: children
            };
        })
        .filter((node): node is MenuNode => node !== null); // Buang yang null
};

// ----------------------------------------------------------------------
// 3. FILTER MENU (Recursive)
// Mirip fungsi filterMenu di PHP (Logic .read)
// ----------------------------------------------------------------------
const filterMenu = (menus: MenuNode[], userPermissions: string[]): MenuNode[] => {
    return menus
        .map(menu => {
            // 1. Proses Children duluan (Recursive)
            const filteredChildren = filterMenu(menu.children, userPermissions);

            // 2. Cek Permission Read
            // PHP: ->filter(fn($perm) => str_ends_with($perm, '.read'))->isNotEmpty()
            const hasReadPermission = menu.permissions.some(p =>
                userPermissions.includes(p.permissionName) &&
                p.permissionName.endsWith('.read') // Pastikan permission di DB formatnya 'module.read'
            );

            // 3. Logic Penentuan Tampil
            // Tampil JIKA: Punya akses READ -ATAU- Punya Anak yang valid
            if (hasReadPermission || filteredChildren.length > 0) {
                return {
                    ...menu,
                    children: filteredChildren
                };
            }

            return null;
        })
        .filter((node): node is MenuNode => node !== null); // Buang null
};