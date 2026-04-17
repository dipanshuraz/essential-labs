import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";

const schema = z.object({
  email: z.string().email(),
});

export async function POST(req: Request) {
  const json = await req.json();
  const parsed = schema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid email" }, { status: 400 });
  }

  try {
    await prisma.newsletterSubscriber.upsert({
      where: { email: parsed.data.email },
      create: { email: parsed.data.email },
      update: {},
    });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Could not subscribe" }, { status: 500 });
  }
}
