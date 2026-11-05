import { useSiteContent } from "../data/siteContent";
import { FiCheck, FiCheckCircle, FiShield, FiX } from "react-icons/fi";

function WhyChooseUs() {
  const { comparisons } = useSiteContent();
  return (
    <section id="why-us" className="relative bg-white py-12 sm:py-16 lg:py-20 border-t border-slate-200/90 overflow-hidden w-full max-w-full">
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="grid gap-6 lg:grid-cols-2 lg:items-end reveal">
          <div>
            <div className="mb-3.5 inline-flex items-center gap-2 rounded-full border border-orange-200/90 bg-orange-50 px-3.5 py-1 text-xs font-bold uppercase tracking-widest text-orange-700 shadow-sm animate-float">
              <FiShield aria-hidden="true" className="h-4 w-4" />
              <span>The Ramdev Advantage</span>
            </div>
            <h2 className="text-3xl font-black text-slate-900 sm:text-4xl md:text-5xl tracking-tight">
              Why Homeowners & <br />
              <span className="bg-linear-to-r from-orange-600 via-amber-600 to-orange-700 bg-clip-text text-transparent">
                Architects Trust Us.
              </span>
            </h2>
          </div>

          <p className="text-sm leading-relaxed text-slate-600 sm:text-base lg:ml-auto lg:max-w-xl">
            Steelwork is a permanent architectural investment. Choosing low-grade fabrication leads
            to unsightly brown rust stains, loose wobbly railings, and safety hazards. Here is how Ramdev Steel sets the benchmark.
          </p>
        </div>

        {/* Quality Comparison - Desktop Table View (md and up) */}
        <div className="mt-8 sm:mt-10 hidden md:block overflow-hidden rounded-3xl border border-slate-200/90 bg-white shadow-xl shadow-slate-200/50 reveal-scale delay-100">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-slate-200 bg-slate-50/90 px-6 py-5">
            <div>
              <h3 className="text-lg font-bold text-slate-900">Quality Comparison Matrix</h3>
              <p className="text-xs text-slate-500">See the real engineering difference behind Ramdev Steel</p>
            </div>
            <span className="mt-2 sm:mt-0 inline-flex items-center gap-2 rounded-full bg-orange-100/80 px-3 py-1 text-xs font-bold text-orange-800 border border-orange-200">
              <FiCheckCircle aria-hidden="true" className="h-4 w-4" /> Verified Engineering Standards
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-100/60 text-xs font-bold uppercase tracking-wider text-slate-600">
                  <th className="py-4 px-6 w-1/4">Parameter</th>
                  <th className="py-4 px-6 w-5/12 text-orange-700 bg-orange-50/70 font-bold border-x border-orange-100">
                    Ramdev Steel Industries
                  </th>
                  <th className="py-4 px-6 w-1/3 text-slate-500">Unorganized Local Fabricators</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {comparisons.map((row, index) => (
                  <tr key={index} className="hover:bg-slate-50/60 transition">
                    <td className="py-4 px-6 font-bold text-slate-900">{row.feature}</td>
                    <td className="py-4 px-6 text-slate-800 bg-orange-50/30 font-medium border-x border-orange-100/60">
                      <div className="flex items-start gap-2.5">
                        <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-700 font-bold text-xs mt-0.5">
                          <FiCheck aria-hidden="true" className="h-3 w-3" />
                        </span>
                        <span>{row.ramdev}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-slate-500">
                      <div className="flex items-start gap-2.5">
                        <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-red-100 text-red-600 font-bold text-xs mt-0.5">
                          <FiX aria-hidden="true" className="h-3 w-3" />
                        </span>
                        <span>{row.others}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quality Comparison - Dedicated Mobile Card View (< md) */}
        <div className="mt-8 space-y-4 md:hidden">
          <div className="flex items-center justify-between rounded-2xl bg-slate-100/80 p-3.5 border border-slate-200">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-slate-800">Quality Comparison</p>
              <p className="text-[11px] text-slate-500">Tap cards to see why our quality lasts decades</p>
            </div>
            <span className="rounded-full bg-orange-100 px-2.5 py-1 text-[10px] font-bold text-orange-800 border border-orange-200">
              Verified
            </span>
          </div>

          {comparisons.map((row, idx) => (
            <div
              key={idx}
              className="rounded-2xl border border-slate-200/90 bg-white p-4 shadow-sm hover:border-orange-300 transition"
            >
              <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
                <span className="text-xs font-mono font-bold text-orange-600">0{idx + 1}</span>
                <h4 className="text-sm font-bold text-slate-900">{row.feature}</h4>
              </div>

              {/* Ramdev Standard */}
              <div className="mt-3 rounded-xl bg-linear-to-r from-orange-50/70 to-amber-50/40 border border-orange-200/80 p-3">
                <div className="flex items-center gap-1.5 text-xs font-bold text-orange-800 mb-1">
                  <span className="flex h-4 w-4 items-center justify-center rounded-full bg-emerald-600 text-white text-[10px] font-black">
                    <FiCheck aria-hidden="true" className="h-3 w-3" />
                  </span>
                  <span>Ramdev Steel Standard:</span>
                </div>
                <p className="text-xs leading-relaxed text-slate-800 font-medium pl-5">
                  {row.ramdev}
                </p>
              </div>

              {/* Local Fabricator Drawback */}
              <div className="mt-2.5 rounded-xl bg-slate-50 border border-slate-200/80 p-3">
                <div className="flex items-center gap-1.5 text-xs font-bold text-slate-500 mb-1">
                  <span className="flex h-4 w-4 items-center justify-center rounded-full bg-red-100 text-red-600 text-[10px] font-black">
                    <FiX aria-hidden="true" className="h-3 w-3" />
                  </span>
                  <span>Local Unorganized Fabricators:</span>
                </div>
                <p className="text-xs leading-relaxed text-slate-500 pl-5">
                  {row.others}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Trust Metric Counters */}
        <div className="mt-12 sm:mt-16 grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
          <div className="rounded-2xl border border-slate-200/90 bg-slate-50/80 p-5 sm:p-6 text-center shadow-sm hover:border-orange-300 hover:shadow-md transition">
            <p className="text-3xl font-black text-slate-900 sm:text-4xl lg:text-5xl">20+</p>
            <p className="mt-1.5 text-xs font-bold uppercase tracking-wider text-orange-700">Years in Operation</p>
            <p className="mt-0.5 text-[11px] text-slate-500">Serving Western Rajasthan</p>
          </div>

          <div className="rounded-2xl border border-slate-200/90 bg-slate-50/80 p-5 sm:p-6 text-center shadow-sm hover:border-orange-300 hover:shadow-md transition">
            <p className="text-3xl font-black text-orange-600 sm:text-4xl lg:text-5xl">500+</p>
            <p className="mt-1.5 text-xs font-bold uppercase tracking-wider text-slate-700">Projects Completed</p>
            <p className="mt-0.5 text-[11px] text-slate-500">Zero structural recalls</p>
          </div>

          <div className="rounded-2xl border border-slate-200/90 bg-slate-50/80 p-5 sm:p-6 text-center shadow-sm hover:border-orange-300 hover:shadow-md transition">
            <p className="text-3xl font-black text-slate-900 sm:text-4xl lg:text-5xl">100%</p>
            <p className="mt-1.5 text-xs font-bold uppercase tracking-wider text-orange-700">Tested SS 304/316</p>
            <p className="mt-0.5 text-[11px] text-slate-500">Guaranteed chemical purity</p>
          </div>

          <div className="rounded-2xl border border-slate-200/90 bg-slate-50/80 p-5 sm:p-6 text-center shadow-sm hover:border-orange-300 hover:shadow-md transition">
            <p className="text-3xl font-black text-orange-600 sm:text-4xl lg:text-5xl">24/7</p>
            <p className="mt-1.5 text-xs font-bold uppercase tracking-wider text-slate-700">WhatsApp Support</p>
            <p className="mt-0.5 text-[11px] text-slate-500">Fast quote turnaround</p>
          </div>
        </div>

      </div>
    </section>
  );
}

export default WhyChooseUs;