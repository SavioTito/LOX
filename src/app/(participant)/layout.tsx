import RoleGuard from '@/components/auth/role-guard';
import Menu from '@/components/participant/menu';

export default function ParticipantLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <RoleGuard allowedRoles={['participant']}>
            <div className="participant-layout">
                {/* Aqui você pode adicionar um sidebar específico para participantes se quiser */}
                <Menu />
                <main>{children}</main>
            </div>
        </RoleGuard>
    );
}