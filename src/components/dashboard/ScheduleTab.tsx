import { useState, useMemo } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Calendar } from "@/components/ui/calendar";
import { useBookingRequests } from "@/hooks/useBookingRequests";
import { Plus, Trash2, CalendarDays, ArrowRightLeft } from "lucide-react";
import { format, parse } from "date-fns";
import { es } from "date-fns/locale";

interface TimeSlot {
  date: string; // YYYY-MM-DD
  times: string[]; // ["10:00","14:00"]
}

const STORAGE_KEY = "tatts_artist_availability";

function loadSlots(): TimeSlot[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveSlots(slots: TimeSlot[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(slots));
}

export default function ScheduleTab() {
  const { requests, updateRequest } = useBookingRequests();
  const [slots, setSlots] = useState<TimeSlot[]>(loadSlots);

  // Add availability
  const [addDate, setAddDate] = useState<Date | undefined>();
  const [addTime, setAddTime] = useState("");

  // Reschedule
  const [rescheduleOpen, setRescheduleOpen] = useState(false);
  const [rescheduleDate, setRescheduleDate] = useState<Date | undefined>();
  const [rescheduleTime, setRescheduleTime] = useState("");
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const scheduledRequests = useMemo(
    () => requests.filter((r) => r.status === "scheduled" || r.status === "confirmed"),
    [requests]
  );

  const addSlot = () => {
    if (!addDate || !addTime.trim()) return;
    const dateStr = format(addDate, "yyyy-MM-dd");
    const updated = [...slots];
    const existing = updated.find((s) => s.date === dateStr);
    if (existing) {
      if (!existing.times.includes(addTime)) existing.times.push(addTime);
    } else {
      updated.push({ date: dateStr, times: [addTime] });
    }
    updated.sort((a, b) => a.date.localeCompare(b.date));
    setSlots(updated);
    saveSlots(updated);
    setAddTime("");
  };

  const removeSlot = (date: string, time: string) => {
    const updated = slots
      .map((s) => (s.date === date ? { ...s, times: s.times.filter((t) => t !== time) } : s))
      .filter((s) => s.times.length > 0);
    setSlots(updated);
    saveSlots(updated);
  };

  const toggleSelect = (id: string) => {
    setSelectedIds((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  };

  const handleReschedule = () => {
    if (!rescheduleDate || !rescheduleTime || selectedIds.length === 0) return;
    const dateStr = format(rescheduleDate, "yyyy-MM-dd");
    selectedIds.forEach((id) => {
      updateRequest(id, { selectedDate: dateStr, selectedTime: rescheduleTime });
    });
    setRescheduleOpen(false);
    setSelectedIds([]);
    setRescheduleDate(undefined);
    setRescheduleTime("");
  };

  return (
    <div className="space-y-6">
      {/* Availability */}
      <Card className="border-border bg-card">
        <CardHeader>
          <CardTitle className="text-foreground">Disponibilidad</CardTitle>
          <CardDescription>Agrega fechas y horarios en los que puedes atender</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="space-y-2">
              <Label>Fecha</Label>
              <Calendar
                mode="single"
                selected={addDate}
                onSelect={setAddDate}
                locale={es}
                className="rounded-md border border-border"
                disabled={(d) => d < new Date(new Date().toDateString())}
              />
            </div>
            <div className="space-y-2 flex-1">
              <Label>Hora</Label>
              <div className="flex gap-2">
                <Input
                  type="time"
                  value={addTime}
                  onChange={(e) => setAddTime(e.target.value)}
                  className="w-auto"
                />
                <Button onClick={addSlot} size="sm" disabled={!addDate || !addTime}>
                  <Plus className="h-4 w-4 mr-1" /> Agregar
                </Button>
              </div>

              {slots.length > 0 && (
                <div className="mt-4 space-y-2 max-h-60 overflow-y-auto">
                  {slots.map((slot) => (
                    <div key={slot.date} className="space-y-1">
                      <p className="text-xs font-semibold text-foreground">
                        {format(new Date(slot.date + "T12:00:00"), "EEEE d MMM", { locale: es })}
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {slot.times.map((t) => (
                          <Badge key={t} variant="secondary" className="gap-1 pr-1">
                            {t}
                            <button onClick={() => removeSlot(slot.date, t)} className="ml-0.5 hover:text-destructive">
                              <Trash2 className="h-3 w-3" />
                            </button>
                          </Badge>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Scheduled appointments with reschedule */}
      <Card className="border-border bg-card">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-foreground">Citas Agendadas</CardTitle>
            <CardDescription>Reagenda citas individuales o masivamente</CardDescription>
          </div>
          {selectedIds.length > 0 && (
            <Button size="sm" variant="outline" onClick={() => setRescheduleOpen(true)}>
              <ArrowRightLeft className="h-4 w-4 mr-1" /> Reagendar ({selectedIds.length})
            </Button>
          )}
        </CardHeader>
        <CardContent>
          {scheduledRequests.length === 0 ? (
            <p className="text-muted-foreground text-center py-8 text-sm">No hay citas agendadas</p>
          ) : (
            <div className="space-y-2">
              {scheduledRequests.map((req) => (
                <div key={req.id} className="flex items-center gap-3 p-3 rounded-lg bg-secondary/50 border border-border">
                  <Checkbox
                    checked={selectedIds.includes(req.id)}
                    onCheckedChange={() => toggleSelect(req.id)}
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">{req.artistName}</p>
                    <p className="text-xs text-muted-foreground">{req.style} · {req.sizeWidth}×{req.sizeHeight} cm</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-foreground">{req.selectedDate}</p>
                    <p className="text-xs text-muted-foreground">{req.selectedTime}</p>
                  </div>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => { setSelectedIds([req.id]); setRescheduleOpen(true); }}
                  >
                    <CalendarDays className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Reschedule Dialog */}
      <Dialog open={rescheduleOpen} onOpenChange={setRescheduleOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Reagendar {selectedIds.length > 1 ? `${selectedIds.length} citas` : "cita"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Nueva fecha</Label>
              <Calendar
                mode="single"
                selected={rescheduleDate}
                onSelect={setRescheduleDate}
                locale={es}
                className="rounded-md border border-border"
                disabled={(d) => d < new Date(new Date().toDateString())}
              />
            </div>
            <div className="space-y-2">
              <Label>Nueva hora</Label>
              <Input type="time" value={rescheduleTime} onChange={(e) => setRescheduleTime(e.target.value)} />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setRescheduleOpen(false)}>Cancelar</Button>
            <Button onClick={handleReschedule} disabled={!rescheduleDate || !rescheduleTime}>Confirmar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
