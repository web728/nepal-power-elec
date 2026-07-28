// Minimal in-memory fixed-window rate limiter for form API routes.
// Suitable for a single-instance deployment; swap for a durable store
// (Upstash Redis, etc.) behind this same function signature if the app
// scales to multiple server instances.
const WINDOW_MS = 60_000;
const MAX_REQUESTS = 5;

const buckets = new Map<string, { count: number; resetAt: number }>();

export function checkRateLimit(key: string) {
  const now = Date.now();
  const bucket = buckets.get(key);

  if (!bucket || bucket.resetAt < now) {
    buckets.set(key, { count: 1, resetAt: now + WINDOW_MS });
    return { allowed: true };
  }

  if (bucket.count >= MAX_REQUESTS) {
    return { allowed: false, retryAfterMs: bucket.resetAt - now };
  }

  bucket.count += 1;
  return { allowed: true };
}

export function getClientKey(request: Request) {
  const forwardedFor = request.headers.get("x-forwarded-for");
  return forwardedFor?.split(",")[0]?.trim() ?? "unknown";
}

export function generateReferenceNumber(prefix: string) {
  const stamp = Date.now().toString(36).toUpperCase();
  const rand = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `${prefix}-${stamp}-${rand}`;
}

// Duplicate-submission guard: rejects an identical payload to the same table
// submitted twice within a short window (double-click, a client retry after
// a slow response, or a resubmitted browser tab) without blocking a
// genuinely new enquiry from the same person shortly after. Content-based
// (not IP-based) so it complements, rather than duplicates, checkRateLimit()
// above. Same in-memory caveat as the rate limiter — swap for a durable
// store if the app scales to multiple server instances.
const DUPLICATE_WINDOW_MS = 2 * 60_000;
const recentSubmissions = new Map<string, number>();

function hashPayload(table: string, payload: Record<string, unknown>): string {
  const normalized = JSON.stringify(payload, Object.keys(payload).sort());
  let hash = 0;
  for (let i = 0; i < normalized.length; i++) {
    hash = (hash * 31 + normalized.charCodeAt(i)) | 0;
  }
  return `${table}:${hash}`;
}

export function isDuplicateSubmission(table: string, payload: Record<string, unknown>): boolean {
  const now = Date.now();
  const key = hashPayload(table, payload);

  // Opportunistically clear expired entries so this map doesn't grow forever.
  for (const [k, expiresAt] of recentSubmissions) {
    if (expiresAt < now) recentSubmissions.delete(k);
  }

  const expiresAt = recentSubmissions.get(key);
  if (expiresAt && expiresAt > now) {
    return true;
  }

  recentSubmissions.set(key, now + DUPLICATE_WINDOW_MS);
  return false;
}
