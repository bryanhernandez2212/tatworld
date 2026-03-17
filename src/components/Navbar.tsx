import { Link, useNavigate } from "react-router-dom";
import { CalendarDays, LogOut, User, LayoutDashboard } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const isArtist = user?.role === "artist";

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
        {user && !isArtist && (
          <Link
            to="/mis-citas"
            className="flex items-center gap-1.5 text-sm text-foreground hover:text-primary transition-colors"
          >
            <CalendarDays className="w-4 h-4" />
            <span className="hidden sm:inline">Mis Citas</span>
          </Link>
        )}

        {user && isArtist && (
          <Link
            to="/dashboard"
            className="flex items-center gap-1.5 text-sm text-foreground hover:text-primary transition-colors"
          >
            <LayoutDashboard className="w-4 h-4" />
            <span className="hidden sm:inline">Mi Panel</span>
          </Link>
        )}

        {user ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="outline-none">
                <Avatar className="h-8 w-8 cursor-pointer hover:ring-2 hover:ring-primary transition-all">
                  <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                    {user.name.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-44">
              <div className="px-2 py-1.5">
                <p className="text-sm font-medium text-foreground">{user.name}</p>
                <p className="text-xs text-muted-foreground">{isArtist ? "Tatuador" : "Cliente"}</p>
              </div>
              <DropdownMenuSeparator />
              {isArtist && (
                <DropdownMenuItem onClick={() => navigate("/dashboard")} className="cursor-pointer">
                  <LayoutDashboard className="w-4 h-4 mr-2" />
                  Mi Panel
                </DropdownMenuItem>
              )}
              <DropdownMenuItem onClick={handleLogout} className="cursor-pointer">
                <LogOut className="w-4 h-4 mr-2" />
                Cerrar Sesión
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <>
            <Button asChild variant="ghost" size="sm">
              <Link to="/login">Iniciar Sesión</Link>
            </Button>
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
