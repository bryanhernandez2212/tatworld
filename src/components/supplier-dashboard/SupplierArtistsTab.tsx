import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, UserPlus, X, Users } from "lucide-react";
import { artists } from "@/data/artists";

interface Props {
  user: any;
  updateProfile: (data: any) => void;
  toast: any;
}

export default function SupplierArtistsTab({ user, updateProfile, toast }: Props) {
  const [sponsored, setSponsored] = useState<string[]>(user.sponsoredArtists || []);
  const [search, setSearch] = useState("");

  const filtered = artists.filter(
    (a) =>
      !sponsored.includes(a.slug) &&
      (a.name.toLowerCase().includes(search.toLowerCase()) ||
        a.styles.some((s) => s.toLowerCase().includes(search.toLowerCase())))
  );

  const handleAdd = (slug: string) => {
    const updated = [...sponsored, slug];
    setSponsored(updated);
    updateProfile({ sponsoredArtists: updated });
    toast({ title: "Artista patrocinado agregado" });
  };

  const handleRemove = (slug: string) => {
    const updated = sponsored.filter((s) => s !== slug);
    setSponsored(updated);
    updateProfile({ sponsoredArtists: updated });
    toast({ title: "Patrocinio removido" });
  };

  const sponsoredArtists = artists.filter((a) => sponsored.includes(a.slug));

  return (
    <Card className="border-border bg-card">
      <CardHeader>
        <CardTitle className="text-foreground">Artistas Patrocinados</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Current sponsored */}
        {sponsoredArtists.length > 0 && (
          <div className="space-y-3">
            <h3 className="text-sm font-medium text-muted-foreground">Patrocinados actuales</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {sponsoredArtists.map((a) => (
                <div key={a.slug} className="flex items-center gap-3 p-3 rounded-lg border border-border bg-secondary/30">
                  <img src={a.image} alt={a.name} className="h-10 w-10 rounded-full object-cover" />
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-foreground text-sm truncate">{a.name}</p>
                    <p className="text-xs text-muted-foreground">{a.city}</p>
                  </div>
                  <Button size="sm" variant="ghost" onClick={() => handleRemove(a.slug)}>
                    <X className="h-4 w-4 text-destructive" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Search */}
        <div className="space-y-3">
          <h3 className="text-sm font-medium text-muted-foreground">Buscar artistas</h3>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar por nombre o estilo..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9"
            />
          </div>
          {search && (
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {filtered.length === 0 ? (
                <p className="text-sm text-muted-foreground text-center py-4">No se encontraron artistas.</p>
              ) : (
                filtered.map((a) => (
                  <div key={a.slug} className="flex items-center gap-3 p-3 rounded-lg border border-border hover:bg-secondary/20 transition-colors">
                    <img src={a.image} alt={a.name} className="h-10 w-10 rounded-full object-cover" />
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-foreground text-sm">{a.name}</p>
                      <div className="flex gap-1 flex-wrap">
                        {a.styles.slice(0, 3).map((s) => (
                          <Badge key={s} variant="secondary" className="text-[10px]">{s}</Badge>
                        ))}
                      </div>
                    </div>
                    <Button size="sm" variant="outline" onClick={() => handleAdd(a.slug)}>
                      <UserPlus className="h-4 w-4 mr-1" /> Agregar
                    </Button>
                  </div>
                ))
              )}
            </div>
          )}
        </div>

        {sponsoredArtists.length === 0 && !search && (
          <div className="text-center py-12 text-muted-foreground">
            <Users className="h-12 w-12 mx-auto mb-3 opacity-40" />
            <p>Aún no patrocinas a ningún artista.</p>
            <p className="text-sm">Usa el buscador para encontrar artistas.</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
