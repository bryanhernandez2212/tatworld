import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { CalendarDays } from "lucide-react";
import type { Artist } from "@/data/artists";
import type { BookingData } from "./BookingFlow";

interface Props {
  data: BookingData;
  updateData: (d: Partial<BookingData>) => void;
  artist: Artist;
  onNext: () => void;
  onBack: () => void;
}

const TIME_SLOTS = [
  "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00",
];

const BookingStep4Schedule = ({ data, updateData, onNext, onBack }: Props) => {
  const [date, setDate] = useState<Date | undefined>(data.selectedDate || undefined);

  const handleDateSelect = (d: Date | undefined) => {
    setDate(d);
    updateData({ selectedDate: d || null, selectedTime: "" });
  };

  const handleTimeSelect = (t: string) => {
    updateData({ selectedTime: t });
  };

  // Disable past dates and weekends (simulated availability)
  const disabledDays = [
    { before: new Date() },
    { dayOfWeek: [0] }, // Sundays
  ];

  const isValid = data.selectedDate && data.selectedTime;

  return (
    <div className="space-y-5">
      <div className="text-center py-2">
        <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
          <CalendarDays className="w-7 h-7 text-primary" />
        </div>
        <h3 className="text-lg font-bold text-foreground">Selecciona Fecha y Hora</h3>
        <p className="text-sm text-muted-foreground">Pago validado ✓ — Elige tu cita</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 flex justify-center">
          <Calendar
            mode="single"
            selected={date}
            onSelect={handleDateSelect}
            disabled={disabledDays as any}
            className="rounded-xl border border-border bg-secondary/30 p-3 pointer-events-auto"
          />
        </div>

        {date && (
          <div className="flex-1">
            <p className="text-sm font-semibold text-foreground mb-3">
              Horarios disponibles — {date.toLocaleDateString("es-MX", { weekday: "long", day: "numeric", month: "long" })}
            </p>
            <div className="grid grid-cols-3 gap-2">
              {TIME_SLOTS.map((t) => {
                // Simulate some slots as unavailable
                const unavailable = ["13:00", "16:00"].includes(t);
                return (
                  <button
                    key={t}
                    disabled={unavailable}
                    onClick={() => handleTimeSelect(t)}
                    className={`py-2.5 rounded-lg text-sm font-medium transition-colors ${
                      data.selectedTime === t
                        ? "bg-primary text-primary-foreground"
                        : unavailable
                        ? "bg-muted/30 text-muted-foreground/40 cursor-not-allowed line-through"
                        : "bg-secondary/50 border border-border text-foreground hover:bg-secondary hover:border-primary/50"
                    }`}
                  >
                    {t}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>

      <div className="flex gap-3">
        <Button variant="outline" onClick={onBack} className="flex-1">Atrás</Button>
        <Button onClick={onNext} disabled={!isValid} className="flex-1">Confirmar Cita</Button>
      </div>
    </div>
  );
};

export default BookingStep4Schedule;
