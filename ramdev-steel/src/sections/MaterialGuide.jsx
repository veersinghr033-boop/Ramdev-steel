import { useState } from "react";
import { useSiteContent } from "../data/siteContent";
import { FiBookOpen, FiStar } from "react-icons/fi";
import { FaLightbulb } from "react-icons/fa";

function MaterialGuide() {
  const { gradeComparison, finishes, careTips, steelMarketRates = [] } = useSiteContent();
  const [activeTab, setActiveTab] = useState("grades");

  return (
    <section id="materials" className="relative bg-slate-50 py-12 sm:py-16 lg:py-20 border-t border-slate-200/90 overflow-hidden w-full max-w-full">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="grid gap-6 lg:grid-cols-2 lg:items-end reveal">
          <div>
            <div className="mb-3.5 inline-flex items-center gap-2 rounded-full border border-orange-200/90 bg-orange-50 px-3.5 py-1 text-xs font-bold uppercase tracking-widest text-orange-700 shadow-sm animate-float">
              <FiBookOpen aria-hidden="true" className="h-4 w-4" />
              <span>Buyer's Knowledge Base</span>
            </div>
            <h2 className="text-3xl font-black tracking-tight text-slate-900 sm:text-4xl md:text-5xl">
              Steel Grade &{" "}
              <span className="bg-linear-to-r from-orange-600 via-amber-600 to-orange-700 bg-clip-text text-transparent">
                Finish Guide
              </span>
            </h2>
          </div>
          <p className="text-sm leading-relaxed text-slate-600 sm:text-base lg:ml-auto lg:max-w-xl">
            We believe an informed customer makes the best choices. Understand the critical
            differences between SS 304, SS 316, and SS 202 to protect your architectural investment.
          </p>
        </div>

        {/* Tab Buttons */}
        <div className="mt-7 sm:mt-9 flex gap-2.5 border-b border-slate-200 pb-3 overflow-x-auto no-scrollbar w-full max-w-full">
          <button
            onClick={() => setActiveTab("grades")}
            className={`whitespace-nowrap shrink-0 rounded-xl px-4 py-2.5 text-xs sm:text-sm font-bold transition shadow-sm ${activeTab === "grades"
              ? "bg-orange-600 text-white shadow-orange-500/20"
              : "bg-white border border-slate-200 text-slate-700 hover:text-orange-600 hover:border-orange-300"
              }`}
          >
            SS Grades Comparison (304 vs 316 vs 202)
          </button>
          <button
            onClick={() => setActiveTab("finishes")}
            className={`whitespace-nowrap shrink-0 rounded-xl px-4 py-2.5 text-xs sm:text-sm font-bold transition shadow-sm ${activeTab === "finishes"
              ? "bg-orange-600 text-white shadow-orange-500/20"
              : "bg-white border border-slate-200 text-slate-700 hover:text-orange-600 hover:border-orange-300"
              }`}
          >
            Surface Finishes & Textures
          </button>
          <button
            onClick={() => setActiveTab("tips")}
            className={`whitespace-nowrap shrink-0 rounded-xl px-4 py-2.5 text-xs sm:text-sm font-bold transition shadow-sm ${activeTab === "tips"
              ? "bg-orange-600 text-white shadow-orange-500/20"
              : "bg-white border border-slate-200 text-slate-700 hover:text-orange-600 hover:border-orange-300"
              }`}
          >
            Maintenance & Quality Myths
          </button>
        </div>

        {/* Tab 1: Grades Comparison */}
        {activeTab === "grades" && (
          <div className="mt-8 grid gap-6 md:grid-cols-3 w-full min-w-0 reveal-scale delay-100">
            {gradeComparison.map((item) => {
              const liveRate = steelMarketRates.find((r) => r.grade === item.grade);
              return (
                <div
                  key={item.grade}
                  className={`relative rounded-3xl border p-4 sm:p-7 flex flex-col justify-between transition duration-300 w-full min-w-0 hover:-translate-y-1 hover:shadow-lg ${item.isPopular
                    ? "border-orange-400 bg-linear-to-b from-orange-50/80 via-white to-white shadow-lg shadow-orange-500/5 ring-1 ring-orange-400/30"
                    : "border-slate-200/90 bg-white shadow-sm hover:border-slate-300"
                    }`}
                >
                  {item.isPopular && (
                    <span className="absolute -top-3 right-4 sm:right-6 rounded-full bg-orange-600 px-3 py-1 text-[10px] font-extrabold uppercase tracking-wider text-white shadow-md shrink-0 z-10 animate-soft-ring">
                      Most Popular Choice
                    </span>
                  )}

                  <div>
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <h3 className="text-2xl font-black text-slate-900">{item.grade}</h3>
                      <span className="text-[11px] font-bold text-orange-700 bg-orange-100/70 px-2.5 py-0.5 rounded-full border border-orange-200 shrink-0">
                        {item.costRating}
                      </span>
                    </div>
                    <p className="mt-1.5 text-xs font-bold text-slate-700">{item.title}</p>

                    <div className="mt-5 space-y-3 border-t border-slate-100 pt-4 text-xs">
                      {liveRate ? (
                        <div className="rounded-2xl bg-orange-50/90 p-3 border border-orange-200/90 shadow-sm">
                          <div className="flex items-center justify-between text-[11px] font-bold text-orange-950">
                            <span className="flex items-center gap-1.5">
                              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                              Live Market Rate:
                            </span>
                            <span className="text-[10px] font-bold text-orange-800 bg-orange-100/90 px-2 py-0.5 rounded-full border border-orange-200">
                              {liveRate.updatedDate || "Live Rate"}
                            </span>
                          </div>
                          <div className="mt-2 flex items-baseline justify-between border-t border-orange-200/50 pt-1.5">
                            <div>
                              <span className="text-base font-black text-slate-900">
                                ₹{liveRate.pricePerKg}
                              </span>
                              <span className="text-[11px] font-semibold text-slate-500"> / kg raw</span>
                            </div>
                            <div className="text-right">
                              <span className="text-xs font-black text-orange-700">
                                ~₹{liveRate.pricePerRft?.toLocaleString()}
                              </span>
                              <span className="text-[10px] font-semibold text-slate-500"> / RFT fab</span>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="flex items-center justify-between rounded-xl bg-orange-50/80 px-3 py-2 border border-orange-200/80">
                          <span className="text-[11px] font-bold text-orange-900">Indicative Rate:</span>
                          <span className="text-xs font-black text-orange-700">
                            {item.grade.includes("304")
                              ? "₹1,100 – ₹1,650 / RFT"
                              : item.grade.includes("316")
                                ? "₹1,550 – ₹2,200 / RFT"
                                : "₹750 – ₹1,250 / RFT"}
                          </span>
                        </div>
                      )}

                      <div>
                        <span className="text-slate-400 uppercase tracking-wider text-[10px] font-bold">Chemical Alloy</span>
                        <p className="font-semibold text-slate-800 mt-0.5">{item.alloy}</p>
                      </div>

                      <div>
                        <span className="text-slate-400 uppercase tracking-wider text-[10px] font-bold">Rust Resistance</span>
                        <p className="mt-0.5 flex flex-wrap items-center gap-1 font-semibold text-slate-800">
                          <span className="inline-flex text-amber-400" aria-label={`${item.rustRating} out of 5 stars`}>
                            {Array.from({ length: 5 }, (_, index) => (
                              <FiStar key={index} aria-hidden="true" className={`h-3.5 w-3.5 ${index < item.rustRating ? "fill-current" : "text-slate-200"}`} />
                            ))}
                          </span>
                          <span>{item.rustResistance}</span>
                        </p>
                      </div>

                      <div>
                        <span className="text-slate-400 uppercase tracking-wider text-[10px] font-bold">Weather Proofing</span>
                        <p className="font-semibold text-slate-800 mt-0.5">{item.weatherProof}</p>
                      </div>

                      <div>
                        <span className="text-slate-400 uppercase tracking-wider text-[10px] font-bold">Recommended For</span>
                        <p className="font-semibold text-slate-700 mt-0.5 leading-relaxed">{item.suitability}</p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-3.5 text-xs text-slate-600 leading-relaxed">
                    <span className="font-bold text-slate-900">Fabricator Insight: </span>
                    {item.recommendation}
                  </div>
                </div>
              )
            })}
          </div>
        )}

        {/* Tab 2: Finishes */}
        {activeTab === "finishes" && (
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {finishes.map((f, i) => (
              <div
                key={f.id}
                className="rounded-3xl border border-slate-200/90 bg-white p-6 sm:p-7 shadow-sm hover:border-orange-400 transition"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-orange-600">0{i + 1}</span>
                  <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-[10px] font-bold text-slate-600 border border-slate-200">
                    Surface Spec
                  </span>
                </div>
                <h3 className="mt-3 text-lg font-bold text-slate-900">{f.name}</h3>
                <p className="mt-2 text-xs leading-relaxed text-slate-600">{f.description}</p>
                <div className="mt-5 border-t border-slate-100 pt-4 text-xs">
                  <span className="text-slate-400 font-bold uppercase text-[10px]">Best Suited For:</span>
                  <p className="text-slate-800 font-semibold mt-1">{f.bestFor}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab 3: Care Tips */}
        {activeTab === "tips" && (
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {careTips.map((tip, i) => (
              <div
                key={i}
                className="rounded-3xl border border-slate-200/90 bg-white p-6 sm:p-7 shadow-sm hover:border-orange-400 transition"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-100 text-orange-700 font-bold">
                  <FaLightbulb aria-hidden="true" className="h-5 w-5" />
                </div>
                <h3 className="mt-4 text-base font-bold text-slate-900">{tip.title}</h3>
                <p className="mt-2 text-xs leading-relaxed text-slate-600">{tip.tip}</p>
              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
}

export default MaterialGuide;
