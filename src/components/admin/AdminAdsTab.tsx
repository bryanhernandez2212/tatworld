import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Trash2, Megaphone } from "lucide-react";

interface Ad {
  id: string;
  title: string;
  description: string;
  image: string;
  link: string;
  active: boolean;
  createdAt: string;
}

export default function AdminAdsTab() {
  const [ads, setAds] = useState<Ad[]>([]);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ title: "", description: "", image: "", link: "" });

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => setForm((f) => ({ ...f, image: reader.result as string }));
    reader.readAsDataURL(file);
  };

  const handleCreate = () => {
    if (!form.title) return;
    setAds((prev) => [...prev, { id: crypto.randomUUID(), ...form, active: true, createdAt: new Date().toISOString().split("T")[0] }]);
    setForm({ title: "", description: "", image: "", link: "" });
    setOpen(false);
  };

  const toggleActive = (id: string) => {
    setAds((prev) => prev.map((a) => (a.id === id ? { ...a, active: !a.active } : a)));
  };

  const deleteAd = (id: string) => {
    setAds((prev) => prev.filter((a) => a.id !== id));
  };

  return (
    <Card className="border-border bg-card">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-foreground">Publicidad</CardTitle>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button size="sm"><Plus className="h-4 w-4 mr-1" /> Nuevo Anuncio</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader><DialogTitle>Nuevo Anuncio Publicitario</DialogTitle></DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Título</Label>
                <Input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
              </div>
              <div className="space-y-2">
                <Label>Imagen</Label>
                <Input type="file" accept="image/*" onChange={handleImageUpload} />
                {form.image && <img src={form.image} alt="Preview" className="h-24 w-full object-cover rounded-md" />}
              </div>
              <div className="space-y-2">
                <Label>Link destino</Label>
                <Input value={form.link} onChange={(e) => setForm({ ...form, link: e.target.value })} placeholder="https://..." />
              </div>
              <div className="space-y-2">
                <Label>Descripción</Label>
                <Textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={3} />
              </div>
              <Button onClick={handleCreate} className="w-full">Crear Anuncio</Button>
            </div>
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent>
        {ads.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">
            <Megaphone className="h-12 w-12 mx-auto mb-3 opacity-40" />
            <p>No hay anuncios publicitarios.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {ads.map((a) => (
              <Card key={a.id} className="border-border overflow-hidden">
                {a.image && <img src={a.image} alt={a.title} className="h-36 w-full object-cover" />}
                <CardContent className="p-4 space-y-2">
                  <div className="flex items-start justify-between">
                    <h4 className="font-semibold text-foreground">{a.title}</h4>
                    <Badge variant={a.active ? "default" : "secondary"} className="cursor-pointer" onClick={() => toggleActive(a.id)}>
                      {a.active ? "Activo" : "Inactivo"}
                    </Badge>
                  </div>
                  {a.description && <p className="text-sm text-muted-foreground">{a.description}</p>}
                  <Button size="sm" variant="destructive" onClick={() => deleteAd(a.id)}>
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
