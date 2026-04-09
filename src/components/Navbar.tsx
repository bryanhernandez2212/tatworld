import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CalendarDays, LogOut, LayoutDashboard, Menu, X } from "lucide-react";
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
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/");
    setMobileOpen(false);
  };

  const isArtist = user?.role === "artist";
  const isSupplier = user?.role === "supplier";
  const isAdmin = user?.role === "admin";
  const hasDashboard = isArtist || isSupplier || isAdmin;
  const dashboardPath = isArtist ? "/dashboard" : isSupplier ? "/dashboard-proveedor" : isAdmin ? "/admin" : "";
  const roleLabel = isArtist ? "Tatuador" : isSupplier ? "Proveedor" : isAdmin ? "Administrador" : "Cliente";

  const navLinks = [
    { to: "/", label: "Buscar Tatuadores" },
    { to: "/convenciones", label: "Convenciones" },
    { to: "/proveedores", label: "Proveedores" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="flex items-center justify-between px-6 py-4">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-primary" />
          <span className="text-lg font-bold text-foreground">TattsNearby</span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link key={link.to} to={link.to} className="text-sm text-foreground hover:text-primary transition-colors">
              {link.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-4">
          {/* Desktop user links */}
          <div className="hidden md:flex items-center gap-4">
            {user && user.role === "client" && (
              <Link to="/mis-citas" className="flex items-center gap-1.5 text-sm text-foreground hover:text-primary transition-colors">
                <CalendarDays className="w-4 h-4" />
                <span>Mis Citas</span>
              </Link>
            )}
            {user && hasDashboard && (
              <Link to={dashboardPath} className="flex items-center gap-1.5 text-sm text-foreground hover:text-primary transition-colors">
                <LayoutDashboard className="w-4 h-4" />
                <span>Mi Panel</span>
              </Link>
            )}
          </div>

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
                  <p className="text-xs text-muted-foreground">{roleLabel}</p>
                </div>
                <DropdownMenuSeparator />
                {hasDashboard && (
                  <DropdownMenuItem onClick={() => navigate(dashboardPath)} className="cursor-pointer">
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
            <div className="hidden md:flex items-center gap-2">
              <Button asChild variant="ghost" size="sm">
                <Link to="/login">Iniciar Sesión</Link>
              </Button>
              <Button asChild size="sm">
                <Link to="/registro">Registrarse</Link>
              </Button>
            </div>
          )}

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-1.5 text-foreground hover:text-primary transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? "Cerrar menú" : "Abrir menú"}
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-border bg-background/95 backdrop-blur-md px-6 pb-6 pt-4 space-y-4 animate-in slide-in-from-top-2 duration-200">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => setMobileOpen(false)}
              className="block text-foreground hover:text-primary transition-colors py-2 text-base font-medium"
            >
              {link.label}
            </Link>
          ))}

          {user && user.role === "client" && (
            <Link
              to="/mis-citas"
              onClick={() => setMobileOpen(false)}
              className="flex items-center gap-2 text-foreground hover:text-primary transition-colors py-2 text-base font-medium"
            >
              <CalendarDays className="w-4 h-4" /> Mis Citas
            </Link>
          )}

          {user && hasDashboard && (
            <Link
              to={dashboardPath}
              onClick={() => setMobileOpen(false)}
              className="flex items-center gap-2 text-foreground hover:text-primary transition-colors py-2 text-base font-medium"
            >
              <LayoutDashboard className="w-4 h-4" /> Mi Panel
            </Link>
          )}

          {!user && (
            <div className="flex flex-col gap-2 pt-2 border-t border-border">
              <Button asChild variant="ghost" size="sm" className="justify-start">
                <Link to="/login" onClick={() => setMobileOpen(false)}>Iniciar Sesión</Link>
              </Button>
              <Button asChild size="sm" className="justify-start">
                <Link to="/registro" onClick={() => setMobileOpen(false)}>Registrarse</Link>
              </Button>
            </div>
          )}

          {user && (
            <div className="pt-2 border-t border-border">
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 text-muted-foreground hover:text-destructive transition-colors py-2 text-sm"
              >
                <LogOut className="w-4 h-4" /> Cerrar Sesión
              </button>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
