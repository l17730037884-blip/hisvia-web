"use client";
import { motion } from "framer-motion";

interface Step { icon?: string; title: string; description?: string; }
interface Props { steps: Step[]; direction?: "horizontal" | "vertical"; }

export default function StepFlow({ steps, direction = "horizontal" }: Props) {
  const isH = direction === "horizontal";
  return (
    <div className={`flex ${isH ? "flex-row" : "flex-col"} ${isH ? "gap-0" : "gap-0"}`}>
      {steps.map((s, i) => (
        <div key={i} className={`flex ${isH ? "flex-col items-center flex-1" : "flex-row items-start gap-4"}`}>
          <motion.div initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
            className={`w-10 h-10 rounded-full flex items-center justify-center text-[14px] font-bold flex-shrink-0 ${i === 0 ? "bg-[#0066FF] text-white" : "bg-[#F0F0F0] text-[#999]"}`}>
            {s.icon || i + 1}
          </motion.div>
          {isH && i < steps.length - 1 && <div className="h-px flex-1 bg-[#E8E8ED] mt-5" />}
          <div className={isH ? "text-center mt-3" : ""}>
            <p className="text-[12px] font-bold text-[#0A0A0A]">{s.title}</p>
            {s.description && <p className="text-[10px] text-[#999] mt-0.5">{s.description}</p>}
          </div>
        </div>
      ))}
    </div>
  );
}
