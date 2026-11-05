import { useSiteContent } from "../data/siteContent";
import { FiTool, FiCheck, FiArrowRight } from "react-icons/fi";

function Services() {
  const { services } = useSiteContent();
  const handleServiceWhatsApp = (serviceTitle) => {
    const text = `Hello Ramdev Steel! I want to discuss a project for *${serviceTitle}*. Please connect with me.`;
    window.open(`https://wa.me/918949708489?text=${encodeURIComponent(text)}`, "_blank");
  };

  return (
    <section id="services" className="relative bg-white py-12 sm:py-16 lg:py-20 border-t border-slate-200/90 overflow-hidden w-full max-w-full">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="grid gap-6 lg:grid-cols-2 lg:items-end reveal">
          <div>
            <div className="mb-3.5 inline-flex items-center gap-2 rounded-full border border-orange-200/90 bg-orange-50 px-3.5 py-1 text-xs font-bold uppercase tracking-widest text-orange-700 shadow-sm animate-float">
              <FiTool className="h-3.5 w-3.5 text-orange-600" />
              <span>Our Core Capabilities</span>
            </div>
            <h2 className="text-3xl font-black text-slate-900 sm:text-4xl md:text-5xl tracking-tight">
              Turnkey Steel <br />
              <span className="bg-linear-to-r from-orange-600 via-amber-600 to-orange-700 bg-clip-text text-transparent">
                Fabrication Services.
              </span>
            </h2>
          </div>

          <p className="text-sm leading-relaxed text-slate-600 sm:text-base lg:ml-auto lg:max-w-xl">
            From initial site survey and 3D design to precision laser cutting, argon welding,
            and final on-site fitment — we deliver comprehensive turnkey solutions with zero hassle.
          </p>
        </div>

        {/* Services Grid — stagger-grid for sequenced card entrance */}
        <div className="mt-8 sm:mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3 stagger-grid">
          {services.map((service) => (
            <article
              key={service.id}
              className="group stagger-card relative min-h-105 sm:min-h-115 overflow-hidden rounded-3xl border border-slate-800 bg-slate-950 shadow-md transition duration-500 hover:-translate-y-2 hover:shadow-2xl hover:border-orange-500/60"
            >
              {/* Background Image */}
              <img
                src={service.image}
                alt={service.title}
                className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-110 opacity-50 group-hover:opacity-65"
                loading="lazy"
              />

              {/* Gradient Scrim */}
              <div className="absolute inset-0 bg-linear-to-t from-slate-950 via-slate-950/80 to-black/35" />

              {/* Number Badge */}
              <div className="absolute right-5 top-5 flex h-11 w-11 items-center justify-center rounded-2xl border border-white/20 bg-black/60 backdrop-blur-md shadow-md">
                <span className="text-sm font-black text-orange-400">{service.number}</span>
              </div>

              {/* Content Docked at Bottom */}
              <div className="absolute inset-0 flex flex-col justify-end p-5 sm:p-7">
                <div className="h-1 w-10 bg-orange-500 rounded-full transition-all duration-300 group-hover:w-20" />

                <h3 className="mt-3 text-xl sm:text-2xl font-bold text-white group-hover:text-orange-400 transition">
                  {service.title}
                </h3>

                <p className="mt-2 text-xs leading-relaxed text-slate-300">
                  {service.description}
                </p>

                {/* Deliverables Pills */}
                <div className="mt-3.5 flex flex-wrap gap-1.5">
                  {service.deliverables.map((item, idx) => (
                    <span
                      key={idx}
                      className="inline-flex items-center gap-1 rounded-md border border-white/10 bg-black/50 px-2 py-0.5 text-[10px] font-medium text-slate-300"
                    >
                      <FiCheck className="text-orange-400 stroke-3" />
                      <span>{item}</span>
                    </span>
                  ))}
                </div>

                {/* Direct Action */}
                <div className="mt-5 flex flex-wrap items-center justify-between gap-2 border-t border-white/10 pt-3.5">
                  <button
                    onClick={() => handleServiceWhatsApp(service.title)}
                    className="flex items-center gap-1.5 text-xs font-bold text-orange-400 hover:text-orange-300 transition py-1"
                  >
                    <span>Discuss Requirements</span>
                    <FiArrowRight className="h-4 w-4" />
                  </button>

                  <a
                    href="#contact"
                    className="rounded-lg bg-white/20 backdrop-blur-md px-3 py-1.5 text-xs font-semibold text-white hover:bg-orange-600 transition shadow-sm"
                  >
                    Book Site Visit
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Feature Highlights Banner */}
        <div className="mt-12 sm:mt-16 overflow-hidden rounded-3xl border border-orange-200/90 bg-linear-to-r from-orange-50/90 via-amber-50/60 to-orange-50/90 p-6 sm:p-10 shadow-sm">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <span className="text-xs font-bold uppercase tracking-widest text-orange-700">
                Architect & Contractor Partnerships
              </span>
              <h3 className="mt-1 text-2xl font-bold text-slate-900 sm:text-3xl">
                Collaborate with Rajasthan's Trusted Steel Engineering Partner
              </h3>
              <p className="mt-2 text-xs text-slate-600 leading-relaxed">
                We work directly with architects, builders, and interior designers on commercial complexes,
                villa townships, hospitals, and hotels. Bulk material discounts and dedicated site supervisors provided.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-2.5 sm:gap-3 shrink-0">
              <a
                href="#contact"
                className="rounded-xl bg-orange-600 px-6 py-3.5 text-xs font-bold text-white shadow-md shadow-orange-500/20 transition hover:bg-orange-700 text-center"
              >
                Inquire For Bulk Projects
              </a>
              <a
                href="tel:+918949708489"
                className="rounded-xl border border-slate-300 bg-white px-5 py-3.5 text-xs font-bold text-slate-800 transition hover:border-orange-500 hover:text-orange-600 shadow-sm text-center"
              >
                Call Project Head
              </a>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

export default Services;