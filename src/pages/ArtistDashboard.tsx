import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Navigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import {
  Image as ImageIcon,
  Zap,
  CalendarDays,
  UserCog,
  Plus,
  Trash2,
  Upload,
} from "lucide-react";

const ArtistDashboard = () => {
  const { user, updateProfile } = useAuth();
  const { toast } = useToast();

  // Redirect if not artist
  if (!user || user.role !== "artist") {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="max-w-5xl mx-auto px-4 pt-24 pb-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">Panel de Tatuador</h1>
          <p className="text-muted-foreground mt-1">Administra tu perfil, galería y citas</p>
        </div>

        <Tabs defaultValue="gallery" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-secondary">
            <TabsTrigger value="gallery" className="flex items-center gap-2 text-xs sm:text-sm">
              <ImageIcon className="h-4 w-4" />
              <span className="hidden sm:inline">Galería</span>
            </TabsTrigger>
            <TabsTrigger value="flash" className="flex items-center gap-2 text-xs sm:text-sm">
              <Zap className="h-4 w-4" />
              <span className="hidden sm:inline">Flash</span>
            </TabsTrigger>
            <TabsTrigger value="appointments" className="flex items-center gap-2 text-xs sm:text-sm">
              <CalendarDays className="h-4 w-4" />
              <span className="hidden sm:inline">Citas</span>
            </TabsTrigger>
            <TabsTrigger value="profile" className="flex items-center gap-2 text-xs sm:text-sm">
              <UserCog className="h-4 w-4" />
              <span className="hidden sm:inline">Perfil</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="gallery">
            <GalleryTab user={user} updateProfile={updateProfile} toast={toast} />
          </TabsContent>
          <TabsContent value="flash">
            <FlashTab user={user} updateProfile={updateProfile} toast={toast} />
          </TabsContent>
          <TabsContent value="appointments">
            <AppointmentsTab />
          </TabsContent>
          <TabsContent value="profile">
            <ProfileTab user={user} updateProfile={updateProfile} toast={toast} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

/* ─── Gallery Tab ─── */
function GalleryTab({ user, updateProfile, toast }: any) {
  const [newUrl, setNewUrl] = useState("");
  const gallery: string[] = user.gallery || [];

  const addImage = () => {
    if (!newUrl.trim()) return;
    updateProfile({ gallery: [...gallery, newUrl.trim()] });
    setNewUrl("");
    toast({ title: "Imagen agregada a la galería" });
  };

  const removeImage = (idx: number) => {
    updateProfile({ gallery: gallery.filter((_: string, i: number) => i !== idx) });
    toast({ title: "Imagen eliminada" });
  };

  return (
    <Card className="border-border bg-card">
      <CardHeader>
        <CardTitle className="text-foreground">Mi Galería</CardTitle>
        <CardDescription>Sube fotos de tus trabajos para mostrar en tu perfil</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-2">
          <Input
            placeholder="URL de la imagen..."
            value={newUrl}
            onChange={(e) => setNewUrl(e.target.value)}
            className="flex-1"
          />
          <Button onClick={addImage} size="sm">
            <Plus className="h-4 w-4 mr-1" /> Agregar
          </Button>
        </div>

        {gallery.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-muted-foreground border-2 border-dashed border-border rounded-lg">
            <Upload className="h-10 w-10 mb-3 opacity-50" />
            <p className="text-sm">Aún no tienes imágenes en tu galería</p>
            <p className="text-xs mt-1">Agrega URLs de tus trabajos para empezar</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {gallery.map((url: string, idx: number) => (
              <div key={idx} className="relative group aspect-square rounded-lg overflow-hidden border border-border">
                <img src={url} alt={`Trabajo ${idx + 1}`} className="w-full h-full object-cover" />
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
  );
}

/* ─── Flash Designs Tab ─── */
function FlashTab({ user, updateProfile, toast }: any) {
  const [newUrl, setNewUrl] = useState("");
  const flashDesigns: string[] = user.flashDesigns || [];

  const addFlash = () => {
    if (!newUrl.trim()) return;
    updateProfile({ flashDesigns: [...flashDesigns, newUrl.trim()] });
    setNewUrl("");
    toast({ title: "Flash design agregado" });
  };

  const removeFlash = (idx: number) => {
    updateProfile({ flashDesigns: flashDesigns.filter((_: string, i: number) => i !== idx) });
    toast({ title: "Flash design eliminado" });
  };

  return (
    <Card className="border-border bg-card">
      <CardHeader>
        <CardTitle className="text-foreground">Flash Designs</CardTitle>
        <CardDescription>Publica diseños disponibles para que los clientes elijan</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-2">
          <Input
            placeholder="URL del diseño flash..."
            value={newUrl}
            onChange={(e) => setNewUrl(e.target.value)}
            className="flex-1"
          />
          <Button onClick={addFlash} size="sm">
            <Plus className="h-4 w-4 mr-1" /> Agregar
          </Button>
        </div>

        {flashDesigns.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-muted-foreground border-2 border-dashed border-border rounded-lg">
            <Zap className="h-10 w-10 mb-3 opacity-50" />
            <p className="text-sm">No tienes flash designs aún</p>
            <p className="text-xs mt-1">Agrega diseños disponibles para tatuar</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {flashDesigns.map((url: string, idx: number) => (
              <div key={idx} className="relative group aspect-square rounded-lg overflow-hidden border border-border">
                <img src={url} alt={`Flash ${idx + 1}`} className="w-full h-full object-cover" />
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
  );
}

/* ─── Appointments Tab ─── */
function AppointmentsTab() {
  // Mock appointments
  const appointments = [
    { id: 1, client: "Carlos Méndez", date: "2026-03-20", time: "14:00", status: "pendiente", description: "Tatuaje realismo brazo derecho" },
    { id: 2, client: "Ana García", date: "2026-03-22", time: "10:00", status: "confirmada", description: "Diseño floral en espalda" },
    { id: 3, client: "Luis Torres", date: "2026-03-25", time: "16:00", status: "pendiente", description: "Lettering en antebrazo" },
  ];

  const statusColors: Record<string, string> = {
    pendiente: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
    confirmada: "bg-green-500/20 text-green-400 border-green-500/30",
    completada: "bg-primary/20 text-primary border-primary/30",
  };

  return (
    <Card className="border-border bg-card">
      <CardHeader>
        <CardTitle className="text-foreground">Mis Citas</CardTitle>
        <CardDescription>Gestiona las solicitudes y citas de tus clientes</CardDescription>
      </CardHeader>
      <CardContent>
        {appointments.length === 0 ? (
          <p className="text-muted-foreground text-center py-8">No tienes citas programadas</p>
        ) : (
          <div className="space-y-3">
            {appointments.map((apt) => (
              <div
                key={apt.id}
                className="flex items-center justify-between p-4 rounded-lg bg-secondary/50 border border-border"
              >
                <div className="space-y-1">
                  <p className="font-medium text-foreground">{apt.client}</p>
                  <p className="text-sm text-muted-foreground">{apt.description}</p>
                  <p className="text-xs text-muted-foreground">
                    {apt.date} · {apt.time}
                  </p>
                </div>
                <Badge variant="outline" className={statusColors[apt.status]}>
                  {apt.status}
                </Badge>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

/* ─── Profile Tab ─── */
function ProfileTab({ user, updateProfile, toast }: any) {
  const [name, setName] = useState(user.name || "");
  const [bio, setBio] = useState(user.bio || "");
  const [city, setCity] = useState(user.city || "");
  const [phone, setPhone] = useState(user.phone || "");
  const [instagram, setInstagram] = useState(user.instagram || "");
  const [priceRange, setPriceRange] = useState(user.priceRange || "");
  const [stylesInput, setStylesInput] = useState((user.styles || []).join(", "));

  const handleSave = () => {
    updateProfile({
      name,
      bio,
      city,
      phone,
      instagram,
      priceRange,
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

export default ArtistDashboard;