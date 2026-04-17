import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";

const schema = z.object({
  email: z.string().email(),
  name: z.string().max(120).optional(),
  message: z.string().min(10).max(5000),
});

export async function POST(req: Request) {
  const json = await req.json();
  const parsed = schema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid message" }, { status: 400 });
  }

  await prisma.contactMessage.create({
    data: {
      email: parsed.data.email,
      name: parsed.data.name ?? null,
      message: parsed.data.message,
    },
  });

  return NextResponse.json({ ok: true });
}
