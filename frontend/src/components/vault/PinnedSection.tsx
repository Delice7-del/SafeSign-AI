"use client";

import ContractCard from "./ContractCard";
import { Contract } from "@/types/contract";
import { FiBookmark } from "react-icons/fi";

interface PinnedSectionProps {
  items: Contract[];
  onOpen?: (c: Contract) => void;
  onPin?: (id: string) => void;
  onDelete?: (id: string) => void;
  onDownload?: (c: Contract) => void;
}

export default function PinnedSection({
  items,
  onOpen,
  onPin,
  onDelete,
  onDownload,
}: PinnedSectionProps) {
  if (!items || items.length === 0) return null;

  return (
    <section className="space-y-4">
      <div className="flex items-center gap-2">
        <h3 className="text-sm font-semibold tracking-wider text-slate-400 uppercase flex items-center gap-1.5">
          <FiBookmark className="text-amber-400 h-4 w-4" />
          <span>Pinned Contracts</span>
        </h3>
        <span className="h-1.5 w-1.5 rounded-full bg-amber-400 animate-pulse" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {items.map((c) => (
          <div
            key={c.id}
            className="rounded-2xl border border-indigo-500/10 shadow-lg shadow-indigo-500/5 neon-glow-purple bg-[#0b0c1c]/30 hover:scale-[1.005] hover:-translate-y-0.5 transition-all duration-300"
          >
            <ContractCard
              c={c}
              onOpen={onOpen}
              onPin={onPin}
              onDelete={onDelete}
              onDownload={onDownload}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
