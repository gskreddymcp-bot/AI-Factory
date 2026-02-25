"use client";

import { useState } from "react";

export function IdeaForm() {
  const [result, setResult] = useState("");

  async function onSubmit(formData: FormData) {
    const payload = {
      tenantId: formData.get("tenantId"),
      title: formData.get("title"),
      problem: formData.get("problem"),
      constraints: formData.get("constraints")?.toString().split(",")
    };

    const res = await fetch("/api/ideas", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
    const data = await res.json();
    setResult(JSON.stringify(data, null, 2));
  }

  return (
    <form action={onSubmit} className="card" style={{ display: "grid", gap: "0.75rem" }}>
      <h2>Idea Intake</h2>
      <input name="tenantId" placeholder="tenant-1" required />
      <input name="title" placeholder="Idea title" required />
      <textarea name="problem" placeholder="What are we building?" required />
      <input name="constraints" placeholder="Constraints comma-separated" />
      <button type="submit">Generate outputs</button>
      {result && <pre>{result}</pre>}
    </form>
  );
}
