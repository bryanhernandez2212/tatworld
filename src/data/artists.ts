import artist1 from "@/assets/artist1.jpg";
import artist2 from "@/assets/artist2.jpg";
import artist3 from "@/assets/artist3.jpg";
import artist4 from "@/assets/artist4.jpg";
import artist5 from "@/assets/artist5.jpg";
import artist6 from "@/assets/artist6.jpg";
import artist7 from "@/assets/artist7.jpg";
import artist8 from "@/assets/artist8.jpg";
import gallery1 from "@/assets/gallery1.jpg";
import gallery2 from "@/assets/gallery2.jpg";
import gallery3 from "@/assets/gallery3.jpg";
import gallery4 from "@/assets/gallery4.jpg";
import gallery5 from "@/assets/gallery5.jpg";
import gallery6 from "@/assets/gallery6.jpg";
import flash1 from "@/assets/flash1.jpg";
import flash2 from "@/assets/flash2.jpg";
import flash3 from "@/assets/flash3.jpg";

export interface Review {
  author: string;
  rating: number;
  text: string;
  date: string;
}

export interface FlashDesign {
  image: string;
  title: string;
  price: number;
  size: string;
  available: boolean;
}

export interface GuestSpot {
  city: string;
  studio: string;
  dateFrom: string;
  dateTo: string;
  slotsAvailable: number;
}

export interface Sponsor {
  name: string;
  type: string;
}

export interface Artist {
  slug: string;
  name: string;
  image: string;
  city: string;
  specialty: string;
  rating: number;
  online: boolean;
  bio: string;
  phone: string;
  email: string;
  instagram: string;
  website?: string;
  styles: string[];
  studio: { name: string; collective?: string; address: string; city: string; showLocation: boolean };
  priceRange: { min: number; max: number; currency: string };
  walkIns: boolean;
  sponsors: Sponsor[];
  reviews: Review[];
  gallery: { image: string; style: string; description?: string; location?: string; mentions?: string[] }[];
  flashDesigns: FlashDesign[];
  guestSpots: GuestSpot[];
  yearsExperience: number;
  totalTattoos: number;
}

export const artists: Artist[] = [
  {
    slug: "valentina-reyes",
    name: "Valentina Reyes",
    image: artist1,
    city: "CDMX",
    specialty: "Realismo",
    rating: 4.9,
    online: true,
    bio: "Artista especializada en realismo y retratos con más de 8 años de experiencia. Mi pasión es capturar la esencia de cada persona en la piel.",
    phone: "+52 55 1234 5678",
    email: "valentina@tattsnearby.mx",
    instagram: "@valentina.ink",
    website: "www.valentinareyes.mx",
    styles: ["Realismo", "Retratos", "Black & Grey", "Micro Realismo"],
    studio: { name: "Obsidian Ink Studio", collective: "Colectivo Tinta Negra", address: "Calle Álvaro Obregón 123, Roma Norte", city: "CDMX", showLocation: true },
    priceRange: { min: 2000, max: 15000, currency: "MXN" },
    walkIns: true,
    sponsors: [{ name: "Cheyenne", type: "Máquinas" }, { name: "World Famous Ink", type: "Tintas" }],
    reviews: [
      { author: "María G.", rating: 5, text: "Increíble trabajo, el retrato quedó exactamente como quería. Muy profesional y cuidadosa.", date: "2024-02-15" },
      { author: "Carlos M.", rating: 5, text: "Valentina es una artista excepcional. Su atención al detalle es impresionante.", date: "2024-01-20" },
      { author: "Ana R.", rating: 4, text: "Muy buen trabajo, el estudio es limpio y ella es muy amable. Totalmente recomendada.", date: "2023-12-10" },
    ],
    gallery: [
      { image: gallery1, style: "Realismo" },
      { image: gallery2, style: "Neotradicional" },
      { image: gallery3, style: "Blackwork" },
      { image: gallery4, style: "Japonés" },
      { image: gallery5, style: "Acuarela" },
      { image: gallery6, style: "Dotwork" },
    ],
    flashDesigns: [
      { image: flash1, title: "Rosa & Daga Clásica", price: 1500, size: "10x8 cm", available: true },
      { image: flash2, title: "Mandala Geométrica", price: 2000, size: "12x12 cm", available: true },
      { image: flash3, title: "Gato Minimalista", price: 800, size: "5x4 cm", available: false },
    ],
    guestSpots: [
      { city: "Guadalajara", studio: "La Casa del Tatuaje", dateFrom: "2024-04-10", dateTo: "2024-04-15", slotsAvailable: 3 },
      { city: "Monterrey", studio: "Norteño Ink", dateFrom: "2024-05-20", dateTo: "2024-05-25", slotsAvailable: 5 },
    ],
    yearsExperience: 8,
    totalTattoos: 1200,
  },
  {
    slug: "camila-orozco",
    name: "Camila Orozco",
    image: artist2,
    city: "Guadalajara",
    specialty: "Neotradicional",
    rating: 4.8,
    online: true,
    bio: "Amante del neotradicional y el color vibrante. Cada pieza es única y llena de vida.",
    phone: "+52 33 9876 5432",
    email: "camila@tattsnearby.mx",
    instagram: "@camila.tattoo",
    styles: ["Neotradicional", "Color", "Ilustrativo", "Floral"],
    studio: { name: "Agave Tattoo Co.", address: "Av. Chapultepec 456", city: "Guadalajara", showLocation: true },
    priceRange: { min: 1500, max: 12000, currency: "MXN" },
    walkIns: false,
    sponsors: [{ name: "FK Irons", type: "Máquinas" }],
    reviews: [
      { author: "Lucía P.", rating: 5, text: "Los colores que usa son impresionantes, mi tatuaje se ve increíble.", date: "2024-03-01" },
      { author: "Roberto S.", rating: 4, text: "Buen trabajo y ambiente. La espera valió la pena.", date: "2024-02-10" },
    ],
    gallery: [
      { image: gallery2, style: "Neotradicional" },
      { image: gallery5, style: "Acuarela" },
      { image: gallery4, style: "Japonés" },
      { image: gallery1, style: "Realismo" },
    ],
    flashDesigns: [
      { image: flash1, title: "Rosa Neotradicional", price: 1800, size: "10x10 cm", available: true },
      { image: flash2, title: "Mandala Floral", price: 2200, size: "15x15 cm", available: true },
    ],
    guestSpots: [
      { city: "CDMX", studio: "Capital Ink", dateFrom: "2024-06-01", dateTo: "2024-06-07", slotsAvailable: 4 },
    ],
    yearsExperience: 6,
    totalTattoos: 800,
  },
  {
    slug: "sofia-mendoza",
    name: "Sofía Mendoza",
    image: artist3,
    city: "Monterrey",
    specialty: "Blackwork",
    rating: 4.7,
    online: true,
    bio: "Especialista en blackwork y dotwork. Me inspiro en la geometría sagrada y patrones tribales.",
    phone: "+52 81 5555 1234",
    email: "sofia@tattsnearby.mx",
    instagram: "@sofia.blackwork",
    styles: ["Blackwork", "Dotwork", "Geométrico", "Tribal Moderno"],
    studio: { name: "Dark Matter Studio", collective: "Colectivo Norte", address: "Calle Morelos 789", city: "Monterrey", showLocation: true },
    priceRange: { min: 1800, max: 10000, currency: "MXN" },
    walkIns: true,
    sponsors: [],
    reviews: [
      { author: "Pedro V.", rating: 5, text: "El mejor blackwork que he visto. Sofía es increíble.", date: "2024-01-15" },
    ],
    gallery: [
      { image: gallery3, style: "Blackwork" },
      { image: gallery6, style: "Dotwork" },
      { image: gallery1, style: "Realismo" },
    ],
    flashDesigns: [
      { image: flash2, title: "Geometría Sagrada", price: 2500, size: "15x15 cm", available: true },
    ],
    guestSpots: [],
    yearsExperience: 5,
    totalTattoos: 600,
  },
  {
    slug: "diego-hernandez",
    name: "Diego Hernández",
    image: artist4,
    city: "CDMX",
    specialty: "Old School",
    rating: 4.9,
    online: true,
    bio: "Tatuador old school de corazón. Líneas gruesas, colores sólidos y diseños clásicos que nunca pasan de moda.",
    phone: "+52 55 4444 5678",
    email: "diego@tattsnearby.mx",
    instagram: "@diego.oldschool",
    styles: ["Old School", "Traditional", "Americano Tradicional", "Sailor Jerry"],
    studio: { name: "Classic Ink CDMX", address: "Av. Insurgentes Sur 321", city: "CDMX", showLocation: true },
    priceRange: { min: 1200, max: 8000, currency: "MXN" },
    walkIns: true,
    sponsors: [{ name: "Eternal Ink", type: "Tintas" }, { name: "Bishop Rotary", type: "Máquinas" }],
    reviews: [
      { author: "Fernando L.", rating: 5, text: "El mejor tatuador old school de México. Sus líneas son perfectas.", date: "2024-02-28" },
      { author: "Diana K.", rating: 5, text: "Diego es un maestro. El flash que escogí quedó perfecto.", date: "2024-01-05" },
    ],
    gallery: [
      { image: gallery4, style: "Japonés" },
      { image: gallery2, style: "Neotradicional" },
      { image: gallery5, style: "Acuarela" },
      { image: gallery1, style: "Realismo" },
    ],
    flashDesigns: [
      { image: flash1, title: "Rosa & Daga", price: 1200, size: "8x6 cm", available: true },
      { image: flash3, title: "Golondrina Clásica", price: 900, size: "6x5 cm", available: true },
    ],
    guestSpots: [
      { city: "Oaxaca", studio: "Mezcal Ink", dateFrom: "2024-07-01", dateTo: "2024-07-05", slotsAvailable: 2 },
    ],
    yearsExperience: 12,
    totalTattoos: 2000,
  },
  {
    slug: "carlos-ramirez",
    name: "Carlos Ramírez",
    image: artist5,
    city: "Puebla",
    specialty: "Dotwork",
    rating: 4.6,
    online: false,
    bio: "Artista de dotwork y puntillismo. Cada punto cuenta una historia.",
    phone: "+52 22 3333 4567",
    email: "carlos@tattsnearby.mx",
    instagram: "@carlos.dots",
    styles: ["Dotwork", "Puntillismo", "Geométrico", "Mandala"],
    studio: { name: "Punto Ink", address: "5 de Mayo 101", city: "Puebla", showLocation: true },
    priceRange: { min: 1500, max: 9000, currency: "MXN" },
    walkIns: false,
    sponsors: [],
    reviews: [
      { author: "Gabriela T.", rating: 5, text: "Un artista con mucha paciencia y dedicación.", date: "2024-01-30" },
    ],
    gallery: [
      { image: gallery6, style: "Dotwork" },
      { image: gallery3, style: "Blackwork" },
    ],
    flashDesigns: [],
    guestSpots: [],
    yearsExperience: 4,
    totalTattoos: 400,
  },
  {
    slug: "andrea-lopez",
    name: "Andrea López",
    image: artist6,
    city: "Guadalajara",
    specialty: "Acuarela",
    rating: 4.8,
    online: false,
    bio: "Tatuajes de acuarela que parecen pinturas sobre la piel. Arte fluido y vibrante.",
    phone: "+52 33 2222 3456",
    email: "andrea@tattsnearby.mx",
    instagram: "@andrea.watercolor",
    styles: ["Acuarela", "Ilustrativo", "Floral", "Abstracto"],
    studio: { name: "Agave Tattoo Co.", address: "Av. Chapultepec 456", city: "Guadalajara", showLocation: true },
    priceRange: { min: 2000, max: 14000, currency: "MXN" },
    walkIns: false,
    sponsors: [{ name: "Intenze Ink", type: "Tintas" }],
    reviews: [
      { author: "Karla M.", rating: 5, text: "Mi tatuaje parece una obra de arte. Andrea es increíble.", date: "2024-03-05" },
    ],
    gallery: [
      { image: gallery5, style: "Acuarela" },
      { image: gallery2, style: "Neotradicional" },
      { image: gallery4, style: "Japonés" },
    ],
    flashDesigns: [
      { image: flash3, title: "Mariposa Acuarela", price: 1600, size: "8x8 cm", available: true },
    ],
    guestSpots: [],
    yearsExperience: 7,
    totalTattoos: 950,
  },
  {
    slug: "mateo-garcia",
    name: "Mateo García",
    image: artist7,
    city: "CDMX",
    specialty: "Geométrico",
    rating: 4.5,
    online: false,
    bio: "Geometría pura aplicada al arte del tatuaje. Líneas limpias y simetría perfecta.",
    phone: "+52 55 6666 7890",
    email: "mateo@tattsnearby.mx",
    instagram: "@mateo.geo",
    styles: ["Geométrico", "Linework", "Minimalista", "Sacred Geometry"],
    studio: { name: "Obsidian Ink Studio", collective: "Colectivo Tinta Negra", address: "Calle Álvaro Obregón 123, Roma Norte", city: "CDMX", showLocation: true },
    priceRange: { min: 1000, max: 7000, currency: "MXN" },
    walkIns: true,
    sponsors: [],
    reviews: [],
    gallery: [
      { image: gallery3, style: "Blackwork" },
      { image: gallery6, style: "Dotwork" },
    ],
    flashDesigns: [
      { image: flash2, title: "Cubo Imposible", price: 1200, size: "7x7 cm", available: true },
    ],
    guestSpots: [],
    yearsExperience: 3,
    totalTattoos: 300,
  },
  {
    slug: "luna-cervantes",
    name: "Luna Cervantes",
    image: artist8,
    city: "Monterrey",
    specialty: "Neotradicional",
    rating: 4.7,
    online: true,
    bio: "Arte neotradicional con un toque mexicano. Colores vibrantes y diseños llenos de cultura.",
    phone: "+52 81 7777 8901",
    email: "luna@tattsnearby.mx",
    instagram: "@luna.tattoos",
    styles: ["Neotradicional", "Mexicano", "Color", "Ilustrativo"],
    studio: { name: "Dark Matter Studio", address: "Calle Morelos 789", city: "Monterrey", showLocation: true },
    priceRange: { min: 1800, max: 11000, currency: "MXN" },
    walkIns: false,
    sponsors: [{ name: "Cheyenne", type: "Máquinas" }],
    reviews: [
      { author: "Jimena A.", rating: 5, text: "Luna capturó exactamente la esencia de lo que quería. Increíble artista.", date: "2024-02-20" },
      { author: "Óscar D.", rating: 4, text: "Muy profesional y el resultado es precioso.", date: "2024-01-12" },
    ],
    gallery: [
      { image: gallery2, style: "Neotradicional" },
      { image: gallery4, style: "Japonés" },
      { image: gallery5, style: "Acuarela" },
      { image: gallery1, style: "Realismo" },
    ],
    flashDesigns: [
      { image: flash1, title: "Calavera Mexicana", price: 2000, size: "12x10 cm", available: true },
      { image: flash3, title: "Alebrije Mini", price: 1000, size: "6x5 cm", available: true },
    ],
    guestSpots: [
      { city: "CDMX", studio: "Capital Ink", dateFrom: "2024-08-10", dateTo: "2024-08-17", slotsAvailable: 6 },
      { city: "Puebla", studio: "Punto Ink", dateFrom: "2024-09-01", dateTo: "2024-09-05", slotsAvailable: 3 },
    ],
    yearsExperience: 5,
    totalTattoos: 700,
  },
];

export function getArtistBySlug(slug: string): Artist | undefined {
  return artists.find((a) => a.slug === slug);
}
