import { useState } from "react";
import { useSiteContent } from "../data/siteContent";
import { FiMinus, FiPlus, FiSearch } from "react-icons/fi";

function FAQ() {
  const { faqs } = useSiteContent();
  const [openId, setOpenId] = useState(null);

  const toggleFAQ = (id) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section id="faq" className="relative bg-slate-50 py-12 sm:py-16 lg:py-20 border-t border-slate-200/80 overflow-hidden w-full max-w-full">
      <div className="mx-auto max-w-4xl px-5 lg:px-8">

        {/* Header */}
        <div className="mx-auto max-w-3xl text-center reveal">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-orange-200/80 bg-orange-50 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-orange-700 shadow-sm">
            <FiSearch aria-hidden="true" className="h-4 w-4" />
            <span>Good To Know</span>
          </div>
          <h2 className="text-3xl font-black text-slate-900 sm:text-4xl md:text-5xl tracking-tight">
            Common Questions, <br />
            <span className="bg-linear-to-r from-orange-600 via-amber-600 to-orange-700 bg-clip-text text-transparent">Honest Answers.</span>
          </h2>
          <p className="mt-3 text-sm text-slate-600 sm:text-base leading-relaxed max-w-xl mx-auto">
            Everything you need to know about stainless steel grades, pricing, installation, and warranty — straight from our fabrication team.
          </p>
        </div>

        {/* FAQ Accordions — Clean minimal design */}
        <div className="mt-10 space-y-3 reveal delay-100">
          {faqs.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div
                key={faq.id}
                className={`overflow-hidden rounded-2xl border transition-all duration-300 ${isOpen
                  ? "border-orange-200 bg-white shadow-md"
                  : "border-slate-200/80 bg-white hover:border-slate-300 shadow-sm"
                  }`}
              >
                <button
                  onClick={() => toggleFAQ(faq.id)}
                  className="flex w-full items-center justify-between gap-4 px-5 sm:px-6 py-4 sm:py-5 text-left"
                >
                  <span className="text-sm font-bold text-slate-900 sm:text-base leading-snug pr-4">
                    {faq.question}
                  </span>

                  <span
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-lg font-medium transition-all duration-300 ${isOpen
                      ? "bg-orange-600 text-white rotate-45 shadow-sm"
                      : "bg-slate-100 text-slate-500 hover:bg-slate-200"
                      }`}
                  >
                    {isOpen ? <FiMinus aria-hidden="true" className="h-4 w-4" /> : <FiPlus aria-hidden="true" className="h-4 w-4" />}
                  </span>
                </button>

                <div
                  className={`grid transition-all duration-300 ease-in-out ${isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                    }`}
                >
                  <div className="overflow-hidden">
                    <div className="border-t border-slate-100 px-5 sm:px-6 pb-5 sm:pb-6 pt-4">
                      <p className="text-xs sm:text-sm leading-relaxed text-slate-600">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Still have questions CTA */}
        <div className="mt-14 rounded-3xl border border-orange-200/90 bg-linear-to-br from-orange-50/80 via-white to-amber-50/60 p-6 sm:p-8 text-center shadow-sm">
          <h3 className="text-xl font-bold text-slate-900 sm:text-2xl">
            Have a project-specific query?
          </h3>
          <p className="mt-2 text-xs sm:text-sm text-slate-600 max-w-lg mx-auto">
            Our fabrication engineers are happy to explain structural options, glass specifications, and price comparisons on call.
          </p>

          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <a
              href="https://wa.me/918949708489"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto rounded-xl bg-[#25D366] px-6 py-3 text-xs font-bold text-white shadow-md transition hover:bg-[#20ba59]"
            >
              Ask on WhatsApp
            </a>
            <a
              href="tel:+918949708489"
              className="w-full sm:w-auto rounded-xl border border-slate-300/90 bg-white px-6 py-3 text-xs font-bold text-slate-800 transition hover:border-orange-500 hover:text-orange-600 shadow-sm"
            >
              Call +91 8949708489
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}

export default FAQ;
