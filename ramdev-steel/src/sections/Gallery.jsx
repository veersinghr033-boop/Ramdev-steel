import { useState, useEffect, useMemo } from "react";
import { useSiteContent } from "../data/siteContent";
import { FiCamera, FiZoomIn, FiX, FiChevronLeft, FiChevronRight } from "react-icons/fi";

function Gallery() {
  const { galleryCategories: categories, galleryItems: galleryImages } = useSiteContent();
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  const filteredImages = useMemo(() => {
    return activeCategory === "All"
      ? galleryImages
      : galleryImages.filter((item) => item.category === activeCategory);
  }, [activeCategory, galleryImages]);

  useEffect(() => {
    if (selectedIndex !== null) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [selectedIndex]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (selectedIndex === null) return;
      if (e.key === "Escape") setSelectedIndex(null);
      if (e.key === "ArrowRight") {
        setSelectedIndex((prev) => (prev + 1) % filteredImages.length);
      }
      if (e.key === "ArrowLeft") {
        setSelectedIndex((prev) => (prev - 1 + filteredImages.length) % filteredImages.length);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedIndex, filteredImages]);

  const onTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const minSwipeDistance = 45;
    if (distance > minSwipeDistance) {
      // Swiped left -> next
      setSelectedIndex((prev) => (prev + 1) % filteredImages.length);
    } else if (distance < -minSwipeDistance) {
      // Swiped right -> prev
      setSelectedIndex((prev) => (prev - 1 + filteredImages.length) % filteredImages.length);
    }
  };

  const activeImage = selectedIndex !== null ? filteredImages[selectedIndex] : null;

  const handleInquireWhatsApp = (img) => {
    const text = `Hello Ramdev Steel! I am interested in this design from your gallery: *"${img.title}"* (${img.category}). Can you share specs and quote?`;
    window.open(`https://wa.me/918949708489?text=${encodeURIComponent(text)}`, "_blank");
  };

  return (
    <section id="gallery" className="relative bg-slate-50 py-12 sm:py-16 lg:py-20 border-t border-slate-200/90 overflow-hidden w-full max-w-full">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="grid gap-6 lg:grid-cols-2 lg:items-end">
          <div>
            <div className="mb-3.5 inline-flex items-center gap-2 rounded-full border border-orange-200/90 bg-orange-50 px-3.5 py-1 text-xs font-bold uppercase tracking-widest text-orange-700 shadow-sm">
              <FiCamera aria-hidden="true" className="h-4 w-4" />
              <span>Visual Showcase</span>
            </div>
            <h2 className="text-3xl font-black text-slate-900 sm:text-4xl md:text-5xl tracking-tight">
              Fabrication <br />
              <span className="bg-Visual Showcase-to-r from-orange-600 via-amber-600 to-orange-700 bg-clip-text text-transparent">
                Design Gallery.
              </span>
            </h2>
          </div>

          <p className="text-sm leading-relaxed text-slate-600 sm:text-base lg:ml-auto lg:max-w-xl">
            A high-definition visual record of recent stainless steel architectural installs. Click on any
            design to view in full resolution or request a direct quotation.
          </p>
        </div>

        {/* Filters */}
        <div className="mt-7 sm:mt-9 flex gap-2 overflow-x-auto pb-2 sm:pb-3 no-scrollbar w-full max-w-full">
          {categories.map((category) => {
            const active = activeCategory === category;
            return (
              <button
                key={category}
                onClick={() => {
                  setActiveCategory(category);
                  setSelectedIndex(null);
                }}
                className={`rounded-xl border px-3.5 py-2 sm:px-4 sm:py-2.5 text-xs font-bold transition whitespace-nowrap shadow-sm ${active
                  ? "border-orange-500 bg-orange-600 text-white shadow-orange-500/20"
                  : "border-slate-200/90 bg-white text-slate-700 hover:border-orange-300 hover:text-orange-600"
                  }`}
              >
                {category}
              </button>
            );
          })}
        </div>

        {/* Gallery Grid */}
        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {filteredImages.map((item, index) => (
            <div
              key={item.id}
              onClick={() => setSelectedIndex(index)}
              className={`group relative cursor-pointer overflow-hidden rounded-3xl bg-slate-100 border border-slate-200/90 shadow-sm transition hover:shadow-xl hover:border-orange-400 ${item.size === "large" ? "sm:col-span-2 lg:col-span-2" : ""
                }`}
            >
              <div className={item.size === "large" ? "h-80 sm:h-95" : "h-65 sm:h-72.5"}>
                <img
                  src={item.image}
                  alt={item.title}
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                  loading="lazy"
                />
              </div>

              {/* Gradient Scrim */}
              <div className="absolute inset-0 bg-linear-to-t from-black/85 via-black/25 to-transparent opacity-85 transition duration-300 group-hover:opacity-100" />

              {/* Hover Badge */}
              <span className="absolute top-4 left-4 rounded-full bg-slate-900/85 border border-white/20 px-3 py-1 text-[10px] font-bold text-orange-400 uppercase backdrop-blur-md shadow-sm">
                {item.category}
              </span>

              {/* Content Dock */}
              <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5 flex items-end justify-between">
                <div>
                  <span className="text-[10px] font-semibold text-orange-300 uppercase tracking-widest">
                    {item.tag}
                  </span>
                  <h3 className="text-sm sm:text-base font-bold text-white group-hover:text-orange-300 transition">
                    {item.title}
                  </h3>
                </div>

                <span className="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-xl bg-white/20 text-white backdrop-blur transition duration-300 group-hover:bg-orange-600 group-hover:scale-110">
                  <FiZoomIn aria-hidden="true" className="h-4 w-4" />
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Lightbox Modal with Mobile Touch Swipe */}
      {activeImage && (
        <div
          className="fixed inset-0 z-120 flex items-center justify-center bg-black/90 p-3 sm:p-5 backdrop-blur-md select-none"
          onClick={() => setSelectedIndex(null)}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          {/* Top Bar with Counter and Close */}
          <div className="absolute top-4 left-4 right-4 sm:top-5 sm:left-6 sm:right-6 flex items-center justify-between text-white z-20">
            <span className="text-xs font-mono font-bold text-slate-200 bg-white/15 px-3 py-1 rounded-full border border-white/10 backdrop-blur-md">
              {selectedIndex + 1} of {filteredImages.length}
            </span>

            <button
              onClick={() => setSelectedIndex(null)}
              className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full bg-white/15 text-white hover:bg-orange-600 transition border border-white/10 backdrop-blur-md"
              aria-label="Close Lightbox"
            >
              <FiX aria-hidden="true" className="h-5 w-5" />
            </button>
          </div>

          {/* Previous Arrow Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setSelectedIndex((selectedIndex - 1 + filteredImages.length) % filteredImages.length);
            }}
            className="absolute left-2 sm:left-5 top-1/2 -translate-y-1/2 flex h-9 w-9 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-black/40 text-white border border-white/20 hover:bg-orange-600 transition z-20 backdrop-blur-sm"
            aria-label="Previous Image"
          >
            <FiChevronLeft aria-hidden="true" className="h-5 w-5 sm:h-6 sm:w-6" />
          </button>

          {/* Next Arrow Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setSelectedIndex((selectedIndex + 1) % filteredImages.length);
            }}
            className="absolute right-2 sm:right-5 top-1/2 -translate-y-1/2 flex h-9 w-9 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-black/40 text-white border border-white/20 hover:bg-orange-600 transition z-20 backdrop-blur-sm"
            aria-label="Next Image"
          >
            <FiChevronRight aria-hidden="true" className="h-5 w-5 sm:h-6 sm:w-6" />
          </button>

          {/* Main Lightbox Body */}
          <div
            className="relative max-h-[90vh] max-w-4xl flex flex-col items-center w-full px-2"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={activeImage.image}
              alt={activeImage.title}
              className="max-h-[50vh] sm:max-h-[64vh] lg:max-h-[70vh] max-w-full rounded-2xl object-contain shadow-2xl border border-white/10"
            />

            <div className="mt-3 sm:mt-4 flex flex-col sm:flex-row items-start sm:items-center justify-between w-full gap-3 sm:gap-4 rounded-2xl bg-slate-950/95 p-3.5 sm:p-4 border border-white/15 backdrop-blur-md">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-orange-400">
                  {activeImage.category} • {activeImage.tag}
                </span>
                <h3 className="text-sm sm:text-base font-bold text-white">{activeImage.title}</h3>
              </div>

              <button
                onClick={() => handleInquireWhatsApp(activeImage)}
                className="w-full sm:w-auto rounded-xl bg-[#25D366] px-4 py-2 sm:px-5 sm:py-2.5 text-xs font-bold text-white shadow-lg transition hover:bg-[#20ba59] active:scale-[0.98] text-center"
              >
                Inquire on WhatsApp
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default Gallery;