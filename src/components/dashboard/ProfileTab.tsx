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

export default function ProfileTab({ user, updateProfile, toast }: Props) {
  const [name, setName] = useState(user.name || "");
  const [bio, setBio] = useState(user.bio || "");
  const [city, setCity] = useState(user.city || "");
  const [phone, setPhone] = useState(user.phone || "");
  const [instagram, setInstagram] = useState(user.instagram || "");
  const [priceRange, setPriceRange] = useState(user.priceRange || "");
  const [stylesInput, setStylesInput] = useState((user.styles || []).join(", "));

  const handleSave = () => {
    updateProfile({
      name, bio, city, phone, instagram, priceRange,
      styles: stylesInput.split(",").map((s: string) => s.trim()).filter(Boolean),
    });
    toast({ title: "Perfil actualizado", description: "Los cambios se guardaron correctamente." });
  };

  return (
    <Card className="border-border bg-card">
      <CardHeader>
        <CardTitle className="text-foreground">Editar Perfil</CardTitle>
        <CardDescription>Actualiza tu información pública como tatuador</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Nombre artístico</Label>
            <Input value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label>Ciudad</Label>
            <Input value={city} onChange={(e) => setCity(e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label>Teléfono</Label>
            <Input value={phone} onChange={(e) => setPhone(e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label>Instagram</Label>
            <Input value={instagram} onChange={(e) => setInstagram(e.target.value)} placeholder="@tuusuario" />
          </div>
          <div className="space-y-2">
            <Label>Rango de precios</Label>
            <Input value={priceRange} onChange={(e) => setPriceRange(e.target.value)} placeholder="$1,500 - $5,000 MXN" />
          </div>
          <div className="space-y-2">
            <Label>Estilos (separados por coma)</Label>
            <Input value={stylesInput} onChange={(e) => setStylesInput(e.target.value)} placeholder="Realismo, Blackwork, Neo" />
          </div>
        </div>
        <div className="space-y-2">
          <Label>Biografía</Label>
          <Textarea value={bio} onChange={(e) => setBio(e.target.value)} rows={4} placeholder="Cuéntale a tus clientes sobre ti..." />
        </div>
        <Button onClick={handleSave} className="w-full sm:w-auto">
          Guardar Cambios
        </Button>
      </CardContent>
    </Card>
  );
}
