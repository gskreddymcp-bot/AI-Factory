import { NextResponse } from "next/server";
import { ideaSchema, generateArtifacts, auditEvent } from "@repo/lib/index";

export async function POST(request: Request) {
  const body = await request.json();
  const parsed = ideaSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const output = generateArtifacts(parsed.data);
  const audit = auditEvent(parsed.data.tenantId, "idea.generated", {
    title: parsed.data.title
  });

  return NextResponse.json({ ...output, audit });
}
