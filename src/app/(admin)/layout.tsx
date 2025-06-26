// app/(admin)/layout.tsx
import RoleGuard from '@/components/auth/role-guard';

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <RoleGuard allowedRoles={['admin']}>
            <div className="admin-layout">
                <main>{children}</main>
            </div>
        </RoleGuard>
    );
}