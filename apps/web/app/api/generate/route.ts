import { NextResponse } from "next/server";
import { ideaSchema, generateArtifacts } from "@repo/lib/index";

export async function POST(request: Request) {
  const body = await request.json();
  const parsed = ideaSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "invalid payload" }, { status: 400 });
  }
  return NextResponse.json(generateArtifacts(parsed.data));
}
