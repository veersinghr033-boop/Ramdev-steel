import { useSiteContent } from "../data/siteContent";
import { FiCheck, FiArrowRight } from "react-icons/fi";
import { FaWhatsapp, FaCalculator, FaStar } from "react-icons/fa";
import AnimatedCounter from "../components/AnimatedCounter";

function Hero() {
  const { heroImage } = useSiteContent();
  return (
    <section
      id="home"
      className="relative overflow-hidden bg-slate-50 pt-20 pb-12 sm:pt-24 sm:pb-16 lg:pt-28 lg:pb-16 flex items-center w-full max-w-full"
    >
      {/* Background Architectural Steel Image — hero-img-reveal = smooth scale-in */}
      <div
        className="absolute inset-0 bg-cover bg-center hero-img-reveal"
        style={{ backgroundImage: `url('${heroImage}')` }}
      />

      {/* Multi-tier Light Overlays for Visual Clarity */}
      <div className="absolute inset-0 bg-white/88 backdrop-blur-[1.5px]" />
      <div className="absolute inset-0 bg-linear-to-r from-white via-white/95 to-white/50" />
      <div className="absolute inset-0 bg-linear-to-r from-slate-50 via-transparent to-white/40" />

      {/* Subtle Warm Amber Glows */}
      <div className="absolute -left-32 top-1/4 h-96 w-96 rounded-full bg-orange-200/35 blur-3xl pointer-events-none animate-pulse-glow" />
      <div className="absolute right-0 top-1/3 h-96 w-96 rounded-full bg-amber-200/30 blur-3xl pointer-events-none animate-pulse-glow" style={{ animationDelay: "1.5s" }} />

      {/* Main Content Container */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-center">

          {/* Left Column: Headline & Action CTAs */}
          <div className="lg:col-span-7 xl:col-span-8">

            {/* Trust Pill — floats + hero entrance */}
            <div className="mb-5 inline-flex max-w-full items-center gap-2 rounded-full border border-orange-200/90 bg-orange-50/90 px-3 py-1.5 sm:px-3.5 shadow-sm animate-float hero-enter hero-enter-1">
              <span className="flex h-2 w-2 shrink-0 rounded-full bg-orange-500 animate-ping" />
              <span className="text-[10px] xs:text-[11px] sm:text-xs font-bold uppercase tracking-wider text-orange-800 wrap-break-word leading-tight">
                SS 304 &amp; 316 Fabrication • Est. 2004 in Rajasthan
              </span>
            </div>

            {/* Main Title — animated gradient text */}
            <h1 className="text-3xl xs:text-4xl sm:text-5xl md:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 leading-[1.12] wrap-break-word hero-enter hero-enter-2">
              Strength You See.{" "}
              <span className="block animate-gradient-text">
                Precision You Trust.
              </span>
            </h1>

            {/* Subheading */}
            <p className="mt-3.5 sm:mt-5 max-w-2xl text-sm sm:text-base leading-relaxed text-slate-600 hero-enter hero-enter-3">
              Transforming spaces with bespoke stainless steel railings, frameless glass balustrades,
              designer entrance gates, and precision industrial engineering. Built for lifetime durability and rust-free elegance.
            </p>

            {/* Checkmark Quality Highlights */}
            <div className="mt-4 sm:mt-5 flex flex-wrap gap-y-2 gap-x-4 sm:gap-x-6 text-xs sm:text-sm text-slate-700 font-semibold hero-enter hero-enter-3">
              <div className="flex items-center gap-1.5 sm:gap-2">
                <span className="flex h-4.5 w-4.5 sm:h-5 sm:w-5 items-center justify-center rounded-full bg-orange-100 text-orange-600 shrink-0">
                  <FiCheck className="h-3 w-3 sm:h-3.5 sm:w-3.5 stroke-3" />
                </span>
                <span>Genuine SS 304 / 316 Testing</span>
              </div>
              <div className="flex items-center gap-1.5 sm:gap-2">
                <span className="flex h-4.5 w-4.5 sm:h-5 sm:w-5 items-center justify-center rounded-full bg-orange-100 text-orange-600 shrink-0">
                  <FiCheck className="h-3 w-3 sm:h-3.5 sm:w-3.5 stroke-3" />
                </span>
                <span>Argon TIG Seamless Welds</span>
              </div>
              <div className="flex items-center gap-1.5 sm:gap-2">
                <span className="flex h-4.5 w-4.5 sm:h-5 sm:w-5 items-center justify-center rounded-full bg-orange-100 text-orange-600 shrink-0">
                  <FiCheck className="h-3 w-3 sm:h-3.5 sm:w-3.5 stroke-3" />
                </span>
                <span>Turnkey On-Site Fitment</span>
              </div>
            </div>

            {/* CTAs */}
            <div className="mt-6 sm:mt-8 flex flex-col gap-2.5 sm:flex-row sm:items-center hero-enter hero-enter-4">
              <a
                href="#calculator"
                className="group animate-shimmer flex w-full sm:w-auto items-center justify-center gap-2.5 rounded-2xl bg-linear-to-r from-orange-500 to-orange-600 px-6 py-3.5 sm:py-4 text-sm font-bold text-white shadow-lg shadow-orange-500/25 transition-all duration-300 hover:from-orange-600 hover:to-orange-700 hover:shadow-xl hover:shadow-orange-500/35 hover:-translate-y-0.5 active:scale-[0.98]"
              >
                <FaCalculator className="h-4.5 w-4.5 text-orange-100 transition-transform group-hover:rotate-12 shrink-0" />
                <span>Calculate Cost Instantly</span>
                <span className="rounded bg-white/20 px-1.5 py-0.5 text-[9px] font-black uppercase text-white shrink-0">Free</span>
              </a>

              <div className="grid grid-cols-2 gap-2.5 w-full sm:w-auto sm:flex sm:items-center">
                <a
                  href="#products"
                  className="flex items-center justify-center gap-1.5 sm:gap-2 rounded-2xl border border-slate-300 bg-white px-3.5 sm:px-6 py-3.5 sm:py-4 text-xs sm:text-sm font-bold text-slate-800 shadow-sm transition-all duration-300 hover:border-orange-500 hover:text-orange-600 hover:-translate-y-0.5 active:scale-[0.98]"
                >
                  <span>Products</span>
                  <FiArrowRight className="h-3.5 w-3.5 sm:h-4 sm:w-4 shrink-0" />
                </a>

                <a
                  href="https://wa.me/918949708489"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-1.5 sm:gap-2 rounded-2xl border border-emerald-300 bg-emerald-50 px-3.5 sm:px-5 py-3.5 sm:py-4 text-xs sm:text-sm font-bold text-emerald-800 transition hover:bg-emerald-100 shadow-sm active:scale-[0.98] animate-whatsapp-ring"
                >
                  <FaWhatsapp className="h-4 w-4 text-emerald-600" />
                  <span>WhatsApp</span>
                </a>
              </div>
            </div>

            {/* Performance Metric Counters — pop-in with bounce */}
            <div className="mt-8 sm:mt-10 grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-4 border-t border-slate-200 pt-5 sm:pt-6 w-full hero-enter hero-enter-5">
              <div className="min-w-0 rounded-2xl border border-slate-200/90 bg-white/95 p-3 sm:p-4 shadow-sm card-hover">
                <p className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 animate-number-glow">
                  <AnimatedCounter end={20} suffix="+" />
                </p>
                <p className="mt-1 text-[11px] sm:text-xs font-bold uppercase tracking-wider text-orange-600 wrap-break-word leading-tight">Years Experience</p>
                <p className="text-[10px] sm:text-[11px] text-slate-500 mt-0.5 wrap-break-word">Est. 2004 in Jodhpur</p>
              </div>

              <div className="min-w-0 rounded-2xl border border-slate-200/90 bg-white/95 p-3 sm:p-4 shadow-sm card-hover">
                <p className="text-2xl sm:text-3xl lg:text-4xl font-black text-orange-600 animate-number-glow">
                  <AnimatedCounter end={500} suffix="+" />
                </p>
                <p className="mt-1 text-[11px] sm:text-xs font-bold uppercase tracking-wider text-slate-700 wrap-break-word leading-tight">Projects Delivered</p>
                <p className="text-[10px] sm:text-[11px] text-slate-500 mt-0.5 wrap-break-word">Villas &amp; Complexes</p>
              </div>

              <div className="min-w-0 rounded-2xl border border-slate-200/90 bg-white/95 p-3 sm:p-4 shadow-sm card-hover">
                <p className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 animate-number-glow">
                  <AnimatedCounter end={100} suffix="%" />
                </p>
                <p className="mt-1 text-[11px] sm:text-xs font-bold uppercase tracking-wider text-orange-600 wrap-break-word leading-tight">Quality Tested</p>
                <p className="text-[10px] sm:text-[11px] text-slate-500 mt-0.5 wrap-break-word">Certified 304/316</p>
              </div>

              <div className="min-w-0 rounded-2xl border border-slate-200/90 bg-white/95 p-3 sm:p-4 shadow-sm card-hover">
                <p className="text-2xl sm:text-3xl lg:text-4xl font-black text-orange-600 flex items-center gap-1 animate-number-glow">
                  <AnimatedCounter end={4.9} decimals={1} />
                  <FaStar className="h-5 w-5 text-amber-500 inline -mt-1" />
                </p>
                <p className="mt-1 text-[11px] sm:text-xs font-bold uppercase tracking-wider text-slate-700 wrap-break-word leading-tight">Client Rating</p>
                <p className="text-[10px] sm:text-[11px] text-slate-500 mt-0.5 wrap-break-word">Verified Reviews</p>
              </div>
            </div>

          </div>

          {/* Right Column: Architectural Quality Snapshot Card */}
          <div className="hidden lg:col-span-5 xl:col-span-4 lg:block hero-enter hero-enter-6">
            <div className="relative rounded-3xl border border-slate-200 bg-white/95 p-6 shadow-xl backdrop-blur-md card-hover">

              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-red-400" />
                  <div className="h-3 w-3 rounded-full bg-amber-400" />
                  <div className="h-3 w-3 rounded-full bg-green-400" />
                </div>
                <span className="text-xs font-bold text-slate-500">Fabrication Standards</span>
              </div>

              <div className="mt-5 space-y-3.5">
                <div className="rounded-2xl border border-slate-100 bg-slate-50/70 p-4 transition-all duration-300 hover:border-orange-300 hover:bg-orange-50/30 hover:-translate-y-0.5 hover:shadow-md">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-orange-700">Top Specialty</span>
                    <span className="rounded-md bg-orange-100 px-2 py-0.5 text-[10px] font-bold text-orange-800 badge-bounce">Bestseller</span>
                  </div>
                  <h4 className="mt-1 text-sm font-bold text-slate-900">SS Glass &amp; Balcony Railings</h4>
                  <p className="mt-1 text-xs text-slate-600 leading-relaxed">
                    12mm Toughened Glass with SS 304 solid spigots &amp; ergonomic handrail.
                  </p>
                </div>

                <div className="rounded-2xl border border-slate-100 bg-slate-50/70 p-4 transition-all duration-300 hover:border-amber-300 hover:bg-amber-50/30 hover:-translate-y-0.5 hover:shadow-md">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-amber-700">Security &amp; Luxury</span>
                    <span className="rounded-md bg-amber-100 px-2 py-0.5 text-[10px] font-bold text-amber-800">Heavy Duty</span>
                  </div>
                  <h4 className="mt-1 text-sm font-bold text-slate-900">Custom Laser-Cut Gates</h4>
                  <p className="mt-1 text-xs text-slate-600 leading-relaxed">
                    CNC laser lattice motifs, anti-sag structure, automation ready.
                  </p>
                </div>

                <div className="rounded-2xl border border-slate-100 bg-slate-50/70 p-4 transition-all duration-300 hover:border-emerald-300 hover:bg-emerald-50/30 hover:-translate-y-0.5 hover:shadow-md">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">Service Guarantee</span>
                    <span className="rounded-md bg-emerald-100 px-2 py-0.5 text-[10px] font-bold text-emerald-800">Free Visit</span>
                  </div>
                  <h4 className="mt-1 text-sm font-bold text-slate-900">Free Site Measurement</h4>
                  <p className="mt-1 text-xs text-slate-600 leading-relaxed">
                    On-site laser inspection, physical samples &amp; 3D layout recommendations.
                  </p>
                </div>
              </div>

              {/* Card Footer */}
              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <p className="text-xs text-slate-500">Got blueprints or photos?</p>
                  <p className="text-xs font-bold text-slate-900">Instant engineering quote</p>
                </div>
                <a
                  href="https://wa.me/918949708489"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-xl bg-orange-500 px-4 py-2 text-xs font-bold text-white hover:bg-orange-600 transition hover:-translate-y-0.5 shadow-sm animate-shimmer"
                >
                  Send Files
                </a>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

export default Hero;
