import { useAuth } from "@/contexts/AuthContext";
import { Navigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Image as ImageIcon, Zap, CalendarDays, UserCog, Clock } from "lucide-react";
import GalleryTab from "@/components/dashboard/GalleryTab";
import FlashTab from "@/components/dashboard/FlashTab";
import AppointmentsTab from "@/components/dashboard/AppointmentsTab";
import ScheduleTab from "@/components/dashboard/ScheduleTab";
import ProfileTab from "@/components/dashboard/ProfileTab";
import { useToast } from "@/hooks/use-toast";

const ArtistDashboard = () => {
  const { user, updateProfile } = useAuth();
  const { toast } = useToast();

  if (!user || user.role !== "artist") {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="max-w-5xl mx-auto px-4 pt-24 pb-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">Panel de Tatuador</h1>
          <p className="text-muted-foreground mt-1">Administra tu perfil, galería y citas</p>
        </div>

        <Tabs defaultValue="gallery" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5 bg-secondary">
            <TabsTrigger value="gallery" className="flex items-center gap-1 text-xs sm:text-sm">
              <ImageIcon className="h-4 w-4" />
              <span className="hidden sm:inline">Galería</span>
            </TabsTrigger>
            <TabsTrigger value="flash" className="flex items-center gap-1 text-xs sm:text-sm">
              <Zap className="h-4 w-4" />
              <span className="hidden sm:inline">Flash</span>
            </TabsTrigger>
            <TabsTrigger value="appointments" className="flex items-center gap-1 text-xs sm:text-sm">
              <CalendarDays className="h-4 w-4" />
              <span className="hidden sm:inline">Citas</span>
            </TabsTrigger>
            <TabsTrigger value="schedule" className="flex items-center gap-1 text-xs sm:text-sm">
              <Clock className="h-4 w-4" />
              <span className="hidden sm:inline">Agenda</span>
            </TabsTrigger>
            <TabsTrigger value="profile" className="flex items-center gap-1 text-xs sm:text-sm">
              <UserCog className="h-4 w-4" />
              <span className="hidden sm:inline">Perfil</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="gallery">
            <GalleryTab user={user} updateProfile={updateProfile} toast={toast} />
          </TabsContent>
          <TabsContent value="flash">
            <FlashTab user={user} updateProfile={updateProfile} toast={toast} />
          </TabsContent>
          <TabsContent value="appointments">
            <AppointmentsTab />
          </TabsContent>
          <TabsContent value="schedule">
            <ScheduleTab />
          </TabsContent>
          <TabsContent value="profile">
            <ProfileTab user={user} updateProfile={updateProfile} toast={toast} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ArtistDashboard;
