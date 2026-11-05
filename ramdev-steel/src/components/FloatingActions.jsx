import { useState, useEffect } from "react";
import { FaWhatsapp, FaCalculator } from "react-icons/fa";
import { FiArrowUp, FiPhoneCall, FiMapPin, FiX } from "react-icons/fi";

function FloatingActions() {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [showTooltip, setShowTooltip] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 350);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const whatsappUrl = `https://wa.me/918949708489?text=${encodeURIComponent(
    "Hello Ramdev Steel Industries! I am interested in getting a quotation for stainless steel fabrication work. Please connect with me."
  )}`;

  return (
    <>
      {/* =========================================================================
          DESKTOP FLOATING ACTION STACK (Hidden on mobile, visible on lg and up)
      ========================================================================= */}
      <div className="fixed bottom-6 right-6 z-40 hidden lg:flex flex-col items-end gap-3">
        {/* WhatsApp Quick Chat with Tooltip */}
        <div className="relative group flex items-center">
          {showTooltip && (
            <div className="flex items-center gap-2 mr-3 rounded-full bg-slate-900 border border-slate-700/80 px-3.5 py-1.5 shadow-xl text-xs font-semibold text-slate-200 whitespace-nowrap animate-pulse-glow">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-ping" />
              <span>Chat for Instant Quote</span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setShowTooltip(false);
                }}
                className="text-slate-400 hover:text-white ml-1 text-xs"
                title="Dismiss"
              >
                <FiX className="h-3 w-3" />
              </button>
            </div>
          )}

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-xl shadow-green-500/25 transition-all duration-300 hover:scale-110 hover:shadow-green-500/40 active:scale-95 animate-soft-ring"
            aria-label="Chat on WhatsApp"
            title="Chat on WhatsApp"
          >
            <FaWhatsapp className="h-7 w-7" />
          </a>
        </div>

        {/* Scroll to Top (Desktop) */}
        {showScrollTop && (
          <button
            onClick={scrollToTop}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white/95 text-slate-700 shadow-xl backdrop-blur-md transition-all duration-300 hover:border-orange-500 hover:bg-orange-600 hover:text-white scroll-top-enter"
            aria-label="Scroll to top"
            title="Scroll to top"
          >
            <FiArrowUp className="h-5 w-5" />
          </button>
        )}
      </div>

      {/* =========================================================================
          MOBILE FLOATING SCROLL-TO-TOP BUTTON (Floats above mobile bottom dock)
      ========================================================================= */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-[calc(4.75rem+env(safe-area-inset-bottom,0px))] right-3.5 z-40 flex lg:hidden h-10 w-10 items-center justify-center rounded-full border border-slate-200/90 bg-white/95 text-slate-700 shadow-xl backdrop-blur-md transition-all active:scale-95 scroll-top-enter"
          aria-label="Scroll to top"
        >
          <FiArrowUp className="h-4.5 w-4.5" />
        </button>
      )}

      {/* =========================================================================
          MOBILE DEDICATED STICKY ACTION DOCK — slide up on mount, icon pop-in
      ========================================================================= */}
      <aside
        aria-label="Mobile quick actions"
        className="fixed bottom-0 left-0 right-0 z-40 flex lg:hidden border-t border-slate-200/90 bg-white/95 backdrop-blur-lg shadow-[0_-4px_20px_rgba(0,0,0,0.08)] pb-[env(safe-area-inset-bottom,0px)] mobile-dock-enter"
      >
        <div className="grid grid-cols-4 w-full px-1.5 py-1.5 items-center text-center">

          {/* Action 1: Call */}
          <a
            href="tel:+918949708489"
            className="dock-icon-1 touch-ripple flex flex-col items-center justify-center py-1.5 px-1 rounded-xl text-slate-700 active:bg-orange-50 active:text-orange-600 transition"
            aria-label="Call Now"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-orange-50 text-orange-600 border border-orange-200/80 mb-0.5 transition-transform active:scale-90">
              <FiPhoneCall className="h-4 w-4" />
            </div>
            <span className="text-[10px] font-bold tracking-tight">Call Now</span>
          </a>

          {/* Action 2: WhatsApp — with pulse ring */}
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="dock-icon-2 touch-ripple flex flex-col items-center justify-center py-1.5 px-1 rounded-xl text-slate-700 active:bg-emerald-50 transition"
            aria-label="WhatsApp"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-emerald-500 text-white shadow-sm shadow-emerald-500/25 mb-0.5 dock-whatsapp-pulse transition-transform active:scale-90">
              <FaWhatsapp className="h-4.5 w-4.5" />
            </div>
            <span className="text-[10px] font-bold tracking-tight text-emerald-700">WhatsApp</span>
          </a>

          {/* Action 3: Estimator */}
          <a
            href="#calculator"
            className="dock-icon-3 touch-ripple flex flex-col items-center justify-center py-1.5 px-1 rounded-xl text-slate-700 active:bg-amber-50 transition"
            aria-label="Cost Estimator"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-amber-50 text-amber-700 border border-amber-200/80 mb-0.5 transition-transform active:scale-90">
              <FaCalculator className="h-4 w-4" />
            </div>
            <span className="text-[10px] font-bold tracking-tight">Estimator</span>
          </a>

          {/* Action 4: Site Visit */}
          <a
            href="#contact"
            className="dock-icon-4 touch-ripple flex flex-col items-center justify-center py-1.5 px-1 rounded-xl text-slate-700 active:bg-orange-50 transition"
            aria-label="Book Free Site Visit"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-orange-600 text-white shadow-sm shadow-orange-500/25 mb-0.5 animate-shimmer transition-transform active:scale-90">
              <FiMapPin className="h-4 w-4" />
            </div>
            <span className="text-[10px] font-bold tracking-tight text-orange-700">Site Visit</span>
          </a>

        </div>
      </aside>
    </>
  );
}

export default FloatingActions;
