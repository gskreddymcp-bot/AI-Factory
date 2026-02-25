import { describe, expect, it } from "vitest";
import { generateArtifacts } from "@repo/lib/index";

describe("artifact generation", () => {
  it("creates all artifact types", () => {
    const output = generateArtifacts({
      tenantId: "tenant-1",
      title: "Smart Docs",
      problem: "Need automated PRDs",
      constraints: ["SOC2", "EU"]
    });

    expect(output.prd).toContain("# Product Requirements Document");
    expect(output.architecture).toContain("graph TD");
    expect(output.scaffoldPreview.length).toBeGreaterThan(2);
  });
});
