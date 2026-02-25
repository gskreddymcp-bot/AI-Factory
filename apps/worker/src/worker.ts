import { createLogger } from "@repo/lib/index";

const log = createLogger("worker");

setInterval(() => {
  log.info("worker_tick", { at: new Date().toISOString(), queueDepth: 0 });
}, 15000);
