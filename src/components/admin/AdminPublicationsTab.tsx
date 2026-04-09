import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Eye, EyeOff, Trash2, FileText } from "lucide-react";

interface Publication {
  id: string;
  title: string;
  content: string;
  type: "announcement" | "blog" | "featured";
  visible: boolean;
  createdAt: string;
}

const TYPE_LABELS: Record<string, string> = {
  announcement: "Anuncio",
  blog: "Blog",
  featured: "Destacado",
};

export default function AdminPublicationsTab() {
  const [publications, setPublications] = useState<Publication[]>([
    { id: "1", title: "¡Bienvenidos a TattsNearby!", content: "La plataforma para conectar tatuadores y clientes.", type: "announcement", visible: true, createdAt: "2025-01-01" },
    { id: "2", title: "Consejos para tu primer tatuaje", content: "Todo lo que debes saber antes de tatuarte.", type: "blog", visible: true, createdAt: "2025-03-15" },
  ]);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ title: "", content: "", type: "announcement" });

  const handleCreate = () => {
    if (!form.title) return;
    setPublications((prev) => [...prev, { id: crypto.randomUUID(), ...form, type: form.type as Publication["type"], visible: true, createdAt: new Date().toISOString().split("T")[0] }]);
    setForm({ title: "", content: "", type: "announcement" });
    setOpen(false);
  };

  const toggleVisibility = (id: string) => {
    setPublications((prev) => prev.map((p) => (p.id === id ? { ...p, visible: !p.visible } : p)));
  };

  const deletePublication = (id: string) => {
    setPublications((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <Card className="border-border bg-card">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-foreground">Publicaciones</CardTitle>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button size="sm"><Plus className="h-4 w-4 mr-1" /> Nueva</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader><DialogTitle>Nueva Publicación</DialogTitle></DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Título</Label>
                <Input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
              </div>
              <div className="space-y-2">
                <Label>Tipo</Label>
                <Select value={form.type} onValueChange={(v) => setForm({ ...form, type: v })}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="announcement">Anuncio</SelectItem>
                    <SelectItem value="blog">Blog</SelectItem>
                    <SelectItem value="featured">Destacado</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Contenido</Label>
                <Textarea value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} rows={4} />
              </div>
              <Button onClick={handleCreate} className="w-full">Publicar</Button>
            </div>
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent>
        {publications.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">
            <FileText className="h-12 w-12 mx-auto mb-3 opacity-40" />
            <p>No hay publicaciones.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {publications.map((p) => (
              <div key={p.id} className={`p-4 rounded-lg border border-border ${p.visible ? "bg-secondary/20" : "bg-secondary/5 opacity-60"}`}>
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-semibold text-foreground truncate">{p.title}</h4>
                      <Badge variant="secondary" className="text-[10px]">{TYPE_LABELS[p.type]}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground line-clamp-2">{p.content}</p>
                    <p className="text-xs text-muted-foreground mt-1">{p.createdAt}</p>
                  </div>
                  <div className="flex gap-1 shrink-0">
                    <Button size="icon" variant="ghost" onClick={() => toggleVisibility(p.id)} title={p.visible ? "Ocultar" : "Mostrar"}>
                      {p.visible ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                    </Button>
                    <Button size="icon" variant="ghost" onClick={() => deletePublication(p.id)}>
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
