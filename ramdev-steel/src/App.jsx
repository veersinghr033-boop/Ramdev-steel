import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import FloatingActions from "./components/FloatingActions";
import Toast from "./components/Toast";

import Hero from "./sections/Hero";
import CostEstimator from "./sections/CostEstimator";
import Products from "./sections/Products";
import MaterialGuide from "./sections/MaterialGuide";
import Services from "./sections/Services";
import About from "./sections/About";
import WhyChooseUs from "./sections/WhyChooseUs";
import Process from "./sections/Process";
import Projects from "./sections/Projects";
import Gallery from "./sections/Gallery";
import Testimonials from "./sections/Testimonials";
import FAQ from "./sections/FAQ";
import Contact from "./sections/Contact";
import Footer from "./sections/Footer";
import AdminPanel from "./pages/AdminPanel";
import { SiteContentProvider } from "./data/SiteContentContext";

function App() {
  if (window.location.pathname === "/admin") return <AdminPanel />;
  return (
    <SiteContentProvider>
      <PublicSite />
    </SiteContentProvider>
  );
}

function PublicSite() {
  const [toastMessage, setToastMessage] = useState("");
  const [selectedProductForQuote, setSelectedProductForQuote] = useState("");

  const showToast = (msg) => {
    setToastMessage(msg);
  };

  const handleSelectProductForQuote = (productName) => {
    setSelectedProductForQuote(productName);
    showToast(`Added "${productName}" to enquiry form!`);
  };

  useEffect(() => {
    // Primary observer — generous threshold so elements reveal nicely
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            // Don't unobserve — allows re-entry if needed
          }
        });
      },
      { threshold: 0.07, rootMargin: "0px 0px -36px 0px" }
    );

    // Stagger-grid observer — adds is-visible to the GRID wrapper which
    // triggers the nth-child CSS delays on inner .stagger-card elements
    const staggerObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            staggerObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.06, rootMargin: "0px 0px -20px 0px" }
    );

    const observeAll = () => {
      document
        .querySelectorAll(".reveal, .reveal-scale, .reveal-left, .reveal-right, .bar-grow")
        .forEach((el) => revealObserver.observe(el));

      document
        .querySelectorAll(".stagger-grid, .process-grid, .feature-grid")
        .forEach((el) => staggerObserver.observe(el));
    };

    observeAll();
    const t = setTimeout(observeAll, 400);

    return () => {
      clearTimeout(t);
      revealObserver.disconnect();
      staggerObserver.disconnect();
    };
  }, []);

  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col pb-16 lg:pb-0 w-full max-w-full overflow-x-hidden relative">
      {/* Toast Notification Container */}
      <Toast
        message={toastMessage}
        onClose={() => setToastMessage("")}
      />

      {/* Navigation */}
      <Navbar />

      {/* Main Content Sections */}
      <main className="flex-1 w-full max-w-full overflow-x-hidden">
        <Hero />
        <CostEstimator onShowToast={showToast} />
        <Products onSelectProductForQuote={handleSelectProductForQuote} />
        <MaterialGuide />
        <Services />
        <About />
        <WhyChooseUs />
        <Process />
        <Projects />
        <Gallery />
        <Testimonials />
        <FAQ />
        <Contact
          prefilledProduct={selectedProductForQuote}
        />
      </main>

      {/* Comprehensive Footer */}
      <Footer />

      {/* Floating Action Dock (WhatsApp, Mobile Call, Back to Top) */}
      <FloatingActions />
    </div>
  );
}

export default App;