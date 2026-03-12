import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { format, parseISO, isAfter, isBefore, startOfDay } from "date-fns";
import { es } from "date-fns/locale";
import { MapPin, CalendarDays, Filter, X, Ticket } from "lucide-react";
import Navbar from "@/components/Navbar";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { conventions, getAllCities, getAllStyles } from "@/data/conventions";

const Convenciones = () => {
  const [cityFilter, setCityFilter] = useState<string>("all");
  const [styleFilter, setStyleFilter] = useState<string>("all");
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [showCalendar, setShowCalendar] = useState(false);

  const cities = getAllCities();
  const styles = getAllStyles();

  const filtered = useMemo(() => {
    return conventions.filter((c) => {
      if (cityFilter !== "all" && c.city !== cityFilter) return false;
      if (styleFilter !== "all" && !c.styles.includes(styleFilter)) return false;
      if (selectedDate) {
        const from = startOfDay(parseISO(c.dateFrom));
        const to = startOfDay(parseISO(c.dateTo));
        const sel = startOfDay(selectedDate);
        if (isBefore(sel, from) || isAfter(sel, to)) return false;
      }
      return true;
    });
  }, [cityFilter, styleFilter, selectedDate]);

  // Dates that have conventions for calendar highlighting
  const conventionDates = useMemo(() => {
    const dates: Date[] = [];
    conventions.forEach((c) => {
      const from = parseISO(c.dateFrom);
      const to = parseISO(c.dateTo);
      let current = new Date(from);
      while (current <= to) {
        dates.push(new Date(current));
        current.setDate(current.getDate() + 1);
      }
    });
    return dates;
  }, []);

  const hasFilters = cityFilter !== "all" || styleFilter !== "all" || selectedDate;

  const clearFilters = () => {
    setCityFilter("all");
    setStyleFilter("all");
    setSelectedDate(undefined);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-24 px-6 max-w-7xl mx-auto pb-16">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Convenciones de Tatuajes</h1>
          <p className="text-muted-foreground">Descubre los próximos eventos y convenciones en México</p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-3 mb-8">
          <Filter className="w-4 h-4 text-muted-foreground" />

          <Select value={cityFilter} onValueChange={setCityFilter}>
            <SelectTrigger className="w-[160px] bg-card border-border">
              <SelectValue placeholder="Ciudad" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas las ciudades</SelectItem>
              {cities.map((city) => (
                <SelectItem key={city} value={city}>{city}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={styleFilter} onValueChange={setStyleFilter}>
            <SelectTrigger className="w-[180px] bg-card border-border">
              <SelectValue placeholder="Estilo" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos los estilos</SelectItem>
              {styles.map((style) => (
                <SelectItem key={style} value={style}>{style}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Button
            variant={showCalendar ? "default" : "outline"}
            size="sm"
            onClick={() => setShowCalendar(!showCalendar)}
          >
            <CalendarDays className="w-4 h-4 mr-1" />
            {selectedDate ? format(selectedDate, "d MMM", { locale: es }) : "Fecha"}
          </Button>

          {hasFilters && (
            <Button variant="ghost" size="sm" onClick={clearFilters}>
              <X className="w-4 h-4 mr-1" /> Limpiar
            </Button>
          )}
        </div>

        {/* Calendar */}
        {showCalendar && (
          <div className="mb-8 flex justify-center">
            <div className="bg-card border border-border rounded-lg p-2">
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={(date) => {
                  setSelectedDate(date);
                  setShowCalendar(false);
                }}
                modifiers={{ convention: conventionDates }}
                modifiersClassNames={{ convention: "bg-primary/20 text-primary font-bold" }}
                className="pointer-events-auto"
              />
              <p className="text-xs text-muted-foreground text-center mt-1">
                Los días resaltados tienen convenciones
              </p>
            </div>
          </div>
        )}

        {/* Results */}
        <p className="text-sm text-muted-foreground mb-4">
          {filtered.length} {filtered.length === 1 ? "convención encontrada" : "convenciones encontradas"}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filtered.map((conv) => (
            <Link key={conv.slug} to={`/convencion/${conv.slug}`}>
              <Card className="overflow-hidden hover:border-primary/50 transition-colors group cursor-pointer bg-card border-border">
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={conv.image}
                    alt={conv.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                  <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between">
                    <div>
                      <h3 className="text-lg font-bold text-foreground">{conv.name}</h3>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <MapPin className="w-3 h-3" />
                        {conv.city} · {conv.venue}
                      </div>
                    </div>
                  </div>
                </div>
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <CalendarDays className="w-4 h-4 text-primary" />
                    <span className="text-sm text-foreground">
                      {format(parseISO(conv.dateFrom), "d MMM", { locale: es })} – {format(parseISO(conv.dateTo), "d MMM yyyy", { locale: es })}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground line-clamp-2 mb-3">{conv.description}</p>
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {conv.styles.slice(0, 4).map((s) => (
                      <Badge key={s} variant="secondary" className="text-xs">{s}</Badge>
                    ))}
                    {conv.styles.length > 4 && (
                      <Badge variant="secondary" className="text-xs">+{conv.styles.length - 4}</Badge>
                    )}
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">
                      {conv.artistSlugs.length} artistas confirmados
                    </span>
                    <div className="flex items-center gap-1 text-primary text-sm font-medium">
                      <Ticket className="w-3.5 h-3.5" />
                      Desde ${Math.min(...conv.tickets.map(t => t.price))} MXN
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-16">
            <CalendarDays className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">No se encontraron convenciones con esos filtros</p>
            <Button variant="outline" size="sm" className="mt-4" onClick={clearFilters}>Limpiar filtros</Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Convenciones;
