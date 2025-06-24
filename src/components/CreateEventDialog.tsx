"use client"

import { useState } from "react"
import {
    DialogUi
} from "@/components/ui/index"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import {
    Select,
    SelectTrigger,
    SelectContent,
    SelectItem,
    SelectValue,
} from "@/components/ui/select"
import { toast } from "sonner"
import { supabase } from "@/lib/supabase"

export function CreateEventDialog({
    open,
    onOpenChange,
}: {
    open: boolean
    onOpenChange: (open: boolean) => void
}) {
    const [loading, setLoading] = useState(false)
    const [form, setForm] = useState({
        title: "",
        category: "",
        startTime: "",
        endTime: "",
        date: "",
        description: "",
        seats: "",
        price: "",
        organizer: "",
    })

    const handleChange = (field: string, value: string) => {
        setForm((prev) => ({ ...prev, [field]: value }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)

        const {
            data: { user },
            error: userError,
        } = await supabase.auth.getUser()

        if (userError || !user) {
            toast.error("Usuário não autenticado.")
            setLoading(false)
            return
        }

        const generateRefCode = () =>
            Math.random().toString(36).substring(2, 8).toUpperCase()

        // Prepara os dados
        const newEvent = {
            title: form.title,
            category: form.category,
            description: form.description,
            date: form.startTime.split("T")[0],       // data de início
            start_time: form.startTime.split("T")[1], // hora de início
            end_date: form.endTime.split("T")[0],     // data de fim
            end_time: form.endTime.split("T")[1],     // hora de fim
            seats: form.seats ? parseInt(form.seats, 10) : null,
            price: parseFloat(form.price || "0"),
            organizer: form.organizer,
            reference_code: generateRefCode(),
            created_by: user.id,
        }

        const { data, error } = await supabase.from("events").insert([newEvent])

        console.log("🔎 Payload enviado pro Supabase:", newEvent);
        console.log("📦 Resultado do insert:", { data, error });

        if (error) {
            console.error("🧨 Erro ao criar evento:", JSON.stringify(error, null, 2))
            toast.error("Erro ao criar evento. Tenta de novo ou fala com o suporte.")
            setLoading(false)
            return
        }


        toast.success("Evento criado com sucesso!")
        setLoading(false)
        onOpenChange(false)
    }


    const isFormValid =
        form.title.trim() !== "" &&
        form.organizer.trim() !== "" &&
        form.category.trim() !== "" &&
        form.startTime.trim() !== "" &&
        form.endTime.trim() !== ""


    return (
        <DialogUi.Dialog open={open} onOpenChange={onOpenChange}>
            <DialogUi.DialogContent className="sm:max-w-[500px]">
                <DialogUi.DialogHeader>
                    <DialogUi.DialogTitle>Criar Novo Evento</DialogUi.DialogTitle>
                    <DialogUi.DialogDescription>
                        Preencha os campos abaixo para criar um novo evento.
                    </DialogUi.DialogDescription>
                </DialogUi.DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Título */}
                    <div>
                        <Label htmlFor="title" className="mb-2">Título <span className="text-red-600">*</span></Label>
                        <Input
                            id="title"
                            value={form.title}
                            onChange={(e) => handleChange("title", e.target.value)}
                            required
                        />
                    </div>

                    <div>
                        <Label htmlFor="organizer" className="mb-2">Organizador <span className="text-red-600">*</span></Label>
                        <Input
                            id="organizer"
                            value={form.organizer}
                            onChange={(e) => handleChange("organizer", e.target.value)}
                            required
                        />
                    </div>

                    <div>
                        <Label htmlFor="category" className="mb-2">Categoria <span className="text-red-600">*</span></Label>
                        <Select onValueChange={(value) => handleChange("category", value)}>
                            <SelectTrigger>
                                <SelectValue placeholder="Selecione a categoria" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="conferencia">Conferência</SelectItem>
                                <SelectItem value="workshop">Workshop</SelectItem>
                                <SelectItem value="seminario">Seminário</SelectItem>
                                <SelectItem value="palestra">Palestra</SelectItem>
                                <SelectItem value="academico">Acadêmico</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="w-full flex gap-2">

                        <div>
                            <Label htmlFor="startTime" className="mb-2">Início do Evento <span className="text-red-600">*</span></Label>
                            <Input
                                id="startTime"
                                type="datetime-local"
                                value={form.startTime}
                                onChange={(e) => handleChange("startTime", e.target.value)}
                                required
                            />
                        </div>

                        <div>
                            <Label htmlFor="endTime" className="mb-2">Fim do Evento <span className="text-red-600">*</span></Label>
                            <Input
                                id="endTime"
                                type="datetime-local"
                                value={form.endTime}
                                onChange={(e) => handleChange("endTime", e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    {/* Descrição */}
                    <div>
                        <Label htmlFor="description" className="mb-2">Descrição</Label>
                        <Textarea
                            id="description"
                            value={form.description}
                            onChange={(e) => handleChange("description", e.target.value)}
                        />
                    </div>

                    {/* Número de assentos */}
                    <div>
                        <Label htmlFor="seats" className="mb-2">Número de Assentos</Label>
                        <Input
                            id="seats"
                            type="number"
                            min={1}
                            placeholder="Ex: 100 ou deixe vazio para ilimitado"
                            value={form.seats}
                            onChange={(e) => handleChange("seats", e.target.value)}
                        />
                    </div>

                    {/* Preço */}
                    <div>
                        <Label htmlFor="price" className="mb-2">Preço</Label>
                        <Input
                            id="price"
                            type="number"
                            min={0}
                            step="0.01"
                            placeholder="Ex: 0 para gratuito"
                            value={form.price}
                            onChange={(e) => handleChange("price", e.target.value)}
                        />
                    </div>

                    {/* Botão */}
                    <DialogUi.DialogFooter >
                        <Button type="submit" disabled={!isFormValid || loading} className={`${(!isFormValid || loading) ? "opacity-50 cursor-not-allowed" : ""}`}>
                            {loading ? "Criando Evento..." : "Criar Evento"}
                        </Button>
                    </DialogUi.DialogFooter>
                </form>

            </DialogUi.DialogContent>
        </DialogUi.Dialog>
    )
}
