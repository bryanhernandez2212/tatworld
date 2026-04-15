import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth, UserRole } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { User, Palette, Store, ShieldCheck, ShieldAlert, Upload, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";

type Step = "role" | "age" | "id-verification" | "done";

const Onboarding = () => {
  const [step, setStep] = useState<Step>("role");
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);
  const [loading, setLoading] = useState(false);
  const [idFile, setIdFile] = useState<File | null>(null);
  const { user, setRole, updateProfile, authUser } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  // If user already has a role, redirect
  if (user?.role && step === "role") {
    navigate("/");
    return null;
  }

  const handleRoleSelect = async () => {
    if (!selectedRole) return;
    setLoading(true);
    const result = await setRole(selectedRole);
    setLoading(false);

    if (!result.success) {
      toast({ title: "Error", description: result.error, variant: "destructive" });
      return;
    }

    if (selectedRole === "client") {
      setStep("age");
    } else if (selectedRole === "artist" || selectedRole === "supplier") {
      setStep("id-verification");
    } else {
      toast({ title: "¡Listo!", description: "Tu cuenta ha sido configurada." });
      navigate("/admin");
    }
  };

  const handleAgeConfirm = async (isMinor: boolean) => {
    await updateProfile({ is_minor: isMinor });
    toast({
      title: "¡Bienvenido!",
      description: isMinor
        ? "Recuerda que necesitarás un tutor para tus citas."
        : "Tu cuenta está lista.",
    });
    navigate("/");
  };

  const handleIdUpload = async () => {
    if (!idFile || !authUser) return;
    setLoading(true);

    const filePath = `${authUser.id}/${Date.now()}_${idFile.name}`;
    const { error: uploadError } = await supabase.storage
      .from("id-verifications")
      .upload(filePath, idFile);

    if (uploadError) {
      toast({ title: "Error", description: "No se pudo subir la imagen.", variant: "destructive" });
      setLoading(false);
      return;
    }

    const { error: insertError } = await supabase.from("id_verifications").insert({
      user_id: authUser.id,
      id_image_url: filePath,
    });

    setLoading(false);

    if (insertError) {
      toast({ title: "Error", description: "No se pudo guardar la verificación.", variant: "destructive" });
      return;
    }

    toast({
      title: "¡Identificación enviada!",
      description: "Tu identidad será verificada pronto. Podrás usar la plataforma mientras tanto.",
    });

    if (selectedRole === "artist") navigate("/dashboard");
    else if (selectedRole === "supplier") navigate("/dashboard-proveedor");
    else navigate("/");
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="flex items-center justify-center px-4 pt-28 pb-12">
        {step === "role" && (
          <Card className="w-full max-w-lg border-border bg-card">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl text-foreground">¿Qué deseas hacer?</CardTitle>
              <CardDescription>Selecciona tu tipo de cuenta para personalizar tu experiencia</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                {([
                  { role: "client" as UserRole, icon: User, label: "Cliente", desc: "Busco tatuarme" },
                  { role: "artist" as UserRole, icon: Palette, label: "Tatuador", desc: "Soy artista" },
                  { role: "supplier" as UserRole, icon: Store, label: "Proveedor", desc: "Vendo insumos" },
                  { role: "admin" as UserRole, icon: ShieldCheck, label: "Administrador", desc: "Gestionar plataforma" },
                ]).map(({ role, icon: Icon, label, desc }) => (
                  <button
                    key={role}
                    type="button"
                    onClick={() => setSelectedRole(role)}
                    className={`flex flex-col items-center gap-2 rounded-lg border-2 p-4 transition-all ${
                      selectedRole === role
                        ? "border-primary bg-primary/10 text-primary"
                        : "border-border bg-secondary/30 text-muted-foreground hover:border-muted-foreground"
                    }`}
                  >
                    <Icon className="h-6 w-6" />
                    <span className="text-sm font-medium">{label}</span>
                    <span className="text-xs text-center opacity-70">{desc}</span>
                  </button>
                ))}
              </div>
              <Button onClick={handleRoleSelect} className="w-full" disabled={!selectedRole || loading}>
                {loading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
                Continuar
              </Button>
            </CardContent>
          </Card>
        )}

        {step === "age" && (
          <Card className="w-full max-w-md border-border bg-card">
            <CardHeader className="text-center">
              <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
                <ShieldCheck className="h-7 w-7 text-primary" />
              </div>
              <CardTitle className="text-xl">Verificación de Edad</CardTitle>
              <CardDescription>¿Eres mayor de 18 años?</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-3">
              <Button onClick={() => handleAgeConfirm(false)} className="w-full">
                <ShieldCheck className="w-4 h-4 mr-2" />
                Sí, soy mayor de 18 años
              </Button>
              <Button
                onClick={() => handleAgeConfirm(true)}
                variant="secondary"
                className="w-full border border-border"
              >
                <ShieldAlert className="w-4 h-4 mr-2" />
                No, soy menor de 18 años
              </Button>
            </CardContent>
          </Card>
        )}

        {step === "id-verification" && (
          <Card className="w-full max-w-md border-border bg-card">
            <CardHeader className="text-center">
              <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
                <Upload className="h-7 w-7 text-primary" />
              </div>
              <CardTitle className="text-xl">Verificación de Identidad</CardTitle>
              <CardDescription>
                Sube una foto de tu identificación oficial para validar tu cuenta como{" "}
                {selectedRole === "artist" ? "tatuador" : "proveedor"}.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Identificación oficial (INE, pasaporte, etc.)</Label>
                <Input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setIdFile(e.target.files?.[0] || null)}
                />
              </div>
              {idFile && (
                <div className="rounded-lg border border-border p-2">
                  <img
                    src={URL.createObjectURL(idFile)}
                    alt="Preview"
                    className="w-full h-48 object-contain rounded"
                  />
                </div>
              )}
              <Button onClick={handleIdUpload} className="w-full" disabled={!idFile || loading}>
                {loading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Upload className="h-4 w-4 mr-2" />}
                Enviar identificación
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Onboarding;
