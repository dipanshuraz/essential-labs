import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { parseImages } from "@/lib/format";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const ids = searchParams.getAll("id");
  if (ids.length === 0) {
    return NextResponse.json({ items: [] });
  }

  const products = await prisma.product.findMany({
    where: { id: { in: ids } },
    select: {
      id: true,
      name: true,
      slug: true,
      priceCents: true,
      stock: true,
      images: true,
    },
  });

  const items = products.map((p) => ({
    ...p,
    image: parseImages(p.images)[0] ?? null,
  }));

  return NextResponse.json({ items });
}
