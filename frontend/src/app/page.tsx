"use client";

import { useState, useEffect } from "react";
import { TheInfiniteGrid } from "@/components/ui/the-infinite-grid";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MapPin, TrendingUp, Search, Compass, ChevronRight, X, Sparkles, ExternalLink, Briefcase } from "lucide-react";

type Role = {
  role_name: string;
  role_vibe?: string;
  market_confidence_score?: number;
  technical_workflow?: string[];
  market_status?: {
    trend?: string;
    why?: string;
  };
  salary_matrix?: Record<string, string>;
  targeted_companies?: {
    global?: string[];
    india?: string[];
  };
  success_roadmap?: string[];
  learning_resources?: string[];
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

const fadeSlideUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export default function Home() {
  const [exploring, setExploring] = useState(false);
  const [showExploreAll, setShowExploreAll] = useState(false);
  const [showLearnMore, setShowLearnMore] = useState(false);
  const [roles, setRoles] = useState<Role[]>([]);
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
    fetch(`${apiUrl}/api/roles`)
      .then(res => res.json())
      .then(data => setRoles(data))
      .catch(err => console.error("Error fetching roles:", err));
  }, []);

  const handleSelectRole = (roleName: string) => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
    fetch(`${apiUrl}/api/roles/${encodeURIComponent(roleName)}`)
      .then(res => res.json())
      .then(data => {
        setSelectedRole(data);
        setShowExploreAll(false);
      })
      .catch(err => console.error("Error fetching role details:", err));
  };

  const filteredRoles = roles.filter(r =>
    r.role_name.toLowerCase().includes(search.toLowerCase())
  );

  const getSalaryRows = (role: Role) => {
    const matrix = role.salary_matrix ?? {};
    const tier1 = matrix["Tier 1"] ?? matrix["tier_1"] ?? "INR 18-34 LPA";
    const tier2 = matrix["Tier 2"] ?? matrix["tier_2"] ?? "INR 10-20 LPA";
    const tier3 = matrix["Tier 3"] ?? matrix["tier_3"] ?? "INR 6-12 LPA";
    return [
      { tier: "Tier 1", salary: tier1 },
      { tier: "Tier 2", salary: tier2 },
      { tier: "Tier 3", salary: tier3 },
    ];
  };

  return (
    <main className="relative min-h-screen overflow-hidden">
      {/* Animated background — fills the whole screen */}
      <TheInfiniteGrid />

      {/* ── LANDING HERO ─────────────────────────────────────────────── */}
      <AnimatePresence>
        {!exploring && (
          <motion.div
            key="hero"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30, transition: { duration: 0.4 } }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="relative z-10 flex flex-col items-center justify-center min-h-screen text-center px-6"
          >
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate="show"
              className="space-y-6 max-w-2xl"
            >
              <motion.div variants={fadeSlideUp} className="flex items-center justify-center gap-2 text-primary/70 mb-2">
                <Compass className="w-5 h-5" />
                <span className="text-sm font-medium tracking-widest uppercase">Career Intelligence Platform</span>
              </motion.div>

              <motion.h1
                variants={fadeSlideUp}
                className="text-6xl md:text-8xl font-heading font-bold tracking-tight text-foreground"
              >
                PathFinder
              </motion.h1>

              <motion.p variants={fadeSlideUp} className="text-lg md:text-xl text-muted-foreground max-w-lg mx-auto leading-relaxed">
                Precision roadmaps. Real salaries. 47 careers. One future.
              </motion.p>

              <motion.div variants={fadeSlideUp} className="flex gap-4 justify-center">
                <button
                  id="explore-paths-btn"
                  onClick={() => setExploring(true)}
                  className="group inline-flex items-center gap-2 px-8 py-3.5 bg-primary text-primary-foreground font-semibold rounded-lg hover:opacity-90 transition-all shadow-lg active:scale-95"
                >
                  Explore Paths
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
                <button
                  id="learn-more-btn"
                  onClick={() => setShowLearnMore(true)}
                  className="px-8 py-3.5 bg-card/60 backdrop-blur-sm border border-border text-foreground font-semibold rounded-lg hover:bg-card/80 transition-all active:scale-95"
                >
                  Learn More
                </button>
              </motion.div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── DASHBOARD ────────────────────────────────────────────────── */}
      <AnimatePresence>
        {exploring && (
          <motion.div
            key="dashboard"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { duration: 0.5 } }}
            className="relative z-10 flex gap-5 p-5 h-screen"
          >
            {/* ── Sidebar ── */}
            <motion.aside
              initial={{ x: -40, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="w-72 h-full min-h-0 flex flex-col gap-3 backdrop-blur-md bg-card/60 border border-border rounded-2xl shadow-2xl p-4 shrink-0 overflow-hidden"
            >
              <div className="flex items-center gap-2 pb-2 border-b border-border">
                <button
                  id="back-to-hero-btn"
                  onClick={() => { setExploring(false); setSelectedRole(null); }}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  ← Back
                </button>
              </div>

              <h2 className="font-heading text-xl font-semibold text-foreground">Career Paths</h2>

              <button
                id="explore-all-btn"
                onClick={() => setShowExploreAll(true)}
                className="flex items-center justify-center gap-2 rounded-lg border border-primary/30 bg-primary/10 px-3 py-2 text-sm font-semibold text-primary hover:bg-primary/15 transition-colors"
              >
                <Sparkles className="w-4 h-4" />
                Explore All
              </button>

              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search roles…"
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-sm bg-muted/50 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/40"
                />
              </div>

              <ScrollArea className="flex-1 min-h-0 overflow-y-auto symphony-scrollbar -mr-1 pr-1">
                <motion.div
                  variants={staggerContainer}
                  initial="hidden"
                  animate="show"
                  className="flex flex-col gap-2"
                >
                  {filteredRoles.map(role => (
                    <motion.button
                      key={role.role_name}
                      id={`role-btn-${role.role_name.replace(/\s+/g, '-')}`}
                      variants={fadeSlideUp}
                      onClick={() => handleSelectRole(role.role_name)}
                      className={`text-left p-3 rounded-xl border transition-all w-full ${
                        selectedRole?.role_name === role.role_name
                          ? "border-primary bg-primary/10 shadow-sm"
                          : "border-border hover:border-primary/40 hover:bg-card/50"
                      }`}
                    >
                      <p className="text-sm font-semibold leading-tight">{role.role_name}</p>
                      <div className="flex items-center gap-1.5 mt-1.5">
                        <TrendingUp className="w-3 h-3 text-primary" />
                        <span className="text-xs text-muted-foreground">Score: {role.market_confidence_score}%</span>
                      </div>
                    </motion.button>
                  ))}
                </motion.div>
              </ScrollArea>
            </motion.aside>

            {/* ── Main panel ── */}
            <div className="flex-1 overflow-hidden min-h-0">
              <AnimatePresence mode="wait">
                {!selectedRole ? (
                  <motion.div
                    key="empty"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="h-full flex flex-col items-center justify-center backdrop-blur-md bg-card/30 border border-border rounded-2xl gap-4"
                  >
                    <Search className="w-14 h-14 text-primary/20" />
                    <p className="text-muted-foreground text-sm">Select a career path from the sidebar to reveal your roadmap</p>
                  </motion.div>
                ) : (
                  <motion.div
                    key={selectedRole.role_name}
                    variants={staggerContainer}
                    initial="hidden"
                    animate="show"
                    exit={{ opacity: 0, y: 10 }}
                    className="h-full min-h-0 flex flex-col gap-5"
                  >
                    {/* ── Role Header ── */}
                    <motion.div variants={fadeSlideUp} layoutId={`role-card-${selectedRole.role_name}`}>
                      <Card className="backdrop-blur-md bg-card/70 border-border shadow-xl rounded-2xl">
                        <CardHeader>
                          <div className="flex justify-between items-start gap-4">
                            <div>
                              <CardTitle className="font-heading text-3xl font-bold">{selectedRole.role_name}</CardTitle>
                              <CardDescription className="mt-2 text-base max-w-2xl leading-relaxed">
                                {selectedRole.role_vibe}
                              </CardDescription>
                            </div>
                            <Badge variant="outline" className="shrink-0 text-primary border-primary text-sm px-3 py-1">
                              {selectedRole.market_confidence_score}%
                            </Badge>
                          </div>
                        </CardHeader>
                      </Card>
                    </motion.div>

                    {/* ── Bottom Row ── */}
                    <div className="flex gap-5 flex-1 min-h-0">

                      {/* ── Skill Tree + Technical Workflow ── */}
                      <motion.div variants={fadeSlideUp} className="flex-1 min-h-0">
                        <Card className="h-full backdrop-blur-md bg-card/70 border-border shadow-xl rounded-2xl flex flex-col">
                          <CardHeader className="pb-3">
                            <CardTitle className="font-heading text-xl flex items-center gap-2">
                              <MapPin className="w-5 h-5 text-primary" />
                              Technical Workflow & Success Roadmap
                            </CardTitle>
                          </CardHeader>
                          <CardContent className="flex-1 overflow-auto">
                            <h4 className="text-xs font-bold text-primary uppercase tracking-wide mb-3">Technical Workflow</h4>
                            <div className="space-y-3 mb-6">
                              {selectedRole.technical_workflow?.map((step, idx) => (
                                <p key={`${step}-${idx}`} className="text-sm leading-relaxed text-foreground">
                                  {idx + 1}. {step}
                                </p>
                              ))}
                            </div>
                            <h4 className="text-xs font-bold text-primary uppercase tracking-wide mb-3">Success Roadmap</h4>
                            <div className="relative pl-6 border-l-2 border-primary/20 space-y-8 mt-2">
                              {selectedRole.success_roadmap?.map((step, idx) => (
                                <motion.div key={idx} variants={fadeSlideUp} className="relative">
                                  {/* Node dot */}
                                  <div className="absolute -left-[33px] top-1 w-4 h-4 rounded-full bg-primary border-4 border-card shadow-sm" />
                                  <p className="text-sm font-medium leading-snug">{step}</p>
                                </motion.div>
                              ))}
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>

                      {/* ── Salary + Market + Learning ── */}
                      <motion.div variants={fadeSlideUp} className="w-64 shrink-0">
                        <Card className="h-full backdrop-blur-md bg-card/70 border-border shadow-xl rounded-2xl flex flex-col">
                          <CardHeader className="pb-3">
                            <CardTitle className="font-heading text-lg flex items-center gap-2">
                              <Briefcase className="w-4 h-4 text-primary" />
                              Salary Matrix
                            </CardTitle>
                          </CardHeader>
                          <CardContent className="flex-1 overflow-auto space-y-5">
                            <div className="space-y-2">
                              {getSalaryRows(selectedRole).map(row => (
                                <div key={row.tier} className="rounded-lg border border-border/70 bg-muted/30 px-3 py-2">
                                  <p className="text-xs font-semibold text-primary">{row.tier}</p>
                                  <p className="text-sm text-foreground">{row.salary}</p>
                                </div>
                              ))}
                            </div>
                            <div>
                              <h4 className="text-xs font-bold text-primary uppercase tracking-wide mb-2">Market Status</h4>
                              <p className="text-xs text-muted-foreground leading-relaxed">
                                <span className="font-semibold text-foreground">Trend:</span> {selectedRole.market_status?.trend ?? "Stable demand"}
                              </p>
                              <p className="text-xs text-muted-foreground leading-relaxed mt-2">
                                {selectedRole.market_status?.why ?? "Demand tracks 2026 hiring momentum for this role family."}
                              </p>
                            </div>
                            <div>
                              <h4 className="text-xs font-bold text-primary uppercase tracking-wide mb-2">Recommended Learning</h4>
                              <div className="space-y-2">
                                {selectedRole.learning_resources?.map((resource, index) => (
                                  <a
                                    key={`${resource}-${index}`}
                                    href={resource.startsWith("http") ? resource : `https://www.google.com/search?q=${encodeURIComponent(resource)}`}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="flex items-center gap-1 text-xs text-primary hover:underline break-words"
                                  >
                                    {resource}
                                    <ExternalLink className="w-3 h-3 shrink-0" />
                                  </a>
                                ))}
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showExploreAll && (
          <motion.div
            key="explore-all-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-30 bg-background/80 backdrop-blur-xl p-6 md:p-10"
          >
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 16, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="mx-auto h-full max-w-7xl rounded-2xl border border-border bg-card/70 p-5 shadow-2xl flex flex-col"
            >
              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-2xl font-heading font-bold text-foreground">Explore All Professions</h3>
                <button
                  onClick={() => setShowExploreAll(false)}
                  className="rounded-lg border border-border p-2 text-muted-foreground hover:text-foreground hover:bg-muted/60"
                  aria-label="Close explore all overlay"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <div className="symphony-scrollbar grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 overflow-y-auto pr-2">
                {filteredRoles.map(role => (
                  <motion.button
                    layoutId={`role-card-${role.role_name}`}
                    key={`overlay-${role.role_name}`}
                    onClick={() => handleSelectRole(role.role_name)}
                    className="rounded-xl border border-border bg-background/70 p-4 text-left hover:border-primary/50 hover:bg-primary/5 transition-colors"
                  >
                    <p className="text-sm font-semibold text-foreground">{role.role_name}</p>
                    <p className="mt-2 text-xs text-muted-foreground line-clamp-3">{role.role_vibe}</p>
                    <div className="mt-3 flex items-center gap-1.5 text-xs text-primary">
                      <TrendingUp className="w-3 h-3" />
                      {role.market_confidence_score}%
                    </div>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showLearnMore && (
          <motion.div
            key="learn-more-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-background/40 backdrop-blur-md"
            onClick={() => setShowLearnMore(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 10 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-3xl w-full backdrop-blur-2xl bg-card/80 border border-white/20 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.3)] rounded-[2rem] overflow-hidden"
            >
              <div className="absolute top-6 right-6 z-10">
                <button
                  onClick={() => setShowLearnMore(false)}
                  className="p-2 rounded-full hover:bg-white/10 text-muted-foreground hover:text-foreground transition-all"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-10 md:p-14">
                <div className="flex items-center gap-3 mb-8">
                  <div className="p-2.5 bg-primary/10 rounded-xl">
                    <Sparkles className="w-6 h-6 text-primary" />
                  </div>
                  <h2 className="text-3xl font-heading font-bold tracking-tight">The PathFinder Project</h2>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                  {/* The Mission */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 text-primary font-bold uppercase tracking-widest text-[10px]">
                      <Compass className="w-3.5 h-3.5" />
                      The Mission
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      PathFinder bridges the gap between academic theory and industry reality. We provide high-fidelity career roadmaps and strategic guidance to help students navigate the evolving tech landscape.
                    </p>
                  </div>

                  {/* The Intelligence */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 text-primary font-bold uppercase tracking-widest text-[10px]">
                      <TrendingUp className="w-3.5 h-3.5" />
                      The Intelligence
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Powered by a robust FastAPI backend, our platform audits thousands of data points to generate accurate technical workflows. Every roadmap is vetted for market relevance and depth.
                    </p>
                  </div>

                  {/* The Workflow */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 text-primary font-bold uppercase tracking-widest text-[10px]">
                      <ExternalLink className="w-3.5 h-3.5" />
                      The Workflow
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Built with a modern stack: Next.js for a cinematic frontend, Antigravity AI for architectural guidance, and Google Cloud Run for seamless global deployment.
                    </p>
                  </div>
                </div>

                <div className="mt-12 pt-8 border-t border-white/10 flex justify-between items-center">
                  <p className="text-xs text-muted-foreground italic">Precision roadmaps. Real-world impact. Built for 2026.</p>
                  <button
                    onClick={() => setShowLearnMore(false)}
                    className="text-sm font-semibold text-primary hover:underline"
                  >
                    Close
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
