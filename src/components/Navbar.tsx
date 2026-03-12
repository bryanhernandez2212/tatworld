import { Link } from "react-router-dom";
import { CalendarDays } from "lucide-react";

const Navbar = () => {
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
        <Link
          to="/mis-citas"
          className="flex items-center gap-1.5 text-sm text-foreground hover:text-primary transition-colors"
        >
          <CalendarDays className="w-4 h-4" />
          <span className="hidden sm:inline">Mis Citas</span>
        </Link>
        <button className="text-sm text-foreground hover:text-primary transition-colors">Iniciar Sesión</button>
        <button className="px-5 py-2 text-sm font-medium rounded-lg bg-primary text-primary-foreground hover:opacity-90 transition-opacity">
          Registrarse
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
