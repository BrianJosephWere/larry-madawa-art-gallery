import work1 from "@/assets/work-1.jpg";
import work2 from "@/assets/work-2.jpg";
import work3 from "@/assets/work-3.jpg";
import work4 from "@/assets/work-4.jpg";
import work5 from "@/assets/work-5.jpg";
import work6 from "@/assets/work-6.jpg";

export type Artwork = {
  slug: string;
  index: string;
  title: string;
  medium: string;
  year: number;
  dimensions: string;
  price: number; // USD
  image: string;
  description: string;
  edition?: string;
};

export const artworks: Artwork[] = [
  {
    slug: "sovereign-in-indigo",
    index: "001",
    title: "Sovereign in Indigo",
    medium: "Oil on linen",
    year: 2024,
    dimensions: "160 × 200 cm",
    price: 12500,
    image: work1,
    description:
      "A meditation on inherited posture — the sitter wears indigo silk against a damask of gold filigree, a quiet claim to a lineage that was never written down.",
    edition: "Unique work",
  },
  {
    slug: "the-queen-of-zaria",
    index: "002",
    title: "The Queen of Zaria",
    medium: "Oil and gold leaf on linen",
    year: 2024,
    dimensions: "180 × 240 cm",
    price: 18400,
    image: work2,
    description:
      "Crowned in baroque gold, framed by crimson roses. A study of sovereignty held in stillness rather than declared aloud.",
    edition: "Unique work",
  },
  {
    slug: "apostle-of-the-inner-city",
    index: "003",
    title: "Apostle of the Inner City",
    medium: "Oil on canvas",
    year: 2024,
    dimensions: "150 × 200 cm",
    price: 14200,
    image: work3,
    description:
      "Streetwear meets the language of altarpieces. The gold pendant operates as both a crucifix and a coronation mark.",
    edition: "Unique work",
  },
  {
    slug: "inheritance",
    index: "004",
    title: "Inheritance",
    medium: "Oil on canvas",
    year: 2023,
    dimensions: "120 × 150 cm",
    price: 9800,
    image: work4,
    description:
      "A child crowned in a gilded laurel against a blue toile background — a portrait of what is being handed forward.",
    edition: "Unique work",
  },
  {
    slug: "bonds-of-gold",
    index: "005",
    title: "Bonds of Gold",
    medium: "Oil on canvas",
    year: 2023,
    dimensions: "170 × 210 cm",
    price: 16800,
    image: work5,
    description:
      "Two figures rendered in the language of 19th-century portraiture, dressed in the symbols of inheritance and brotherhood.",
    edition: "Unique work",
  },
  {
    slug: "matriarch-in-bloom",
    index: "006",
    title: "Matriarch in Bloom",
    medium: "Oil on linen",
    year: 2024,
    dimensions: "140 × 180 cm",
    price: 11200,
    image: work6,
    description:
      "Set against a wall of broad green leaves, the matriarch holds the foreground — a study of presence without performance.",
    edition: "Unique work",
  },
];

export const getArtwork = (slug: string) =>
  artworks.find((a) => a.slug === slug);

export const formatPrice = (amount: number, currency: "USD" | "KES" = "USD") => {
  if (currency === "KES") {
    return new Intl.NumberFormat("en-KE", {
      style: "currency",
      currency: "KES",
      maximumFractionDigits: 0,
    }).format(amount * 129);
  }
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(amount);
};
