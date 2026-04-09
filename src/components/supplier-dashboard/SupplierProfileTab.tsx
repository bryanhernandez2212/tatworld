import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface Props {
  user: any;
  updateProfile: (data: any) => void;
  toast: any;
}

export default function SupplierProfileTab({ user, updateProfile, toast }: Props) {
  const [companyName, setCompanyName] = useState(user.companyName || user.name || "");
  const [city, setCity] = useState(user.city || "");
  const [phone, setPhone] = useState(user.phone || "");
  const [description, setDescription] = useState(user.description || "");
  const [avatar, setAvatar] = useState(user.avatar || "");

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => setAvatar(reader.result as string);
    reader.readAsDataURL(file);
  };

  const handleSave = () => {
    updateProfile({ companyName, name: companyName, city, phone, description, avatar });
    toast({ title: "Perfil actualizado", description: "Los cambios se guardaron correctamente." });
  };

  return (
    <Card className="border-border bg-card">
      <CardHeader>
        <CardTitle className="text-foreground">Perfil de Empresa</CardTitle>
        <CardDescription>Actualiza la información pública de tu empresa</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-4">
          {avatar ? (
            <img src={avatar} alt="Logo" className="h-16 w-16 rounded-full object-cover border border-border" />
          ) : (
            <div className="h-16 w-16 rounded-full bg-secondary flex items-center justify-center text-muted-foreground text-xl font-bold">
              {companyName.charAt(0).toUpperCase()}
            </div>
          )}
          <div className="space-y-1">
            <Label>Foto / Logo</Label>
            <Input type="file" accept="image/*" onChange={handleImageUpload} />
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Nombre de empresa</Label>
            <Input value={companyName} onChange={(e) => setCompanyName(e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label>Ubicación</Label>
            <Input value={city} onChange={(e) => setCity(e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label>Teléfono</Label>
            <Input value={phone} onChange={(e) => setPhone(e.target.value)} />
          </div>
        </div>
        <div className="space-y-2">
          <Label>Descripción</Label>
          <Textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={4} placeholder="Describe tu empresa y los productos que ofreces..." />
        </div>
        <Button onClick={handleSave} className="w-full sm:w-auto">Guardar Cambios</Button>
      </CardContent>
    </Card>
  );
}
