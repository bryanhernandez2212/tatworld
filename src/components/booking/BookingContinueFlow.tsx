/**
 * Continuation flow for accepted quotes: Payment → Schedule → Calendar → Confirmation
 */
import { useState } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import type { BookingRequest } from "@/hooks/useBookingRequests";
import { getArtistBySlug } from "@/data/artists";
import BookingStepIndicator from "./BookingStepIndicator";
import BookingStep3Payment from "./BookingStep3Payment";
import BookingStep4Schedule from "./BookingStep4Schedule";
import BookingStep5Calendar from "./BookingStep5Calendar";
import BookingStep6Confirmation from "./BookingStep6Confirmation";
import type { BookingData } from "./BookingFlow";

interface Props {
  request: BookingRequest;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onComplete: (id: string, updates: Partial<BookingRequest>) => void;
}

const STEPS = ["Depósito", "Agendar", "Calendario", "Confirmación"];

const BookingContinueFlow = ({ request, open, onOpenChange, onComplete }: Props) => {
  const artist = getArtistBySlug(request.artistSlug);
  
  const getInitialStep = () => {
    if (request.status === "accepted") return 1; // Payment
    if (request.status === "paid") return 2; // Schedule
    return 1;
  };

  const [step, setStep] = useState(getInitialStep);
  const [data, setData] = useState<BookingData>({
    referencePhotos: [],
    bodyZonePhoto: null,
    style: request.style,
    ideaType: request.ideaType,
    description: request.description,
    sizeWidth: request.sizeWidth,
    sizeHeight: request.sizeHeight,
    additionalRefs: [],
    quoteAmount: request.quoteAmount || 0,
    depositAmount: request.depositAmount || 0,
    estimatedHours: request.estimatedHours || 0,
    quoteNotes: request.quoteNotes || "",
    selectedDate: request.selectedDate ? new Date(request.selectedDate) : null,
    selectedTime: request.selectedTime || "",
  });

  const updateData = (partial: Partial<BookingData>) =>
    setData((prev) => ({ ...prev, ...partial }));

  const next = () => {
    if (step === 1) {
      // Payment done
      onComplete(request.id, { status: "paid" });
      setStep(2);
    } else if (step === 2) {
      // Scheduled
      onComplete(request.id, {
        status: "scheduled",
        selectedDate: data.selectedDate?.toISOString(),
        selectedTime: data.selectedTime,
      });
      setStep(3);
    } else if (step === 3) {
      // Calendar synced
      onComplete(request.id, { status: "confirmed" });
      setStep(4);
    }
  };

  const back = () => setStep((s) => Math.max(s - 1, 1));

  if (!artist) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto p-0 gap-0 bg-background border-border">
        <DialogTitle className="sr-only">Continuar Cita con {artist.name}</DialogTitle>
        <div className="p-6 pb-0">
          <h2 className="text-lg font-bold text-foreground mb-1">
            Continuar Cita con {artist.name}
          </h2>
          <BookingStepIndicator steps={STEPS} current={step} />
        </div>

        <div className="p-6">
          {step === 1 && (
            <BookingStep3Payment
              data={data}
              artist={artist}
              onNext={next}
              onBack={() => onOpenChange(false)}
            />
          )}
          {step === 2 && (
            <BookingStep4Schedule
              data={data}
              updateData={updateData}
              artist={artist}
              onNext={next}
              onBack={back}
            />
          )}
          {step === 3 && (
            <BookingStep5Calendar
              data={data}
              artist={artist}
              onNext={next}
              onBack={back}
            />
          )}
          {step === 4 && (
            <BookingStep6Confirmation
              data={data}
              artist={artist}
              onClose={() => onOpenChange(false)}
            />
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BookingContinueFlow;
