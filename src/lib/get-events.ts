// lib/get-events.ts
import { supabase } from "./supabase";

export async function getEvents() {
  const { data, error } = await supabase
    .from("events")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  return data.map((event) => ({
    id: event.id,
    header: event.title,
    type: event.category || "Sem categoria",
    status: resolveStatus(event.start_time, event.end_time),
    target: event.seats?.toString() || "Ilimitado",
    limit: event.price?.toString() || "Gratuito",
    reviewer: event.organizer || "Sem organizador",
  }));
}

// Função para gerar status baseado em hora de início/fim
function resolveStatus(startTime: string, endTime: string) {
  const now = new Date();
  const start = new Date(`1970-01-01T${startTime}`);
  const end = new Date(`1970-01-01T${endTime}`);

  if (now < start) return "Não iniciado";
  if (now >= start && now <= end) return "Em progresso";
  return "Completado";
}
