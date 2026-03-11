import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CreditCard, Lock, ShieldCheck } from "lucide-react";
import type { Artist } from "@/data/artists";
import type { BookingData } from "./BookingFlow";

interface Props {
  data: BookingData;
  artist: Artist;
  onNext: () => void;
  onBack: () => void;
}

const BookingStep3Payment = ({ data, artist, onNext, onBack }: Props) => {
  const [processing, setProcessing] = useState(false);
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvc, setCvc] = useState("");
  const [name, setName] = useState("");

  const formatCard = (value: string) => {
    const v = value.replace(/\D/g, "").slice(0, 16);
    return v.replace(/(\d{4})(?=\d)/g, "$1 ");
  };

  const formatExpiry = (value: string) => {
    const v = value.replace(/\D/g, "").slice(0, 4);
    if (v.length >= 3) return v.slice(0, 2) + "/" + v.slice(2);
    return v;
  };

  const handlePay = () => {
    setProcessing(true);
    // Simulated payment
    setTimeout(() => {
      setProcessing(false);
      onNext();
    }, 2000);
  };

  const isValid = cardNumber.replace(/\s/g, "").length === 16 && expiry.length === 5 && cvc.length >= 3 && name.length > 0;

  return (
    <div className="space-y-5">
      <div className="text-center py-2">
        <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
          <CreditCard className="w-7 h-7 text-primary" />
        </div>
        <h3 className="text-lg font-bold text-foreground">Pago de Depósito</h3>
        <p className="text-2xl font-extrabold text-primary mt-1">
          ${data.depositAmount.toLocaleString()} {artist.priceRange.currency}
        </p>
      </div>

      <div className="rounded-xl bg-secondary/50 border border-border p-5 space-y-4">
        <div className="space-y-2">
          <Label className="text-foreground">Nombre en la tarjeta</Label>
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Nombre completo"
            className="bg-background border-border"
          />
        </div>

        <div className="space-y-2">
          <Label className="text-foreground">Número de tarjeta</Label>
          <div className="relative">
            <Input
              value={cardNumber}
              onChange={(e) => setCardNumber(formatCard(e.target.value))}
              placeholder="1234 5678 9012 3456"
              className="bg-background border-border pl-10"
            />
            <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-2">
            <Label className="text-foreground">Expiración</Label>
            <Input
              value={expiry}
              onChange={(e) => setExpiry(formatExpiry(e.target.value))}
              placeholder="MM/YY"
              className="bg-background border-border"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-foreground">CVC</Label>
            <Input
              value={cvc}
              onChange={(e) => setCvc(e.target.value.replace(/\D/g, "").slice(0, 4))}
              placeholder="123"
              className="bg-background border-border"
            />
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2 text-xs text-muted-foreground justify-center">
        <Lock className="w-3.5 h-3.5" />
        <span>Pago seguro encriptado</span>
        <ShieldCheck className="w-3.5 h-3.5 text-green-400 ml-2" />
        <span>SSL protegido</span>
      </div>

      <div className="flex gap-3">
        <Button variant="outline" onClick={onBack} className="flex-1" disabled={processing}>
          Atrás
        </Button>
        <Button onClick={handlePay} disabled={!isValid || processing} className="flex-1">
          {processing ? (
            <span className="flex items-center gap-2">
              <span className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
              Procesando...
            </span>
          ) : (
            `Pagar $${data.depositAmount.toLocaleString()}`
          )}
        </Button>
      </div>
    </div>
  );
};

export default BookingStep3Payment;
