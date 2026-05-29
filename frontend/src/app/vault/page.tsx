"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import VaultHeader from "@/components/vault/VaultHeader";
import SearchBar from "@/components/vault/SearchBar";
import StatsCards from "@/components/vault/StatsCards";
import ContractCard from "@/components/vault/ContractCard";
import PinnedSection from "@/components/vault/PinnedSection";
import ReportModal from "@/components/vault/ReportModal";
import BottomNav from "@/components/vault/BottomNav";
import type { Contract } from "@/types/contract";
import {
  deleteAnalysis,
  downloadAnalysisReport,
  fetchAnalysisDetail,
  fetchHistory,
  updateAnalysisPin,
} from "@/lib/api";
import { detailToContract, historyItemToContract } from "@/lib/mappers";

export default function VaultPage() {
  const [contracts, setContracts] = useState<Contract[]>([]);
  const [loading, setLoading] = useState(true);
  const [apiConnected, setApiConnected] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedRole, setSelectedRole] = useState("All Contracts");
  const [selectedRisk, setSelectedRisk] = useState("All Risk");
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<Contract | null>(null);
  const [modalLoading, setModalLoading] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  const loadVault = useCallback(async () => {
    setLoading(true);
    try {
      const items = await fetchHistory();
      setContracts(items.map(historyItemToContract));
      setApiConnected(true);
    } catch {
      setContracts([]);
      setApiConnected(false);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadVault();
  }, [loadVault]);

  const filteredContracts = useMemo(() => {
    return contracts.filter((c) => {
      const matchesQuery =
        c.name.toLowerCase().includes(query.toLowerCase()) ||
        c.role.toLowerCase().includes(query.toLowerCase()) ||
        c.summary.toLowerCase().includes(query.toLowerCase()) ||
        c.fileType.toLowerCase().includes(query.toLowerCase());

      const matchesRole =
        selectedRole === "All Contracts" || c.role === selectedRole;

      let matchesRisk = true;
      if (selectedRisk === "Safe") {
        matchesRisk = c.riskScore <= 30;
      } else if (selectedRisk === "Medium") {
        matchesRisk = c.riskScore > 30 && c.riskScore < 70;
      } else if (selectedRisk === "High Risk") {
        matchesRisk = c.riskScore >= 70;
      }

      return matchesQuery && matchesRole && matchesRisk;
    });
  }, [contracts, query, selectedRole, selectedRisk]);

  const pinned = useMemo(
    () => filteredContracts.filter((c) => c.pinned),
    [filteredContracts]
  );
  const list = useMemo(
    () => filteredContracts.filter((c) => !c.pinned),
    [filteredContracts]
  );

  const stats = useMemo(() => {
    const total = contracts.length;
    const high = contracts.filter((c) => c.riskScore >= 70).length;
    const safe = contracts.filter((c) => c.riskScore <= 30).length;
    const sevenDaysAgo = Date.now() - 7 * 24 * 3600 * 1000;
    const recent = contracts.filter(
      (c) => new Date(c.uploadedAt).getTime() >= sevenDaysAgo
    ).length;
    return { total, high, safe, recent };
  }, [contracts]);

  function showToast(message: string) {
    setToast(message);
    setTimeout(() => setToast(null), 3000);
  }

  async function handleOpen(c: Contract) {
    setActive(c);
    setOpen(true);
    const id = Number(c.id);
    if (Number.isNaN(id)) return;

    if (c.dangerousClauses?.length) return;

    setModalLoading(true);
    try {
      const detail = await fetchAnalysisDetail(id);
      setActive(detailToContract(detail));
    } catch {
      showToast("Could not load full report from server.");
    } finally {
      setModalLoading(false);
    }
  }

  async function handlePin(id: string) {
    const contract = contracts.find((c) => c.id === id);
    if (!contract) return;

    const numericId = Number(id);
    const nextPinned = !contract.pinned;

    setContracts((prev) =>
      prev.map((c) => (c.id === id ? { ...c, pinned: nextPinned } : c))
    );

    if (!apiConnected || Number.isNaN(numericId)) {
      showToast(nextPinned ? `Pinned ${contract.name}` : `Unpinned ${contract.name}`);
      return;
    }

    try {
      await updateAnalysisPin(numericId, nextPinned);
      showToast(nextPinned ? `Pinned ${contract.name}` : `Unpinned ${contract.name}`);
    } catch {
      setContracts((prev) =>
        prev.map((c) => (c.id === id ? { ...c, pinned: !nextPinned } : c))
      );
      showToast("Could not update pin on server.");
    }
  }

  async function handleDelete(id: string) {
    const contract = contracts.find((c) => c.id === id);
    const numericId = Number(id);

    setContracts((prev) => prev.filter((c) => c.id !== id));
    if (contract) showToast(`Removed ${contract.name} from Vault`);

    if (!apiConnected || Number.isNaN(numericId)) return;

    try {
      await deleteAnalysis(numericId);
    } catch {
      if (contract) {
        setContracts((prev) => [...prev, contract]);
      }
      showToast("Could not delete on server.");
    }
  }

  async function handleDownload(c: Contract) {
    const numericId = Number(c.id);
    try {
      if (!Number.isNaN(numericId) && apiConnected) {
        const detail = await fetchAnalysisDetail(numericId);
        downloadAnalysisReport(c.name, {
          summary: detail.summary,
          riskScore: detail.riskScore,
          riskLevel: detail.riskLevel,
          dangerousClauses: detail.dangerousClauses,
          goodParts: detail.goodParts,
          roleBasedRisks: detail.roleBasedRisks,
          role: detail.role,
        });
      } else {
        downloadAnalysisReport(c.name, {
          summary: c.summary,
          riskScore: c.riskScore,
          riskLevel:
            c.riskScore >= 70 ? "High Risk" : c.riskScore <= 30 ? "Low Risk" : "Medium Risk",
          dangerousClauses: c.dangerousClauses ?? [],
          goodParts: c.goodParts ?? [],
          roleBasedRisks: Array.isArray(c.roleBasedRisks)
            ? c.roleBasedRisks
            : c.roleBasedRisks
            ? [c.roleBasedRisks]
            : [],
          role: c.role,
        });
      }
      showToast(`Downloaded report for ${c.name}`);
    } catch {
      showToast("Download failed.");
    }
  }

  function resetFilters() {
    setQuery("");
    setSelectedRole("All Contracts");
    setSelectedRisk("All Risk");
  }

  return (
    <div className="relative min-h-screen bg-[#070814] text-[#f8fafc] flex flex-col font-sans">
      <div className="pointer-events-none fixed inset-0 overflow-hidden -z-10">
        <div className="absolute -top-40 -left-40 h-[600px] w-[600px] rounded-full bg-indigo-600/8 blur-[120px]" />
        <div className="absolute top-1/2 right-0 h-[500px] w-[500px] rounded-full bg-violet-600/6 blur-[100px]" />
        <div className="absolute bottom-0 left-1/3 h-[400px] w-[400px] rounded-full bg-indigo-500/5 blur-[90px]" />
      </div>

      <Header />

      <main className="relative flex-1 mx-auto w-full max-w-7xl px-6 md:px-8 py-10 pb-24">
        <VaultHeader />

        {!apiConnected && !loading && (
          <p className="mt-4 text-center text-xs text-amber-400/90">
            Backend offline — start the API at {process.env.NEXT_PUBLIC_API_BASE || "http://localhost:8080"} to sync your Vault.
          </p>
        )}

        <div className="mt-8 space-y-8">
          <SearchBar
            query={query}
            setQuery={setQuery}
            selectedRole={selectedRole}
            setSelectedRole={setSelectedRole}
            selectedRisk={selectedRisk}
            setSelectedRisk={setSelectedRisk}
          />

          <StatsCards stats={stats} />

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="glass-panel h-48 rounded-2xl animate-pulse bg-white/5"
                />
              ))}
            </div>
          ) : (
            <>
              <PinnedSection
                items={pinned}
                onOpen={handleOpen}
                onPin={handlePin}
                onDelete={handleDelete}
                onDownload={handleDownload}
              />

              <section className="space-y-4">
                <h3 className="text-sm font-semibold tracking-wider text-slate-400 uppercase">
                  All Contracts
                </h3>

                {filteredContracts.length === 0 ? (
                  <div className="glass-panel p-12 rounded-2xl text-center flex flex-col items-center justify-center border border-white/5 bg-[#0a0b18]/40 backdrop-blur-sm neon-glow-purple max-w-2xl mx-auto my-8">
                    <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-500/10 ring-1 ring-indigo-500/20">
                      <svg
                        className="h-8 w-8 text-indigo-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        />
                      </svg>
                    </div>

                    {contracts.length === 0 ? (
                      <>
                        <h4 className="text-lg font-bold text-white mb-2">
                          No contracts stored in your Vault yet.
                        </h4>
                        <p className="text-sm text-slate-400 max-w-sm mb-6">
                          Analyze your first contract to start building your secure digital Vault.
                        </p>
                        <Link href="/analyze">
                          <button className="rounded-lg bg-brand-lavender hover:bg-[#b0c0f8] text-[#0f1123] font-semibold text-sm px-6 py-3 transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer">
                            Analyze Your First Contract
                          </button>
                        </Link>
                      </>
                    ) : (
                      <>
                        <h4 className="text-lg font-bold text-white mb-2">
                          No contracts match your filters.
                        </h4>
                        <p className="text-sm text-slate-400 max-w-sm mb-6">
                          Try clearing filters or adjusting your search.
                        </p>
                        <button
                          type="button"
                          onClick={resetFilters}
                          className="rounded-lg bg-indigo-500/10 border border-indigo-500/30 hover:bg-indigo-500/20 text-indigo-300 font-semibold text-sm px-6 py-2.5 transition-all cursor-pointer"
                        >
                          Clear All Filters
                        </button>
                      </>
                    )}
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {list.map((c) => (
                      <ContractCard
                        key={c.id}
                        c={c}
                        onOpen={handleOpen}
                        onPin={handlePin}
                        onDelete={handleDelete}
                        onDownload={handleDownload}
                      />
                    ))}
                  </div>
                )}
              </section>
            </>
          )}
        </div>
      </main>

      <Footer />
      <BottomNav current="Vault" />

      <ReportModal
        open={open}
        contract={active}
        loading={modalLoading}
        onClose={() => setOpen(false)}
      />

      {toast && (
        <div className="fixed bottom-6 right-6 z-50 animate-[fadeIn_0.3s_ease-out] glass-panel bg-[rgba(15,23,42,0.9)] border border-indigo-500/30 px-5 py-3.5 rounded-xl shadow-xl flex items-center gap-3">
          <span className="h-2 w-2 rounded-full bg-indigo-400 animate-pulse" />
          <p className="text-xs font-medium text-slate-200 tracking-wide">{toast}</p>
        </div>
      )}
    </div>
  );
}
