'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import useUser from '@/hooks/use-user';

export default function RoleGuard({
    children,
    allowedRoles
}: {
    children: React.ReactNode;
    allowedRoles: string[];
}) {
    const { user, profile, isLoading } = useUser();
    const router = useRouter();

    useEffect(() => {
        if (isLoading) return;

        if (!user) {
            router.push('/login');
            return;
        }

        // Verificação mais segura
        if (user && (!profile || !profile.role || !allowedRoles.includes(profile.role))) {
            router.push('/portal');
        }
    }, [user, profile, isLoading, allowedRoles, router]);

    if (isLoading) return <div>Loading...</div>;
    if (!user || !profile || !profile.role) return null;

    return <>{children}</>;
}