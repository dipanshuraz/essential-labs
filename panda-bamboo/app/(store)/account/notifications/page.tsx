import { NOTIFICATIONS } from "@/lib/account/mockData";

export default function NotificationsPage() {
  if (NOTIFICATIONS.length === 0) {
    return (
      <div>
        <h3>All Notifications</h3>
        <p>All caught up! There are no new notifications for you.</p>
      </div>
    );
  }

  return (
    <div>
      <h3>All Notifications</h3>
      <ul style={{ listStyle: "none", padding: 0, marginTop: 16 }}>
        {NOTIFICATIONS.map((n) => (
          <li
            key={n.id}
            style={{
              padding: "16px 0",
              borderBottom: "1px solid #eee",
            }}
          >
            <strong>{n.title}</strong>
            <p style={{ margin: "6px 0 0", color: "#666" }}>{n.body}</p>
            <span style={{ fontSize: 13, color: "#999" }}>{n.when}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
