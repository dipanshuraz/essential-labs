import { prisma } from "@/lib/prisma";

export const revalidate = 0;

export default async function AdminContactsPage() {
  const messages = await prisma.contactMessage.findMany({
    orderBy: { createdAt: "desc" },
    take: 100,
  });

  return (
    <div>
      <h1 className="text-2xl font-bold text-[#2d2a28]">Contact messages</h1>
      <p className="mt-1 text-sm text-[#7a716b]">Inbound from /contact</p>
      <ul className="mt-8 space-y-4">
        {messages.map((m) => (
          <li
            key={m.id}
            className="rounded-2xl border border-[#eadfd6] bg-white p-4 text-sm shadow-sm"
          >
            <p className="font-medium text-[#2d2a28]">
              {m.name ?? "—"} · {m.email}
            </p>
            <p className="mt-1 text-xs text-[#9a928b]">{m.createdAt.toLocaleString()}</p>
            <p className="mt-3 whitespace-pre-wrap text-[#5c534d]">{m.message}</p>
          </li>
        ))}
        {messages.length === 0 && (
          <li className="text-center text-[#7a716b]">No messages yet.</li>
        )}
      </ul>
    </div>
  );
}
