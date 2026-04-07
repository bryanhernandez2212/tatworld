import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { Eye, EyeOff, LogIn, User, Palette } from "lucide-react";
import { UserRole } from "@/contexts/AuthContext";
import Navbar from "@/components/Navbar";
import AgeVerificationDialog from "@/components/AgeVerificationDialog";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedRole, setSelectedRole] = useState<UserRole>("client");
  const [showAgeDialog, setShowAgeDialog] = useState(false);
  const { quickLogin, updateProfile } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    quickLogin(selectedRole);
    setLoading(false);

    if (selectedRole === "client") {
      setShowAgeDialog(true);
    } else {
      toast({
        title: "¡Bienvenido!",
        description: "Has iniciado sesión como tatuador.",
      });
      navigate("/dashboard");
    }
  };

  const handleAgeConfirm = (isMinor: boolean) => {
    setShowAgeDialog(false);
    updateProfile({ isMinor });
    toast({
      title: "¡Bienvenido!",
      description: isMinor
        ? "Has iniciado sesión. Recuerda que necesitarás un tutor para tus citas."
        : "Has iniciado sesión correctamente.",
    });
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="flex items-center justify-center px-4 pt-28 pb-12">
        <Card className="w-full max-w-md border-border bg-card">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
              <LogIn className="h-6 w-6 text-primary" />
            </div>
            <CardTitle className="text-2xl text-foreground">Iniciar Sesión</CardTitle>
            <CardDescription>Selecciona tu tipo de cuenta e ingresa tus credenciales</CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-5">
              {/* Role selector */}
              <div className="space-y-2">
                <Label>Tipo de cuenta</Label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setSelectedRole("client")}
                    className={`flex flex-col items-center gap-2 rounded-lg border-2 p-4 transition-all ${
                      selectedRole === "client"
                        ? "border-primary bg-primary/10 text-primary"
                        : "border-border bg-secondary/30 text-muted-foreground hover:border-muted-foreground"
                    }`}
                  >
                    <User className="h-6 w-6" />
                    <span className="text-sm font-medium">Cliente</span>
                    <span className="text-xs text-center opacity-70">Busco tatuarme</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedRole("artist")}
                    className={`flex flex-col items-center gap-2 rounded-lg border-2 p-4 transition-all ${
                      selectedRole === "artist"
                        ? "border-primary bg-primary/10 text-primary"
                        : "border-border bg-secondary/30 text-muted-foreground hover:border-muted-foreground"
                    }`}
                  >
                    <Palette className="h-6 w-6" />
                    <span className="text-sm font-medium">Tatuador</span>
                    <span className="text-xs text-center opacity-70">Soy artista</span>
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Correo electrónico</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="tu@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Contraseña</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col gap-4">
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Ingresando..." : "Iniciar Sesión"}
              </Button>
              <p className="text-sm text-muted-foreground text-center">
                ¿No tienes cuenta?{" "}
                <Link to="/registro" className="text-primary hover:underline font-medium">
                  Regístrate aquí
                </Link>
              </p>
            </CardFooter>
          </form>
        </Card>
      </div>
      <AgeVerificationDialog open={showAgeDialog} onConfirm={handleAgeConfirm} />
    </div>
  );
};

export default Login;