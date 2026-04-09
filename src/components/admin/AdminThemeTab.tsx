import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { RotateCcw } from "lucide-react";

const THEME_KEY = "tattsnearby_theme";

interface ThemeColors {
  primary: string;
  background: string;
  card: string;
  border: string;
  muted: string;
  accent: string;
}

const DEFAULT_THEME: ThemeColors = {
  primary: "#c026d3",
  background: "#121212",
  card: "#1f1f1f",
  border: "#333333",
  muted: "#2e2e2e",
  accent: "#c026d3",
};

const PRESETS: { name: string; colors: ThemeColors }[] = [
  { name: "Magenta (Predeterminado)", colors: DEFAULT_THEME },
  { name: "Cian Neón", colors: { ...DEFAULT_THEME, primary: "#06b6d4", accent: "#06b6d4" } },
  { name: "Verde Lima", colors: { ...DEFAULT_THEME, primary: "#84cc16", accent: "#84cc16" } },
  { name: "Rojo Fuego", colors: { ...DEFAULT_THEME, primary: "#ef4444", accent: "#ef4444" } },
  { name: "Dorado", colors: { ...DEFAULT_THEME, primary: "#eab308", accent: "#eab308" } },
  { name: "Azul Eléctrico", colors: { ...DEFAULT_THEME, primary: "#3b82f6", accent: "#3b82f6" } },
];

function hexToHSL(hex: string): string {
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
}

function applyTheme(colors: ThemeColors) {
  const root = document.documentElement;
  root.style.setProperty("--primary", hexToHSL(colors.primary));
  root.style.setProperty("--accent", hexToHSL(colors.accent));
  root.style.setProperty("--ring", hexToHSL(colors.primary));
  root.style.setProperty("--sidebar-primary", hexToHSL(colors.primary));
  root.style.setProperty("--sidebar-ring", hexToHSL(colors.primary));
  root.style.setProperty("--background", hexToHSL(colors.background));
  root.style.setProperty("--card", hexToHSL(colors.card));
  root.style.setProperty("--popover", hexToHSL(colors.card));
  root.style.setProperty("--border", hexToHSL(colors.border));
  root.style.setProperty("--input", hexToHSL(colors.border));
  root.style.setProperty("--muted", hexToHSL(colors.muted));
  root.style.setProperty("--secondary", hexToHSL(colors.muted));
}

export default function AdminThemeTab() {
  const { toast } = useToast();
  const [colors, setColors] = useState<ThemeColors>(() => {
    try {
      const saved = localStorage.getItem(THEME_KEY);
      return saved ? JSON.parse(saved) : DEFAULT_THEME;
    } catch {
      return DEFAULT_THEME;
    }
  });

  useEffect(() => {
    applyTheme(colors);
  }, [colors]);

  const handleColorChange = (key: keyof ThemeColors, value: string) => {
    setColors((prev) => ({ ...prev, [key]: value }));
  };

  const handleSave = () => {
    localStorage.setItem(THEME_KEY, JSON.stringify(colors));
    toast({ title: "Tema guardado", description: "Los colores se aplicaron correctamente." });
  };

  const handleReset = () => {
    setColors(DEFAULT_THEME);
    localStorage.removeItem(THEME_KEY);
    applyTheme(DEFAULT_THEME);
    toast({ title: "Tema restaurado", description: "Se restauraron los colores predeterminados." });
  };

  const handlePreset = (preset: ThemeColors) => {
    setColors(preset);
  };

  const colorFields: { key: keyof ThemeColors; label: string }[] = [
    { key: "primary", label: "Color Primario / Acento" },
    { key: "background", label: "Fondo" },
    { key: "card", label: "Tarjetas" },
    { key: "border", label: "Bordes" },
    { key: "muted", label: "Elementos secundarios" },
  ];

  return (
    <div className="space-y-6">
      {/* Presets */}
      <Card className="border-border bg-card">
        <CardHeader>
          <CardTitle className="text-foreground">Temas Predefinidos</CardTitle>
          <CardDescription>Selecciona un esquema de colores rápido</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {PRESETS.map((preset) => (
              <button
                key={preset.name}
                onClick={() => handlePreset(preset.colors)}
                className="flex items-center gap-3 p-3 rounded-lg border border-border hover:border-primary/50 transition-all bg-secondary/20"
              >
                <div className="h-8 w-8 rounded-full shrink-0 border border-border" style={{ backgroundColor: preset.colors.primary }} />
                <span className="text-sm font-medium text-foreground text-left">{preset.name}</span>
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Custom colors */}
      <Card className="border-border bg-card">
        <CardHeader>
          <CardTitle className="text-foreground">Personalización Avanzada</CardTitle>
          <CardDescription>Ajusta cada color individualmente</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {colorFields.map(({ key, label }) => (
              <div key={key} className="space-y-2">
                <Label className="text-sm">{label}</Label>
                <div className="flex gap-2 items-center">
                  <input
                    type="color"
                    value={colors[key]}
                    onChange={(e) => handleColorChange(key, e.target.value)}
                    className="h-10 w-12 rounded cursor-pointer border border-border bg-transparent"
                  />
                  <Input
                    value={colors[key]}
                    onChange={(e) => handleColorChange(key, e.target.value)}
                    className="font-mono text-sm"
                    maxLength={7}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Preview */}
          <div className="mt-6 p-4 rounded-lg border border-border" style={{ backgroundColor: colors.background }}>
            <p className="text-sm font-medium mb-3" style={{ color: colors.primary }}>Vista previa del tema</p>
            <div className="flex gap-3">
              <div className="px-4 py-2 rounded-md text-sm font-medium text-white" style={{ backgroundColor: colors.primary }}>Botón Primario</div>
              <div className="px-4 py-2 rounded-md text-sm border" style={{ backgroundColor: colors.card, borderColor: colors.border, color: "#e5e5e5" }}>Tarjeta</div>
            </div>
          </div>

          <div className="flex gap-3 pt-2">
            <Button onClick={handleSave}>Guardar Tema</Button>
            <Button variant="outline" onClick={handleReset}>
              <RotateCcw className="h-4 w-4 mr-1" /> Restaurar
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
