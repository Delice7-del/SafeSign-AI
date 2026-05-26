"use client";

import { useMemo, useState } from "react";
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

// Rich initial sample contracts
const INITIAL_CONTRACTS: Contract[] = [
  {
    id: "c1",
    name: "Apartment Lease Agreement",
    role: "Tenant",
    uploadedAt: new Date(Date.now() - 24 * 3600 * 1000).toISOString(), // 1 day ago
    fileType: "PDF",
    riskScore: 22,
    summary: "Contains late fee clause and standard termination terms. Low overall risk.",
    pinned: true,
    dangerousClauses: [
      "Section 8.3: Late fee of 10% applied immediately after the 3rd of the month.",
      "Section 14.1: Landlord may enter with 12 hours notice for non-emergencies."
    ],
    goodParts: [
      "Section 5.2: Tenant can terminate early with 60 days notice and no penalty fees.",
      "Section 11.4: Landlord responsible for all major structural repairs."
    ],
    roleBasedRisks: "As a Tenant, your biggest security is the rent-control compliance and repair obligations. The late fee margin is slightly narrow but legal."
  },
  {
    id: "c2",
    name: "Freelance Design Contract",
    role: "Freelancer",
    uploadedAt: new Date(Date.now() - 3 * 24 * 3600 * 1000).toISOString(), // 3 days ago
    fileType: "DOCX",
    riskScore: 58,
    summary: "Ambiguous intellectual property assignment and delayed payment clauses.",
    pinned: true,
    dangerousClauses: [
      "Section 3.2: IP ownership transfers to Client immediately upon creation, rather than on full payment receipt.",
      "Section 4.5: Payment terms are Net-60 with no interest or penalties for late client payments."
    ],
    goodParts: [
      "Section 6.1: Unlimited design revisions capped at 3 iterations; subsequent rounds billed hourly.",
      "Section 9.2: Contract governed by laws of freelancer's home state."
    ],
    roleBasedRisks: "As a Freelancer, you risk delivering work and losing IP rights before getting paid. Propose transferring IP rights only upon receipt of final payment."
  },
  {
    id: "c3",
    name: "Employment Offer",
    role: "Employee",
    uploadedAt: new Date(Date.now() - 5 * 24 * 3600 * 1000).toISOString(), // 5 days ago
    fileType: "PDF",
    riskScore: 81,
    summary: "Highly restrictive 5-year non-compete clause and probation terms.",
    pinned: false,
    dangerousClauses: [
      "Section 9.1: Global non-compete restriction for 5 years after termination.",
      "Section 12.4: Dispute resolution clause mandates binding individual arbitration, waiving class-action rights.",
      "Section 2.3: Probationary period of 12 months during which employee can be dismissed without notice."
    ],
    goodParts: [
      "Section 4.1: Substantial health, dental, and remote-working allowances.",
      "Section 7.3: Double compensation rate for overtime hours worked."
    ],
    roleBasedRisks: "As an Employee, a 5-year global non-compete is extremely punitive and likely unenforceable in many states. Propose limiting it to 12 months and a specific geographic area."
  },
  {
    id: "c4",
    name: "Independent Contractor NDA",
    role: "Freelancer",
    uploadedAt: new Date(Date.now() - 10 * 24 * 3600 * 1000).toISOString(), // 10 days ago
    fileType: "PDF",
    riskScore: 15,
    summary: "Standard mutual non-disclosure agreement. Highly balanced terms.",
    pinned: false,
    dangerousClauses: [],
    goodParts: [
      "Section 2.1: Mutual confidentiality obligates both parties equally.",
      "Section 5.3: Confidentiality obligation terminates after 2 years."
    ],
    roleBasedRisks: "This is a clean, standard NDA. No major risks identified. Safe to proceed."
  },
  {
    id: "c5",
    name: "Commercial Office Lease",
    role: "Tenant",
    uploadedAt: new Date(Date.now() - 12 * 24 * 3600 * 1000).toISOString(), // 12 days ago
    fileType: "PDF",
    riskScore: 74,
    summary: "Personal guarantee requirement and uncapped operating expense pass-throughs.",
    pinned: false,
    dangerousClauses: [
      "Section 6.2: Tenant's principal must sign a personal guarantee for the entire lease amount.",
      "Section 10.4: Operating expense (OPEX) share is uncapped and determined solely by landlord."
    ],
    goodParts: [
      "Section 3.1: Right to sublease a portion of the office space with landlord's consent, not to be unreasonably withheld.",
      "Section 15.2: Landlord provides a $15,000 tenant improvement allowance."
    ],
    roleBasedRisks: "As a commercial tenant, a personal guarantee exposes your personal assets to liability if the business fails. Seek a 'good guy' clause or a cap on the guarantee."
  }
];

export default function VaultPage() {
  const [contracts, setContracts] = useState<Contract[]>(INITIAL_CONTRACTS);
  const [query, setQuery] = useState("");
  const [selectedRole, setSelectedRole] = useState("All Contracts");
  const [selectedRisk, setSelectedRisk] = useState("All Risk");
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<Contract | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  // Filter logic
  const filteredContracts = useMemo(() => {
    return contracts.filter((c) => {
      // Search matches name, summary, role, or fileType
      const matchesQuery =
        c.name.toLowerCase().includes(query.toLowerCase()) ||
        c.role.toLowerCase().includes(query.toLowerCase()) ||
        c.summary.toLowerCase().includes(query.toLowerCase()) ||
        c.fileType.toLowerCase().includes(query.toLowerCase());

      // Role filter match
      const matchesRole =
        selectedRole === "All Contracts" || c.role === selectedRole;

      // Risk filter match
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

  // Split into pinned and unpinned lists
  const pinned = useMemo(() => filteredContracts.filter((c) => c.pinned), [filteredContracts]);
  const list = useMemo(() => filteredContracts.filter((c) => !c.pinned), [filteredContracts]);

  // Dynamic statistics
  const stats = useMemo(() => {
    const total = contracts.length;
    const high = contracts.filter((c) => c.riskScore >= 70).length;
    const safe = contracts.filter((c) => c.riskScore <= 30).length;

    // Recent: uploaded in the last 7 days
    const sevenDaysAgo = Date.now() - 7 * 24 * 3600 * 1000;
    const recent = contracts.filter(
      (c) => new Date(c.uploadedAt).getTime() >= sevenDaysAgo
    ).length;

    return { total, high, safe, recent };
  }, [contracts]);

  // Handlers
  function handleOpen(c: Contract) {
    setActive(c);
    setOpen(true);
  }

  function handlePin(id: string) {
    setContracts((prev) =>
      prev.map((c) => (c.id === id ? { ...c, pinned: !c.pinned } : c))
    );
    const contract = contracts.find((c) => c.id === id);
    if (contract) {
      showToast(contract.pinned ? `Unpinned ${contract.name}` : `Pinned ${contract.name}`);
    }
  }

  function handleDelete(id: string) {
    const contract = contracts.find((c) => c.id === id);
    setContracts((prev) => prev.filter((c) => c.id !== id));
    if (contract) {
      showToast(`Removed ${contract.name} from Vault`);
    }
  }

  function handleDownload(c: Contract) {
    showToast(`Downloading AI PDF analysis report for ${c.name}...`);
    // Create a mock download link behavior
    setTimeout(() => {
      const link = document.createElement("a");
      link.href = "#";
      link.setAttribute("download", `${c.name.replace(/\s+/g, "_")}_AI_Analysis.pdf`);
      document.body.appendChild(link);
      // Simulating download end
      document.body.removeChild(link);
    }, 1000);
  }

  function showToast(message: string) {
    setToast(message);
    setTimeout(() => setToast(null), 3000);
  }

  function resetFilters() {
    setQuery("");
    setSelectedRole("All Contracts");
    setSelectedRisk("All Risk");
  }

  return (
    <div className="relative min-h-screen bg-[#070814] text-[#f8fafc] flex flex-col font-sans">
      {/* Ambient glow blobs */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden -z-10">
        <div className="absolute -top-40 -left-40 h-[600px] w-[600px] rounded-full bg-indigo-600/8 blur-[120px]" />
        <div className="absolute top-1/2 right-0 h-[500px] w-[500px] rounded-full bg-violet-600/6 blur-[100px]" />
        <div className="absolute bottom-0 left-1/3 h-[400px] w-[400px] rounded-full bg-indigo-500/5 blur-[90px]" />
      </div>

      {/* Global Header */}
      <Header />

      <main className="relative flex-1 mx-auto w-full max-w-7xl px-6 md:px-8 py-10 pb-24">
        {/* Page Header */}
        <VaultHeader />

        <div className="mt-8 space-y-8">
          {/* Search & Filter Bar */}
          <SearchBar
            query={query}
            setQuery={setQuery}
            selectedRole={selectedRole}
            setSelectedRole={setSelectedRole}
            selectedRisk={selectedRisk}
            setSelectedRisk={setSelectedRisk}
          />

          {/* Stats Overview */}
          <StatsCards stats={stats} />

          {/* Featured - Pinned Contracts Section */}
          <PinnedSection
            items={pinned}
            onOpen={handleOpen}
            onPin={handlePin}
            onDelete={handleDelete}
            onDownload={handleDownload}
          />

          {/* Main Vault Grid */}
          <section className="space-y-4">
            <h3 className="text-sm font-semibold tracking-wider text-slate-400 uppercase">
              All Contracts
            </h3>

            {filteredContracts.length === 0 ? (
              // Empty State UI
              <div className="glass-panel p-12 rounded-2xl text-center flex flex-col items-center justify-center border border-white/5 bg-[#0a0b18]/40 backdrop-blur-sm neon-glow-purple max-w-2xl mx-auto my-8">
                <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-500/10 ring-1 ring-indigo-500/20">
                  <svg className="h-8 w-8 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                
                {contracts.length === 0 ? (
                  <>
                    <h4 className="text-lg font-bold text-white mb-2">No contracts stored in your Vault yet.</h4>
                    <p className="text-sm text-slate-400 max-w-sm mb-6">
                      Analyze your first contract to start building your secure digital Vault and store safety reports.
                    </p>
                    <a href="/analyze">
                      <button className="rounded-lg bg-[#c7d2fe] hover:bg-[#b0c0f8] text-[#0f1123] font-semibold text-sm px-6 py-3 transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer">
                        Analyze Your First Contract
                      </button>
                    </a>
                  </>
                ) : (
                  <>
                    <h4 className="text-lg font-bold text-white mb-2">No contracts match your filters.</h4>
                    <p className="text-sm text-slate-400 max-w-sm mb-6">
                      We couldn't find any contracts matching the selected keyword, role, or risk levels.
                    </p>
                    <button
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
        </div>
      </main>

      {/* Global Footer */}
      <Footer />

      {/* Mobile Sticky Bottom Nav */}
      <BottomNav current="Vault" />

      {/* Report Modal */}
      <ReportModal open={open} contract={active} onClose={() => setOpen(false)} />

      {/* Toast System */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 animate-[fadeIn_0.3s_ease-out] glass-panel bg-[rgba(15,23,42,0.9)] border border-indigo-500/30 px-5 py-3.5 rounded-xl shadow-xl flex items-center gap-3">
          <span className="h-2 w-2 rounded-full bg-indigo-400 animate-pulse" />
          <p className="text-xs font-medium text-slate-200 tracking-wide">{toast}</p>
        </div>
      )}
    </div>
  );
}
