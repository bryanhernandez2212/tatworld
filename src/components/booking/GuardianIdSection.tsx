import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Upload, ShieldAlert, User } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface Props {
  guardianName: string;
  guardianIdPhoto: File | null;
  onUpdate: (data: { guardianName?: string; guardianIdPhoto?: File | null }) => void;
}

const GuardianIdSection = ({ guardianName, guardianIdPhoto, onUpdate }: Props) => {
  const [preview, setPreview] = useState<string | null>(null);

  const handlePhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onUpdate({ guardianIdPhoto: file });
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-4 rounded-lg border-2 border-amber-500/30 bg-amber-500/5 p-4">
      <Alert className="border-amber-500/40 bg-amber-500/10">
        <ShieldAlert className="h-4 w-4 text-amber-500" />
        <AlertDescription className="text-sm text-amber-200">
          Al ser menor de edad, necesitas la autorización de un adulto responsable.
          Deberás presentarte a tu cita acompañado(a) de la persona cuya identificación subas aquí.
        </AlertDescription>
      </Alert>

      <div className="space-y-2">
        <Label className="text-foreground flex items-center gap-2">
          <User className="w-4 h-4 text-primary" />
          Nombre completo del tutor/responsable
        </Label>
        <Input
          value={guardianName}
          onChange={(e) => onUpdate({ guardianName: e.target.value })}
          placeholder="Nombre del adulto responsable"
          className="bg-secondary/50 border-border"
        />
      </div>

      <div className="space-y-2">
        <Label className="text-foreground">Identificación oficial del tutor (INE/Pasaporte)</Label>
        <label className="flex items-center gap-2 p-3 rounded-lg border border-dashed border-amber-500/40 bg-secondary/30 cursor-pointer hover:bg-secondary/50 transition-colors">
          <Upload className="w-5 h-5 text-amber-500" />
          <span className="text-sm text-muted-foreground">Subir foto de identificación</span>
          <input type="file" accept="image/*" className="hidden" onChange={handlePhoto} />
        </label>
        {preview && (
          <div className="w-24 h-16 rounded-lg overflow-hidden mt-2 border border-border">
            <img src={preview} alt="ID del tutor" className="w-full h-full object-cover" />
          </div>
        )}
      </div>

      <p className="text-xs text-muted-foreground italic">
        ⚠️ El día de tu cita deberás llegar acompañado(a) de esta persona con su identificación original.
      </p>
    </div>
  );
};

export default GuardianIdSection;
