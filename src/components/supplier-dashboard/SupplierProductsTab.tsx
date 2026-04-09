import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus, Pencil, Trash2, Package } from "lucide-react";

interface Product {
  id: string;
  name: string;
  image: string;
  description: string;
  price: number;
  type: string;
}

const PRODUCT_TYPES = ["Cartuchos", "Maquinaria", "Tintas", "Agujas", "Fuentes de poder", "Accesorios", "Cuidado posterior", "Otro"];

interface Props {
  user: any;
  updateProfile: (data: any) => void;
  toast: any;
}

export default function SupplierProductsTab({ user, updateProfile, toast }: Props) {
  const [products, setProducts] = useState<Product[]>(user.products || []);
  const [open, setOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState({ name: "", image: "", description: "", price: "", type: "" });

  const resetForm = () => setForm({ name: "", image: "", description: "", price: "", type: "" });

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => setForm((f) => ({ ...f, image: reader.result as string }));
    reader.readAsDataURL(file);
  };

  const handleSave = () => {
    if (!form.name || !form.price || !form.type) {
      toast({ title: "Campos requeridos", description: "Nombre, precio y tipo son obligatorios.", variant: "destructive" });
      return;
    }
    let updated: Product[];
    if (editingId) {
      updated = products.map((p) => (p.id === editingId ? { ...p, ...form, price: Number(form.price) } : p));
    } else {
      updated = [...products, { id: crypto.randomUUID(), ...form, price: Number(form.price) }];
    }
    setProducts(updated);
    updateProfile({ products: updated });
    toast({ title: editingId ? "Producto actualizado" : "Producto agregado" });
    resetForm();
    setEditingId(null);
    setOpen(false);
  };

  const handleEdit = (p: Product) => {
    setForm({ name: p.name, image: p.image, description: p.description, price: String(p.price), type: p.type });
    setEditingId(p.id);
    setOpen(true);
  };

  const handleDelete = (id: string) => {
    const updated = products.filter((p) => p.id !== id);
    setProducts(updated);
    updateProfile({ products: updated });
    toast({ title: "Producto eliminado" });
  };

  return (
    <Card className="border-border bg-card">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-foreground">Productos</CardTitle>
        <Dialog open={open} onOpenChange={(v) => { setOpen(v); if (!v) { resetForm(); setEditingId(null); } }}>
          <DialogTrigger asChild>
            <Button size="sm"><Plus className="h-4 w-4 mr-1" /> Agregar</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editingId ? "Editar Producto" : "Nuevo Producto"}</DialogTitle>
            </DialogHeader>
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
                <Label>Tipo *</Label>
                <Select value={form.type} onValueChange={(v) => setForm({ ...form, type: v })}>
                  <SelectTrigger><SelectValue placeholder="Selecciona tipo" /></SelectTrigger>
                  <SelectContent>
                    {PRODUCT_TYPES.map((t) => <SelectItem key={t} value={t}>{t}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Precio (MXN) *</Label>
                <Input type="number" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} />
              </div>
              <div className="space-y-2">
                <Label>Descripción</Label>
                <Textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={3} />
              </div>
              <Button onClick={handleSave} className="w-full">{editingId ? "Guardar Cambios" : "Agregar Producto"}</Button>
            </div>
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent>
        {products.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">
            <Package className="h-12 w-12 mx-auto mb-3 opacity-40" />
            <p>Aún no has agregado productos.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {products.map((p) => (
              <Card key={p.id} className="border-border overflow-hidden">
                {p.image && <img src={p.image} alt={p.name} className="h-40 w-full object-cover" />}
                <CardContent className="p-4 space-y-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-semibold text-foreground">{p.name}</h4>
                      <span className="text-xs text-muted-foreground">{p.type}</span>
                    </div>
                    <span className="font-bold text-primary">${p.price.toLocaleString()}</span>
                  </div>
                  {p.description && <p className="text-sm text-muted-foreground line-clamp-2">{p.description}</p>}
                  <div className="flex gap-2 pt-2">
                    <Button size="sm" variant="outline" onClick={() => handleEdit(p)}><Pencil className="h-3 w-3 mr-1" /> Editar</Button>
                    <Button size="sm" variant="destructive" onClick={() => handleDelete(p.id)}><Trash2 className="h-3 w-3 mr-1" /> Eliminar</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
