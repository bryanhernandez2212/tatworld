import { Link, useNavigate } from "react-router-dom";
import { CalendarDays, LogOut, User } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 bg-background/80 backdrop-blur-md border-b border-border">
      <Link to="/" className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-full bg-primary" />
        <span className="text-lg font-bold text-foreground">TattsNearby</span>
      </Link>

      <div className="hidden md:flex items-center gap-8">
        <Link to="/" className="text-sm text-foreground hover:text-primary transition-colors">Buscar Tatuadores</Link>
        <Link to="/convenciones" className="text-sm text-foreground hover:text-primary transition-colors">Convenciones</Link>
        <Link to="/proveedores" className="text-sm text-foreground hover:text-primary transition-colors">Proveedores</Link>
      </div>

      <div className="flex items-center gap-4">
        {user && (
          <Link
            to="/mis-citas"
            className="flex items-center gap-1.5 text-sm text-foreground hover:text-primary transition-colors"
          >
            <CalendarDays className="w-4 h-4" />
            <span className="hidden sm:inline">Mis Citas</span>
          </Link>
        )}

        {user ? (
          <div className="flex items-center gap-3">
            <Link
              to="/perfil"
              className="flex items-center gap-1.5 text-sm text-foreground hover:text-primary transition-colors"
            >
              <User className="w-4 h-4" />
              <span className="hidden sm:inline">{user.name}</span>
            </Link>
            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <>
            <Link to="/login" className="text-sm text-foreground hover:text-primary transition-colors">
              Iniciar Sesión
            </Link>
            <Button asChild size="sm">
              <Link to="/registro">Registrarse</Link>
            </Button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
