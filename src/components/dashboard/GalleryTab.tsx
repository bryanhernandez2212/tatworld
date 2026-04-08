import { useState, useRef } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Trash2, Upload, ImageIcon } from "lucide-react";

const TATTOO_STYLES = [
  "Realismo", "Blackwork", "Neo-tradicional", "Old School", "Japonés",
  "Acuarela", "Minimalista", "Geométrico", "Lettering", "Dotwork", "Trash Polka",
];

interface GalleryItem {
  url: string;
  name: string;
  style: string;
  description: string;
  mentions: string;
}

interface Props {
  user: any;
  updateProfile: (data: any) => void;
  toast: any;
}

export default function GalleryTab({ user, updateProfile, toast }: Props) {
  const gallery: GalleryItem[] = (user.gallery || []).map((item: string | GalleryItem) =>
    typeof item === "string" ? { url: item, name: "", style: "", description: "", mentions: "" } : item
  );

  const [dialogOpen, setDialogOpen] = useState(false);
  const [form, setForm] = useState<Omit<GalleryItem, "url">>({ name: "", style: "", description: "", mentions: "" });
  const [preview, setPreview] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const resetForm = () => {
    setForm({ name: "", style: "", description: "", mentions: "" });
    setPreview(null);
    if (fileRef.current) fileRef.current.value = "";
  };

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setPreview(reader.result as string);
    reader.readAsDataURL(file);
  };

  const addImage = () => {
    if (!preview || !form.name.trim()) return;
    updateProfile({ gallery: [...gallery, { ...form, url: preview }] });
    resetForm();
    setDialogOpen(false);
    toast({ title: "Tatuaje agregado a la galería" });
  };

  const removeImage = (idx: number) => {
    updateProfile({ gallery: gallery.filter((_, i) => i !== idx) });
    toast({ title: "Imagen eliminada" });
  };

  return (
    <>
      <Card className="border-border bg-card">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-foreground">Mi Galería</CardTitle>
            <CardDescription>Sube fotos de tus trabajos para mostrar en tu perfil</CardDescription>
          </div>
          <Button onClick={() => setDialogOpen(true)} size="sm">
            <Plus className="h-4 w-4 mr-1" /> Agregar
          </Button>
        </CardHeader>
        <CardContent>
          {gallery.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-muted-foreground border-2 border-dashed border-border rounded-lg">
              <Upload className="h-10 w-10 mb-3 opacity-50" />
              <p className="text-sm">Aún no tienes imágenes en tu galería</p>
              <p className="text-xs mt-1">Agrega tus trabajos para empezar</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {gallery.map((item, idx) => (
                <div key={idx} className="relative group rounded-lg overflow-hidden border border-border">
                  <div className="aspect-square">
                    <img src={item.url} alt={item.name || `Trabajo ${idx + 1}`} className="w-full h-full object-cover" />
                  </div>
                  <div className="p-2 space-y-0.5">
                    <p className="text-xs font-semibold text-foreground truncate">{item.name || "Sin nombre"}</p>
                    {item.style && <Badge variant="secondary" className="text-[10px]">{item.style}</Badge>}
                  </div>
                  <button
                    onClick={() => removeImage(idx)}
                    className="absolute top-2 right-2 p-1.5 bg-destructive/90 text-destructive-foreground rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <Dialog open={dialogOpen} onOpenChange={(o) => { if (!o) resetForm(); setDialogOpen(o); }}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Agregar Tatuaje</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Imagen *</Label>
              <div
                onClick={() => fileRef.current?.click()}
                className="relative flex flex-col items-center justify-center border-2 border-dashed border-border rounded-lg cursor-pointer hover:border-primary/50 transition-colors overflow-hidden"
                style={{ minHeight: preview ? "auto" : "120px" }}
              >
                {preview ? (
                  <img src={preview} alt="Preview" className="w-full max-h-48 object-contain" />
                ) : (
                  <>
                    <ImageIcon className="h-8 w-8 text-muted-foreground mb-2" />
                    <p className="text-sm text-muted-foreground">Haz clic para seleccionar una imagen</p>
                    <p className="text-xs text-muted-foreground">JPG, PNG, WEBP</p>
                  </>
                )}
              </div>
              <input
                ref={fileRef}
                type="file"
                accept="image/*"
                onChange={handleFile}
                className="hidden"
              />
            </div>
            <div className="space-y-2">
              <Label>Nombre *</Label>
              <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Ej: Dragón en tinta negra" />
            </div>
            <div className="space-y-2">
              <Label>Tipo de tatuaje</Label>
              <Select value={form.style} onValueChange={(v) => setForm({ ...form, style: v })}>
                <SelectTrigger><SelectValue placeholder="Selecciona un estilo" /></SelectTrigger>
                <SelectContent>
                  {TATTOO_STYLES.map((s) => (
                    <SelectItem key={s} value={s}>{s}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Descripción</Label>
              <Textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="Detalles del trabajo..." rows={3} />
            </div>
            <div className="space-y-2">
              <Label>Menciones</Label>
              <Input value={form.mentions} onChange={(e) => setForm({ ...form, mentions: e.target.value })} placeholder="@artista, @modelo..." />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => { resetForm(); setDialogOpen(false); }}>Cancelar</Button>
            <Button onClick={addImage} disabled={!preview || !form.name.trim()}>Agregar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
