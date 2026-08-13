/**
 * HISVIA Flywheel — Event Store
 * Phase 14: In-memory event log with filtering/querying.
 */

import type { SupplyChainEvent, EventType, ActorType } from "./event-types";

// ============================================================
// In-memory Store
// ============================================================

const eventLog: SupplyChainEvent[] = [];

// ============================================================
// Public API
// ============================================================

export function recordEvent(event: SupplyChainEvent): void {
  eventLog.push(event);
}

export function recordEvents(events: SupplyChainEvent[]): void {
  eventLog.push(...events);
}

export function getAllEvents(): SupplyChainEvent[] {
  return [...eventLog];
}

export function getEventsByType(eventType: EventType): SupplyChainEvent[] {
  return eventLog.filter((e) => e.event_type === eventType);
}

export function getEventsByActor(actorType: ActorType, actorId?: string): SupplyChainEvent[] {
  return eventLog.filter((e) => {
    if (e.actor_type !== actorType) return false;
    if (actorId && e.actor_id !== actorId) return false;
    return true;
  });
}

export function getEventsInPeriod(
  startDate: string,
  endDate: string
): SupplyChainEvent[] {
  const start = new Date(startDate).getTime();
  const end = new Date(endDate).getTime();
  return eventLog.filter((e) => {
    const ts = new Date(e.timestamp).getTime();
    return ts >= start && ts <= end;
  });
}

export function getEventsByAsset(assetId: string): SupplyChainEvent[] {
  return eventLog.filter((e) => e.related_assets.includes(assetId));
}

export function getEventsBySupplier(factoryId: string): SupplyChainEvent[] {
  return eventLog.filter((e) => e.related_supplier === factoryId);
}

export function getEventsByMarket(country: string): SupplyChainEvent[] {
  return eventLog.filter((e) => e.related_market === country);
}

export function getLatestEvents(limit: number): SupplyChainEvent[] {
  return [...eventLog]
    .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
    .slice(0, limit);
}

export function getEventCount(): number {
  return eventLog.length;
}

export function getEventCountByType(): Record<EventType, number> {
  const counts: Record<string, number> = {};
  for (const e of eventLog) {
    counts[e.event_type] = (counts[e.event_type] || 0) + 1;
  }
  return counts as Record<EventType, number>;
}

export function clearEvents(): void {
  eventLog.length = 0;
}
