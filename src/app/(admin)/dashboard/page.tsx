"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { supabase } from "@/lib/supabase"
import { AppSidebar } from "@/components/app-sidebar"
import { ChartAreaInteractive } from "@/components/chart-area-interactive"
import { DataTable } from "@/components/data-table"
import { SectionCards } from "@/components/section-cards"
import { SiteHeader } from "@/components/site-header"
import {
    SidebarInset,
    SidebarProvider,
} from "@/components/ui/sidebar"

import data from "./data.json"
import { CreateEventDialog } from "@/components/CreateEventDialog"

export default function Page() {
    const router = useRouter()
    const [dialogOpen, setDialogOpen] = useState(false)
    const [loading, setLoading] = useState(true)


    useEffect(() => {
        const checkSession = async () => {
            const { data, error } = await supabase.auth.getSession()

            if (error || !data.session) {
                toast.error("Sessão expirada ou inválida.")
                router.push("/login")
            } else {
                setLoading(false)
            }
        }

        checkSession()
    }, [router])

    if (loading) {
        return <div className="p-4 text-center">Verificando sessão...</div>
    }

    return (
        <SidebarProvider
            style={
                {
                    "--sidebar-width": "calc(var(--spacing) * 72)",
                    "--header-height": "calc(var(--spacing) * 12)",
                } as React.CSSProperties
            }
        >
            <AppSidebar variant="inset" onCreateClick={() => setDialogOpen(true)} />

            <CreateEventDialog open={dialogOpen} onOpenChange={setDialogOpen} />

            <SidebarInset>
                <SiteHeader />
                <div className="flex flex-1 flex-col">
                    <div className="@container/main flex flex-1 flex-col gap-2">
                        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
                            <SectionCards />
                            <div className="px-4 lg:px-6">
                                <ChartAreaInteractive />
                            </div>
                            <DataTable data={data} />
                        </div>
                    </div>
                </div>
            </SidebarInset>
        </SidebarProvider>
    )
}
