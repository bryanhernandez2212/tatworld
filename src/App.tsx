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
import Register from "./pages/Register.tsx";
import NotFound from "./pages/NotFound.tsx";

const queryClient = new QueryClient();

const App = () => (
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

export default App;
