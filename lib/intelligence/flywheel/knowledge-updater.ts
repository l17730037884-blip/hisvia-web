/**
 * HISVIA Flywheel — Knowledge Updater
 * Phase 14: Pending knowledge queue.
 * DOES NOT auto-write to core data (taxonomy, registry).
 */

import type { KnowledgeEntry } from "./event-types";

// ============================================================
// Knowledge Queue
// ============================================================

const knowledgeQueue: KnowledgeEntry[] = [];

let entryCounter = 0;

// ============================================================
// Public API
// ============================================================

export function submitKnowledgeEntry(entry: Omit<KnowledgeEntry, "entry_id" | "status">): KnowledgeEntry {
  const fullEntry: KnowledgeEntry = {
    ...entry,
    entry_id: `KNW-${String(++entryCounter).padStart(3, "0")}`,
    status: "pending_review",
  };
  knowledgeQueue.push(fullEntry);
  return fullEntry;
}

export function getPendingEntries(): KnowledgeEntry[] {
  return knowledgeQueue.filter((e) => e.status === "pending_review");
}

export function getApprovedEntries(): KnowledgeEntry[] {
  return knowledgeQueue.filter((e) => e.status === "approved");
}

export function getRejectedEntries(): KnowledgeEntry[] {
  return knowledgeQueue.filter((e) => e.status === "rejected");
}

export function getAllEntries(): KnowledgeEntry[] {
  return [...knowledgeQueue];
}

export function approveEntry(entryId: string): boolean {
  const entry = knowledgeQueue.find((e) => e.entry_id === entryId);
  if (!entry || entry.status !== "pending_review") return false;
  entry.status = "approved";
  return true;
}

export function rejectEntry(entryId: string): boolean {
  const entry = knowledgeQueue.find((e) => e.entry_id === entryId);
  if (!entry || entry.status !== "pending_review") return false;
  entry.status = "rejected";
  return true;
}

export function getEntriesByType(type: KnowledgeEntry["type"]): KnowledgeEntry[] {
  return knowledgeQueue.filter((e) => e.type === type);
}

export function getEntriesByConfidence(minConfidence: number): KnowledgeEntry[] {
  return knowledgeQueue.filter((e) => e.confidence >= minConfidence);
}

export function getEntryCount(): number {
  return knowledgeQueue.length;
}

export function getPendingCount(): number {
  return knowledgeQueue.filter((e) => e.status === "pending_review").length;
}

export function exportPendingQueue(): KnowledgeEntry[] {
  return getPendingEntries();
}

export function clearQueue(): void {
  knowledgeQueue.length = 0;
  entryCounter = 0;
}
