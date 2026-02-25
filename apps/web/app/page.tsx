import { IdeaForm } from "../components/idea-form";

export default function HomePage() {
  return (
    <main style={{ maxWidth: 960, margin: "2rem auto", display: "grid", gap: "1rem" }}>
      <h1>AI Service Factory</h1>
      <p>Capture client ideas and generate PRD, architecture, and scaffold artifacts.</p>
      <IdeaForm />
    </main>
  );
}
