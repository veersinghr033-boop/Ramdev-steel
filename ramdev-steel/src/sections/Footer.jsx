import { cloudinaryAssets } from "../data/cloudinaryAssets";
import { useSiteContent } from "../data/siteContent";
import { FiArrowUp, FiClock, FiMail, FiMapPin, FiPhoneCall } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";

const logo = cloudinaryAssets["logo.jpg"];

function Footer() {
  const { products: mongoProducts = [] } = useSiteContent();
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const exploreLinks = [
    { name: "Home", href: "#home" },
    { name: "Products", href: "#products" },
    { name: "Guide", href: "#materials" },
    { name: "Process", href: "#process" },
    { name: "FAQ", href: "#faq" },
    { name: "Estimator", href: "#calculator" },
    { name: "Services", href: "#services" },
    { name: "Projects", href: "#projects" },
    { name: "Reviews", href: "#testimonials" },
    { name: "Contact", href: "#contact" },
  ];

  const productLinks =
    mongoProducts.length > 0
      ? mongoProducts.slice(0, 6).map((product) => product.name)
      : [
        "Modern SS Balcony Railing",
        "Frameless SS Glass Railing",
        "CNC Laser Cut Entrance Gate",
        "SS Safety Window Grill",
        "Curved Staircase Balustrade",
        "Designer SS Furniture",
      ];

  return (
    <footer className="relative bg-slate-950 text-slate-400 border-t border-slate-800/80 pt-12 pb-8 overflow-hidden w-full max-w-full">
      <div className="mx-auto max-w-7xl px-5 lg:px-8 w-full">

        {/* Main Footer Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-12 pb-8 border-b border-slate-800/80">

          {/* Column 1: Brand & Bio (4 cols) */}
          <div className="lg:col-span-4">
            <a href="#home" className="flex items-center gap-3">
              <div className="flex h-10 items-center justify-center shrink-0">
                <img src={logo} alt="Ramdev Steel Industries" className="h-full w-auto object-contain rounded-lg" />
              </div>
              <div>
                <h3 className="text-lg font-extrabold tracking-wider text-white">
                  RAMDEV
                </h3>
                <p className="text-[10px] tracking-[0.25em] font-medium text-slate-400 uppercase">
                  Steel Industries
                </p>
              </div>
            </a>

            <p className="mt-4 text-xs leading-relaxed text-slate-400 max-w-sm">
              Precision stainless steel fabrication since 2004 — railings, frameless glass, designer gates and bespoke furniture across Rajasthan, with a written rust warranty of up to 15 years.
            </p>

            <a
              href="https://wa.me/918949708489"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#25D366] px-5 py-2.5 text-xs font-bold text-white shadow-md transition hover:bg-[#20ba59]"
            >
              <FaWhatsapp aria-hidden="true" className="h-4 w-4" />
              <span>WhatsApp Us</span>
            </a>
          </div>

          {/* Column 2: Explore (2 cols) */}
          <div className="lg:col-span-2">
            <h4 className="text-xs font-bold uppercase tracking-widest text-orange-500">
              Explore
            </h4>
            <ul className="mt-4 space-y-2.5 text-xs">
              {exploreLinks.map((link) => (
                <li key={link.name}>
                  <a href={link.href} className="hover:text-orange-400 transition text-slate-400">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Products (3 cols) */}
          <div className="lg:col-span-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-orange-500">
              Products
            </h4>
            <ul className="mt-4 space-y-2.5 text-xs">
              {productLinks.map((product) => (
                <li key={product}>
                  <a href="#products" className="hover:text-orange-400 transition text-slate-400">
                    {product}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Reach Us (3 cols) */}
          <div className="lg:col-span-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-orange-500">
              Reach Us
            </h4>
            <div className="mt-4 space-y-3 text-xs">
              <p className="flex items-start gap-2">
                <FiMapPin aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-orange-500" />
                <span>Industrial Area, Jodhpur, Rajasthan, India - 342001</span>
              </p>
              <p className="flex items-center gap-2">
                <FiPhoneCall aria-hidden="true" className="h-4 w-4 shrink-0 text-orange-500" />
                <a href="tel:+918949708489" className="hover:text-orange-400 font-semibold text-white">
                  +91 89497 08489
                </a>
              </p>
              <p className="flex items-center gap-2">
                <FiMail aria-hidden="true" className="h-4 w-4 shrink-0 text-orange-500" />
                <a href="mailto:info@ramdevsteel.com" className="hover:text-orange-400">
                  info@ramdevsteel.com
                </a>
              </p>
              <p className="flex items-center gap-2 text-slate-500">
                <FiClock aria-hidden="true" className="h-4 w-4 shrink-0 text-orange-500" />
                <span>Mon - Sat: 9:00 AM - 8:00 PM</span>
              </p>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-8 flex flex-col items-center justify-between gap-4 text-xs text-slate-500 sm:flex-row text-center sm:text-left">
          <p>© {new Date().getFullYear()} Ramdev Steel Industries. All rights reserved. GST-registered fabrication works.</p>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 text-slate-400 hover:text-orange-400 transition"
          >
            <span>Back to top</span>
            <FiArrowUp aria-hidden="true" className="h-4 w-4" />
          </button>
        </div>

      </div>
    </footer>
  );
}

export default Footer;
