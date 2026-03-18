import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { useBookingRequests, type BookingRequest, type BookingStatus } from "@/hooks/useBookingRequests";
import { Clock, CheckCircle, XCircle, DollarSign, CalendarDays, FileText, AlertCircle, ArrowLeft, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import BookingContinueFlow from "@/components/booking/BookingContinueFlow";
import BookingDetailDialog from "@/components/booking/BookingDetailDialog";

const STATUS_CONFIG: Record<BookingStatus, { label: string; icon: typeof Clock; color: string }> = {
  pending: { label: "Esperando cotización", icon: Clock, color: "bg-yellow-500/10 text-yellow-500" },
  quoted: { label: "Cotización recibida", icon: FileText, color: "bg-primary/10 text-primary" },
  accepted: { label: "Cotización aceptada", icon: CheckCircle, color: "bg-blue-500/10 text-blue-500" },
  paid: { label: "Depósito pagado", icon: DollarSign, color: "bg-green-500/10 text-green-500" },
  scheduled: { label: "Cita agendada", icon: CalendarDays, color: "bg-green-500/10 text-green-500" },
  confirmed: { label: "Confirmada", icon: CheckCircle, color: "bg-green-500/10 text-green-500" },
  cancelled: { label: "Cancelada", icon: XCircle, color: "bg-destructive/10 text-destructive" },
};

const MisCitas = () => {
  const navigate = useNavigate();
  const { requests, updateRequest, cancelRequest, refresh } = useBookingRequests();
  const [cancelId, setCancelId] = useState<string | null>(null);
  const [continueRequest, setContinueRequest] = useState<BookingRequest | null>(null);
  const [detailRequest, setDetailRequest] = useState<BookingRequest | null>(null);

  const handleAcceptQuote = (req: BookingRequest) => {
    updateRequest(req.id, { status: "accepted" });
    setContinueRequest({ ...req, status: "accepted" });
  };

  const handleContinueFlow = (req: BookingRequest) => {
    setContinueRequest(req);
  };

  const handleFlowComplete = (id: string, updates: Partial<BookingRequest>) => {
    updateRequest(id, updates);
    setContinueRequest(null);
    refresh();
  };

  const handleCancel = () => {
    if (cancelId) {
      cancelRequest(cancelId);
      setCancelId(null);
    }
  };

  const activeRequests = requests.filter((r) => r.status !== "cancelled");
  const cancelledRequests = requests.filter((r) => r.status === "cancelled");

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-24 pb-16 px-4 max-w-3xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-foreground">Mis Citas</h1>
            <p className="text-sm text-muted-foreground">Gestiona tus solicitudes y citas de tatuaje</p>
          </div>
        </div>

        {requests.length === 0 ? (
          <div className="text-center py-20">
            <CalendarDays className="w-12 h-12 text-muted-foreground/40 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-1">Sin solicitudes</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Aún no has enviado ninguna solicitud de tatuaje
            </p>
            <Button onClick={() => navigate("/")}>Explorar Tatuadores</Button>
          </div>
        ) : (
          <div className="space-y-4">
            {activeRequests.map((req) => {
              const config = STATUS_CONFIG[req.status];
              const Icon = config.icon;
              return (
                <div
                  key={req.id}
                  className="rounded-xl border border-border bg-secondary/30 p-5 space-y-4 cursor-pointer hover:border-primary/30 transition-colors"
                  onClick={() => setDetailRequest(req)}
                >
                  {/* Header */}
                  <div className="flex items-start gap-4">
                    <img
                      src={req.artistImage}
                      alt={req.artistName}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2 flex-wrap">
                        <h3 className="font-bold text-foreground">
                          {req.artistName}
                        </h3>
                        <Badge variant="secondary" className={config.color}>
                          <Icon className="w-3.5 h-3.5 mr-1" />
                          {config.label}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {new Date(req.createdAt).toLocaleDateString("es-MX", {
                          day: "numeric", month: "long", year: "numeric",
                        })}
                      </p>
                    </div>
                  </div>

                  {/* Request details */}
                  <div className="grid grid-cols-3 gap-3 text-sm">
                    <div>
                      <span className="text-muted-foreground text-xs">Estilo</span>
                      <p className="font-medium text-foreground">{req.style}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground text-xs">Tamaño</span>
                      <p className="font-medium text-foreground">{req.sizeWidth}×{req.sizeHeight} cm</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground text-xs">Tipo</span>
                      <p className="font-medium text-foreground capitalize">{req.ideaType === "general" ? "General" : "Específica"}</p>
                    </div>
                  </div>

                  {/* Pending indicator */}
                  {req.status === "pending" && (
                    <div className="flex items-center gap-2 p-3 rounded-lg bg-yellow-500/5 border border-yellow-500/20">
                      <div className="w-4 h-4 border-2 border-yellow-500/30 border-t-yellow-500 rounded-full animate-spin" />
                      <span className="text-sm text-yellow-500">El tatuador está revisando tu solicitud...</span>
                    </div>
                  )}

                  {/* Quote received */}
                  {req.status === "quoted" && req.quoteAmount && (
                    <div
                      className="rounded-lg bg-primary/5 border border-primary/20 p-4 space-y-3"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <div className="flex items-center gap-2">
                        <AlertCircle className="w-4 h-4 text-primary" />
                        <span className="text-sm font-semibold text-primary">¡Cotización lista!</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Costo total</span>
                        <span className="text-lg font-extrabold text-foreground">
                          ${req.quoteAmount.toLocaleString()} MXN
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Depósito requerido (30%)</span>
                        <span className="text-sm font-bold text-primary">
                          ${req.depositAmount?.toLocaleString()} MXN
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Tiempo estimado</span>
                        <span className="text-sm font-semibold text-foreground">~{req.estimatedHours}h</span>
                      </div>
                      {req.quoteNotes && (
                        <p className="text-xs text-muted-foreground italic">"{req.quoteNotes}"</p>
                      )}
                      <div className="flex gap-3 pt-1">
                        <Button variant="outline" size="sm" className="flex-1" onClick={() => setCancelId(req.id)}>
                          Rechazar
                        </Button>
                        <Button size="sm" className="flex-1" onClick={() => handleAcceptQuote(req)}>
                          Aceptar y Pagar
                        </Button>
                      </div>
                    </div>
                  )}

                  {/* Accepted / Paid — continue flow */}
                  {(req.status === "accepted" || req.status === "paid") && (
                    <Button
                      size="sm"
                      onClick={(e) => { e.stopPropagation(); handleContinueFlow(req); }}
                      className="w-full"
                    >
                      {req.status === "accepted" ? "Continuar al Pago" : "Agendar Cita"}
                    </Button>
                  )}

                  {/* Scheduled / Confirmed */}
                  {(req.status === "scheduled" || req.status === "confirmed") && req.selectedDate && (
                    <div className="flex items-center gap-3 p-3 rounded-lg bg-green-500/5 border border-green-500/20">
                      <CalendarDays className="w-5 h-5 text-green-500" />
                      <div>
                        <p className="text-sm font-semibold text-foreground">
                          {new Date(req.selectedDate).toLocaleDateString("es-MX", {
                            weekday: "long", day: "numeric", month: "long",
                          })} — {req.selectedTime} hrs
                        </p>
                        <p className="text-xs text-muted-foreground">Cita confirmada</p>
                      </div>
                    </div>
                  )}

                  {/* View details hint */}
                  <div className="flex items-center justify-center gap-1.5 text-xs text-muted-foreground pt-1">
                    <Eye className="w-3.5 h-3.5" />
                    Toca para ver detalles y contactar
                  </div>

                  {/* Cancel button for non-terminal states */}
                  {!["cancelled", "confirmed", "scheduled"].includes(req.status) && req.status !== "quoted" && (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-destructive hover:text-destructive"
                      onClick={(e) => { e.stopPropagation(); setCancelId(req.id); }}
                    >
                      Cancelar solicitud
                    </Button>
                  )}
                </div>
              );
            })}

            {/* Cancelled requests */}
            {cancelledRequests.length > 0 && (
              <div className="mt-8">
                <h3 className="text-sm font-semibold text-muted-foreground mb-3">Canceladas</h3>
                {cancelledRequests.map((req) => (
                  <div key={req.id} className="rounded-xl border border-border/50 bg-muted/20 p-4 opacity-60 mb-2">
                    <div className="flex items-center gap-3">
                      <img src={req.artistImage} alt={req.artistName} className="w-8 h-8 rounded-full object-cover grayscale" />
                      <div>
                        <p className="text-sm font-medium text-foreground">{req.artistName}</p>
                        <p className="text-xs text-muted-foreground">{req.style} • {req.sizeWidth}×{req.sizeHeight} cm</p>
                      </div>
                      <Badge variant="secondary" className="ml-auto bg-destructive/10 text-destructive">Cancelada</Badge>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Cancel confirmation */}
      <AlertDialog open={!!cancelId} onOpenChange={() => setCancelId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Cancelar solicitud?</AlertDialogTitle>
            <AlertDialogDescription>Esta acción no se puede deshacer. La solicitud será cancelada permanentemente.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>No, mantener</AlertDialogCancel>
            <AlertDialogAction onClick={handleCancel}>Sí, cancelar</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Continue flow dialog */}
      {continueRequest && (
        <BookingContinueFlow
          request={continueRequest}
          open={!!continueRequest}
          onOpenChange={(open) => !open && setContinueRequest(null)}
          onComplete={handleFlowComplete}
        />
      )}

      {/* Detail dialog */}
      {detailRequest && (
        <BookingDetailDialog
          request={detailRequest}
          open={!!detailRequest}
          onOpenChange={(open) => !open && setDetailRequest(null)}
        />
      )}
    </div>
  );
};

export default MisCitas;
