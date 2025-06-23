// app/(protected)/layout.tsx
import { createSupabaseServerClient } from "@/lib/supabase-server"
import { redirect } from "next/navigation"
import type { ReactNode } from "react"

export default async function ProtectedLayout({ children }: { children: ReactNode }) {
    const supabase = createSupabaseServerClient()
    const {
        data: { session },
    } = await supabase.auth.getSession()

    if (!session) {
        redirect("/login")
    }

    return <>{children}</>
}
