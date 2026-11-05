import { useSiteContent } from "../data/siteContent";
import { FiCheck, FiCompass, FiZap, FiShield, FiArrowRight, FiAward } from "react-icons/fi";
import AnimatedCounter from "../components/AnimatedCounter";

function About() {
  const { aboutImage } = useSiteContent();
  return (
    <section id="about" className="relative bg-slate-50 py-12 sm:py-16 lg:py-20 border-t border-slate-200/90 overflow-hidden w-full max-w-full">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Top Heading */}
        <div className="mb-8 sm:mb-10 grid gap-6 lg:grid-cols-[1fr_1.8fr] lg:items-end reveal">
          <div>
            <div className="mb-3.5 inline-flex items-center gap-2 rounded-full border border-orange-200/90 bg-orange-50 px-3.5 py-1 text-xs font-bold uppercase tracking-widest text-orange-700 shadow-sm">
              <FiAward className="h-3.5 w-3.5 text-orange-600" />
              <span>About Ramdev Steel Industries</span>
            </div>
            <h2 className="text-3xl font-black tracking-tight text-slate-900 sm:text-4xl md:text-5xl wrap-break-word">
              Engineering Built on <br />
              <span className="bg-linear-to-r from-orange-600 via-amber-600 to-orange-700 bg-clip-text text-transparent">
                Integrity & Quality.
              </span>
            </h2>
          </div>

          <p className="text-sm leading-relaxed text-slate-600 sm:text-base lg:ml-auto lg:max-w-xl">
            Established in 2004 in Jodhpur, Ramdev Steel Industries has grown into one of
            Western Rajasthan's most respected stainless steel fabrication houses. We blend
            traditional metalworking craftsmanship with computer-controlled laser precision.
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12 items-center">

          {/* Left Column: Visual Showcase */}
          <div className="relative min-h-95 sm:min-h-120overflow-hidden rounded-3xl border border-slate-200/90 bg-white shadow-xl shadow-slate-200/50 reveal-scale">
            <img
              src={aboutImage}
              alt="Steel fabrication craftsman at work"
              className="absolute inset-0 h-full w-full object-cover transition duration-700 hover:scale-105"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/75 via-transparent to-transparent" />

            {/* Experience Card Overlay */}
            <div className="absolute bottom-3 left-3 right-3 sm:bottom-6 sm:left-6 sm:right-6 flex items-center justify-between rounded-2xl border border-white/20 bg-white/95 p-3 sm:p-6 backdrop-blur-md shadow-2xl">
              <div className="min-w-0 pr-2">
                <p className="text-xl xs:text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900">
                  <AnimatedCounter end={20} suffix="+" />
                </p>
                <p className="text-[9px] xs:text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-orange-700 leading-tight">
                  Years Mastery
                </p>
              </div>

              <div className="h-8 sm:h-9 w-px bg-slate-200 shrink-0" />

              <div className="min-w-0 pl-2">
                <p className="text-xl xs:text-2xl sm:text-3xl lg:text-4xl font-black text-orange-600">
                  <AnimatedCounter end={500} suffix="+" />
                </p>
                <p className="text-[9px] xs:text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-slate-600 leading-tight">
                  Architectural Deliveries
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Values & Core Pillars */}
          <div className="flex flex-col justify-center space-y-6 reveal delay-100">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-orange-700">
                Precision Standards
              </span>
              <h3 className="mt-1.5 text-2xl font-bold text-slate-900 sm:text-3xl">
                Bespoke Steel Solutions with Zero Compromises
              </h3>
              <p className="mt-2.5 text-xs sm:text-sm leading-relaxed text-slate-600">
                Every railing baluster, gate frame, and decorative grill that leaves our shop
                undergoes rigorous dimensional inspection, chemical grade verification, and multi-stage
                buffing. We take immense pride in creating steelwork that stands proud for decades.
              </p>
            </div>

            {/* 4 Feature Cards — feature-grid triggers staggered reveal */}
            <div className="grid gap-3.5 sm:grid-cols-2 pt-1 feature-grid reveal delay-200">
              <div className="feature-card rounded-2xl border border-slate-200/90 bg-white p-4 shadow-sm transition-all duration-300 hover:border-orange-400 hover:shadow-md hover:-translate-y-0.5 touch-ripple">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-orange-100 text-orange-600 font-bold text-sm">
                  <FiCheck className="h-5 w-5 stroke-[2.5]" />
                </div>
                <h4 className="mt-2.5 text-sm font-bold text-slate-900">Certified Prime Steel</h4>
                <p className="mt-1 text-xs text-slate-500 leading-relaxed">
                  Only authentic SS 304 and 316 prime gauge raw material with test certs.
                </p>
              </div>

              <div className="feature-card rounded-2xl border border-slate-200/90 bg-white p-4 shadow-sm transition-all duration-300 hover:border-orange-400 hover:shadow-md hover:-translate-y-0.5 touch-ripple">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-orange-100 text-orange-600 font-bold text-sm">
                  <FiCompass className="h-5 w-5" />
                </div>
                <h4 className="mt-2.5 text-sm font-bold text-slate-900">Optical Laser Measuring</h4>
                <p className="mt-1 text-xs text-slate-500 leading-relaxed">
                  Millimeter-accurate site inspection eliminates loose wobbles and alignment flaws.
                </p>
              </div>

              <div className="feature-card rounded-2xl border border-slate-200/90 bg-white p-4 shadow-sm transition-all duration-300 hover:border-orange-400 hover:shadow-md hover:-translate-y-0.5 touch-ripple">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-orange-100 text-orange-600 font-bold text-sm">
                  <FiZap className="h-5 w-5" />
                </div>
                <h4 className="mt-2.5 text-sm font-bold text-slate-900">Argon TIG Welds</h4>
                <p className="mt-1 text-xs text-slate-500 leading-relaxed">
                  Full-root seamless penetration welding for superior structural wind-load safety.
                </p>
              </div>

              <div className="feature-card rounded-2xl border border-slate-200/90 bg-white p-4 shadow-sm transition-all duration-300 hover:border-orange-400 hover:shadow-md hover:-translate-y-0.5 touch-ripple">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-orange-100 text-orange-600 font-bold text-sm">
                  <FiShield className="h-5 w-5" />
                </div>
                <h4 className="mt-2.5 text-sm font-bold text-slate-900">15-Year Rust Warranty</h4>
                <p className="mt-1 text-xs text-slate-500 leading-relaxed">
                  Written anti-corrosion commitment backed by responsive local service.
                </p>
              </div>
            </div>

            {/* Action Link */}
            <div className="pt-2 flex flex-wrap gap-3.5 items-center">
              <a
                href="#calculator"
                className="rounded-xl bg-orange-600 px-6 py-3 text-xs font-bold text-white shadow-md shadow-orange-500/20 transition hover:bg-orange-700 active:scale-95"
              >
                Estimate Your Project Cost
              </a>
              <a
                href="#projects"
                className="text-xs font-bold text-slate-700 hover:text-orange-600 transition flex items-center gap-1.5 py-2 active:scale-95"
              >
                <span>View Recent Installations</span>
                <FiArrowRight className="h-3.5 w-3.5" />
              </a>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}

export default About;