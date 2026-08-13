const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const MAX_TEXT = 5000;
const MAX_JSON_CHARS = 200000;

export interface RfqSubmission {
  idempotencyKey: string;
  buyerName?: string;
  buyerEmail: string;
  requirementText: string;
  capabilitySelection?: unknown;
  materialApplication?: unknown;
  evidenceSnapshot?: unknown;
  factoryClusterSnapshot?: unknown;
  sourceLocale?: string;
  website?: string;
}

export type ValidationResult = { ok: true; data: RfqSubmission } | { ok: false; error: string; status: number };

export function validateSubmission(body: unknown): ValidationResult {
  if (typeof body !== "object" || body === null) {
    return { ok: false, error: "Invalid request body", status: 400 };
  }
  const b = body as Record<string, unknown>;

  // Honeypot: a real browser never sends a non-empty website field.
  const website = typeof b.website === "string" ? b.website.trim() : "";
  if (website !== "") {
    return { ok: false, error: "Invalid request", status: 400 };
  }

  const idempotencyKey = typeof b.idempotencyKey === "string" ? b.idempotencyKey.trim() : "";
  if (!idempotencyKey || idempotencyKey.length < 8 || idempotencyKey.length > 128) {
    return { ok: false, error: "idempotencyKey is required (8-128 chars)", status: 400 };
  }

  const buyerEmail = typeof b.buyerEmail === "string" ? b.buyerEmail.trim() : "";
  if (!buyerEmail || buyerEmail.length > 200 || !EMAIL_RE.test(buyerEmail)) {
    return { ok: false, error: "A valid buyer email is required", status: 400 };
  }

  const requirementText = typeof b.requirementText === "string" ? b.requirementText.trim() : "";
  if (!requirementText || requirementText.length < 10 || requirementText.length > MAX_TEXT) {
    return { ok: false, error: "requirementText is required (10-5000 chars)", status: 400 };
  }

  const buyerName = typeof b.buyerName === "string" ? b.buyerName.trim().slice(0, 200) : undefined;
  const sourceLocale = typeof b.sourceLocale === "string" ? b.sourceLocale.slice(0, 10) : undefined;

  const snapshots: Array<[keyof RfqSubmission, unknown]> = [
    ["capabilitySelection", b.capabilitySelection],
    ["materialApplication", b.materialApplication],
    ["evidenceSnapshot", b.evidenceSnapshot],
    ["factoryClusterSnapshot", b.factoryClusterSnapshot],
  ];
  for (const [key, value] of snapshots) {
    if (value === undefined || value === null) continue;
    if (typeof value !== "object") {
      return { ok: false, error: `${key} must be a JSON object`, status: 400 };
    }
    const text = JSON.stringify(value);
    if (text.length > MAX_JSON_CHARS) {
      return { ok: false, error: `${key} exceeds size limit`, status: 400 };
    }
  }

  return {
    ok: true,
    data: {
      idempotencyKey,
      buyerName,
      buyerEmail,
      requirementText,
      capabilitySelection: b.capabilitySelection ?? undefined,
      materialApplication: b.materialApplication ?? undefined,
      evidenceSnapshot: b.evidenceSnapshot ?? undefined,
      factoryClusterSnapshot: b.factoryClusterSnapshot ?? undefined,
      sourceLocale,
    },
  };
}
