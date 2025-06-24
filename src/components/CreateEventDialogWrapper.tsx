"use client"

import { useState } from "react"
import { CreateEventDialog } from "@/components/CreateEventDialog"

export function CreateEventDialogWrapper() {
    const [dialogOpen, setDialogOpen] = useState(false)

    return (
        <CreateEventDialog open={dialogOpen} onOpenChange={setDialogOpen} />
    )
}
