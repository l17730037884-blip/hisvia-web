/**
 * HISVIA Capability Parser
 * Aggregates supplier capability from factory profiles.
 */

import { FACTORIES } from "./factory-profile";
import type { FactoryProfile, CapabilityProfile } from "./supplier-types";
import type { SystemType } from "../types";

export function getCapabilityProfile(): CapabilityProfile {
  const systems = new Set<SystemType>();
  let totalProducts = 0;
  const processes = new Set<string>();
  let totalCertifications = 0;
  const exportMarkets = new Set<string>();
  let totalLeadTime = 0;
  let totalMoq = 0;

  for (const f of FACTORIES) {
    for (const s of f.system_capability) systems.add(s);
    totalProducts += f.product_capability.length;
    for (const p of f.manufacturing_process) processes.add(p);
    totalCertifications += f.certifications.length;
    for (const m of f.export_experience.top_markets) exportMarkets.add(m);
    totalLeadTime += f.lead_time.production_days;
    totalMoq += f.moq.standard_units;
  }

  return {
    systems_covered: Array.from(systems) as SystemType[],
    total_products: totalProducts,
    manufacturing_processes: Array.from(processes) as any,
    certification_count: totalCertifications,
    export_markets: Array.from(exportMarkets),
    avg_lead_time_days: Math.round(totalLeadTime / FACTORIES.length),
    avg_moq: Math.round(totalMoq / FACTORIES.length),
  };
}

export function getFactoryById(id: string): FactoryProfile | undefined {
  return FACTORIES.find((f) => f.factory_id === id);
}

export function getFactoriesByRegion(region: string): FactoryProfile[] {
  return FACTORIES.filter((f) => f.region === region);
}
