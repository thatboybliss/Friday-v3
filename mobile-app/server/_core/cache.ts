// Lightweight in-memory cache used when no external cache provider is configured.
const mem = new Map<string, { value: unknown; expiresAt?: number }>();

function isExpired(expiresAt?: number) {
  return typeof expiresAt === "number" && Date.now() > expiresAt;
}

export async function cacheGet<T = unknown>(key: string): Promise<T | null> {
  const hit = mem.get(key);
  if (!hit) return null;
  if (isExpired(hit.expiresAt)) {
    mem.delete(key);
    return null;
  }
  return hit.value as T;
}

export async function cacheSet(key: string, value: unknown, expirationSeconds?: number): Promise<void> {
  const expiresAt = expirationSeconds ? Date.now() + expirationSeconds * 1000 : undefined;
  mem.set(key, { value, expiresAt });
}

export async function cacheDelete(key: string): Promise<void> {
  mem.delete(key);
}

export async function cacheClear(prefix?: string): Promise<void> {
  if (!prefix) return mem.clear();
  for (const k of mem.keys()) {
    if (k.startsWith(prefix)) mem.delete(k);
  }
}

export async function cacheIncrement(key: string, amount = 1): Promise<number> {
  const current = Number((await cacheGet<number>(key)) ?? 0);
  const next = current + amount;
  await cacheSet(key, next);
  return next;
}

export async function cacheDecrement(key: string, amount = 1): Promise<number> {
  return cacheIncrement(key, -amount);
}
