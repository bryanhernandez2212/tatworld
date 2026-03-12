import convention1 from "@/assets/convention1.jpg";
import convention2 from "@/assets/convention2.jpg";
import convention3 from "@/assets/convention3.jpg";
import convention4 from "@/assets/convention4.jpg";

export interface TicketTier {
  name: string;
  price: number;
  currency: string;
  perks: string[];
  available: boolean;
}

export interface Convention {
  slug: string;
  name: string;
  image: string;
  city: string;
  venue: string;
  address: string;
  dateFrom: string;
  dateTo: string;
  description: string;
  styles: string[];
  artistSlugs: string[];
  tickets: TicketTier[];
  website?: string;
  instagram?: string;
}

export const conventions: Convention[] = [
  {
    slug: "expo-tattoo-cdmx-2026",
    name: "Expo Tattoo CDMX 2026",
    image: convention1,
    city: "CDMX",
    venue: "World Trade Center CDMX",
    address: "Montecito 38, Nápoles, Benito Juárez",
    dateFrom: "2026-05-15",
    dateTo: "2026-05-18",
    description: "La convención de tatuajes más grande de México. Más de 200 artistas nacionales e internacionales, concursos en vivo, música y stands de proveedores.",
    styles: ["Realismo", "Neotradicional", "Blackwork", "Old School", "Japonés"],
    artistSlugs: ["valentina-reyes", "diego-hernandez", "mateo-garcia"],
    tickets: [
      { name: "General", price: 350, currency: "MXN", perks: ["Acceso al evento", "Mapa del evento"], available: true },
      { name: "VIP", price: 800, currency: "MXN", perks: ["Acceso al evento", "Zona VIP", "Bebida incluida", "Meet & Greet artistas"], available: true },
      { name: "Pase Completo (4 días)", price: 1200, currency: "MXN", perks: ["Acceso los 4 días", "Zona VIP", "Kit de bienvenida"], available: true },
    ],
    website: "www.expotattoocdmx.mx",
    instagram: "@expotattoocdmx",
  },
  {
    slug: "ink-festival-guadalajara",
    name: "Ink Festival Guadalajara",
    image: convention2,
    city: "Guadalajara",
    venue: "Expo Guadalajara",
    address: "Av. Mariano Otero 1499, Verde Valle",
    dateFrom: "2026-07-10",
    dateTo: "2026-07-13",
    description: "Festival de tinta con sabor tapatío. Artistas de todo el país, concursos de flash, DJ sets y gastronomía local.",
    styles: ["Neotradicional", "Acuarela", "Floral", "Ilustrativo", "Color"],
    artistSlugs: ["camila-orozco", "andrea-lopez"],
    tickets: [
      { name: "General", price: 280, currency: "MXN", perks: ["Acceso al evento"], available: true },
      { name: "VIP", price: 650, currency: "MXN", perks: ["Acceso al evento", "Zona VIP", "Poster exclusivo"], available: true },
    ],
    website: "www.inkfestgdl.mx",
    instagram: "@inkfestgdl",
  },
  {
    slug: "tattoo-underground-monterrey",
    name: "Tattoo Underground MTY",
    image: convention3,
    city: "Monterrey",
    venue: "Nave Lewis",
    address: "Padre Mier 927, Centro",
    dateFrom: "2026-09-05",
    dateTo: "2026-09-07",
    description: "Convención alternativa enfocada en blackwork, dotwork y estilos experimentales. Ambiente íntimo con los mejores artistas del norte de México.",
    styles: ["Blackwork", "Dotwork", "Geométrico", "Tribal Moderno", "Minimalista"],
    artistSlugs: ["sofia-mendoza", "luna-cervantes"],
    tickets: [
      { name: "General", price: 250, currency: "MXN", perks: ["Acceso al evento"], available: true },
      { name: "Pase Weekend", price: 500, currency: "MXN", perks: ["Acceso sábado y domingo", "Sticker pack"], available: true },
    ],
    instagram: "@tattooundergroundmty",
  },
  {
    slug: "tinta-y-cultura-oaxaca",
    name: "Tinta y Cultura Oaxaca",
    image: convention4,
    city: "Oaxaca",
    venue: "Centro Cultural Santo Domingo",
    address: "Macedonio Alcalá s/n, Centro",
    dateFrom: "2026-11-20",
    dateTo: "2026-11-23",
    description: "Celebración de la cultura del tatuaje con raíces oaxaqueñas. Arte, mezcal, música en vivo y tatuadores que fusionan lo tradicional con lo contemporáneo.",
    styles: ["Mexicano", "Old School", "Neotradicional", "Realismo", "Ilustrativo"],
    artistSlugs: ["diego-hernandez", "valentina-reyes", "luna-cervantes", "carlos-ramirez"],
    tickets: [
      { name: "General", price: 200, currency: "MXN", perks: ["Acceso al evento"], available: true },
      { name: "VIP", price: 550, currency: "MXN", perks: ["Acceso al evento", "Zona VIP", "Mezcal de bienvenida", "Artprint exclusivo"], available: true },
      { name: "Pase Completo (4 días)", price: 700, currency: "MXN", perks: ["Acceso los 4 días", "Zona VIP", "Kit artístico"], available: false },
    ],
    website: "www.tintaycultura.mx",
    instagram: "@tintaycultura",
  },
];

export function getConventionBySlug(slug: string): Convention | undefined {
  return conventions.find((c) => c.slug === slug);
}

export function getAllCities(): string[] {
  return [...new Set(conventions.map((c) => c.city))];
}

export function getAllStyles(): string[] {
  return [...new Set(conventions.flatMap((c) => c.styles))];
}
