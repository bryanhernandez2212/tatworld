import { useAuth } from "@/contexts/AuthContext";
import { Navigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Users, FileText, Megaphone, Paintbrush } from "lucide-react";
import AdminUsersTab from "@/components/admin/AdminUsersTab";
import AdminPublicationsTab from "@/components/admin/AdminPublicationsTab";
import AdminAdsTab from "@/components/admin/AdminAdsTab";
import AdminThemeTab from "@/components/admin/AdminThemeTab";

const AdminDashboard = () => {
  const { user } = useAuth();

  if (!user || user.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="max-w-6xl mx-auto px-4 pt-24 pb-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">Panel de Administración</h1>
          <p className="text-muted-foreground mt-1">Gestiona usuarios, contenido y configuración de la plataforma</p>
        </div>

        <Tabs defaultValue="users" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-secondary">
            <TabsTrigger value="users" className="flex items-center gap-1 text-xs sm:text-sm">
              <Users className="h-4 w-4" />
              <span className="hidden sm:inline">Usuarios</span>
            </TabsTrigger>
            <TabsTrigger value="publications" className="flex items-center gap-1 text-xs sm:text-sm">
              <FileText className="h-4 w-4" />
              <span className="hidden sm:inline">Publicaciones</span>
            </TabsTrigger>
            <TabsTrigger value="ads" className="flex items-center gap-1 text-xs sm:text-sm">
              <Megaphone className="h-4 w-4" />
              <span className="hidden sm:inline">Publicidad</span>
            </TabsTrigger>
            <TabsTrigger value="theme" className="flex items-center gap-1 text-xs sm:text-sm">
              <Paintbrush className="h-4 w-4" />
              <span className="hidden sm:inline">Tema</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="users"><AdminUsersTab /></TabsContent>
          <TabsContent value="publications"><AdminPublicationsTab /></TabsContent>
          <TabsContent value="ads"><AdminAdsTab /></TabsContent>
          <TabsContent value="theme"><AdminThemeTab /></TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;
