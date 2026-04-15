import { useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/contexts/AuthContext";
import Index from "./pages/Index.tsx";
import ArtistProfile from "./pages/ArtistProfile.tsx";
import ArtistDashboard from "./pages/ArtistDashboard.tsx";
import MisCitas from "./pages/MisCitas.tsx";
import Proveedores from "./pages/Proveedores.tsx";
import SupplierProfile from "./pages/SupplierProfile.tsx";
import Convenciones from "./pages/Convenciones.tsx";
import ConventionDetail from "./pages/ConventionDetail.tsx";
import Login from "./pages/Login.tsx";
import SupplierDashboard from "./pages/SupplierDashboard.tsx";
import AdminDashboard from "./pages/AdminDashboard.tsx";
import Register from "./pages/Register.tsx";
import Onboarding from "./pages/Onboarding.tsx";
import NotFound from "./pages/NotFound.tsx";

const queryClient = new QueryClient();

function applyStoredTheme() {
  try {
    const saved = localStorage.getItem("tattsnearby_theme");
    if (!saved) return;
    const colors = JSON.parse(saved);
    const hexToHSL = (hex: string) => {
      let r = parseInt(hex.slice(1, 3), 16) / 255;
      let g = parseInt(hex.slice(3, 5), 16) / 255;
      let b = parseInt(hex.slice(5, 7), 16) / 255;
      const max = Math.max(r, g, b), min = Math.min(r, g, b);
      let h = 0, s = 0;
      const l = (max + min) / 2;
      if (max !== min) {
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
          case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
          case g: h = ((b - r) / d + 2) / 6; break;
          case b: h = ((r - g) / d + 4) / 6; break;
        }
      }
      return `${Math.round(h * 360)} ${Math.round(s * 100)}% ${Math.round(l * 100)}%`;
    };
    const root = document.documentElement;
    if (colors.primary) { root.style.setProperty("--primary", hexToHSL(colors.primary)); root.style.setProperty("--accent", hexToHSL(colors.primary)); root.style.setProperty("--ring", hexToHSL(colors.primary)); root.style.setProperty("--sidebar-primary", hexToHSL(colors.primary)); root.style.setProperty("--sidebar-ring", hexToHSL(colors.primary)); }
    if (colors.background) root.style.setProperty("--background", hexToHSL(colors.background));
    if (colors.card) { root.style.setProperty("--card", hexToHSL(colors.card)); root.style.setProperty("--popover", hexToHSL(colors.card)); }
    if (colors.border) { root.style.setProperty("--border", hexToHSL(colors.border)); root.style.setProperty("--input", hexToHSL(colors.border)); }
    if (colors.muted) { root.style.setProperty("--muted", hexToHSL(colors.muted)); root.style.setProperty("--secondary", hexToHSL(colors.muted)); }
  } catch { /* ignore */ }
}

// Apply on load
applyStoredTheme();

const App = () => {
  useEffect(() => { applyStoredTheme(); }, []);
  return (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/tatuador/:slug" element={<ArtistProfile />} />
            <Route path="/dashboard" element={<ArtistDashboard />} />
            <Route path="/dashboard-proveedor" element={<SupplierDashboard />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/mis-citas" element={<MisCitas />} />
            <Route path="/proveedores" element={<Proveedores />} />
            <Route path="/proveedor/:slug" element={<SupplierProfile />} />
            <Route path="/convenciones" element={<Convenciones />} />
            <Route path="/convencion/:slug" element={<ConventionDetail />} />
            <Route path="/login" element={<Login />} />
            <Route path="/registro" element={<Register />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
  );
};

export default App;
