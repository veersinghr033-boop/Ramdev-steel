import { useSiteContent } from "../data/siteContent";
import { FiCheckCircle, FiMessageSquare, FiStar } from "react-icons/fi";

function StarRating({ rating }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, index) => (
        <FiStar
          key={index}
          aria-hidden="true"
          className={`h-4 w-4 ${index < rating ? "fill-amber-400 text-amber-400" : "fill-zinc-200 text-zinc-200"}`}
        />
      ))}
    </div>
  );
}

const avatarColors = [
  "bg-red-500",
  "bg-emerald-500",
  "bg-violet-500",
  "bg-pink-500",
  "bg-blue-500",
  "bg-amber-500",
];

function Testimonials() {
  const { testimonials } = useSiteContent();
  return (
    <section id="testimonials" className="relative bg-orange-50/30 py-12 sm:py-16 lg:py-20 border-t border-slate-200/90 overflow-hidden w-full max-w-full">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="grid gap-6 lg:grid-cols-2 lg:items-end reveal">
          <div>
            <div className="mb-3.5 inline-flex items-center gap-2 rounded-full border border-orange-200/90 bg-orange-50 px-3.5 py-1 text-xs font-bold uppercase tracking-widest text-orange-700 shadow-sm">
              <FiStar aria-hidden="true" className="h-4 w-4" />
              <span>Client Stories</span>
            </div>
            <h2 className="text-3xl font-black text-slate-900 sm:text-4xl md:text-5xl tracking-tight">
              Trusted By <span className="bg-linear-to-r from-orange-600 via-amber-600 to-orange-700 bg-clip-text text-transparent">Homes & Architects.</span>
            </h2>
          </div>

          <p className="text-sm leading-relaxed text-slate-600 sm:text-base lg:ml-auto lg:max-w-xl">
            Verified reviews from villa owners, architects and developers across Rajasthan who now specify Ramdev Steel on every project.
          </p>
        </div>

        {/* Testimonial Cards Grid */}
        <div className="mt-8 sm:mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4 stagger-grid">
          {testimonials.map((t, idx) => (
            <div
              key={t.id}
              className="stagger-card flex flex-col justify-between rounded-2xl border border-slate-200/90 bg-white p-5 sm:p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              {/* Rating + Quote Icon */}
              <div>
                <div className="flex items-center justify-between">
                  <StarRating rating={t.rating} />
                  <FiMessageSquare aria-hidden="true" className="h-5 w-5 text-slate-200" />
                </div>

                {/* Quote Text */}
                <blockquote className="mt-4 text-xs sm:text-sm leading-relaxed text-slate-700">
                  "{t.text}"
                </blockquote>
              </div>

              {/* Author */}
              <div className="mt-5 flex items-center gap-3 pt-4 border-t border-slate-100">
                <div className={`flex h-9 w-9 items-center justify-center rounded-full text-xs font-bold text-white ${avatarColors[idx % avatarColors.length]}`}>
                  {t.initials}
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-900 flex items-center gap-1">
                    {t.name}
                    <FiCheckCircle aria-label="Verified client" className="h-3 w-3 text-blue-500" />
                  </p>
                  <p className="text-[10px] text-slate-500 truncate max-w-40">
                    {t.role} • {t.location}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

export default Testimonials;
