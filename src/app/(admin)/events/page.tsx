import { getCurrentUser } from "@/lib/get-current-user"
import { redirect } from "next/navigation"

export default async function EventsPage() {
    const user = await getCurrentUser()
    if (!user) {
        redirect("/login")
    }

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold">Página de Eventos</h1>
            <p>Bem-vindo, {user.name}!</p>
        </div>
    )
}
