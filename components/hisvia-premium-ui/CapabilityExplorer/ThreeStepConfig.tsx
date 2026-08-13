"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import ProcessSelector from "./ProcessSelector";
import MaterialFilter from "./MaterialFilter";
import ConfigPanel from "./ConfigPanel";

interface Step { label: string; }
interface Process { id: string; label: string; count: number; materials: string[]; }
interface Props { processes: Process[]; onComplete?: (process: string, material: string) => void; }

export default function ThreeStepConfig({ processes, onComplete }: Props) {
  const [step, setStep] = useState(0);
  const [proc, setProc] = useState(processes[0]?.id || "");
  const [mat, setMat] = useState<string | null>(null);
  const active = processes.find(p => p.id === proc);

  const steps: Step[] = [{ label: "Process" }, { label: "Material" }, { label: "Specifications" }];

  return (
    <div className="border border-[#E8E8ED] rounded-[16px] overflow-hidden bg-white" style={{ boxShadow: "0 2px 16px rgba(0,0,0,0.03)" }}>
      {/* Step indicators */}
      <div className="flex border-b border-[#E8E8ED]">
        {steps.map((s, i) => (
          <div key={i} className={`flex-1 flex items-center gap-2 px-4 py-3 ${i <= step ? "text-[#0A0A0A]" : "text-[#CCC]"}`}>
            <motion.span animate={{ background: i <= step ? "#0066FF" : "#E8E8ED", color: i <= step ? "#fff" : "#999" }}
              className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold">{i + 1}</motion.span>
            <span className="text-[11px] font-semibold">{s.label}</span>
          </div>
        ))}
      </div>
      <div className="p-5">
        <ConfigPanel step={step}>
          {step === 0 && (
            <div>
              <div className="text-[10px] uppercase tracking-[0.1em] text-[#999] mb-2">Select Process</div>
              <ProcessSelector processes={processes} active={proc} onChange={id => { setProc(id); setStep(1); }} />
            </div>
          )}
          {step === 1 && active && (
            <div>
              <div className="text-[10px] uppercase tracking-[0.1em] text-[#999] mb-2">Select Material</div>
              <button onClick={() => setStep(0)} className="text-[11px] text-[#0066FF] mb-2 block">← Back</button>
              <MaterialFilter materials={active.materials} selected={mat} onChange={m => { setMat(m); setStep(2); }} />
            </div>
          )}
          {step === 2 && active && mat && (
            <div>
              <div className="text-[10px] uppercase tracking-[0.1em] text-[#999] mb-2">Specifications</div>
              <button onClick={() => setStep(1)} className="text-[11px] text-[#0066FF] mb-3 block">← Back</button>
              <div className="p-4 rounded-[8px] bg-[#FAFAFA] border border-[#E8E8ED] mb-3">
                <div className="text-[11px] font-semibold text-[#0A0A0A]">{active.label} — {mat}</div>
                <div className="text-[10px] text-[#999] mt-1">{active.count} verified factories available</div>
              </div>
              <button onClick={() => onComplete?.(proc, mat)} className="w-full text-[12px] font-semibold bg-[#0066FF] text-white py-2.5 rounded-[8px] hover:bg-[#0052CC] transition-colors">
                Request Quote →
              </button>
            </div>
          )}
        </ConfigPanel>
      </div>
    </div>
  );
}
