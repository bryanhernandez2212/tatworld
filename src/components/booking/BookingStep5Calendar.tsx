import { Button } from "@/components/ui/button";
import { Calendar as CalendarIcon, Mail, Smartphone } from "lucide-react";
import type { Artist } from "@/data/artists";
import type { BookingData } from "./BookingFlow";
import { toast } from "@/hooks/use-toast";

interface Props {
  data: BookingData;
  artist: Artist;
  onNext: () => void;
  onBack: () => void;
}

const BookingStep5Calendar = ({ data, artist, onNext, onBack }: Props) => {
  const dateStr = data.selectedDate
    ? data.selectedDate.toLocaleDateString("es-MX", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : "";

  const handleGoogleCalendar = () => {
    if (!data.selectedDate) return;
    const start = new Date(data.selectedDate);
    const [h, m] = data.selectedTime.split(":").map(Number);
    start.setHours(h, m, 0);
    const end = new Date(start);
    end.setHours(start.getHours() + data.estimatedHours);

    const formatDate = (d: Date) => d.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";

    const url = `https://www.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
      `Cita de Tatuaje — ${artist.name}`
    )}&dates=${formatDate(start)}/${formatDate(end)}&details=${encodeURIComponent(
      `Estilo: ${data.style}\nTamaño: ${data.sizeWidth}×${data.sizeHeight}cm\nEstudio: ${artist.studio.name}`
    )}&location=${encodeURIComponent(artist.studio.address + ", " + artist.studio.city)}`;

    window.open(url, "_blank");
    toast({ title: "Google Calendar", description: "Se abrió Google Calendar para agregar el evento." });
  };

  const handleAppleCalendar = () => {
    if (!data.selectedDate) return;
    const start = new Date(data.selectedDate);
    const [h, m] = data.selectedTime.split(":").map(Number);
    start.setHours(h, m, 0);
    const end = new Date(start);
    end.setHours(start.getHours() + data.estimatedHours);

    const pad = (n: number) => n.toString().padStart(2, "0");
    const formatICS = (d: Date) =>
      `${d.getFullYear()}${pad(d.getMonth() + 1)}${pad(d.getDate())}T${pad(d.getHours())}${pad(d.getMinutes())}00`;

    const ics = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "BEGIN:VEVENT",
      `DTSTART:${formatICS(start)}`,
      `DTEND:${formatICS(end)}`,
      `SUMMARY:Cita de Tatuaje — ${artist.name}`,
      `DESCRIPTION:Estilo: ${data.style}\\nTamaño: ${data.sizeWidth}×${data.sizeHeight}cm`,
      `LOCATION:${artist.studio.address}, ${artist.studio.city}`,
      "END:VEVENT",
      "END:VCALENDAR",
    ].join("\r\n");

    const blob = new Blob([ics], { type: "text/calendar" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "cita-tatuaje.ics";
    a.click();
    URL.revokeObjectURL(url);
    toast({ title: "Apple Calendar", description: "Se descargó el archivo .ics para agregar a tu calendario." });
  };

  return (
    <div className="space-y-5">
      <div className="text-center py-2">
        <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
          <CalendarIcon className="w-7 h-7 text-primary" />
        </div>
        <h3 className="text-lg font-bold text-foreground">Sincronizar Calendario</h3>
        <p className="text-sm text-muted-foreground">Agrega tu cita a tu calendario favorito</p>
      </div>

      {/* Event summary */}
      <div className="rounded-xl bg-secondary/50 border border-border p-5 space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Fecha</span>
          <span className="text-sm font-semibold text-foreground capitalize">{dateStr}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Hora</span>
          <span className="text-sm font-semibold text-foreground">{data.selectedTime} hrs</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Duración estimada</span>
          <span className="text-sm font-semibold text-foreground">~{data.estimatedHours}h</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Estudio</span>
          <span className="text-sm font-semibold text-foreground">{artist.studio.name}</span>
        </div>
      </div>

      {/* Calendar sync buttons */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <button
          onClick={handleGoogleCalendar}
          className="flex items-center gap-3 p-4 rounded-xl border border-border bg-secondary/30 hover:bg-secondary/60 transition-colors text-left"
        >
          <div className="w-10 h-10 rounded-lg bg-[hsl(var(--primary)/0.1)] flex items-center justify-center">
            <CalendarIcon className="w-5 h-5 text-primary" />
          </div>
          <div>
            <p className="text-sm font-semibold text-foreground">Google Calendar</p>
            <p className="text-xs text-muted-foreground">Agregar evento automáticamente</p>
          </div>
        </button>

        <button
          onClick={handleAppleCalendar}
          className="flex items-center gap-3 p-4 rounded-xl border border-border bg-secondary/30 hover:bg-secondary/60 transition-colors text-left"
        >
          <div className="w-10 h-10 rounded-lg bg-[hsl(var(--primary)/0.1)] flex items-center justify-center">
            <Smartphone className="w-5 h-5 text-primary" />
          </div>
          <div>
            <p className="text-sm font-semibold text-foreground">Apple Calendar</p>
            <p className="text-xs text-muted-foreground">Descargar archivo .ics</p>
          </div>
        </button>
      </div>

      {/* Email notification */}
      <div className="flex items-center gap-2 p-3 rounded-lg bg-muted/50 text-sm text-muted-foreground">
        <Mail className="w-4 h-4 text-primary flex-shrink-0" />
        <span>Recibirás confirmación por email y notificaciones ante cualquier cambio de fecha/hora.</span>
      </div>

      <div className="flex gap-3">
        <Button variant="outline" onClick={onBack} className="flex-1">Atrás</Button>
        <Button onClick={onNext} className="flex-1">Finalizar</Button>
      </div>
    </div>
  );
};

export default BookingStep5Calendar;
