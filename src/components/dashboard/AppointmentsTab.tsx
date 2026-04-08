import { useState, useMemo } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { useBookingRequests, type BookingRequest } from "@/hooks/useBookingRequests";
import { Check, X, MessageSquare } from "lucide-react";

type QuoteForm = {
  details: string;
  price: number;
  depositPercent: number;
  instructions: string;
};

const emptyQuote: QuoteForm = { details: "", price: 0, depositPercent: 30, instructions: "" };

const statusLabel: Record<string, string> = {
  pending: "Pendiente",
  quoted: "Cotizada",
  accepted: "Aceptada",
  paid: "Pagada",
  scheduled: "Agendada",
  confirmed: "Confirmada",
  cancelled: "Cancelada",
};

const statusColors: Record<string, string> = {
  pending: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
  quoted: "bg-blue-500/20 text-blue-400 border-blue-500/30",
  accepted: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
  paid: "bg-primary/20 text-primary border-primary/30",
  scheduled: "bg-violet-500/20 text-violet-400 border-violet-500/30",
  confirmed: "bg-green-500/20 text-green-400 border-green-500/30",
  cancelled: "bg-destructive/20 text-destructive border-destructive/30",
};

export default function AppointmentsTab() {
  const { requests, updateRequest, cancelRequest, refresh } = useBookingRequests();
  const [quoteDialogId, setQuoteDialogId] = useState<string | null>(null);
  const [rejectDialogId, setRejectDialogId] = useState<string | null>(null);
  const [rejectMessage, setRejectMessage] = useState("");
  const [quoteForm, setQuoteForm] = useState<QuoteForm>(emptyQuote);

  // Show all requests (artist view would filter by artist slug; for demo show all)
  const sorted = useMemo(() => [...requests].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()), [requests]);

  const handleReject = () => {
    if (!rejectDialogId) return;
    updateRequest(rejectDialogId, {
      status: "cancelled",
      quoteNotes: rejectMessage || "Solicitud rechazada por el tatuador.",
    });
    setRejectDialogId(null);
    setRejectMessage("");
  };

  const handleQuote = () => {
    if (!quoteDialogId) return;
    updateRequest(quoteDialogId, {
      status: "quoted",
      quoteAmount: quoteForm.price,
      depositAmount: Math.round(quoteForm.price * (quoteForm.depositPercent / 100)),
      quoteNotes: `${quoteForm.details}\n\nIndicaciones: ${quoteForm.instructions}`,
    });
    setQuoteDialogId(null);
    setQuoteForm(emptyQuote);
  };

  const currentQuoteReq = sorted.find((r) => r.id === quoteDialogId);

  return (
    <>
      <Card className="border-border bg-card">
        <CardHeader>
          <CardTitle className="text-foreground">Solicitudes y Citas</CardTitle>
          <CardDescription>Gestiona las solicitudes de tus clientes</CardDescription>
        </CardHeader>
        <CardContent>
          {sorted.length === 0 ? (
            <p className="text-muted-foreground text-center py-8">No tienes solicitudes aún</p>
          ) : (
            <div className="space-y-3">
              {sorted.map((req) => (
                <div
                  key={req.id}
                  className="p-4 rounded-lg bg-secondary/50 border border-border space-y-2"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="space-y-1 min-w-0">
                      <p className="font-medium text-foreground truncate">{req.artistName}</p>
                      <p className="text-sm text-muted-foreground">
                        {req.style} · {req.sizeWidth}×{req.sizeHeight} cm
                      </p>
                      <p className="text-xs text-muted-foreground line-clamp-2">{req.description}</p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(req.createdAt).toLocaleDateString("es-MX", { day: "numeric", month: "short", year: "numeric" })}
                      </p>
                    </div>
                    <Badge variant="outline" className={statusColors[req.status] || ""}>
                      {statusLabel[req.status] || req.status}
                    </Badge>
                  </div>

                  {req.status === "pending" && (
                    <div className="flex gap-2 pt-1">
                      <Button size="sm" variant="destructive" onClick={() => setRejectDialogId(req.id)}>
                        <X className="h-3.5 w-3.5 mr-1" /> Rechazar
                      </Button>
                      <Button size="sm" onClick={() => { setQuoteDialogId(req.id); setQuoteForm(emptyQuote); }}>
                        <Check className="h-3.5 w-3.5 mr-1" /> Aceptar y Cotizar
                      </Button>
                    </div>
                  )}

                  {req.status !== "pending" && req.status !== "cancelled" && req.quoteAmount && (
                    <p className="text-xs text-primary font-semibold">Cotización: ${req.quoteAmount.toLocaleString()} MXN</p>
                  )}
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Reject Dialog */}
      <Dialog open={!!rejectDialogId} onOpenChange={() => setRejectDialogId(null)}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Rechazar Solicitud</DialogTitle>
          </DialogHeader>
          <div className="space-y-3">
            <Label>Mensaje al cliente (opcional)</Label>
            <Textarea
              value={rejectMessage}
              onChange={(e) => setRejectMessage(e.target.value)}
              placeholder="Ej: En este momento no tengo disponibilidad..."
              rows={3}
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setRejectDialogId(null)}>Cancelar</Button>
            <Button variant="destructive" onClick={handleReject}>Rechazar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Quote Dialog */}
      <Dialog open={!!quoteDialogId} onOpenChange={() => setQuoteDialogId(null)}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Aceptar y Cotizar</DialogTitle>
          </DialogHeader>
          {currentQuoteReq && (
            <div className="text-sm text-muted-foreground mb-2 p-3 rounded-md bg-secondary/50 border border-border">
              <p><span className="font-medium text-foreground">Estilo:</span> {currentQuoteReq.style}</p>
              <p><span className="font-medium text-foreground">Tamaño:</span> {currentQuoteReq.sizeWidth}×{currentQuoteReq.sizeHeight} cm</p>
              <p><span className="font-medium text-foreground">Descripción:</span> {currentQuoteReq.description}</p>
            </div>
          )}
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Detalles del tatuaje</Label>
              <Textarea
                value={quoteForm.details}
                onChange={(e) => setQuoteForm({ ...quoteForm, details: e.target.value })}
                placeholder="Detalles técnicos, colores, sesiones estimadas..."
                rows={3}
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <Label>Precio total (MXN)</Label>
                <Input
                  type="number"
                  value={quoteForm.price || ""}
                  onChange={(e) => setQuoteForm({ ...quoteForm, price: Number(e.target.value) })}
                  placeholder="5000"
                />
              </div>
              <div className="space-y-2">
                <Label>Anticipo (%)</Label>
                <Input
                  type="number"
                  value={quoteForm.depositPercent || ""}
                  onChange={(e) => setQuoteForm({ ...quoteForm, depositPercent: Number(e.target.value) })}
                  placeholder="30"
                  min={10}
                  max={100}
                />
              </div>
            </div>
            {quoteForm.price > 0 && (
              <p className="text-xs text-muted-foreground">
                Anticipo: <span className="font-semibold text-foreground">${Math.round(quoteForm.price * (quoteForm.depositPercent / 100)).toLocaleString()} MXN</span>
              </p>
            )}
            <div className="space-y-2">
              <Label>Indicaciones previas a la cita</Label>
              <Textarea
                value={quoteForm.instructions}
                onChange={(e) => setQuoteForm({ ...quoteForm, instructions: e.target.value })}
                placeholder="Ej: No tomar alcohol 24h antes, hidratar la zona..."
                rows={3}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setQuoteDialogId(null)}>Cancelar</Button>
            <Button onClick={handleQuote} disabled={quoteForm.price <= 0}>Enviar Cotización</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
