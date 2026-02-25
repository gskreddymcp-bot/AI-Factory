import { z } from "zod";

export const ideaSchema = z.object({
  tenantId: z.string().min(1),
  title: z.string().min(3),
  problem: z.string().min(10),
  constraints: z.array(z.string()).default([])
});

export type IdeaInput = z.infer<typeof ideaSchema>;

export function prdTemplate(input: Pick<IdeaInput, "title" | "problem" | "constraints">) {
  return `# Product Requirements Document\n\n## Product Name\n${input.title}\n\n## Problem Statement\n${input.problem}\n\n## Constraints\n${input.constraints.map((c) => `- ${c}`).join("\n") || "- None provided"}\n\n## Success Metrics\n- Time-to-first-prototype < 1 day\n- Generation success rate > 95%`;
}

export function architectureTemplate(input: Pick<IdeaInput, "title">) {
  return `graph TD\n    A[Client Idea Intake] --> B[Validation + Rate Limit]\n    B --> C[Generator Service]\n    C --> D[PRD Markdown]\n    C --> E[Architecture Mermaid]\n    C --> F[Scaffold Preview]\n    D --> G[Supabase Storage]\n    E --> G\n    F --> G\n    G --> H[Admin Console]\n\n%% ${input.title}`;
}

export function scaffoldPreview(input: Pick<IdeaInput, "title">) {
  return [
    `${input.title.toLowerCase().replace(/\s+/g, "-")}/`,
    "  apps/service/src/index.ts",
    "  apps/service/Dockerfile",
    "  .github/workflows/service-ci.yml"
  ];
}

export function generateArtifacts(input: IdeaInput) {
  return {
    prd: prdTemplate(input),
    architecture: architectureTemplate(input),
    scaffoldPreview: scaffoldPreview(input)
  };
}

export function auditEvent(tenantId: string, action: string, metadata: Record<string, unknown>) {
  return {
    tenantId,
    action,
    metadata,
    occurredAt: new Date().toISOString()
  };
}

export function createLogger(service: string) {
  return {
    info: (event: string, data: Record<string, unknown>) => {
      console.log(JSON.stringify({ level: "info", service, event, ...data }));
    },
    error: (event: string, data: Record<string, unknown>) => {
      console.error(JSON.stringify({ level: "error", service, event, ...data }));
    }
  };
}
