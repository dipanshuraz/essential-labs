import "dotenv/config";
import { PrismaClient } from "../src/generated/prisma/client";
import { createPrismaDriverAdapter } from "../src/lib/prisma-adapter";
import bcrypt from "bcryptjs";

const dbUrl = process.env.DATABASE_URL ?? "file:./dev.db";
const prisma = new PrismaClient({ adapter: createPrismaDriverAdapter(dbUrl) });

const imgs = [
  [
    "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=80",
    "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=800&q=80",
  ],
  [
    "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800&q=80",
    "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=800&q=80",
  ],
  [
    "https://images.unsplash.com/photo-1586350977773-b3b7acc9f2b2?w=800&q=80",
    "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=800&q=80",
  ],
  [
    "https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=800&q=80",
    "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=800&q=80",
  ],
  [
    "https://images.unsplash.com/photo-1556906781-9a412961c28c?w=800&q=80",
    "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800&q=80",
  ],
  [
    "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=800&q=80",
    "https://images.unsplash.com/photo-1597484661640-2f2237485ca0?w=800&q=80",
  ],
];

async function main() {
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();
  await prisma.affiliateProfile.deleteMany();
  await prisma.user.deleteMany();

  const adminHash = await bcrypt.hash("admin123", 10);
  const affiliateHash = await bcrypt.hash("affiliate123", 10);
  const customerHash = await bcrypt.hash("customer123", 10);

  const admin = await prisma.user.create({
    data: {
      email: "admin@pandabamboo.com",
      name: "Panda Admin",
      passwordHash: adminHash,
      role: "ADMIN",
    },
  });

  const affiliateUser = await prisma.user.create({
    data: {
      email: "partner@pandabamboo.com",
      name: "Bamboo Partner",
      passwordHash: affiliateHash,
      role: "AFFILIATE",
    },
  });

  await prisma.user.create({
    data: {
      email: "hello@example.com",
      name: "Happy Customer",
      passwordHash: customerHash,
      role: "CUSTOMER",
    },
  });

  await prisma.affiliateProfile.create({
    data: {
      userId: affiliateUser.id,
      code: "PANDA10",
      commissionPercent: 10,
      active: true,
    },
  });

  const cats = await Promise.all([
    prisma.category.create({ data: { name: "Tees", slug: "tees" } }),
    prisma.category.create({ data: { name: "Hoodies", slug: "hoodies" } }),
    prisma.category.create({ data: { name: "Accessories", slug: "accessories" } }),
  ]);

  const [tees, hoodies, acc] = cats;

  const products = [
    {
      name: "Organic Bamboo Tee — Cloud White",
      slug: "organic-bamboo-tee-cloud-white",
      description:
        "Ultra-soft bamboo viscose blend. Breathable, sustainable, and perfect for everyday comfort. Inspired by the Kiddex shop grid, built for Panda ❤️ Bamboo.",
      priceCents: 4200,
      stock: 120,
      featured: true,
      categoryId: tees.id,
      images: JSON.stringify(imgs[0]),
    },
    {
      name: "Panda Patch Hoodie — Forest",
      slug: "panda-patch-hoodie-forest",
      description:
        "Heavyweight organic cotton fleece with embroidered panda patch. Relaxed fit for all seasons.",
      priceCents: 8900,
      stock: 45,
      featured: true,
      categoryId: hoodies.id,
      images: JSON.stringify(imgs[1]),
    },
    {
      name: "Bamboo Socks — 3 Pack",
      slug: "bamboo-socks-3-pack",
      description: "Naturally antibacterial bamboo fiber. Three muted tones to match your fits.",
      priceCents: 2400,
      stock: 200,
      featured: false,
      categoryId: acc.id,
      images: JSON.stringify(imgs[2]),
    },
    {
      name: "Minimal Logo Tee — Charcoal",
      slug: "minimal-logo-tee-charcoal",
      description: "Water-based ink print. Carbon-neutral shipping on every order.",
      priceCents: 3800,
      stock: 80,
      featured: true,
      categoryId: tees.id,
      images: JSON.stringify(imgs[3]),
    },
    {
      name: "Zip Fleece — Mist Grey",
      slug: "zip-fleece-mist-grey",
      description: "Recycled polyester + bamboo lining. Zip pockets and a tailored silhouette.",
      priceCents: 11200,
      stock: 30,
      featured: false,
      categoryId: hoodies.id,
      images: JSON.stringify(imgs[4]),
    },
    {
      name: "Canvas Tote — Panda Print",
      slug: "canvas-tote-panda-print",
      description: "Heavy canvas with inner pocket. Carry your essentials with calm confidence.",
      priceCents: 3200,
      stock: 60,
      featured: false,
      categoryId: acc.id,
      images: JSON.stringify(imgs[5]),
    },
  ];

  for (const p of products) {
    await prisma.product.create({ data: p });
  }

  console.log("Seed OK — admin:", admin.email);
  console.log("Demo affiliate code: PANDA10 (10% commission on attributed orders)");
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
