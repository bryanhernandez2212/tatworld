import supplierCheyenne from "@/assets/supplier-cheyenne.jpg";
import supplierWorldFamous from "@/assets/supplier-worldfamous.jpg";
import supplierBishop from "@/assets/supplier-bishop.jpg";
import supplierEternal from "@/assets/supplier-eternal.jpg";
import product1 from "@/assets/product1.jpg";
import product2 from "@/assets/product2.jpg";
import product3 from "@/assets/product3.jpg";
import product4 from "@/assets/product4.jpg";
import promoBanner1 from "@/assets/promo-banner1.jpg";
import promoBanner2 from "@/assets/promo-banner2.jpg";

export interface Product {
  id: string;
  name: string;
  image: string;
  price: number;
  currency: string;
  category: string;
  description: string;
  inStock: boolean;
}

export interface Promo {
  id: string;
  title: string;
  description: string;
  image: string;
  validUntil: string;
  discount?: string;
}

export interface Supplier {
  slug: string;
  name: string;
  logo: string;
  description: string;
  city: string;
  address: string;
  phone: string;
  email: string;
  website: string;
  instagram: string;
  categories: string[];
  sponsoredArtistSlugs: string[];
  products: Product[];
  promos: Promo[];
  founded: number;
}

export const suppliers: Supplier[] = [
  {
    slug: "cheyenne-tattoo-supply",
    name: "Cheyenne Tattoo Supply",
    logo: supplierCheyenne,
    description: "Líder mundial en máquinas rotativas y cartuchos de agujas para tatuaje. Innovación alemana al servicio del arte corporal con más de 15 años en el mercado.",
    city: "CDMX",
    address: "Av. Reforma 500, Juárez",
    phone: "+52 55 9000 1234",
    email: "contacto@cheyenne.mx",
    website: "www.cheyennetattoo.com",
    instagram: "@cheyenne_tattoo",
    categories: ["Máquinas", "Cartuchos", "Agujas", "Accesorios"],
    sponsoredArtistSlugs: ["valentina-reyes", "luna-cervantes"],
    products: [
      { id: "ch-1", name: "Sol Nova Unlimited", image: product1, price: 12500, currency: "MXN", category: "Máquinas", description: "Máquina rotativa wireless con motor brushless de alta precisión.", inStock: true },
      { id: "ch-2", name: "Cartuchos Craft RL 0.30", image: product3, price: 450, currency: "MXN", category: "Cartuchos", description: "Pack de 20 cartuchos round liner para líneas finas y detalladas.", inStock: true },
      { id: "ch-3", name: "Power Unit III", image: product1, price: 8900, currency: "MXN", category: "Accesorios", description: "Fuente de poder digital con conexión wireless.", inStock: false },
    ],
    promos: [
      { id: "p-ch-1", title: "20% en Cartuchos Craft", description: "Descuento en toda la línea de cartuchos Craft durante marzo.", image: promoBanner2, validUntil: "2026-03-31", discount: "20%" },
    ],
    founded: 2006,
  },
  {
    slug: "world-famous-ink",
    name: "World Famous Ink",
    logo: supplierWorldFamous,
    description: "Tintas veganas y de alta calidad usadas por artistas de renombre mundial. Colores vibrantes que duran toda la vida.",
    city: "Guadalajara",
    address: "Av. Chapultepec 800",
    phone: "+52 33 8000 5678",
    email: "ventas@worldfamous.mx",
    website: "www.worldfamousink.com",
    instagram: "@worldfamousink",
    categories: ["Tintas", "Sets de Color", "Black & Grey"],
    sponsoredArtistSlugs: ["valentina-reyes"],
    products: [
      { id: "wf-1", name: "Set 16 Colores Esenciales", image: product2, price: 4200, currency: "MXN", category: "Sets de Color", description: "16 botellas de 30ml con los colores más populares.", inStock: true },
      { id: "wf-2", name: "Triple Black Outlining", image: product2, price: 350, currency: "MXN", category: "Black & Grey", description: "Tinta negra ultra pigmentada para líneas perfectas. 120ml.", inStock: true },
      { id: "wf-3", name: "Aftercare Butter", image: product4, price: 280, currency: "MXN", category: "Aftercare", description: "Crema de cuidado post-tatuaje con ingredientes naturales.", inStock: true },
    ],
    promos: [
      { id: "p-wf-1", title: "Convención Tattoo GDL 2026", description: "Visítanos en el stand 42 de la Convención de Tatuaje Guadalajara.", image: promoBanner1, validUntil: "2026-04-15" },
    ],
    founded: 2012,
  },
  {
    slug: "bishop-rotary",
    name: "Bishop Rotary",
    logo: supplierBishop,
    description: "Máquinas rotativas de precisión diseñadas por tatuadores para tatuadores. Ingeniería de alta gama hecha en USA.",
    city: "Monterrey",
    address: "Calle Padre Mier 300",
    phone: "+52 81 6000 9012",
    email: "info@bishoprotary.mx",
    website: "www.bishoprotary.com",
    instagram: "@bishoprotary",
    categories: ["Máquinas", "Grips", "Accesorios"],
    sponsoredArtistSlugs: ["diego-hernandez"],
    products: [
      { id: "br-1", name: "Fantom Wireless", image: product1, price: 15800, currency: "MXN", category: "Máquinas", description: "Máquina rotativa wireless ultra ligera con motor japonés.", inStock: true },
      { id: "br-2", name: "Microangelo V2", image: product1, price: 9500, currency: "MXN", category: "Máquinas", description: "Máquina pen diseñada para micro realismo y trabajo fino.", inStock: true },
    ],
    promos: [
      { id: "p-br-1", title: "Lanzamiento Fantom V2", description: "Nueva versión con batería de 10 horas y motor mejorado. Pre-orden disponible.", image: promoBanner2, validUntil: "2026-05-01", discount: "15%" },
    ],
    founded: 2009,
  },
  {
    slug: "eternal-ink",
    name: "Eternal Ink",
    logo: supplierEternal,
    description: "Tintas profesionales para tatuaje con más de 40 años de historia. Pre-dispersadas, consistentes y con la gama de colores más amplia del mercado.",
    city: "CDMX",
    address: "Av. Insurgentes Norte 1200",
    phone: "+52 55 7000 3456",
    email: "mexico@eternalink.com",
    website: "www.eternalink.com",
    instagram: "@eternalink",
    categories: ["Tintas", "Sets de Color", "Grey Wash"],
    sponsoredArtistSlugs: ["diego-hernandez"],
    products: [
      { id: "ei-1", name: "Grey Wash Set 4 Tonos", image: product2, price: 1800, currency: "MXN", category: "Grey Wash", description: "4 botellas de lavado gris para sombreados perfectos.", inStock: true },
      { id: "ei-2", name: "Lining Black 240ml", image: product2, price: 520, currency: "MXN", category: "Tintas", description: "Tinta negra concentrada para líneas nítidas y duraderas.", inStock: true },
      { id: "ei-3", name: "Motor City Set", image: product2, price: 3600, currency: "MXN", category: "Sets de Color", description: "12 colores inspirados en el arte urbano de Detroit.", inStock: false },
    ],
    promos: [],
    founded: 1976,
  },
];

export function getSupplierBySlug(slug: string): Supplier | undefined {
  return suppliers.find((s) => s.slug === slug);
}
