import { useState } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Clock, CheckCircle, XCircle, DollarSign, CalendarDays,
  FileText, MessageCircle, MapPin, Ruler, Palette, StickyNote,
} from "lucide-react";
import type { BookingRequest, BookingStatus } from "@/hooks/useBookingRequests";
import { getArtistBySlug } from "@/data/artists";
import BookingChatDialog from "./BookingChatDialog";

const STATUS_CONFIG: Record<BookingStatus, { label: string; icon: typeof Clock; color: string }> = {
  pending: { label: "Esperando cotización", icon: Clock, color: "bg-yellow-500/10 text-yellow-500" },
  quoted: { label: "Cotización recibida", icon: FileText, color: "bg-primary/10 text-primary" },
  accepted: { label: "Cotización aceptada", icon: CheckCircle, color: "bg-blue-500/10 text-blue-500" },
  paid: { label: "Depósito pagado", icon: DollarSign, color: "bg-green-500/10 text-green-500" },
  scheduled: { label: "Cita agendada", icon: CalendarDays, color: "bg-green-500/10 text-green-500" },
  confirmed: { label: "Confirmada", icon: CheckCircle, color: "bg-green-500/10 text-green-500" },
  cancelled: { label: "Cancelada", icon: XCircle, color: "bg-destructive/10 text-destructive" },
};

interface Props {
  request: BookingRequest;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const BookingDetailDialog = ({ request, open, onOpenChange }: Props) => {
  const [chatOpen, setChatOpen] = useState(false);
  const artist = getArtistBySlug(request.artistSlug);
  const config = STATUS_CONFIG[request.status];
  const StatusIcon = config.icon;

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto p-0 gap-0 bg-background border-border">
          <DialogTitle className="sr-only">Detalle de cita con {request.artistName}</DialogTitle>

          {/* Header with artist info */}
          <div className="p-6 pb-4">
            <div className="flex items-center gap-4 mb-4">
              <img
                src={request.artistImage}
                alt={request.artistName}
                className="w-16 h-16 rounded-full object-cover ring-2 ring-primary/30"
              />
              <div className="flex-1">
                <h2 className="text-xl font-bold text-foreground">{request.artistName}</h2>
                {artist && (
                  <p className="text-sm text-muted-foreground flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5" />
                    {artist.city}
                  </p>
                )}
                <p className="text-xs text-muted-foreground mt-0.5">
                  Solicitado el {new Date(request.createdAt).toLocaleDateString("es-MX", {
                    day: "numeric", month: "long", year: "numeric",
                  })}
                </p>
              </div>
            </div>

            <Badge variant="secondary" className={`${config.color} text-sm px-3 py-1`}>
              <StatusIcon className="w-4 h-4 mr-1.5" />
              {config.label}
            </Badge>
          </div>

          <Separator />

          {/* Request details */}
          <div className="p-6 space-y-5">
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
              Detalles de la solicitud
            </h3>

            <div className="grid grid-cols-2 gap-4">
              <DetailItem icon={Palette} label="Estilo" value={request.style} />
              <DetailItem
                icon={Ruler}
                label="Tamaño"
                value={`${request.sizeWidth} × ${request.sizeHeight} cm`}
              />
              <DetailItem
                icon={FileText}
                label="Tipo de idea"
                value={request.ideaType === "general" ? "General" : "Específica"}
              />
              {request.estimatedHours && (
                <DetailItem icon={Clock} label="Tiempo estimado" value={`~${request.estimatedHours} horas`} />
              )}
            </div>

            {request.description && (
              <div className="space-y-1.5">
                <div className="flex items-center gap-1.5 text-muted-foreground">
                  <StickyNote className="w-3.5 h-3.5" />
                  <span className="text-xs font-medium">Descripción</span>
                </div>
                <p className="text-sm text-foreground bg-secondary/50 rounded-lg p-3">
                  {request.description}
                </p>
              </div>
            )}

            {/* Quote section */}
            {request.quoteAmount && (
              <>
                <Separator />
                <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                  Cotización
                </h3>
                <div className="rounded-lg bg-primary/5 border border-primary/20 p-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Costo total</span>
                    <span className="text-lg font-extrabold text-foreground">
                      ${request.quoteAmount.toLocaleString()} MXN
                    </span>
                  </div>
                  {request.depositAmount && (
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Depósito (30%)</span>
                      <span className="text-sm font-bold text-primary">
                        ${request.depositAmount.toLocaleString()} MXN
                      </span>
                    </div>
                  )}
                  {request.quoteNotes && (
                    <p className="text-xs text-muted-foreground italic pt-1">"{request.quoteNotes}"</p>
                  )}
                </div>
              </>
            )}

            {/* Scheduled date */}
            {request.selectedDate && (
              <>
                <Separator />
                <div className="flex items-center gap-3 p-3 rounded-lg bg-green-500/5 border border-green-500/20">
                  <CalendarDays className="w-5 h-5 text-green-500" />
                  <div>
                    <p className="text-sm font-semibold text-foreground">
                      {new Date(request.selectedDate).toLocaleDateString("es-MX", {
                        weekday: "long", day: "numeric", month: "long",
                      })} — {request.selectedTime} hrs
                    </p>
                    <p className="text-xs text-muted-foreground">Cita agendada</p>
                  </div>
                </div>
              </>
            )}

            {/* Contact button */}
            {request.status !== "cancelled" && (
              <>
                <Separator />
                <Button
                  className="w-full gap-2"
                  onClick={() => setChatOpen(true)}
                >
                  <MessageCircle className="w-4 h-4" />
                  Contactar al Tatuador
                </Button>
              </>
            )}
          </div>
        </DialogContent>
      </Dialog>

      <BookingChatDialog
        request={request}
        open={chatOpen}
        onOpenChange={setChatOpen}
      />
    </>
  );
};

const DetailItem = ({ icon: Icon, label, value }: { icon: typeof Clock; label: string; value: string }) => (
  <div className="space-y-1">
    <div className="flex items-center gap-1.5 text-muted-foreground">
      <Icon className="w-3.5 h-3.5" />
      <span className="text-xs font-medium">{label}</span>
    </div>
    <p className="text-sm font-semibold text-foreground">{value}</p>
  </div>
);

export default BookingDetailDialog;
