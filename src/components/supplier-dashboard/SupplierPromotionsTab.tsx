import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus, Trash2, Tag, Percent } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface Promotion {
  id: string;
  name: string;
  image: string;
  discount: number;
  description: string;
  validUntil: string;
}

interface Props {
  user: any;
  updateProfile: (data: any) => void;
  toast: any;
}

export default function SupplierPromotionsTab({ user, updateProfile, toast }: Props) {
  const [promotions, setPromotions] = useState<Promotion[]>(user.promotions || []);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ name: "", image: "", discount: "", description: "", validUntil: "" });

  const resetForm = () => setForm({ name: "", image: "", discount: "", description: "", validUntil: "" });

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => setForm((f) => ({ ...f, image: reader.result as string }));
    reader.readAsDataURL(file);
  };

  const handleSave = () => {
    if (!form.name || !form.discount || !form.validUntil) {
      toast({ title: "Campos requeridos", description: "Nombre, descuento y fecha son obligatorios.", variant: "destructive" });
      return;
    }
    const updated = [...promotions, { id: crypto.randomUUID(), ...form, discount: Number(form.discount) }];
    setPromotions(updated);
    updateProfile({ promotions: updated });
    toast({ title: "Promoción creada" });
    resetForm();
    setOpen(false);
  };

  const handleDelete = (id: string) => {
    const updated = promotions.filter((p) => p.id !== id);
    setPromotions(updated);
    updateProfile({ promotions: updated });
    toast({ title: "Promoción eliminada" });
  };

  const isExpired = (date: string) => new Date(date) < new Date();

  return (
    <Card className="border-border bg-card">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-foreground">Promociones</CardTitle>
        <Dialog open={open} onOpenChange={(v) => { setOpen(v); if (!v) resetForm(); }}>
          <DialogTrigger asChild>
            <Button size="sm"><Plus className="h-4 w-4 mr-1" /> Nueva Promoción</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader><DialogTitle>Nueva Promoción</DialogTitle></DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Nombre *</Label>
                <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
              </div>
              <div className="space-y-2">
                <Label>Imagen</Label>
                <Input type="file" accept="image/*" onChange={handleImageUpload} />
                {form.image && <img src={form.image} alt="Preview" className="h-24 w-24 object-cover rounded-md" />}
              </div>
              <div className="space-y-2">
                <Label>Porcentaje de descuento *</Label>
                <div className="relative">
                  <Input type="number" min="1" max="100" value={form.discount} onChange={(e) => setForm({ ...form, discount: e.target.value })} />
                  <Percent className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Fecha de vigencia *</Label>
                <Input type="date" value={form.validUntil} onChange={(e) => setForm({ ...form, validUntil: e.target.value })} />
              </div>
              <div className="space-y-2">
                <Label>Descripción</Label>
                <Textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={3} />
              </div>
              <Button onClick={handleSave} className="w-full">Crear Promoción</Button>
            </div>
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent>
        {promotions.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">
            <Tag className="h-12 w-12 mx-auto mb-3 opacity-40" />
            <p>No hay promociones activas.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {promotions.map((p) => (
              <Card key={p.id} className="border-border overflow-hidden">
                {p.image && <img src={p.image} alt={p.name} className="h-36 w-full object-cover" />}
                <CardContent className="p-4 space-y-2">
                  <div className="flex justify-between items-start">
                    <h4 className="font-semibold text-foreground">{p.name}</h4>
                    <Badge variant={isExpired(p.validUntil) ? "destructive" : "default"}>
                      {isExpired(p.validUntil) ? "Expirada" : `${p.discount}% OFF`}
                    </Badge>
                  </div>
                  {p.description && <p className="text-sm text-muted-foreground">{p.description}</p>}
                  <p className="text-xs text-muted-foreground">Vigente hasta: {new Date(p.validUntil).toLocaleDateString("es-MX")}</p>
                  <Button size="sm" variant="destructive" onClick={() => handleDelete(p.id)} className="mt-2">
                    <Trash2 className="h-3 w-3 mr-1" /> Eliminar
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
