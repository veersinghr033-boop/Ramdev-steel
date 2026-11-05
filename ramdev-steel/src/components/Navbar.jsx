import { useState, useEffect } from "react";
import {
  FiHome,
  FiZap,
  FiGrid,
  FiTool,
  FiBookOpen,
  FiAward,
  FiRefreshCw,
  FiStar,
  FiHelpCircle,
  FiMapPin,
  FiPhone,
  FiClock,
  FiMenu,
  FiX,
  FiArrowRight,
} from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";

import { cloudinaryAssets } from "../data/cloudinaryAssets";

const logo = cloudinaryAssets["logo.jpg"];

const navItems = [
  { name: "Home", href: "#home", icon: FiHome },
  { name: "Cost Estimator", shortName: "Estimator", href: "#calculator", icon: FiZap, highlight: true },
  { name: "Products", href: "#products", icon: FiGrid },
  { name: "Services", href: "#services", icon: FiTool },
  { name: "Steel Guide", shortName: "Guide", href: "#materials", icon: FiBookOpen },
  { name: "Projects", href: "#projects", icon: FiAward },
  { name: "Process", href: "#process", icon: FiRefreshCw },
  { name: "Reviews", href: "#testimonials", icon: FiStar },
  { name: "FAQ", href: "#faq", icon: FiHelpCircle },
  { name: "Contact", href: "#contact", icon: FiMapPin },
];

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }

      const sections = ["home", "calculator", "products", "services", "materials", "projects", "process", "testimonials", "faq", "contact"];
      const scrollPosition = window.scrollY + 140;

      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.offsetTop <= scrollPosition) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent background scroll when mobile menu is open & handle Escape
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  return (
    <header className="fixed top-0 left-0 z-50 w-full transition-all duration-300 navbar-enter">
      {/* Top Utility Ribbon (Desktop only) */}
      <div
        className={`hidden lg:block border-b border-slate-200/90 bg-slate-50/95 text-xs text-slate-600 transition-all duration-300 ${scrolled ? "h-0 overflow-hidden py-0 opacity-0" : "py-1.5 opacity-100"
          }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 lg:px-6 xl:px-8">
          <div className="flex items-center gap-3 xl:gap-5 whitespace-nowrap text-[11px] xl:text-xs">
            <span className="flex items-center gap-1.5 text-slate-700 font-medium">
              <FiMapPin className="h-3.5 w-3.5 text-orange-600 shrink-0" />
              Hadecha, Shivnagar, Rajasthan • Precision Stainless Steel Fabrication
            </span>
            <span className="h-3 w-px bg-slate-300" />
            <span className="flex items-center gap-1.5 text-slate-600">
              <FiClock className="h-3.5 w-3.5 text-orange-600 shrink-0" />
              Mon - Sat: 9:00 AM - 8:00 PM
            </span>
          </div>

          <div className="flex items-center gap-3 xl:gap-5 whitespace-nowrap text-[11px] xl:text-xs">
            <a
              href="tel:+918949708489"
              className="flex items-center gap-1.5 font-bold text-slate-800 transition hover:text-orange-600"
            >
              <FiPhone className="h-3.5 w-3.5 text-orange-600 shrink-0" />
              +91 8949708489
            </a>
            <span className="h-3 w-px bg-slate-300" />
            <a href="mailto:info@ramdevsteel.com" className="font-medium text-slate-600 transition hover:text-orange-600">
              info@ramdevsteel.com
            </a>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div
        className={`border-b transition-all duration-300 ${scrolled
          ? "border-slate-200/90 bg-white/95 shadow-sm backdrop-blur-md py-2 sm:py-2.5"
          : "border-slate-200/70 bg-white/90 backdrop-blur-md py-2 sm:py-2.5"
          }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-3.5 sm:px-5 lg:px-6 xl:px-8">

          {/* Brand Logo */}
          <a href="#home" className="group flex items-center gap-2 sm:gap-2.5 xl:gap-3 shrink-0">
            <div className="flex items-center gap-2.5">
              <div className="flex h-9 items-center justify-center shrink-0">
                <img src={logo} alt="Ramdev Steel Industries" className="h-full w-auto object-contain" />
              </div>
            </div>

            <div className="flex flex-col shrink-0">
              <div className="flex items-center gap-1.5">
                <span className="text-sm sm:text-base xl:text-lg font-black tracking-wider text-slate-900 whitespace-nowrap">
                  RAMDEV
                </span>
                <span className="hidden xl:inline-flex whitespace-nowrap rounded-md bg-orange-50 border border-orange-200/80 px-1.5 py-0.5 text-[9px] font-bold text-orange-700">
                  SS 304/316
                </span>
              </div>
              <span className="text-[8px] sm:text-[9px] xl:text-[10px] tracking-[0.2em] font-bold text-slate-500 uppercase whitespace-nowrap">
                Steel Industries
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden items-center gap-0.5 lg:gap-1 xl:gap-1.5 lg:flex">
            {navItems.map((item) => {
              const isActive = activeSection === item.href.substring(1);
              return (
                <a
                  key={item.name}
                  href={item.href}
                  className={`relative flex items-center h-8.5 xl:h-9 whitespace-nowrap rounded-xl px-2 lg:px-2 xl:px-2.5 2xl:px-3 text-[11px] lg:text-[11.5px] xl:text-xs 2xl:text-[13px] font-semibold tracking-wide transition-all duration-200 ${item.highlight
                    ? "text-orange-700 bg-orange-50/90 font-bold border border-orange-200/80 hover:bg-orange-100"
                    : isActive
                      ? "text-orange-600 bg-orange-50/80 font-bold"
                      : "text-slate-700 hover:text-orange-600 hover:bg-slate-100/70"
                    }`}
                >
                  {item.shortName ? (
                    <>
                      <span className="hidden xl:inline">{item.name}</span>
                      <span className="inline xl:hidden">{item.shortName}</span>
                    </>
                  ) : (
                    item.name
                  )}
                  {isActive && !item.highlight && (
                    <span className="absolute bottom-0 left-2 right-2 h-0.5 bg-orange-500 rounded-full" />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden items-center gap-2 lg:gap-2.5 lg:flex shrink-0">
            {/* WhatsApp Quick Button */}
            <a
              href="https://wa.me/918949708489"
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-8.5 w-8.5 xl:h-9 xl:w-9 items-center justify-center rounded-xl border border-slate-200 bg-slate-50 text-slate-700 transition-all duration-300 hover:border-green-500 hover:bg-green-50 hover:text-green-600 shadow-sm shrink-0"
              title="Chat on WhatsApp"
            >
              <FaWhatsapp className="h-3.5 w-3.5 xl:h-4 xl:w-4 text-emerald-600" />
            </a>

            {/* Site Visit Button */}
            <a
              href="#contact"
              className="flex items-center h-8.5 xl:h-9 whitespace-nowrap rounded-xl bg-linear-to-r from-orange-500 to-orange-600 px-3 xl:px-4 text-[11px] xl:text-xs font-bold text-white shadow-md shadow-orange-500/20 transition hover:from-orange-600 hover:to-orange-700 active:scale-95 shrink-0 animate-shimmer"
            >
              Book Site Visit
            </a>
          </div>

          {/* Mobile Right Controls */}
          <div className="flex items-center gap-2 lg:hidden shrink-0">
            {/* Quick Estimate Pill on wider mobile screens (>= 400px) */}
            <a
              href="#calculator"
              className="hidden min-[400px]:inline-flex items-center gap-1 rounded-xl border border-orange-300 bg-orange-50/90 px-2.5 py-1.5 text-[11px] font-bold text-orange-700 shadow-sm active:scale-95 shrink-0"
            >
              <span>Estimate</span>
              <FiZap className="h-3 w-3 text-orange-600" />
            </a>

            {/* Prominent Hamburger / Menu Toggle Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="flex h-9.5 items-center justify-center gap-1.5 rounded-xl border border-slate-200 bg-white px-2.5 sm:px-3 text-xs font-bold text-slate-800 shadow-sm active:scale-95 shrink-0 hover:bg-slate-50 transition"
              aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={isOpen}
            >
              {isOpen ? (
                <>
                  <FiX className="h-4.5 w-4.5 text-slate-700" />
                  <span className="text-xs font-bold">Close</span>
                </>
              ) : (
                <>
                  <FiMenu className="h-4.5 w-4.5 text-orange-600" />
                  <span className="text-xs font-bold">Menu</span>
                </>
              )}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Mobile Navigation"
          className="fixed inset-0 z-50 flex justify-end bg-slate-950/60 backdrop-blur-sm lg:hidden backdrop-enter"
          onClick={(e) => {
            if (e.target === e.currentTarget) setIsOpen(false);
          }}
        >
          <div className="flex h-[calc(100vh-6rem)] w-[85%] max-w-85 flex-col rounded-l-2xl justify-between overflow-y-auto bg-white p-5 shadow-2xl pb-[calc(2rem+env(safe-area-inset-bottom,0px))] drawer-enter">
            <div>
              {/* Drawer Header */}
              <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-3">
                <div className="flex items-center gap-2.5">
                  <div className="flex h-9 items-center justify-center shrink-0">
                    <img src={logo} alt="Ramdev Steel Industries" className="h-full w-auto object-contain" />
                  </div>
                </div>

                <button
                  onClick={() => setIsOpen(false)}
                  className="flex h-8 w-8 items-center justify-center rounded-xl bg-slate-100 text-slate-600 hover:text-slate-900 active:scale-95 transition"
                  aria-label="Close menu"
                >
                  <FiX className="h-4 w-4" />
                </button>
              </div>

              {/* Navigation Items — staggered slide-in */}
              <nav className="flex flex-col gap-1 py-1">
                {navItems.map((item, index) => {
                  const isActive = activeSection === item.href.substring(1);
                  const Icon = item.icon;
                  return (
                    <a
                      key={item.name}
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className={`nav-item-${index + 1} touch-ripple flex items-center justify-between rounded-xl px-3.5 py-2.5 text-sm font-bold transition active:scale-[0.98] min-h-11 ${isActive
                        ? "bg-orange-50 text-orange-600 border border-orange-200/90 shadow-sm"
                        : item.highlight
                          ? "bg-linear-to-r from-amber-50 to-orange-50 text-amber-900 border border-amber-200/80"
                          : "text-slate-800 hover:bg-slate-50 hover:text-orange-600"
                        }`}
                    >
                      <span className="flex items-center gap-2.5">
                        <Icon className={`h-4 w-4 shrink-0 ${isActive ? "text-orange-600" : "text-slate-500"}`} />
                        <span>{item.name}</span>
                      </span>
                      <FiArrowRight className={`h-3.5 w-3.5 ${isActive ? "text-orange-600" : "text-slate-400"}`} />
                    </a>
                  );
                })}
              </nav>
            </div>

            {/* Drawer Footer Actions */}
            <div className="mt-6 border-t border-slate-100 pt-3 space-y-3">
              <div className="grid grid-cols-2 gap-2">
                <a
                  href="#calculator"
                  onClick={() => setIsOpen(false)}
                  className="touch-ripple flex items-center justify-center gap-1.5 rounded-xl border border-orange-300 bg-orange-50 py-3 text-xs font-bold text-orange-700 shadow-sm active:scale-95 text-center min-h-11 transition"
                >
                  <span>Estimate</span>
                  <FiZap className="h-3.5 w-3.5 text-orange-600" />
                </a>
                <a
                  href="#contact"
                  onClick={() => setIsOpen(false)}
                  className="touch-ripple flex items-center justify-center gap-1.5 rounded-xl bg-orange-600 py-3 text-xs font-bold text-white shadow-md shadow-orange-500/20 active:scale-95 text-center min-h-11 animate-shimmer transition"
                >
                  Book Visit
                </a>
              </div>

              {/* Contact direct link */}
              <div className="rounded-xl bg-slate-50 p-2.5 border border-slate-200/80 flex items-center justify-between text-xs">
                <a href="tel:+918949708489" className="flex items-center gap-1.5 font-bold text-slate-800 hover:text-orange-600">
                  <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-orange-100 text-orange-600 text-xs">
                    <FiPhone className="h-3 w-3" />
                  </span>
                  <span>+91 89497 08489</span>
                </a>
                <span className="text-slate-300">|</span>
                <a
                  href="https://wa.me/918949708489"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 font-bold text-emerald-700"
                >
                  <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-emerald-100 text-emerald-700 text-xs">
                    <FaWhatsapp className="h-3 w-3" />
                  </span>
                  <span>WhatsApp</span>
                </a>
              </div>
            </div>

          </div>
        </div>
      )}
    </header>
  );
}

export default Navbar;