"use client"


import { useEffect, useState } from "react"
import { CardUi, ButtonUi } from "@/components/ui/index"
import { supabase } from "@/lib/supabase"
import { format } from "date-fns"
import { pt } from "date-fns/locale"

type Event = {
    id: string
    title: string
    category: string
    description: string
    date: string
    start_time: string
    end_date: string
    end_time: string
    seats: number | null
    price: number
    organizer: string
    reference_code: string
    created_by: string
}

export default function Portal() {
    const [events, setEvents] = useState<Event[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const { data, error } = await supabase
                    .from('events')
                    .select('*')
                    .order('date', { ascending: true })

                if (error) throw error
                setEvents(data || [])
            } catch (err) {
                setError(err.message || "Erro ao carregar eventos")
            } finally {
                setLoading(false)
            }
        }

        fetchEvents()
    }, [])

    const formatDate = (dateStr: string) => {
        const date = new Date(dateStr)
        return date.toLocaleDateString('pt-PT', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        })
    }

    const formatTime = (timeStr: string) => {
        const [hours, minutes] = timeStr.split(':')
        const hour = parseInt(hours)
        const ampm = hour >= 12 ? 'PM' : 'AM'
        const hour12 = hour % 12 || 12
        return `${hour12}:${minutes}${ampm}`
    }

    if (loading) return <div className="w-full px-[17vh] py-4">Carregando eventos...</div>
    if (error) return <div className="w-full px-[17vh] py-4 text-red-500">Erro: {error}</div>
    if (events.length === 0) return <div className="w-full px-[17vh] py-4">Nenhum evento disponível</div>

    return (
        <div className="w-full px-[17vh]">
            <h1 className="font-bold text-green-800 mb-7">Eventos</h1>
            <div className="w-full flex flex-wrap gap-4">
                {events.map((event) => (
                    <CardUi.Card key={event.id} className="w-full sm:w-[calc(50%-8px)] lg:w-[calc(33.33%-11px)] h-54">
                        <CardUi.CardHeader>
                            <CardUi.CardTitle className="text-base font-bold uppercase">
                                {event.title}
                                <span className="lowercase text-green-700 border-l-[1.5px] border-neutral-900 pl-2 ml-1">
                                    {event.price === 0 ? 'Gratuito' : `${event.price} Kzs`}
                                </span>
                            </CardUi.CardTitle>
                            <CardUi.CardDescription className="text-sm ">By <span className="text-green-800 font-semibold">{event.organizer} -</span>
                                <span>
                                    {event.seats <= 0 ? 'Ilimitado' : ` ${event.seats} cadeiras`}
                                </span>
                            </CardUi.CardDescription>
                            <CardUi.CardAction className="text-white font-normal text-sm">
                                <ButtonUi.Button className="bg-green-700 px-4 py-[10px] rounded-xs">
                                    Inscrever-se
                                </ButtonUi.Button>
                            </CardUi.CardAction>
                        </CardUi.CardHeader>
                        <CardUi.CardFooter className="flex flex-col items-start gap-2">
                            <p className="font-light text-sm">Este evento iniciará em
                                <span className="ml-1 font-semibold">
                                    {formatDate(event.date)} às {formatTime(event.start_time)}
                                </span> e terminará em <span className="font-semibold">
                                    {formatDate(event.end_date)} às {formatTime(event.end_time)}
                                </span>
                            </p>
                            <p className="text-xs bg-blue-100 px-2 py-1 border border-blue-300">
                                {event.category}
                            </p>
                        </CardUi.CardFooter>
                    </CardUi.Card>
                ))}
            </div>
        </div>
    );
}