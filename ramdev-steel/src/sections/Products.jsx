import { useState, useMemo, useEffect } from "react";
import { useSiteContent } from "../data/siteContent";
import { FiSearch, FiX, FiArrowRight } from "react-icons/fi";
import { FiBox } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";

function Products({ onSelectProductForQuote }) {
  const { products, productCategories: categories } = useSiteContent();
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && selectedProduct) {
        setSelectedProduct(null);
      }
    };

    if (selectedProduct) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedProduct]);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesCategory =
        activeCategory === "All" || product.category === activeCategory;
      const matchesSearch =
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.grade.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, products, searchQuery]);

  const handleWhatsAppProduct = (product) => {
    const text = `Hello Ramdev Steel! I am interested in *${product.name}* (${product.category}). Please share catalog options, grade specifications, and pricing.`;
    window.open(`https://wa.me/918949708489?text=${encodeURIComponent(text)}`, "_blank");
  };

  return (
    <section id="products" className="relative bg-white py-12 sm:py-16 lg:py-20 overflow-hidden w-full max-w-full">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="grid gap-6 lg:grid-cols-[1fr_1.4fr] lg:items-end reveal">
          <div>
            <div className="mb-3.5 inline-flex items-center gap-2 rounded-full border border-orange-200/90 bg-orange-50 px-3.5 py-1 text-xs font-bold uppercase tracking-widest text-orange-700 shadow-sm animate-float">
              <FiBox aria-hidden="true" className="h-4 w-4" />
              <span>Architectural Product Range</span>
            </div>
            <h2 className="text-3xl font-black text-slate-900 sm:text-4xl md:text-5xl tracking-tight">
              Steel Crafted <br />
              <span className="bg-linear-to-r from-orange-600 via-amber-600 to-orange-700 bg-clip-text text-transparent">
                For Every Space.
              </span>
            </h2>
          </div>

          <p className="text-sm leading-relaxed text-slate-600 sm:text-base lg:ml-auto lg:max-w-xl">
            Explore our precision-crafted stainless steel collection. Each product is engineered
            using certified SS 304 & 316 grades, fabricated to millimetric precision and hand-buffed
            for superior durability.
          </p>
        </div>

        {/* Search & Filter Controls */}
        <div className="mt-8 sm:mt-10 flex flex-col gap-3.5 sm:flex-row sm:items-center sm:justify-between reveal delay-100">

          {/* Categories */}
          <div className="flex gap-2 overflow-x-auto pb-2 sm:pb-0 no-scrollbar">
            {categories.map((category) => {
              const isActive = activeCategory === category;
              const count =
                category === "All"
                  ? products.length
                  : products.filter((p) => p.category === category).length;

              return (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`flex items-center gap-1.5 whitespace-nowrap rounded-xl border px-3.5 py-2 sm:px-4 sm:py-2.5 text-xs font-bold transition shadow-sm ${isActive
                    ? "border-orange-500 bg-orange-600 text-white shadow-orange-500/25"
                    : "border-slate-200/90 bg-slate-50 text-slate-700 hover:border-orange-300 hover:text-orange-600 hover:bg-white"
                    }`}
                >
                  <span>{category}</span>
                  <span className={`rounded-full px-1.5 py-0.2 text-[10px] ${isActive ? "bg-black/25 text-white" : "bg-slate-200 text-slate-700"}`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Search Box */}
          <div className="relative w-full sm:w-72">
            <input
              type="text"
              placeholder="Search products, grades..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-xl border border-slate-300 bg-slate-50 py-2.5 pl-9 pr-8 text-base sm:text-xs text-slate-900 placeholder-slate-400 outline-none transition focus:border-orange-500 focus:bg-white focus:ring-2 focus:ring-orange-200 shadow-sm"
            />
            <FiSearch className="absolute left-3 top-3.5 h-4 w-4 text-slate-400" />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-700 p-1"
                aria-label="Clear search"
              >
                <FiX className="h-3.5 w-3.5" />
              </button>
            )}
          </div>

        </div>

        {/* Product Grid — stagger-grid triggers child stagger-card animations */}
        <div className="mt-8 sm:mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 stagger-grid">
          {filteredProducts.map((product) => (
            <article
              key={product.id}
              className="group stagger-card flex flex-col justify-between overflow-hidden rounded-3xl border border-slate-200/90 bg-white transition duration-500 hover:-translate-y-2 hover:border-orange-400 hover:shadow-2xl hover:shadow-orange-500/10 shadow-sm"
            >
              {/* Product Image */}
              <div className="relative h-60 sm:h-64 overflow-hidden bg-slate-100">
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent" />

                <span className="absolute left-4 top-4 rounded-full bg-slate-900/85 px-3 py-1 text-[10px] font-black uppercase tracking-wider text-white shadow-md backdrop-blur-md border border-white/20">
                  {product.tag}
                </span>

                <span className="absolute bottom-3 left-4 text-[11px] font-bold uppercase tracking-widest text-orange-300">
                  {product.category}
                </span>

                <button
                  onClick={() => setSelectedProduct(product)}
                  className="absolute bottom-3 right-4 rounded-xl bg-white/95 backdrop-blur-md px-3.5 py-1.5 text-xs font-bold text-slate-800 transition hover:bg-orange-600 hover:text-white shadow-sm"
                >
                  Quick Specs
                </button>
              </div>

              {/* Product Info */}
              <div className="flex flex-1 flex-col justify-between p-5 sm:p-6">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-semibold text-slate-500">
                      Grade: <strong className="text-slate-900">{product.grade}</strong>
                    </span>
                    <span className="text-[11px] text-slate-400">{product.thickness}</span>
                  </div>

                  <h3 className="mt-2 text-lg font-bold text-slate-900 group-hover:text-orange-600 transition">
                    {product.name}
                  </h3>

                  <p className="mt-2 text-xs leading-relaxed text-slate-600 line-clamp-3">
                    {product.description}
                  </p>
                </div>

                {/* Card Actions */}
                <div className="mt-5 flex flex-wrap items-center justify-between gap-2 border-t border-slate-100 pt-3.5">
                  <button
                    onClick={() => handleWhatsAppProduct(product)}
                    className="flex items-center gap-1.5 text-xs font-bold text-emerald-600 transition hover:text-emerald-700 py-1"
                  >
                    <FaWhatsapp className="h-4 w-4" />
                    <span>WhatsApp Quote</span>
                  </button>

                  <button
                    onClick={() => setSelectedProduct(product)}
                    className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-semibold text-slate-700 transition hover:border-orange-500 hover:text-orange-600 hover:bg-white"
                  >
                    View Details
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Empty Search State */}
        {filteredProducts.length === 0 && (
          <div className="mt-12 rounded-2xl border border-slate-200 bg-slate-50 p-10 text-center">
            <p className="text-base font-bold text-slate-900">No products found matching "{searchQuery}"</p>
            <p className="mt-1 text-xs text-slate-500">Try searching for "railing", "gate", "glass", or "grill"</p>
            <button
              onClick={() => {
                setSearchQuery("");
                setActiveCategory("All");
              }}
              className="mt-4 rounded-xl bg-orange-600 px-5 py-2 text-xs font-bold text-white shadow-sm hover:bg-orange-700"
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* Bottom Banner */}
        <div className="mt-12 sm:mt-16 flex flex-col items-center justify-between gap-5 rounded-3xl border border-orange-200/90 bg-linear-to-r from-orange-50/90 via-amber-50/70 to-orange-50/90 p-6 sm:p-8 sm:flex-row shadow-sm">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-orange-700">
              Need a Custom Fabrication Specification?
            </span>
            <h4 className="mt-1 text-xl font-bold text-slate-900 sm:text-2xl">
              We fabricate to your exact architectural CAD drawings & photos.
            </h4>
            <p className="mt-1 text-xs text-slate-600">
              Share your dimensions or photo sketches on WhatsApp for an immediate engineering assessment.
            </p>
          </div>

          <a
            href="https://wa.me/918949708489"
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 flex items-center gap-2 rounded-xl bg-orange-600 px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-orange-500/20 transition hover:bg-orange-700 active:scale-95"
          >
            <span>Send Custom Drawing</span>
            <FiArrowRight className="h-4 w-4" />
          </a>
        </div>

      </div>

      {/* Product Quick Specs Modal */}
      {selectedProduct && (
        <div
          className="fixed inset-0 z-110 flex items-center justify-center bg-black/60 p-3 sm:p-4 backdrop-blur-sm"
          onClick={() => setSelectedProduct(null)}
        >
          <div
            className="relative max-h-[92vh] w-full max-w-3xl overflow-y-auto rounded-3xl border border-slate-200 bg-white p-5 sm:p-8 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedProduct(null)}
              className="absolute right-4 top-4 z-20 flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-slate-700 hover:bg-orange-600 hover:text-white transition shadow-sm"
              aria-label="Close modal"
            >
              <FiX className="h-5 w-5" />
            </button>

            <div className="grid gap-6 sm:grid-cols-2">
              <div className="h-56 sm:h-full overflow-hidden rounded-2xl bg-slate-100">
                <img
                  src={selectedProduct.image}
                  alt={selectedProduct.name}
                  className="h-full w-full object-cover"
                />
              </div>

              <div className="flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="rounded bg-orange-100 px-2.5 py-0.5 text-[10px] font-bold text-orange-800 uppercase border border-orange-200">
                      {selectedProduct.category}
                    </span>
                    <span className="rounded bg-slate-100 px-2 py-0.5 text-[10px] font-bold text-slate-700 border border-slate-200">
                      {selectedProduct.tag}
                    </span>
                  </div>

                  <h3 className="mt-2.5 text-2xl font-black text-slate-900">
                    {selectedProduct.name}
                  </h3>

                  <p className="mt-2 text-xs leading-relaxed text-slate-600">
                    {selectedProduct.description}
                  </p>

                  <div className="mt-4 space-y-2 rounded-2xl border border-slate-200/90 bg-slate-50 p-4 text-xs">
                    <div className="flex justify-between">
                      <span className="text-slate-500">Available Grade:</span>
                      <span className="font-bold text-slate-900">{selectedProduct.grade}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Gauge Thickness:</span>
                      <span className="font-bold text-slate-900">{selectedProduct.thickness}</span>
                    </div>
                    {selectedProduct.specs &&
                      Object.entries(selectedProduct.specs).map(([k, v]) => (
                        <div key={k} className="flex justify-between">
                          <span className="text-slate-500 capitalize">{k}:</span>
                          <span className="font-bold text-orange-700">{v}</span>
                        </div>
                      ))}
                  </div>
                </div>

                <div className="mt-5 flex flex-col sm:flex-row gap-2.5">
                  <button
                    onClick={() => {
                      handleWhatsAppProduct(selectedProduct);
                      setSelectedProduct(null);
                    }}
                    className="flex-1 rounded-xl bg-[#25D366] py-3 text-xs font-bold text-white shadow-md transition hover:bg-[#20ba59] active:scale-[0.98] min-h-11 flex items-center justify-center gap-2"
                  >
                    <FaWhatsapp className="h-4 w-4" />
                    <span>Inquire on WhatsApp</span>
                  </button>
                  <a
                    href="#contact"
                    onClick={() => {
                      if (onSelectProductForQuote) {
                        onSelectProductForQuote(selectedProduct.name);
                      }
                      setSelectedProduct(null);
                    }}
                    className="flex-1 text-center rounded-xl bg-orange-600 py-3 text-xs font-bold text-white transition hover:bg-orange-700 shadow-sm active:scale-[0.98] min-h-11 flex items-center justify-center"
                  >
                    Request Free Quote
                  </a>
                </div>

              </div>
            </div>

          </div>
        </div>
      )}
    </section>
  );
}

export default Products;
