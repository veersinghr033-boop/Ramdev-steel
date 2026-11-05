import { useState } from "react";
import { useSiteContent } from "../data/siteContent";
import { FiPhoneCall, FiMail, FiMapPin, FiCheckCircle, FiSend, FiArrowRight, FiClock, FiTool } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";

function Contact({ prefilledProduct = "" }) {
  const { services: mongoServices = [], products: mongoProducts = [] } = useSiteContent();
  const [submitted, setSubmitted] = useState(false);
  const [needsSiteVisit, setNeedsSiteVisit] = useState(false);

  const dynamicServiceOptions = [
    "Select a service",
    ...mongoServices.map((service) => service.title),
    ...mongoProducts.map((product) => product.name),
    "Other",
  ];
  const services = Array.from(new Set(dynamicServiceOptions));
  const gradeOptions = ["No preference", "Mild Steel", "Stainless Steel", "Other"];

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    location: "",
    service: prefilledProduct || services[0],
    grade: gradeOptions[0],
    approxSize: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSendWhatsAppDirect = () => {
    const details = [
      "*New Project Enquiry - Ramdev Steel*",
      `*Name:* ${formData.name || "Customer"}`,
      `*Phone:* ${formData.phone || "Not provided"}`,
      `*Email:* ${formData.email || "Not provided"}`,
      `*Location:* ${formData.location || "Not provided"}`,
      `*Service:* ${formData.service}`,
      `*Steel grade:* ${formData.grade}`,
      `*Approx. dimensions:* ${formData.approxSize || "Not provided"}`,
      `*Site visit requested:* ${needsSiteVisit ? "Yes" : "No"}`,
      `*Details:* ${formData.message || "Please share quotation"}`,
    ].join("\n");

    window.open(`https://wa.me/918949708489?text=${encodeURIComponent(details)}`, "_blank", "noopener,noreferrer");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSendWhatsAppDirect();
    setSubmitted(true);
  };

  return (
    <section id="contact" className="relative w-full max-w-full overflow-hidden border-t border-[#eee8df] bg-[#f7f4ef] py-12 pb-24 sm:py-16 sm:pb-16 lg:py-20 lg:pb-20">
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center reveal">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-orange-200/80 bg-orange-50 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-orange-700 shadow-sm">
            <FiTool aria-hidden="true" className="h-4 w-4" />
            <span>Let's Build It</span>
          </div>
          <h2 className="text-3xl font-black text-slate-900 sm:text-4xl md:text-5xl tracking-tight">
            Book Your <span className="bg-linear-to-r from-orange-600 via-amber-600 to-orange-700 bg-clip-text text-transparent">Free Site Visit.</span>
          </h2>
          <p className="mt-3 text-sm text-slate-600 sm:text-base leading-relaxed max-w-xl mx-auto">
            Share your requirement — an engineer visits with laser tools, physical material samples and a 3D layout proposal. Zero cost, zero obligation.
          </p>
        </div>

        {/* Contact Layout */}
        <div className="mt-10 grid w-full items-start gap-6 reveal delay-100 lg:grid-cols-[1.08fr_1fr] lg:gap-6">

          {/* Left: Callback Form */}
          <div className="w-full min-w-0 max-w-full">
            <div className="w-full min-w-0 max-w-full overflow-hidden rounded-[26px] border border-[#eee8df] bg-white p-5 shadow-[0_12px_30px_rgba(34,28,20,0.07)] sm:p-7 lg:p-8">

              {!submitted ? (
                <>
                  <div className="border-b border-[#eee8df] pb-4">
                    <span className="text-[11px] font-bold uppercase tracking-widest text-orange-700">
                      Online Quotation & Site Visit Form
                    </span>
                    <h3 className="mt-1 text-2xl font-black tracking-tight text-slate-900 sm:text-[27px]">
                      Request A Custom Quote
                    </h3>
                    <p className="mt-1.5 text-xs text-slate-500">
                      Fill out this quick form or send your message directly to our WhatsApp.
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="mt-5 space-y-3.5">

                    {/* Name + Phone */}
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                          Your Name *
                        </label>
                        <input
                          type="text"
                          required
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="e.g. Ramesh Patel"
                          className="mt-1.5 w-full rounded-2xl border border-[#e8e0d6] bg-[#fcfaf7] px-4 py-3 text-base text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-orange-500 focus:bg-white focus:ring-2 focus:ring-orange-100 sm:text-sm"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                          Mobile / WhatsApp Number *
                        </label>
                        <input
                          type="tel"
                          required
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="+91 94688 XXXXX"
                          className="mt-1.5 w-full rounded-2xl border border-[#e8e0d6] bg-[#fcfaf7] px-4 py-3 text-base text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-orange-500 focus:bg-white focus:ring-2 focus:ring-orange-100 sm:text-sm"
                        />
                      </div>
                    </div>

                    {/* Email + Location */}
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                          Email (Optional)
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="you@example.com"
                          className="mt-1.5 w-full rounded-2xl border border-[#e8e0d6] bg-[#fcfaf7] px-4 py-3 text-base text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-orange-500 focus:bg-white focus:ring-2 focus:ring-orange-100 sm:text-sm"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                          Project City / Area
                        </label>
                        <input
                          type="text"
                          name="location"
                          value={formData.location}
                          onChange={handleChange}
                          placeholder="e.g. Jodhpur, Pali, Barmer"
                          className="mt-1.5 w-full rounded-2xl border border-[#e8e0d6] bg-[#fcfaf7] px-4 py-3 text-base text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-orange-500 focus:bg-white focus:ring-2 focus:ring-orange-100 sm:text-sm"
                        />
                      </div>
                    </div>

                    {/* Service + Grade */}
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                          Service Required
                        </label>
                        <select
                          name="service"
                          value={formData.service}
                          onChange={handleChange}
                          className="mt-1.5 w-full rounded-2xl border border-[#e8e0d6] bg-[#fcfaf7] px-4 py-3 text-base text-slate-900 shadow-sm outline-none transition focus:border-orange-500 focus:bg-white focus:ring-2 focus:ring-orange-100 sm:text-sm"
                        >
                          {services.map((s) => (
                            <option key={s} value={s}>
                              {s}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                          Preferred Steel Grade
                        </label>
                        <select
                          name="grade"
                          value={formData.grade}
                          onChange={handleChange}
                          className="mt-1.5 w-full rounded-2xl border border-[#e8e0d6] bg-[#fcfaf7] px-4 py-3 text-base text-slate-900 shadow-sm outline-none transition focus:border-orange-500 focus:bg-white focus:ring-2 focus:ring-orange-100 sm:text-sm"
                        >
                          {gradeOptions.map((g) => (
                            <option key={g} value={g}>
                              {g}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* Approx Dimensions */}
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                        Approximate Length or Dimensions (Optional)
                      </label>
                      <input
                        type="text"
                        name="approxSize"
                        value={formData.approxSize}
                        onChange={handleChange}
                        placeholder="e.g. 40 running feet balcony, 15x8 ft entrance gate"
                        className="mt-1.5 w-full rounded-2xl border border-[#e8e0d6] bg-[#fcfaf7] px-4 py-3 text-base text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-orange-500 focus:bg-white focus:ring-2 focus:ring-orange-100 sm:text-sm"
                      />
                    </div>

                    {/* Message */}
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                        Project Details / Specific Requirements
                      </label>
                      <textarea
                        rows="3"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Tell us about your architectural style, height preferences, or design ideas..."
                        className="mt-1.5 w-full resize-none rounded-2xl border border-[#e8e0d6] bg-[#fcfaf7] px-4 py-3 text-base text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-orange-500 focus:bg-white focus:ring-2 focus:ring-orange-100 sm:text-sm"
                      />
                    </div>

                    {/* Site Visit Checkbox */}
                    <div className="flex items-center gap-3 rounded-2xl border border-orange-100 bg-orange-50/70 p-3.5">
                      <input
                        type="checkbox"
                        id="siteVisit"
                        checked={needsSiteVisit}
                        onChange={(e) => setNeedsSiteVisit(e.target.checked)}
                        className="h-4 w-4 rounded border-slate-300 text-orange-600 focus:ring-orange-500/30 accent-orange-600"
                      />
                      <label htmlFor="siteVisit" className="text-xs text-slate-700 cursor-pointer">
                        <strong className="text-slate-900">Request Free On-Site Measurement Visit:</strong> Our technician will visit your site with laser tools and physical material samples.
                      </label>
                    </div>

                    {/* Submit Actions */}
                    <div className="pt-2 flex flex-col sm:flex-row gap-3">
                      <button
                        type="submit"
                        className="flex flex-1 items-center justify-center gap-2 rounded-full bg-linear-to-r from-red-600 to-orange-500 px-6 py-3.5 text-sm font-bold text-white shadow-[0_10px_20px_rgba(234,88,12,0.2)] transition hover:brightness-105 active:scale-[0.98]"
                      >
                        <FiSend className="h-3.5 w-3.5" />
                        <span>Submit Enquiry Online</span>
                      </button>

                      <button
                        type="button"
                        onClick={handleSendWhatsAppDirect}
                        className="flex items-center justify-center gap-2 rounded-full bg-[#25D366] px-5 py-3.5 text-sm font-bold text-white shadow-md transition hover:bg-[#20ba59] active:scale-[0.98]"
                      >
                        <FaWhatsapp className="h-4 w-4" />
                        <span>Send via WhatsApp</span>
                      </button>
                    </div>

                  </form>
                </>
              ) : (
                /* Success Feedback */
                <div className="py-12 text-center flex flex-col items-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-orange-100 text-orange-600">
                    <FiCheckCircle className="h-8 w-8" />
                  </div>
                  <h3 className="mt-5 text-2xl font-black text-slate-900">
                    Quotation Request Received!
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-slate-600 max-w-md">
                    Thank you, <strong className="text-slate-900">{formData.name || "Customer"}</strong>. Our senior fabrication team has received your details for <strong className="text-orange-600">{formData.service}</strong>. We will contact you at <strong className="text-slate-900">{formData.phone}</strong> shortly.
                  </p>

                  <div className="mt-6 flex flex-col sm:flex-row gap-3">
                    <button
                      onClick={handleSendWhatsAppDirect}
                      className="flex items-center justify-center gap-2 rounded-xl bg-[#25D366] px-6 py-3 text-xs font-bold text-white shadow-md hover:bg-[#20ba59] transition"
                    >
                      <FaWhatsapp className="h-4 w-4" />
                      <span>Open in WhatsApp for Faster Response</span>
                    </button>
                    <button
                      onClick={() => setSubmitted(false)}
                      className="rounded-xl border border-slate-200 bg-white px-5 py-3 text-xs font-bold text-slate-700 hover:text-slate-900 shadow-sm"
                    >
                      Submit Another Requirement
                    </button>
                  </div>
                </div>
              )}

            </div>
          </div>

          {/* Right: Contact Cards + Map */}
          <div className="w-full min-w-0 space-y-4">

            {/* Quick Contact Cards */}
            <div className="grid grid-cols-1 gap-3">
              {/* Call Us */}
              <a
                href="tel:+918949708489"
                className="flex w-full min-w-0 items-center justify-between gap-2 rounded-2xl border border-orange-200 bg-orange-50/70 p-3.5 shadow-sm transition hover:bg-orange-100/70 sm:p-4"
              >
                <div className="flex min-w-0 flex-1 items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-orange-600 text-white shadow-md sm:h-11 sm:w-11">
                    <FiPhoneCall className="h-5 w-5 sm:h-6 sm:w-6" />
                  </div>
                  <div className="min-w-0">
                    <span className="block text-[10px] font-bold uppercase text-orange-700">Call Us</span>
                    <p className="truncate text-xs font-bold text-slate-900 sm:text-sm">+91 89497 08489</p>
                    <p className="text-[10px] text-slate-500">Mon–Sat, 9 AM – 8 PM</p>
                  </div>
                </div>
                <span className="flex shrink-0 items-center gap-1 rounded-full border border-orange-200 bg-orange-100/90 px-2.5 py-1 text-[10px] font-bold text-orange-700 sm:text-xs">
                  Call Now <FiArrowRight className="h-3 w-3" />
                </span>
              </a>

              {/* WhatsApp */}
              <a
                href="https://wa.me/918949708489?text=Hello%20Ramdev%20Steel!%20I%20am%20looking%20for%20a%20stainless%20steel%20fabrication%20quote."
                target="_blank"
                rel="noopener noreferrer"
                className="flex w-full min-w-0 items-center justify-between gap-2 rounded-2xl border border-emerald-300 bg-emerald-50/70 p-3.5 shadow-sm transition hover:bg-emerald-100/70 sm:p-4"
              >
                <div className="flex min-w-0 flex-1 items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#25D366] text-white shadow-md sm:h-11 sm:w-11">
                    <FaWhatsapp className="h-5 w-5 sm:h-6 sm:w-6" />
                  </div>
                  <div className="min-w-0">
                    <span className="block text-[10px] font-bold uppercase text-emerald-700">Instant WhatsApp</span>
                    <p className="truncate text-xs font-bold text-slate-900 sm:text-sm">Chat With Fabricator</p>
                  </div>
                </div>
                <span className="flex shrink-0 items-center gap-1 rounded-full border border-emerald-200/90 bg-emerald-100/90 px-2.5 py-1 text-[10px] font-bold text-emerald-700 sm:text-xs">
                  Online Now <FiArrowRight className="h-3 w-3" />
                </span>
              </a>

              {/* Email */}
              <a
                href="mailto:info@ramdevsteel.com"
                className="flex w-full min-w-0 items-center justify-between gap-2 rounded-2xl border border-sky-200 bg-sky-50/70 p-3.5 text-left shadow-sm transition hover:bg-sky-100/70 sm:p-4"
              >
                <div className="flex min-w-0 flex-1 items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-sky-600 text-white shadow-md sm:h-11 sm:w-11">
                    <FiMail className="h-5 w-5 sm:h-6 sm:w-6" />
                  </div>
                  <div className="min-w-0">
                    <span className="block text-[10px] font-bold uppercase text-sky-700">Email</span>
                    <p className="truncate text-xs font-bold text-slate-900 sm:text-sm">info@ramdevsteel.com</p>
                    <p className="text-[10px] text-slate-500">Drawings &amp; BOQ welcome</p>
                  </div>
                </div>
                <span className="flex shrink-0 items-center gap-1 rounded-full border border-sky-200 bg-sky-100/90 px-2.5 py-1 text-[10px] font-bold text-sky-700 sm:text-xs">
                  Email Us <FiArrowRight className="h-3 w-3" />
                </span>
              </a>
            </div>

            {/* Google Map */}
            <div className="overflow-hidden rounded-3xl border border-[#eee8df] shadow-[0_10px_25px_rgba(34,28,20,0.08)]">
              <iframe
                title="Ramdev Steel Industries Location Map"
                src="https://maps.google.com/maps?q=24.797244,71.689056&hl=en&z=16&output=embed"
                width="100%"
                height="380"
                style={{ border: 0, display: "block" }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="h-94 w-full sm:h-72"
              />

              {/* Location Info Bar */}
              <div className="flex flex-col items-start justify-between gap-3 border-t border-slate-700 bg-slate-900 px-4 py-4 text-white sm:flex-row sm:items-center">
                <div className="flex items-start gap-3 text-xs min-w-0">
                  <FiMapPin className="h-4 w-4 text-orange-500 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold">Hadecha</p>
                    <p className="text-slate-400 text-[11px]">Hadecha, Rajasthan 343027, India</p>
                    <p className="text-slate-400 text-[11px] flex items-center gap-1 mt-0.5">
                      <FiClock aria-hidden="true" className="h-4 w-4 shrink-0" /> Mon - Sat: 9:00 AM - 8:00 PM
                    </p>
                  </div>
                </div>
                <a
                  href="https://www.google.com/maps/dir/?api=1&destination=QMXQ%2B6PW+Hadecha+Shivnagar+Rajasthan+343041"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex shrink-0 items-center gap-2 rounded-full bg-linear-to-r from-red-600 to-orange-500 px-5 py-2.5 text-xs font-bold text-white shadow-md transition hover:brightness-105 active:scale-95"
                >
                  <FiMapPin className="h-3.5 w-3.5" />
                  Get Directions
                </a>
              </div>
            </div>
          </div>

        </div>

      </div>

    </section>
  );
}

export default Contact;
