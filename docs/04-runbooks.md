# 04 Runbooks

## Incident: API degraded
1. Check `/health` endpoint.
2. Review structured logs from `api` service.
3. Rollback latest deployment if error rate spikes > 5%.

## Incident: Tenant cannot access data
1. Validate tenant membership row.
2. Confirm RLS policy and `auth.uid()` context.
3. Re-run seed or migration consistency check.
