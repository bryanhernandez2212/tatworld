import { useState, useRef } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Plus, Trash2, Zap, ImageIcon } from "lucide-react";

interface FlashItem {
  url: string;
  name: string;
  price: number;
  width: number;
  height: number;
}

interface Props {
  user: any;
  updateProfile: (data: any) => void;
  toast: any;
}

export default function FlashTab({ user, updateProfile, toast }: Props) {
  const flashDesigns: FlashItem[] = (user.flashDesigns || []).map((item: string | FlashItem) =>
    typeof item === "string" ? { url: item, name: "", price: 0, width: 0, height: 0 } : item
  );

  const [dialogOpen, setDialogOpen] = useState(false);
  const [form, setForm] = useState<Omit<FlashItem, "url">>({ name: "", price: 0, width: 0, height: 0 });
  const [preview, setPreview] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const resetForm = () => {
    setForm({ name: "", price: 0, width: 0, height: 0 });
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

  const addFlash = () => {
    if (!preview || !form.name.trim()) return;
    updateProfile({ flashDesigns: [...flashDesigns, { ...form, url: preview }] });
    resetForm();
    setDialogOpen(false);
    toast({ title: "Flash design agregado" });
  };

  const removeFlash = (idx: number) => {
    updateProfile({ flashDesigns: flashDesigns.filter((_, i) => i !== idx) });
    toast({ title: "Flash design eliminado" });
  };

  return (
    <>
      <Card className="border-border bg-card">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-foreground">Flash Designs</CardTitle>
            <CardDescription>Publica diseños disponibles para que los clientes elijan</CardDescription>
          </div>
          <Button onClick={() => setDialogOpen(true)} size="sm">
            <Plus className="h-4 w-4 mr-1" /> Agregar
          </Button>
        </CardHeader>
        <CardContent>
          {flashDesigns.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-muted-foreground border-2 border-dashed border-border rounded-lg">
              <Zap className="h-10 w-10 mb-3 opacity-50" />
              <p className="text-sm">No tienes flash designs aún</p>
              <p className="text-xs mt-1">Agrega diseños disponibles para tatuar</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {flashDesigns.map((item, idx) => (
                <div key={idx} className="relative group rounded-lg overflow-hidden border border-border">
                  <div className="aspect-square">
                    <img src={item.url} alt={item.name || `Flash ${idx + 1}`} className="w-full h-full object-cover" />
                  </div>
                  <div className="p-2 space-y-0.5">
                    <p className="text-xs font-semibold text-foreground truncate">{item.name || "Sin nombre"}</p>
                    <p className="text-xs text-primary font-bold">${item.price.toLocaleString()} MXN</p>
                    {item.width > 0 && item.height > 0 && (
                      <p className="text-[10px] text-muted-foreground">{item.width}×{item.height} cm</p>
                    )}
                  </div>
                  <button
                    onClick={() => removeFlash(idx)}
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
            <DialogTitle>Agregar Flash Design</DialogTitle>
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
              <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Ej: Rosa minimalista" />
            </div>
            <div className="space-y-2">
              <Label>Precio (MXN)</Label>
              <Input type="number" value={form.price || ""} onChange={(e) => setForm({ ...form, price: Number(e.target.value) })} placeholder="1500" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <Label>Ancho (cm)</Label>
                <Input type="number" value={form.width || ""} onChange={(e) => setForm({ ...form, width: Number(e.target.value) })} placeholder="10" />
              </div>
              <div className="space-y-2">
                <Label>Alto (cm)</Label>
                <Input type="number" value={form.height || ""} onChange={(e) => setForm({ ...form, height: Number(e.target.value) })} placeholder="15" />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => { resetForm(); setDialogOpen(false); }}>Cancelar</Button>
            <Button onClick={addFlash} disabled={!preview || !form.name.trim()}>Agregar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
