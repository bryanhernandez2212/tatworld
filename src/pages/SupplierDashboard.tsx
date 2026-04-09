import { useAuth } from "@/contexts/AuthContext";
import { Navigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Package, Tag, Users, UserCog } from "lucide-react";
import SupplierProductsTab from "@/components/supplier-dashboard/SupplierProductsTab";
import SupplierPromotionsTab from "@/components/supplier-dashboard/SupplierPromotionsTab";
import SupplierArtistsTab from "@/components/supplier-dashboard/SupplierArtistsTab";
import SupplierProfileTab from "@/components/supplier-dashboard/SupplierProfileTab";
import { useToast } from "@/hooks/use-toast";

const SupplierDashboard = () => {
  const { user, updateProfile } = useAuth();
  const { toast } = useToast();

  if (!user || user.role !== "supplier") {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="max-w-5xl mx-auto px-4 pt-24 pb-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">Panel de Proveedor</h1>
          <p className="text-muted-foreground mt-1">Administra tus productos, promociones y artistas patrocinados</p>
        </div>

        <Tabs defaultValue="products" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-secondary">
            <TabsTrigger value="products" className="flex items-center gap-1 text-xs sm:text-sm">
              <Package className="h-4 w-4" />
              <span className="hidden sm:inline">Productos</span>
            </TabsTrigger>
            <TabsTrigger value="promotions" className="flex items-center gap-1 text-xs sm:text-sm">
              <Tag className="h-4 w-4" />
              <span className="hidden sm:inline">Promociones</span>
            </TabsTrigger>
            <TabsTrigger value="artists" className="flex items-center gap-1 text-xs sm:text-sm">
              <Users className="h-4 w-4" />
              <span className="hidden sm:inline">Artistas</span>
            </TabsTrigger>
            <TabsTrigger value="profile" className="flex items-center gap-1 text-xs sm:text-sm">
              <UserCog className="h-4 w-4" />
              <span className="hidden sm:inline">Perfil</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="products">
            <SupplierProductsTab user={user} updateProfile={updateProfile} toast={toast} />
          </TabsContent>
          <TabsContent value="promotions">
            <SupplierPromotionsTab user={user} updateProfile={updateProfile} toast={toast} />
          </TabsContent>
          <TabsContent value="artists">
            <SupplierArtistsTab user={user} updateProfile={updateProfile} toast={toast} />
          </TabsContent>
          <TabsContent value="profile">
            <SupplierProfileTab user={user} updateProfile={updateProfile} toast={toast} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default SupplierDashboard;
