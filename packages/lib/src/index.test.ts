import { describe, expect, it } from "vitest";
import { ideaSchema, architectureTemplate } from "./index";

describe("idea schema", () => {
  it("validates good payload", () => {
    const result = ideaSchema.safeParse({
      tenantId: "t1",
      title: "Retail Brain",
      problem: "Create an AI recommendation service for upsell paths.",
      constraints: ["HIPAA"]
    });
    expect(result.success).toBe(true);
  });

  it("builds mermaid architecture", () => {
    expect(architectureTemplate({ title: "X" })).toContain("graph TD");
  });
});
