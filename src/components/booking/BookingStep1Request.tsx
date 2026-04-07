import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Upload, ImagePlus, X } from "lucide-react";
import type { Artist } from "@/data/artists";
import type { BookingData } from "./BookingFlow";
import { useAuth } from "@/contexts/AuthContext";
import GuardianIdSection from "./GuardianIdSection";

interface Props {
  data: BookingData;
  updateData: (d: Partial<BookingData>) => void;
  artist: Artist;
  onNext: () => void;
}

const BookingStep1Request = ({ data, updateData, artist, onNext }: Props) => {
  const { user } = useAuth();
  const isMinor = user?.isMinor === true;
  const [guardianName, setGuardianName] = useState("");
  const [guardianIdPhoto, setGuardianIdPhoto] = useState<File | null>(null);
  const [previews, setPreviews] = useState<string[]>([]);
  const [bodyPreview, setBodyPreview] = useState<string | null>(null);
  const [refPreviews, setRefPreviews] = useState<string[]>([]);

  const handleReferencePhotos = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    updateData({ referencePhotos: [...data.referencePhotos, ...files] });
    files.forEach((f) => {
      const reader = new FileReader();
      reader.onloadend = () => setPreviews((p) => [...p, reader.result as string]);
      reader.readAsDataURL(f);
    });
  };

  const handleBodyPhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      updateData({ bodyZonePhoto: file });
      const reader = new FileReader();
      reader.onloadend = () => setBodyPreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleAdditionalRefs = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    updateData({ additionalRefs: [...data.additionalRefs, ...files] });
    files.forEach((f) => {
      const reader = new FileReader();
      reader.onloadend = () => setRefPreviews((p) => [...p, reader.result as string]);
      reader.readAsDataURL(f);
    });
  };

  const removePreview = (index: number) => {
    setPreviews((p) => p.filter((_, i) => i !== index));
    updateData({
      referencePhotos: data.referencePhotos.filter((_, i) => i !== index),
    });
  };

  const guardianValid = !isMinor || (guardianName.trim().length > 0 && guardianIdPhoto !== null);
  const isValid = data.description.trim().length > 0 && data.style && guardianValid;

  return (
    <div className="space-y-5">
      {/* Estilo */}
      <div className="space-y-2">
        <Label className="text-foreground">Estilo de tatuaje</Label>
        <Select value={data.style} onValueChange={(v) => updateData({ style: v })}>
          <SelectTrigger className="bg-secondary/50 border-border">
            <SelectValue placeholder="Selecciona estilo" />
          </SelectTrigger>
          <SelectContent>
            {artist.styles.map((s) => (
              <SelectItem key={s} value={s}>{s}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Tipo de idea */}
      <div className="space-y-2">
        <Label className="text-foreground">Tipo de idea</Label>
        <div className="flex gap-2">
          <Button
            type="button"
            variant={data.ideaType === "general" ? "default" : "outline"}
            size="sm"
            onClick={() => updateData({ ideaType: "general" })}
          >
            Idea General
          </Button>
          <Button
            type="button"
            variant={data.ideaType === "specific" ? "default" : "outline"}
            size="sm"
            onClick={() => updateData({ ideaType: "specific" })}
          >
            Idea Específica
          </Button>
        </div>
      </div>

      {/* Descripción */}
      <div className="space-y-2">
        <Label className="text-foreground">Descripción de la idea</Label>
        <Textarea
          value={data.description}
          onChange={(e) => updateData({ description: e.target.value })}
          placeholder={
            data.ideaType === "general"
              ? "Describe tu idea general (ej: algo floral en el antebrazo)..."
              : "Describe tu diseño específico con detalles..."
          }
          className="bg-secondary/50 border-border min-h-[100px]"
        />
      </div>

      {/* Foto referencia */}
      <div className="space-y-2">
        <Label className="text-foreground">Foto de referencia (idea)</Label>
        <label className="flex items-center gap-2 p-3 rounded-lg border border-dashed border-border bg-secondary/30 cursor-pointer hover:bg-secondary/50 transition-colors">
          <ImagePlus className="w-5 h-5 text-primary" />
          <span className="text-sm text-muted-foreground">Subir fotos de referencia</span>
          <input type="file" accept="image/*" multiple className="hidden" onChange={handleReferencePhotos} />
        </label>
        {previews.length > 0 && (
          <div className="flex gap-2 flex-wrap mt-2">
            {previews.map((src, i) => (
              <div key={i} className="relative w-16 h-16 rounded-lg overflow-hidden group">
                <img src={src} alt="" className="w-full h-full object-cover" />
                <button
                  onClick={() => removePreview(i)}
                  className="absolute top-0.5 right-0.5 bg-background/80 rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Zona del cuerpo */}
      <div className="space-y-2">
        <Label className="text-foreground">Foto de la zona del cuerpo</Label>
        <p className="text-xs text-muted-foreground">Foto clara de la zona donde irá el tatuaje (estado de piel limpia)</p>
        <label className="flex items-center gap-2 p-3 rounded-lg border border-dashed border-border bg-secondary/30 cursor-pointer hover:bg-secondary/50 transition-colors">
          <Upload className="w-5 h-5 text-primary" />
          <span className="text-sm text-muted-foreground">Subir foto de zona</span>
          <input type="file" accept="image/*" className="hidden" onChange={handleBodyPhoto} />
        </label>
        {bodyPreview && (
          <div className="w-20 h-20 rounded-lg overflow-hidden mt-2">
            <img src={bodyPreview} alt="" className="w-full h-full object-cover" />
          </div>
        )}
      </div>

      {/* Tamaño */}
      <div className="space-y-2">
        <Label className="text-foreground">Tamaño estimado (cm)</Label>
        <div className="flex gap-3 items-center">
          <div className="flex items-center gap-1">
            <Input
              type="number"
              value={data.sizeWidth}
              onChange={(e) => updateData({ sizeWidth: Number(e.target.value) })}
              className="w-20 bg-secondary/50 border-border"
              min={1}
            />
            <span className="text-xs text-muted-foreground">ancho</span>
          </div>
          <span className="text-muted-foreground">×</span>
          <div className="flex items-center gap-1">
            <Input
              type="number"
              value={data.sizeHeight}
              onChange={(e) => updateData({ sizeHeight: Number(e.target.value) })}
              className="w-20 bg-secondary/50 border-border"
              min={1}
            />
            <span className="text-xs text-muted-foreground">alto</span>
          </div>
        </div>
      </div>

      {/* Refs adicionales */}
      <div className="space-y-2">
        <Label className="text-foreground">Referencias visuales adicionales</Label>
        <label className="flex items-center gap-2 p-3 rounded-lg border border-dashed border-border bg-secondary/30 cursor-pointer hover:bg-secondary/50 transition-colors">
          <ImagePlus className="w-5 h-5 text-primary" />
          <span className="text-sm text-muted-foreground">Adjuntar más referencias</span>
          <input type="file" accept="image/*" multiple className="hidden" onChange={handleAdditionalRefs} />
        </label>
        {refPreviews.length > 0 && (
          <div className="flex gap-2 flex-wrap mt-2">
            {refPreviews.map((src, i) => (
              <div key={i} className="w-14 h-14 rounded-lg overflow-hidden">
                <img src={src} alt="" className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
        )}
      </div>

      {isMinor && (
        <GuardianIdSection
          guardianName={guardianName}
          guardianIdPhoto={guardianIdPhoto}
          onUpdate={(d) => {
            if (d.guardianName !== undefined) setGuardianName(d.guardianName);
            if (d.guardianIdPhoto !== undefined) setGuardianIdPhoto(d.guardianIdPhoto);
          }}
        />
      )}

      <Button onClick={onNext} disabled={!isValid} className="w-full">
        Enviar Solicitud
      </Button>
    </div>
  );
};

export default BookingStep1Request;
