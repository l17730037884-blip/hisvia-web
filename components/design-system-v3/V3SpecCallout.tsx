/**
 * V3SpecCallout — signature element tying every hero/evidence
 * position to real asset provenance (asset_id · filename · q ·
 * role · validation). Prototype .spec-callout. V3 tokens only.
 */
export interface V3SpecCalloutProps {
  assetId: string;
  filename?: string;
  quality?: number | null;
  role?: string;
  /** Free-form validation note; ok=false renders it in danger color. */
  validation?: { ok: boolean; note: string };
  className?: string;
}

export function V3SpecCallout({ assetId, filename, quality, role, validation, className }: V3SpecCalloutProps) {
  return (
    <p className={`v3-spec-callout${className ? ` ${className}` : ""}`}>
      <b>{assetId}</b>
      {filename ? <> · {filename}</> : null}
      {quality !== undefined && quality !== null ? <> · q={quality}</> : null}
      {role ? <> · role: {role}</> : null}
      {validation ? (
        <>
          {" "}·{" "}
          <span className={validation.ok ? undefined : "v3-danger"}>{validation.note}</span>
        </>
      ) : null}
    </p>
  );
}
