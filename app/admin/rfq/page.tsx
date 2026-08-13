"use client";

import { useCallback, useEffect, useState } from "react";

interface RfqRow {
  id: string;
  publicRef: string;
  buyerName: string | null;
  buyerEmail: string;
  requirementText: string;
  status: string;
  internalStatus: string;
  assignedTo: string | null;
  sourceLocale: string | null;
  createdAt: string;
}

interface RfqDetail extends RfqRow {
  capabilitySelection: unknown;
  materialApplication: unknown;
  evidenceSnapshot: unknown;
  factoryClusterSnapshot: unknown;
  events: Array<{ id: string; eventType: string; payload: unknown; createdAt: string }>;
}

const MONO = `ui-monospace, "SF Mono", Menlo, Consolas, monospace`;

async function api(path: string, token: string, init?: RequestInit) {
  const res = await fetch(path, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      ...(init?.headers ?? {}),
    },
  });
  const body = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(body?.error ?? `Request failed (${res.status})`);
  return body;
}

function fmt(iso: string) {
  return new Date(iso).toLocaleString();
}

export default function AdminRfqPage() {
  const [token, setToken] = useState("");
  const [tokenOk, setTokenOk] = useState(false);
  const [rows, setRows] = useState<RfqRow[]>([]);
  const [total, setTotal] = useState(0);
  const [detail, setDetail] = useState<RfqDetail | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const saved = window.sessionStorage.getItem("hisvia_admin_token") ?? "";
    if (saved) setToken(saved);
  }, []);

  const loadList = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await api("/api/admin/rfqs", token);
      setRows(data.rows);
      setTotal(data.total);
      setTokenOk(true);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to load");
      setTokenOk(false);
    } finally {
      setLoading(false);
    }
  }, [token]);

  const openDetail = async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      const data = await api(`/api/admin/rfqs/${id}`, token);
      setDetail(data.rfq);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to load detail");
    } finally {
      setLoading(false);
    }
  };

  const changeStatus = async (toStatus?: string, toInternal?: string) => {
    if (!detail) return;
    const note = window.prompt("Note (required)");
    if (!note) return;
    let reason: string | undefined;
    if (toStatus && ["closed_won", "closed_lost", "cancelled"].includes(toStatus)) {
      reason = window.prompt("Closing reason (required)") ?? undefined;
      if (!reason) return;
    }
    setError(null);
    try {
      await api(`/api/admin/rfqs/${detail.id}/status`, token, {
        method: "PATCH",
        body: JSON.stringify({ status: toStatus, internalStatus: toInternal, note, reason }),
      });
      await openDetail(detail.id);
      await loadList();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Status change failed");
    }
  };

  const assign = async () => {
    if (!detail) return;
    const assignedTo = window.prompt("Assign to (name or email)");
    if (!assignedTo) return;
    setError(null);
    try {
      await api(`/api/admin/rfqs/${detail.id}/assign`, token, {
        method: "PATCH",
        body: JSON.stringify({ assignedTo }),
      });
      await openDetail(detail.id);
      await loadList();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Assign failed");
    }
  };

  if (!tokenOk) {
    return (
      <div style={{ fontFamily: MONO, maxWidth: 560, margin: "80px auto", padding: "0 20px" }}>
        <h1 style={{ fontSize: 18 }}>HISVIA Admin — RFQ Queue</h1>
        <p style={{ fontSize: 12, color: "#666" }}>Enter the admin token to access the sourcing queue.</p>
        <input
          type="password"
          value={token}
          onChange={(e) => setToken(e.target.value)}
          placeholder="Admin token"
          style={{ width: "100%", padding: 10, marginTop: 12, border: "1px solid #999", fontFamily: MONO }}
        />
        <button
          onClick={() => {
            window.sessionStorage.setItem("hisvia_admin_token", token);
            loadList();
          }}
          style={{ marginTop: 10, padding: "10px 18px", background: "#111", color: "#fff", border: "none", cursor: "pointer" }}
        >
          Unlock
        </button>
        {error && <p style={{ color: "#b00020", fontSize: 12 }}>{error}</p>}
      </div>
    );
  }

  return (
    <div style={{ fontFamily: MONO, maxWidth: 1200, margin: "0 auto", padding: "32px 20px 80px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h1 style={{ fontSize: 18 }}>HISVIA RFQ Queue ({total})</h1>
        <button
          onClick={() => {
            setTokenOk(false);
            setDetail(null);
            window.sessionStorage.removeItem("hisvia_admin_token");
          }}
          style={{ background: "none", border: "1px solid #999", padding: "6px 12px", cursor: "pointer" }}
        >
          Log out
        </button>
      </div>
      {error && <p style={{ color: "#b00020", fontSize: 12 }}>{error}</p>}

      {detail ? (
        <div>
          <button onClick={() => setDetail(null)} style={{ margin: "14px 0", background: "none", border: "1px solid #999", padding: "6px 12px", cursor: "pointer" }}>
            ← Back to queue
          </button>
          <h2 style={{ fontSize: 15, margin: "8px 0" }}>{detail.publicRef} · {detail.status} / {detail.internalStatus}</h2>
          <div style={{ display: "grid", gap: 8, fontSize: 12, background: "#f7f7f5", border: "1px solid #ddd", padding: 16 }}>
            <p><strong>Buyer:</strong> {detail.buyerName ?? "—"} · {detail.buyerEmail}</p>
            <p><strong>Locale:</strong> {detail.sourceLocale ?? "—"} · <strong>Assigned:</strong> {detail.assignedTo ?? "—"}</p>
            <p><strong>Created:</strong> {fmt(detail.createdAt)}</p>
            <p><strong>Requirement:</strong> {detail.requirementText}</p>
            <p><strong>Capability:</strong> <pre style={{ whiteSpace: "pre-wrap" }}>{JSON.stringify(detail.capabilitySelection ?? null, null, 2)}</pre></p>
            <p><strong>Material / Application:</strong> <pre style={{ whiteSpace: "pre-wrap" }}>{JSON.stringify(detail.materialApplication ?? null, null, 2)}</pre></p>
            <p><strong>Evidence snapshot:</strong> <pre style={{ whiteSpace: "pre-wrap" }}>{JSON.stringify(detail.evidenceSnapshot ?? null, null, 2)}</pre></p>
            <p><strong>Factory cluster snapshot:</strong> <pre style={{ whiteSpace: "pre-wrap" }}>{JSON.stringify(detail.factoryClusterSnapshot ?? null, null, 2)}</pre></p>
          </div>
          <div style={{ margin: "14px 0", display: "flex", gap: 8, flexWrap: "wrap" }}>
            <button onClick={() => changeStatus("in_review")} style={btn}>→ in_review</button>
            <button onClick={() => changeStatus("supplier_contacted")} style={btn}>→ supplier_contacted</button>
            <button onClick={() => changeStatus("quoted")} style={btn}>→ quoted</button>
            <button onClick={() => changeStatus("closed_won")} style={{ ...btn, color: "#0a6b2d" }}>→ closed_won</button>
            <button onClick={() => changeStatus("closed_lost")} style={{ ...btn, color: "#b00020" }}>→ closed_lost</button>
            <button onClick={() => changeStatus("cancelled")} style={{ ...btn, color: "#b00020" }}>→ cancelled</button>
            <button onClick={() => changeStatus(undefined, "processing")} style={btn}>internal → processing</button>
            <button onClick={() => changeStatus(undefined, "closed")} style={{ ...btn, color: "#b00020" }}>internal → closed</button>
            <button onClick={assign} style={btn}>Assign</button>
          </div>
          <h3 style={{ fontSize: 13, margin: "18px 0 8px" }}>Timeline ({detail.events.length} events)</h3>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12 }}>
            <tbody>
              {detail.events.map((ev) => (
                <tr key={ev.id} style={{ borderBottom: "1px solid #ddd", verticalAlign: "top" }}>
                  <td style={{ padding: "6px 8px", whiteSpace: "nowrap", color: "#666" }}>{fmt(ev.createdAt)}</td>
                  <td style={{ padding: "6px 8px", fontWeight: 600 }}>{ev.eventType}</td>
                  <td style={{ padding: "6px 8px", color: "#333" }}><pre style={{ whiteSpace: "pre-wrap", margin: 0 }}>{JSON.stringify(ev.payload ?? null)}</pre></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div>
          <button onClick={loadList} style={{ margin: "14px 0", background: "none", border: "1px solid #999", padding: "6px 12px", cursor: "pointer" }}>
            Refresh {loading ? "…" : ""}
          </button>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12 }}>
            <thead>
              <tr style={{ textAlign: "left", borderBottom: "2px solid #111" }}>
                <th style={{ padding: "8px" }}>Reference</th>
                <th style={{ padding: "8px" }}>Requirement</th>
                <th style={{ padding: "8px" }}>Status</th>
                <th style={{ padding: "8px" }}>Internal</th>
                <th style={{ padding: "8px" }}>Assigned</th>
                <th style={{ padding: "8px" }}>Created</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.id} onClick={() => openDetail(r.id)} style={{ borderBottom: "1px solid #ddd", cursor: "pointer" }}>
                  <td style={{ padding: "8px", whiteSpace: "nowrap" }}>{r.publicRef}</td>
                  <td style={{ padding: "8px", maxWidth: 420 }}>{r.requirementText.slice(0, 90)}{r.requirementText.length > 90 ? "…" : ""}</td>
                  <td style={{ padding: "8px", whiteSpace: "nowrap" }}>{r.status}</td>
                  <td style={{ padding: "8px", whiteSpace: "nowrap" }}>{r.internalStatus}</td>
                  <td style={{ padding: "8px", whiteSpace: "nowrap" }}>{r.assignedTo ?? "—"}</td>
                  <td style={{ padding: "8px", whiteSpace: "nowrap" }}>{fmt(r.createdAt)}</td>
                </tr>
              ))}
              {rows.length === 0 && (
                <tr><td colSpan={6} style={{ padding: 16, color: "#666" }}>{loading ? "Loading…" : "No RFQs yet."}</td></tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

const btn: React.CSSProperties = {
  background: "#fff",
  border: "1px solid #999",
  padding: "6px 12px",
  cursor: "pointer",
  fontFamily: MONO,
  fontSize: 12,
};
