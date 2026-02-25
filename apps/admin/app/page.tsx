const tenants = [
  { id: "tenant-1", name: "Acme Corp", usage: 42 },
  { id: "tenant-2", name: "Globex", usage: 11 }
];

const auditLogs = [
  "tenant-1 created idea Smart Docs",
  "tenant-2 generated architecture Retail Brain"
];

export default function AdminPage() {
  return (
    <main style={{ maxWidth: 960, margin: "2rem auto" }}>
      <h1>Admin Console</h1>
      <h2>Tenants</h2>
      <ul>
        {tenants.map((t) => (
          <li key={t.id}>{t.name} ({t.id}) - Usage: {t.usage}</li>
        ))}
      </ul>
      <h2>Audit Logs</h2>
      <ul>{auditLogs.map((a) => <li key={a}>{a}</li>)}</ul>
    </main>
  );
}
