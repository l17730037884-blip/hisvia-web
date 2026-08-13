"use client";
import { motion } from "framer-motion";

interface Event { title: string; time?: string; description?: string; status?: "done" | "active" | "pending"; }
interface Props { events: Event[]; }

export default function Timeline({ events }: Props) {
  return (
    <div className="relative pl-8">
      <div className="absolute left-[11px] top-2 bottom-2 w-px bg-[#E8E8ED]" />
      {events.map((e, i) => (
        <motion.div key={i} initial={{ opacity: 0, x: -8 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
          className="relative pb-6 last:pb-0">
          <div className={`absolute left-[-29px] top-1 w-3 h-3 rounded-full border-2 ${
            e.status === "done" ? "bg-green-500 border-green-500" : e.status === "active" ? "bg-[#0066FF] border-[#0066FF]" : "bg-white border-[#E8E8ED]"
          }`} />
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[13px] font-bold text-[#0A0A0A]">{e.title}</span>
              {e.time && <span className="text-[10px] text-[#999] font-mono">{e.time}</span>}
            </div>
            {e.description && <p className="text-[11px] text-[#999] mt-0.5">{e.description}</p>}
          </div>
        </motion.div>
      ))}
    </div>
  );
}
