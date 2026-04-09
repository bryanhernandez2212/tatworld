import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Ban, CheckCircle, Trash2, User, Palette, Store, ShieldCheck } from "lucide-react";

interface MockUser {
  id: string;
  name: string;
  email: string;
  role: string;
  status: "active" | "banned";
  createdAt: string;
}

const INITIAL_USERS: MockUser[] = [
  { id: "1", name: "Carlos Mendoza", email: "carlos@email.com", role: "client", status: "active", createdAt: "2025-01-15" },
  { id: "2", name: "María Torres", email: "maria@email.com", role: "artist", status: "active", createdAt: "2025-02-20" },
  { id: "3", name: "Ink Supply MX", email: "inksupply@email.com", role: "supplier", status: "active", createdAt: "2025-03-10" },
  { id: "4", name: "Ana López", email: "ana@email.com", role: "client", status: "active", createdAt: "2025-04-01" },
  { id: "5", name: "Roberto Ink", email: "roberto@email.com", role: "artist", status: "banned", createdAt: "2025-01-05" },
  { id: "6", name: "Laura Diseños", email: "laura@email.com", role: "artist", status: "active", createdAt: "2025-05-12" },
];

const roleIcons: Record<string, React.ReactNode> = {
  client: <User className="h-3.5 w-3.5" />,
  artist: <Palette className="h-3.5 w-3.5" />,
  supplier: <Store className="h-3.5 w-3.5" />,
  admin: <ShieldCheck className="h-3.5 w-3.5" />,
};

const roleLabels: Record<string, string> = {
  client: "Cliente",
  artist: "Tatuador",
  supplier: "Proveedor",
  admin: "Admin",
};

export default function AdminUsersTab() {
  const [users, setUsers] = useState<MockUser[]>(INITIAL_USERS);
  const [search, setSearch] = useState("");
  const [filterRole, setFilterRole] = useState("all");

  const filtered = users.filter((u) => {
    const matchSearch = u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase());
    const matchRole = filterRole === "all" || u.role === filterRole;
    return matchSearch && matchRole;
  });

  const toggleBan = (id: string) => {
    setUsers((prev) => prev.map((u) => (u.id === id ? { ...u, status: u.status === "active" ? "banned" : "active" } : u)));
  };

  const deleteUser = (id: string) => {
    setUsers((prev) => prev.filter((u) => u.id !== id));
  };

  return (
    <Card className="border-border bg-card">
      <CardHeader>
        <CardTitle className="text-foreground">Gestión de Usuarios</CardTitle>
        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Buscar por nombre o email..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9" />
          </div>
          <Select value={filterRole} onValueChange={setFilterRole}>
            <SelectTrigger className="w-full sm:w-40">
              <SelectValue placeholder="Filtrar rol" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos</SelectItem>
              <SelectItem value="client">Clientes</SelectItem>
              <SelectItem value="artist">Tatuadores</SelectItem>
              <SelectItem value="supplier">Proveedores</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {filtered.map((u) => (
            <div key={u.id} className="flex items-center gap-4 p-4 rounded-lg border border-border bg-secondary/20">
              <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                {roleIcons[u.role]}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-foreground truncate">{u.name}</p>
                <p className="text-xs text-muted-foreground">{u.email}</p>
              </div>
              <Badge variant="secondary" className="hidden sm:flex">{roleLabels[u.role]}</Badge>
              <Badge variant={u.status === "active" ? "default" : "destructive"}>
                {u.status === "active" ? "Activo" : "Baneado"}
              </Badge>
              <div className="flex gap-1">
                <Button size="icon" variant="ghost" onClick={() => toggleBan(u.id)} title={u.status === "active" ? "Banear" : "Reactivar"}>
                  {u.status === "active" ? <Ban className="h-4 w-4 text-destructive" /> : <CheckCircle className="h-4 w-4 text-green-500" />}
                </Button>
                <Button size="icon" variant="ghost" onClick={() => deleteUser(u.id)} title="Eliminar">
                  <Trash2 className="h-4 w-4 text-destructive" />
                </Button>
              </div>
            </div>
          ))}
          {filtered.length === 0 && <p className="text-center py-8 text-muted-foreground">No se encontraron usuarios.</p>}
        </div>
      </CardContent>
    </Card>
  );
}
