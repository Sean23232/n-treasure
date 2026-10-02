import "dotenv/config";
import { db, pool } from "./index";
import {
  categories,
  products,
  galleryImages,
  testimonials,
} from "./schema";

const P = (id: string) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1000&w=900`;

async function seed() {
  console.log("Seeding Necessary Treasures data…");

  await db.delete(galleryImages);
  await db.delete(products);
  await db.delete(categories);
  await db.delete(testimonials);

  const [candles, leather, laser, acrylic, custom] = await db
    .insert(categories)
    .values([
      {
        name: "Candles",
        slug: "candles",
        tagline: "Warm, comforting, atmospheric",
        description:
          "Hand-poured in small batches with natural soy wax and thoughtfully chosen fragrance — made to turn any room into somewhere you want to stay.",
        heroImage: "/images/category-candles.jpg",
        accentColor: "#C1613F",
        sortOrder: 1,
      },
      {
        name: "Leather",
        slug: "leather",
        tagline: "Tactile, durable, handcrafted",
        description:
          "Full-grain leather, cut and stitched by hand. Each piece is built to age beautifully and to carry a little bit of story with it.",
        heroImage: "/images/category-leather.jpg",
        accentColor: "#7d6650",
        sortOrder: 2,
      },
      {
        name: "Laser Engraving",
        slug: "laser-engraving",
        tagline: "Personal, customized, detailed",
        description:
          "Names, dates, and tiny details turned into keepsakes. If it can be designed, it can probably be engraved.",
        heroImage: "/images/category-laser.jpg",
        accentColor: "#5a4c42",
        sortOrder: 3,
      },
      {
        name: "Acrylic",
        slug: "acrylic",
        tagline: "Creative, modern, expressive",
        description:
          "Layered color, light, and a little bit of sparkle. Our most playful material, shaped into modern everyday pieces.",
        heroImage: "/images/category-acrylic.jpg",
        accentColor: "#889a79",
        sortOrder: 4,
      },
      {
        name: "Custom Creations",
        slug: "custom-creations",
        tagline: "Made around your idea",
        description:
          "Tell us what you're picturing and we'll help bring it to life — across any material we work with.",
        heroImage: "/images/category-custom.jpg",
        accentColor: "#C89B5C",
        sortOrder: 5,
      },
    ])
    .returning();

  const productRows = [
    // Candles
    {
      name: "Amber Hearth Candle",
      slug: "amber-hearth-candle",
      categoryId: candles.id,
      shortDescription: "Warm amber, clove, and vanilla in hand-poured soy wax.",
      description:
        "Our signature scent — a cozy blend of amber, clove, and vanilla bean poured into a reusable amber glass jar. Each candle is hand-poured in small batches and cold-finished for a clean, even burn that fills a room without overwhelming it.",
      materials: "100% natural soy wax, cotton wick, reusable glass jar",
      careInstructions: "Trim wick to 1/4\" before each burn. Burn for 2-3 hours at a time. Keep away from drafts.",
      price: "28.00",
      sku: "NT-CND-001",
      inventory: 14,
      images: [P("7234520"), P("6755794"), "/images/category-candles.jpg"],
      isFeatured: true,
    },
    {
      name: "Vanilla Bean Dream",
      slug: "vanilla-bean-dream",
      categoryId: candles.id,
      shortDescription: "Soft vanilla and warm sugar, poured by hand.",
      description:
        "A gentle, comforting vanilla fragrance layered with warm sugar and a whisper of oak. One of our most requested scents at every craft show we've set up at.",
      materials: "100% natural soy wax, cotton wick, matte ceramic vessel",
      careInstructions: "Trim wick before lighting. Allow wax pool to reach edges on first burn.",
      price: "26.00",
      sku: "NT-CND-002",
      inventory: 9,
      images: [P("6755794"), P("5933686")],
      isFeatured: true,
    },
    {
      name: "Cedar & Sage Candle",
      slug: "cedar-sage-candle",
      categoryId: candles.id,
      shortDescription: "Grounding cedarwood and fresh garden sage.",
      description:
        "An earthy, grounding blend that feels like a walk through the woods after rain. Poured in our studio using locally sourced soy wax.",
      materials: "100% natural soy wax, cotton wick, reusable glass jar",
      careInstructions: "Trim wick to 1/4\" before each burn. Discontinue use when 1/2\" of wax remains.",
      price: "30.00",
      sku: "NT-CND-003",
      inventory: 6,
      images: [P("5933686"), P("278664")],
    },
    {
      name: "Orchard Spice Votive Set",
      slug: "orchard-spice-votive-set",
      categoryId: candles.id,
      shortDescription: "A set of three mini votives, perfect as gifts.",
      description:
        "Three travel-sized votive candles in apple, cinnamon, and clove — a sampler of our fall favorites, hand-poured and packaged in a kraft gift box.",
      materials: "100% natural soy wax, cotton wicks, glass votive cups",
      careInstructions: "Place on a heat-safe surface. Burn each votive for no more than 2 hours at a time.",
      price: "22.00",
      sku: "NT-CND-004",
      inventory: 20,
      images: [P("14974588"), P("278664")],
    },
    // Leather
    {
      name: "Heritage Bifold Wallet",
      slug: "heritage-bifold-wallet",
      categoryId: leather.id,
      shortDescription: "Full-grain leather wallet, hand-stitched to last.",
      description:
        "Cut, skived, and stitched entirely by hand from full-grain vegetable-tanned leather. It starts out rich and supple and only gets better with age — developing a patina that's entirely its own.",
      materials: "Full-grain vegetable-tanned leather, waxed thread",
      careInstructions: "Condition occasionally with a natural leather balm. Avoid prolonged water exposure.",
      price: "58.00",
      sku: "NT-LTH-001",
      inventory: 11,
      images: [P("33428433"), P("28028262")],
      isFeatured: true,
      isCustomizable: true,
    },
    {
      name: "Stitched Leather Journal Cover",
      slug: "stitched-leather-journal-cover",
      categoryId: leather.id,
      shortDescription: "A refillable leather cover for your favorite notebook.",
      description:
        "A simple, beautiful leather cover built to hold a standard A5 notebook. Designed to be refilled again and again, so it becomes more yours with every year.",
      materials: "Full-grain leather, brass hardware",
      careInstructions: "Wipe clean with a dry cloth. Condition every few months.",
      price: "48.00",
      sku: "NT-LTH-002",
      inventory: 8,
      images: [P("6660912"), P("4452610")],
      isCustomizable: true,
    },
    {
      name: "Everyday Leather Tote",
      slug: "everyday-leather-tote",
      categoryId: leather.id,
      shortDescription: "A roomy, hand-stitched tote for daily carry.",
      description:
        "Our most-requested leather piece. Hand-cut panels, reinforced stitching, and a drop-length strap designed for everyday use — market runs, studio days, and everything in between.",
      materials: "Full-grain leather, cotton canvas lining",
      careInstructions: "Store stuffed with tissue to hold its shape. Condition seasonally.",
      price: "145.00",
      sku: "NT-LTH-003",
      inventory: 4,
      images: [P("28028262"), P("6660912")],
      isFeatured: true,
    },
    {
      name: "Minimalist Card Sleeve",
      slug: "minimalist-card-sleeve",
      categoryId: leather.id,
      shortDescription: "A slim leather sleeve for cards and cash.",
      description:
        "For the days you want to carry light. A slim two-pocket leather sleeve, hand-cut and burnished at the edges.",
      materials: "Full-grain leather, waxed thread",
      careInstructions: "Wipe clean with a dry cloth. Avoid water exposure.",
      price: "32.00",
      sku: "NT-LTH-004",
      inventory: 15,
      images: [P("4452610"), P("33428433")],
    },
    // Laser engraving
    {
      name: "Personalized Cutting Board",
      slug: "personalized-cutting-board",
      categoryId: laser.id,
      shortDescription: "A solid wood board engraved with your family name.",
      description:
        "A beautiful, functional cutting board engraved with your family name, a date, or a short phrase. A favorite wedding and housewarming gift.",
      materials: "Solid maple or walnut, food-safe mineral oil finish",
      careInstructions: "Hand wash only. Oil occasionally to keep wood conditioned.",
      price: "62.00",
      sku: "NT-LSR-001",
      inventory: 10,
      images: [P("8341831"), "/images/category-laser.jpg"],
      isFeatured: true,
      isCustomizable: true,
    },
    {
      name: "Engraved Family Name Sign",
      slug: "engraved-family-name-sign",
      categoryId: laser.id,
      shortDescription: "A custom wood sign for your front door or entryway.",
      description:
        "A warm, welcoming sign engraved with your family name and established date. Designed and cut in-house, every sign is one of a kind.",
      materials: "Solid pine or birch plywood, protective finish",
      careInstructions: "Indoor or covered outdoor use. Dust with a soft cloth.",
      price: "45.00",
      sku: "NT-LSR-002",
      inventory: 7,
      images: [P("27223676"), P("8341869")],
      isCustomizable: true,
    },
    {
      name: "Custom Pet Portrait Ornament",
      slug: "custom-pet-portrait-ornament",
      categoryId: laser.id,
      shortDescription: "Your pet's likeness, engraved onto a wooden ornament.",
      description:
        "Send us a photo of your best friend and we'll laser-engrave a keepsake ornament — a sweet little tribute for the tree or the wall.",
      materials: "Birch wood, satin ribbon",
      careInstructions: "Keep dry. Dust gently with a soft cloth.",
      price: "24.00",
      sku: "NT-LSR-003",
      inventory: 18,
      images: [P("8341869"), P("27223676")],
      isCustomizable: true,
    },
    {
      name: "Engraved Wooden Keepsake Box",
      slug: "engraved-wooden-keepsake-box",
      categoryId: laser.id,
      shortDescription: "A lined wooden box engraved with a name or quote.",
      description:
        "A sturdy hinged wooden box, engraved with a name, date, or short phrase, and lined with soft felt — perfect for jewelry, letters, or little treasures of your own.",
      materials: "Solid wood, felt lining, brass hinges",
      careInstructions: "Dust with a soft, dry cloth. Avoid direct sunlight for long periods.",
      price: "55.00",
      sku: "NT-LSR-004",
      inventory: 5,
      images: [P("1068877"), P("8341831")],
      isCustomizable: true,
    },
    // Acrylic
    {
      name: "Faceted Acrylic Nightlight",
      slug: "faceted-acrylic-nightlight",
      categoryId: acrylic.id,
      shortDescription: "A glowing, gem-like nightlight for any room.",
      description:
        "A faceted acrylic form that catches warm LED light beautifully — a modern little glow for a nightstand, shelf, or nursery.",
      materials: "Cast acrylic, warm LED light base",
      careInstructions: "Wipe with a soft, dry cloth. Keep away from direct heat.",
      price: "34.00",
      sku: "NT-ACR-001",
      inventory: 12,
      images: ["/images/product-acrylic-nightlight.jpg", "/images/category-acrylic.jpg"],
      isFeatured: true,
    },
    {
      name: "Layered Acrylic Keychain",
      slug: "layered-acrylic-keychain",
      categoryId: acrylic.id,
      shortDescription: "Colorful layered acrylic, cut into playful shapes.",
      description:
        "Bright, layered acrylic keychains available in a rotating set of shapes and colorways — a small, cheerful treasure to carry with you.",
      materials: "Cast acrylic, keyring hardware",
      careInstructions: "Wipe clean with a soft cloth.",
      price: "16.00",
      sku: "NT-ACR-002",
      inventory: 24,
      images: ["/images/category-acrylic.jpg", "/images/product-acrylic-nightlight.jpg"],
    },
    {
      name: "Acrylic Ornament Set",
      slug: "acrylic-ornament-set",
      categoryId: acrylic.id,
      shortDescription: "A set of three modern acrylic ornaments.",
      description:
        "A trio of engraved acrylic ornaments designed to catch the light on the tree or in a sunlit window all season long.",
      materials: "Cast acrylic, satin ribbon",
      careInstructions: "Keep away from direct heat. Wipe with a soft cloth.",
      price: "28.00",
      sku: "NT-ACR-003",
      inventory: 16,
      images: ["/images/category-acrylic.jpg"],
    },
    // Custom creations
    {
      name: "Build-Your-Own Treasure Box",
      slug: "build-your-own-treasure-box",
      categoryId: custom.id,
      shortDescription: "A fully custom keepsake box, designed with you.",
      description:
        "This listing starts the conversation for a fully custom keepsake box — your choice of wood, engraving, lining, and size. We'll follow up by email to talk through the details before we begin.",
      materials: "Material chosen together based on your idea",
      careInstructions: "Care guidance provided with your finished piece.",
      price: "75.00",
      sku: "NT-CUS-001",
      inventory: 99,
      images: ["/images/category-custom.jpg", "/images/craftsmanship.jpg"],
      isCustomizable: true,
      isFeatured: true,
    },
    {
      name: "Custom Name Puzzle",
      slug: "custom-name-puzzle",
      categoryId: custom.id,
      shortDescription: "A laser-cut wooden name puzzle for little ones.",
      description:
        "A sweet, sturdy wooden puzzle featuring your child's name, cut letter by letter and sanded smooth. A treasured first gift.",
      materials: "Birch plywood, non-toxic finish",
      careInstructions: "Wipe clean with a dry cloth. Not a bath toy.",
      price: "38.00",
      sku: "NT-CUS-002",
      inventory: 99,
      images: ["/images/category-custom.jpg", "/images/craftsmanship.jpg"],
      isCustomizable: true,
    },
    {
      name: "Memory Keepsake Bundle",
      slug: "memory-keepsake-bundle",
      categoryId: custom.id,
      shortDescription: "A curated custom bundle across our materials.",
      description:
        "A one-of-a-kind bundle built around your story — maybe a candle in a meaningful scent, an engraved keepsake, and a small leather note. Tell us the occasion and we'll help design the set.",
      materials: "Mixed materials based on your selections",
      careInstructions: "Care guidance provided with your finished bundle.",
      price: "95.00",
      sku: "NT-CUS-003",
      inventory: 99,
      images: ["/images/craftsmanship.jpg", "/images/brand-intro.jpg"],
      isCustomizable: true,
    },
  ];

  const insertedProducts = await db.insert(products).values(productRows).returning();

  const galleryRows = [
    { imageUrl: "/images/hero.jpg", caption: "A styled flatlay of our favorite handmade pieces", categoryId: null },
    { imageUrl: "/images/brand-intro.jpg", caption: "Arranging treasures by hand", categoryId: null },
    { imageUrl: P("7234520"), caption: "Pouring candles in small batches", categoryId: candles.id },
    { imageUrl: P("6755794"), caption: "Hot wax, cozy studio", categoryId: candles.id },
    { imageUrl: P("14974588"), caption: "Finished candles, ready for their new homes", categoryId: candles.id },
    { imageUrl: P("33428433"), caption: "Hand-stitching a leather wallet", categoryId: leather.id },
    { imageUrl: P("4452610"), caption: "Cutting leather by hand", categoryId: leather.id },
    { imageUrl: P("28028262"), caption: "Finished leather wallets", categoryId: leather.id },
    { imageUrl: P("8341831"), caption: "A freshly engraved wooden sign", categoryId: laser.id },
    { imageUrl: P("27223676"), caption: "Handmade with love, every time", categoryId: laser.id },
    { imageUrl: "/images/category-acrylic.jpg", caption: "Light catching our acrylic pieces", categoryId: acrylic.id },
    { imageUrl: "/images/product-acrylic-nightlight.jpg", caption: "An acrylic nightlight glowing warm", categoryId: acrylic.id },
    { imageUrl: "/images/category-custom.jpg", caption: "Sketching out a custom idea", categoryId: custom.id },
    { imageUrl: P("16063794"), caption: "Browsing handmade goods at a weekend market", categoryId: null },
    { imageUrl: P("5302961"), caption: "Working together in the studio", categoryId: null },
    { imageUrl: P("6790748"), caption: "Sawdust and good ideas", categoryId: laser.id },
  ].map((row, i) => ({ ...row, sortOrder: i }));

  await db.insert(galleryImages).values(galleryRows);

  await db.insert(testimonials).values([
    {
      name: "Marissa K.",
      location: "Lancaster, PA",
      quote:
        "I bought a candle from their booth two years ago and I've been ordering from them ever since. Finding their online shop felt like running into an old friend.",
      rating: 5,
      sortOrder: 1,
    },
    {
      name: "David & Priya R.",
      location: "Harrisburg, PA",
      quote:
        "We asked for a custom engraved sign for our new house and they completely understood the vision after one conversation. It's the first thing people notice when they walk in.",
      rating: 5,
      sortOrder: 2,
    },
    {
      name: "Theresa W.",
      location: "York, PA",
      quote:
        "You can tell real people make these things. The leather wallet I ordered only looks better the more I use it.",
      rating: 5,
      sortOrder: 3,
    },
    {
      name: "Allen G.",
      location: "Gettysburg, PA",
      quote:
        "Fast replies, thoughtful packaging, and a genuinely beautiful product. This is exactly what shopping small should feel like.",
      rating: 5,
      sortOrder: 4,
    },
  ]);

  console.log(`Seeded ${insertedProducts.length} products across 5 categories.`);
  await pool.end();
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
