"use client"

import * as React from "react"
import Image from "next/image"
import {
    IconCamera,
    IconChartBar,
    IconDashboard,
    IconDatabase,
    IconFileAi,
    IconFileDescription,
    IconFileWord,
    IconFolder,
    IconHelp,
    IconReport,
    IconSearch,
    IconSettings,
    IconUsers,
} from "@tabler/icons-react"

import { NavDocuments } from "@/components/nav-documents"
import { NavMain } from "@/components/nav-main"
import { NavSecondary } from "@/components/nav-secondary"
import { NavUser } from "@/components/nav-user"
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"
import logotipo from "../../public/images/lox-logo.svg"

const data = {
    user: {
        name: "shadcn",
        email: "m@example.com",
        avatar: "/avatars/shadcn.jpg",
    },
    navMain: [
        {
            title: "Dashboard",
            url: "/dashboard",
            icon: IconDashboard,
        },
        {
            title: "Estatísticas",
            url: "#",
            icon: IconChartBar,
        },
        {
            title: "Eventos",
            url: "/events",
            icon: IconFolder,
        },
        {
            title: "Usuários",
            url: "/users",
            icon: IconUsers,
        },
    ],
    navClouds: [
        {
            title: "Capture",
            icon: IconCamera,
            isActive: true,
            url: "#",
            items: [
                {
                    title: "Active Proposals",
                    url: "#",
                },
                {
                    title: "Archived",
                    url: "#",
                },
            ],
        },
        {
            title: "Proposal",
            icon: IconFileDescription,
            url: "#",
            items: [
                {
                    title: "Active Proposals",
                    url: "#",
                },
                {
                    title: "Archived",
                    url: "#",
                },
            ],
        },
        {
            title: "Prompts",
            icon: IconFileAi,
            url: "#",
            items: [
                {
                    title: "Active Proposals",
                    url: "#",
                },
                {
                    title: "Archived",
                    url: "#",
                },
            ],
        },
    ],
    navSecondary: [
        {
            title: "Definições",
            url: "#",
            icon: IconSettings,
        },
        {
            title: "Ajuda",
            url: "#",
            icon: IconHelp,
        },
        {
            title: "Pesquisar",
            url: "#",
            icon: IconSearch,
        },
    ],
    documents: [
        {
            name: "Dados",
            url: "#",
            icon: IconDatabase,
        },
        {
            name: "Relatórios",
            url: "#",
            icon: IconReport,
        },
        {
            name: "Arquivos",
            url: "#",
            icon: IconFileWord,
        },
    ],
}

export function AppSidebar({
    onCreateClick,
    ...props
}: React.ComponentProps<typeof Sidebar> & {
    onCreateClick?: () => void
}) {
    return (
        <Sidebar collapsible="offcanvas" {...props}>
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton
                            asChild
                            className="data-[slot=sidebar-menu-button]:!p-1.5"
                        >
                            <a href="/dashboard">
                                <Image
                                    src={logotipo}
                                    width={60}
                                    height={60}
                                    alt="Universidade lusíadas"
                                />
                                <span className="font-sans text-base font-semibold">Eventos</span>
                            </a>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarContent>
                <NavMain items={data.navMain} onCreateClick={onCreateClick} />
                <NavDocuments items={data.documents} />
                <NavSecondary items={data.navSecondary} className="mt-auto" />
            </SidebarContent>
            <SidebarFooter>
                <NavUser user={data.user} />
            </SidebarFooter>
        </Sidebar>
    )
}
