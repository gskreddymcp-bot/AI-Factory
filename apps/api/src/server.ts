import Fastify from "fastify";
import rateLimit from "@fastify/rate-limit";
import { ideaSchema, generateArtifacts, auditEvent, createLogger } from "@repo/lib/index";

const app = Fastify({ logger: false });
const log = createLogger("api");

await app.register(rateLimit, {
  max: Number(process.env.RATE_LIMIT_MAX || 50),
  timeWindow: Number(process.env.RATE_LIMIT_WINDOW_MS || 60000)
});

app.get("/health", async () => ({ status: "ok" }));

app.post("/ideas", async (req, reply) => {
  const parsed = ideaSchema.safeParse(req.body);
  if (!parsed.success) {
    return reply.status(400).send({ error: parsed.error.flatten() });
  }

  const output = generateArtifacts(parsed.data);
  const audit = auditEvent(parsed.data.tenantId, "idea.generated", { title: parsed.data.title });
  log.info("generated_artifacts", { tenantId: parsed.data.tenantId, title: parsed.data.title });
  return { ...output, audit };
});

const port = Number(process.env.PORT || 4000);
app.listen({ port, host: "0.0.0.0" }).catch((err) => {
  log.error("server_boot_failed", { err: String(err) });
  process.exit(1);
});
