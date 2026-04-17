"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

function slugify(s: string) {
  return s
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export async function createProduct(formData: FormData) {
  const session = await auth();
  if (session?.user?.role !== "ADMIN") throw new Error("Unauthorized");

  const name = String(formData.get("name") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim();
  const price = Number(formData.get("price") ?? 0);
  const stock = Number(formData.get("stock") ?? 0);
  const categoryId = String(formData.get("categoryId") ?? "");
  const imageUrl = String(formData.get("imageUrl") ?? "").trim();

  if (!name || !description || !categoryId || !Number.isFinite(price) || price < 0) {
    throw new Error("Invalid fields");
  }

  const slugBase = slugify(name);
  let slug = slugBase;
  let n = 0;
  while (await prisma.product.findUnique({ where: { slug } })) {
    n += 1;
    slug = `${slugBase}-${n}`;
  }

  const images = JSON.stringify(imageUrl ? [imageUrl] : []);

  await prisma.product.create({
    data: {
      name,
      slug,
      description,
      priceCents: Math.round(price * 100),
      stock: Math.max(0, Math.floor(stock)),
      categoryId,
      images,
      featured: false,
    },
  });

  revalidatePath("/shop");
  revalidatePath("/");
}

export async function createAffiliate(formData: FormData) {
  const session = await auth();
  if (session?.user?.role !== "ADMIN") throw new Error("Unauthorized");

  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  const code = String(formData.get("code") ?? "").trim().toUpperCase();
  const pct = Number(formData.get("commissionPercent") ?? 10);

  if (!email || !code || !/^[A-Z0-9_-]{3,32}$/.test(code)) {
    throw new Error("Invalid email or code (3–32 chars, letters, numbers, _ -)");
  }

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) throw new Error("User not found — register them first");

  const already = await prisma.affiliateProfile.findUnique({
    where: { userId: user.id },
  });
  if (already) throw new Error("User already has an affiliate profile");

  const exists = await prisma.affiliateProfile.findUnique({ where: { code } });
  if (exists) throw new Error("Code already used");

  await prisma.affiliateProfile.create({
    data: {
      userId: user.id,
      code,
      commissionPercent: Math.min(50, Math.max(1, pct)),
      active: true,
    },
  });

  await prisma.user.update({
    where: { id: user.id },
    data: { role: "AFFILIATE" },
  });

  revalidatePath("/admin/affiliates");
}
