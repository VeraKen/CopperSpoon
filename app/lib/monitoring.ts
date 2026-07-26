type Details = Record<string, string | number | boolean | null | undefined>;

const blockedKey = /(email|password|secret|token|authorization|api.?key)/i;

function safeDetails(details: Details) {
  return Object.fromEntries(
    Object.entries(details).filter(([key, value]) => !blockedKey.test(key) && value !== undefined)
  );
}

export function reportError(scope: string, error: unknown, details: Details = {}) {
  const message = error instanceof Error ? error.message : String(error || "Unknown error");
  console.error(JSON.stringify({
    level: "error",
    service: "copper-spoon",
    scope,
    message: message.slice(0, 300),
    details: safeDetails(details),
    timestamp: new Date().toISOString(),
  }));
}

export function reportInfo(scope: string, details: Details = {}) {
  console.info(JSON.stringify({
    level: "info",
    service: "copper-spoon",
    scope,
    details: safeDetails(details),
    timestamp: new Date().toISOString(),
  }));
}
