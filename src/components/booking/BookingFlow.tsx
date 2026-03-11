import { useState } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import type { Artist } from "@/data/artists";
import BookingStepIndicator from "./BookingStepIndicator";
import BookingStep1Request from "./BookingStep1Request";
import BookingStep2Quote from "./BookingStep2Quote";
import BookingStep3Payment from "./BookingStep3Payment";
import BookingStep4Schedule from "./BookingStep4Schedule";
import BookingStep5Calendar from "./BookingStep5Calendar";
import BookingStep6Confirmation from "./BookingStep6Confirmation";

interface Props {
  artist: Artist;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export interface BookingData {
  referencePhotos: File[];
  bodyZonePhoto: File | null;
  style: string;
  ideaType: "general" | "specific";
  description: string;
  sizeWidth: number;
  sizeHeight: number;
  additionalRefs: File[];
  // Quote
  quoteAmount: number;
  depositAmount: number;
  estimatedHours: number;
  quoteNotes: string;
  // Schedule
  selectedDate: Date | null;
  selectedTime: string;
}

const STEPS = [
  "Solicitud",
  "Cotización",
  "Depósito",
  "Agendar",
  "Calendario",
  "Confirmación",
];

const BookingFlow = ({ artist, open, onOpenChange }: Props) => {
  const [step, setStep] = useState(1);
  const [data, setData] = useState<BookingData>({
    referencePhotos: [],
    bodyZonePhoto: null,
    style: artist.styles[0] || "",
    ideaType: "general",
    description: "",
    sizeWidth: 10,
    sizeHeight: 10,
    additionalRefs: [],
    quoteAmount: 0,
    depositAmount: 0,
    estimatedHours: 0,
    quoteNotes: "",
    selectedDate: null,
    selectedTime: "",
  });

  const updateData = (partial: Partial<BookingData>) =>
    setData((prev) => ({ ...prev, ...partial }));

  const next = () => setStep((s) => Math.min(s + 1, 6));
  const back = () => setStep((s) => Math.max(s - 1, 1));

  const handleClose = () => {
    onOpenChange(false);
    setTimeout(() => setStep(1), 300);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto p-0 gap-0 bg-background border-border">
        <DialogTitle className="sr-only">Agendar Cita con {artist.name}</DialogTitle>
        <div className="p-6 pb-0">
          <h2 className="text-lg font-bold text-foreground mb-1">
            Agendar Cita con {artist.name}
          </h2>
          <BookingStepIndicator steps={STEPS} current={step} />
        </div>

        <div className="p-6">
          {step === 1 && (
            <BookingStep1Request
              data={data}
              updateData={updateData}
              artist={artist}
              onNext={next}
            />
          )}
          {step === 2 && (
            <BookingStep2Quote
              data={data}
              updateData={updateData}
              artist={artist}
              onNext={next}
              onBack={back}
            />
          )}
          {step === 3 && (
            <BookingStep3Payment
              data={data}
              artist={artist}
              onNext={next}
              onBack={back}
            />
          )}
          {step === 4 && (
            <BookingStep4Schedule
              data={data}
              updateData={updateData}
              artist={artist}
              onNext={next}
              onBack={back}
            />
          )}
          {step === 5 && (
            <BookingStep5Calendar
              data={data}
              artist={artist}
              onNext={next}
              onBack={back}
            />
          )}
          {step === 6 && (
            <BookingStep6Confirmation
              data={data}
              artist={artist}
              onClose={handleClose}
            />
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BookingFlow;
