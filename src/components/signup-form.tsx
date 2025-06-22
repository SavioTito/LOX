"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { supabase } from "@/lib/supabase"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"


export function SignupForm({ className, ...props }: React.ComponentProps<"div">) {

    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    })

    const router = useRouter()

    const handleChange = (field: string, value: string) => {
        setForm((prev) => ({ ...prev, [field]: value }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (form.password !== form.confirmPassword) {
            toast.error("As senhas não coincidem.", {
                duration: 6000,
            })
            return
        }

        // 1. Cadastra o usuário no Auth
        const { data, error } = await supabase.auth.signUp({
            email: form.email,
            password: form.password,
        })

        if (error || !data.user) {
            toast.error("Erro ao registrar: " + error?.message, {
                duration: 6000,
            })
            return
        }

        // depois do signUp
        const userId = data.user.id

        const { data: existing, error: existingError } = await supabase
            .from("profiles")
            .select("id")
            .eq("id", userId)
            .maybeSingle()

        if (!existing && !existingError) {
            await supabase.from("profiles").insert([{
                id: userId,
                name: form.name,
                email: form.email,
                role: "participant",
            }])
        }

        toast.success("Conta criada com sucesso!", {
            duration: 6000,
        })
        router.push("/login")
    }



    return (
        <div className={cn("flex flex-col gap-6", className)} {...props}>
            <Card>
                <CardHeader className="text-center">
                    <CardTitle className="text-xl">Bem-vindo</CardTitle>
                    <CardDescription>
                        Registre-se como participante e gerencie os seus eventos a qualquer momento
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit}>
                        <div className="grid gap-6">
                            <div className="grid gap-4">
                                <div className="grid gap-3">
                                    <Label htmlFor="name">Nome completo</Label>
                                    <Input
                                        id="name"
                                        type="text"
                                        placeholder="Primeiro e último nome"
                                        required
                                        value={form.name}
                                        onChange={(e) => handleChange("name", e.target.value)}
                                    />
                                </div>
                                <div className="grid gap-3">
                                    <Label htmlFor="email">E-mail</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        placeholder="Seu melhor e-mail"
                                        required
                                        value={form.email}
                                        onChange={(e) => handleChange("email", e.target.value)}
                                    />
                                </div>
                                <div className="grid gap-3">
                                    <Label htmlFor="password">Palavra-passe</Label>
                                    <Input
                                        id="password"
                                        type="password"
                                        placeholder="xxxxxxxx"
                                        required
                                        value={form.password}
                                        onChange={(e) => handleChange("password", e.target.value)}
                                    />
                                </div>
                                <div className="grid gap-3">
                                    <Label htmlFor="password">Confirme a palavra-passe</Label>
                                    <Input
                                        id="password"
                                        type="password"
                                        placeholder="xxxxxxxx"
                                        required
                                        value={form.confirmPassword}
                                        onChange={(e) => handleChange("confirmPassword", e.target.value)}
                                    />
                                </div>
                                <Button type="submit" className="w-full bg-green-600">
                                    Registrar-se
                                </Button>
                            </div>
                            <div className="text-center text-sm">
                                Já tem uma conta?{" "}
                                <a href="/login" className="underline underline-offset-4">
                                    Log in
                                </a>
                            </div>
                        </div>
                    </form>
                </CardContent>
            </Card>
            <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
                Clicando em registrar-se, estarás concordando com os nossos <a href="#">Termos de Serviços</a>{" "}
                e <a href="#">Política de Privacidade</a>.
            </div>
        </div>
    )
}
