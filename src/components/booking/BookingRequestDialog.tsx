import { useState } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import type { Artist } from "@/data/artists";
import BookingStep1Request from "./BookingStep1Request";
import type { BookingData } from "./BookingFlow";
import { useBookingRequests } from "@/hooks/useBookingRequests";
import { CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface Props {
  artist: Artist;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const BookingRequestDialog = ({ artist, open, onOpenChange }: Props) => {
  const navigate = useNavigate();
  const { addRequest } = useBookingRequests();
  const [submitted, setSubmitted] = useState(false);
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

  const handleSubmit = () => {
    addRequest({
      artistSlug: artist.slug,
      artistName: artist.name,
      artistImage: artist.image,
      style: data.style,
      ideaType: data.ideaType,
      description: data.description,
      sizeWidth: data.sizeWidth,
      sizeHeight: data.sizeHeight,
    });
    setSubmitted(true);
  };

  const handleClose = () => {
    onOpenChange(false);
    setTimeout(() => setSubmitted(false), 300);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto p-0 gap-0 bg-background border-border">
        <DialogTitle className="sr-only">Solicitar Cita con {artist.name}</DialogTitle>

        {submitted ? (
          <div className="p-8 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center mx-auto">
              <CheckCircle className="w-9 h-9 text-green-400" />
            </div>
            <h3 className="text-xl font-bold text-foreground">¡Solicitud Enviada!</h3>
            <p className="text-sm text-muted-foreground">
              {artist.name} revisará tu solicitud y te enviará una cotización.
              Te notificaremos cuando esté lista.
            </p>
            <div className="flex gap-3 justify-center pt-2">
              <Button variant="outline" onClick={handleClose}>Cerrar</Button>
              <Button onClick={() => { handleClose(); navigate("/mis-citas"); }}>
                Ir a Mis Citas
              </Button>
            </div>
          </div>
        ) : (
          <>
            <div className="p-6 pb-0">
              <h2 className="text-lg font-bold text-foreground mb-1">
                Solicitar Cita con {artist.name}
              </h2>
              <p className="text-sm text-muted-foreground">
                Completa tu solicitud y el tatuador te enviará una cotización
              </p>
            </div>
            <div className="p-6">
              <BookingStep1Request
                data={data}
                updateData={updateData}
                artist={artist}
                onNext={handleSubmit}
              />
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default BookingRequestDialog;
