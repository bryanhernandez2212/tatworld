import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ArtistsGrid from "@/components/ArtistsGrid";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <ArtistsGrid />
    </div>
  );
};

export default Index;
