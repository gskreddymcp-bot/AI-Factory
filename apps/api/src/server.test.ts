import { describe, expect, it } from "vitest";
import { prdTemplate } from "@repo/lib/index";

describe("api helpers", () => {
  it("renders PRD template", () => {
    const output = prdTemplate({ title: "A", problem: "B", constraints: ["C"] });
    expect(output).toContain("## Problem Statement");
  });
});
