const idToRequestCount = new Map<string, number>();

export const rateLimit = (
  ip: string,
  options = {
    windowStart: Date.now(),
    maxRequests: 3,
    windowSizeInMS: 1000 * 60 * 60, // 1 hour
  }
) => {
  const now = Date.now();
  const isNewWindow = now - options.windowStart > options.windowSizeInMS;
  if (isNewWindow) {
    options.windowStart = now;
    idToRequestCount.set(ip, 0);
  }
  const currentRequestCount = idToRequestCount.get(ip) ?? 0;
  if (currentRequestCount >= options.maxRequests) {
    return true;
  }

  idToRequestCount.set(ip, currentRequestCount + 1);
  return false;
};
