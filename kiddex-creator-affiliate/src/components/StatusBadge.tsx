import { Badge } from "@/components/ui/Badge";

export function StatusBadge({ status }: { status: "Active" | "Pending" }) {
  if (status === "Active") return <Badge variant="success">{status}</Badge>;
  return <Badge variant="danger">{status}</Badge>;
}
