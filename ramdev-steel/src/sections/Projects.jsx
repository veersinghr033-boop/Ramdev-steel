import { useState, useMemo, useEffect } from "react";
import { useSiteContent } from "../data/siteContent";
import { FiEye, FiMapPin, FiArrowRight, FiX } from "react-icons/fi";
import { FiBriefcase } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";

function Projects() {
  const { projects, projectCategories: categories } = useSiteContent();
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && selectedProject) {
        setSelectedProject(null);
      }
    };

    if (selectedProject) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedProject]);

  const filteredProjects = useMemo(() => {
    return activeCategory === "All"
      ? projects
      : projects.filter((project) => project.category === activeCategory);
  }, [activeCategory, projects]);

  const handleWhatsAppProject = (project) => {
    const text = `Hello Ramdev Steel! I love your project *"${project.title}"* (${project.location}). I have a similar requirement. Can you provide an estimate?`;
    window.open(`https://wa.me/918949708489?text=${encodeURIComponent(text)}`, "_blank");
  };

  return (
    <section id="projects" className="relative bg-white py-12 sm:py-16 lg:py-20 border-t border-slate-200/90 overflow-hidden w-full max-w-full">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="grid gap-6 lg:grid-cols-2 lg:items-end reveal">
          <div>
            <div className="mb-3.5 inline-flex items-center gap-2 rounded-full border border-orange-200/90 bg-orange-50 px-3.5 py-1 text-xs font-bold uppercase tracking-widest text-orange-700 shadow-sm animate-float">
              <FiBriefcase aria-hidden="true" className="h-4 w-4" />
              <span>Delivered Work</span>
            </div>
            <h2 className="text-3xl font-black text-slate-900 sm:text-4xl md:text-5xl tracking-tight">
              Projects That <span className="bg-linear-to-r from-orange-600 via-amber-600 to-orange-700 bg-clip-text text-transparent">Speak For Us.</span>
            </h2>
          </div>

          <p className="text-sm leading-relaxed text-slate-600 sm:text-base lg:ml-auto lg:max-w-xl">
            Real installations across Jodhpur — villas, resorts, penthouses and commercial complexes, each photographed after final handover.
          </p>
        </div>

        {/* Category Filters */}
        <div className="mt-7 sm:mt-9 flex gap-2 overflow-x-auto pb-2 sm:pb-3 no-scrollbar">
          {categories.map((category) => {
            const active = activeCategory === category;
            const count =
              category === "All"
                ? projects.length
                : projects.filter((p) => p.category === category).length;

            return (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`flex items-center gap-1.5 whitespace-nowrap rounded-xl border px-3.5 py-2 sm:px-4 sm:py-2.5 text-xs font-bold transition shadow-sm ${active
                  ? "border-orange-500 bg-orange-600 text-white shadow-orange-500/25"
                  : "border-slate-200/90 bg-slate-50 text-slate-700 hover:border-orange-300 hover:text-orange-600 hover:bg-white"
                  }`}
              >
                <span>{category}</span>
                <span className={`rounded-full px-1.5 py-0.2 text-[10px] ${active ? "bg-black/25 text-white" : "bg-slate-200 text-slate-700"}`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Project Grid */}
        <div className="mt-8 sm:mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 reveal delay-100">
          {filteredProjects.map((project) => (
            <article
              key={project.id}
              className="group flex flex-col justify-between overflow-hidden rounded-3xl border border-slate-200/90 bg-white transition duration-500 hover:-translate-y-1.5 hover:border-orange-400 hover:shadow-xl shadow-sm"
            >
              {/* Image Preview */}
              <div className="relative h-64 sm:h-72 overflow-hidden bg-slate-100">
                <img
                  src={project.image}
                  alt={project.title}
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/70 via-transparent to-transparent" />

                <span className="absolute left-4 top-4 rounded-full bg-slate-900/85 px-3 py-1 text-xs font-bold uppercase tracking-wider text-orange-400 backdrop-blur-md shadow-sm border border-white/20">
                  {project.category}
                </span>

                <button
                  onClick={() => setSelectedProject(project)}
                  className="absolute bottom-4 right-4 flex h-10 w-10 items-center justify-center rounded-xl bg-orange-600 text-white shadow-lg transition duration-300 hover:scale-110 hover:bg-orange-700 active:scale-95"
                  aria-label={`Inspect ${project.title}`}
                >
                  <FiEye className="h-4 w-4" />
                </button>
              </div>

              {/* Details */}
              <div className="flex flex-1 flex-col justify-between p-5 sm:p-6">
                <div>
                  <p className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-orange-700">
                    <FiMapPin className="h-3.5 w-3.5 shrink-0" />
                    <span>{project.location}</span>
                  </p>

                  <h3 className="mt-2 text-lg font-bold text-slate-900 group-hover:text-orange-600 transition">
                    {project.title}
                  </h3>

                  <p className="mt-2 text-xs leading-relaxed text-slate-600 line-clamp-2">
                    {project.description}
                  </p>

                  <div className="mt-4 flex flex-wrap gap-2 text-[11px]">
                    <span className="rounded-lg bg-slate-100 px-2.5 py-1 text-slate-700 font-semibold border border-slate-200">
                      Grade: {project.grade.split(" ")[0] + " " + (project.grade.split(" ")[1] || "")}
                    </span>
                    <span className="rounded-lg bg-slate-100 px-2.5 py-1 text-slate-700 font-semibold border border-slate-200">
                      Finish: {project.finish.split(" ")[0]}
                    </span>
                  </div>
                </div>

                <div className="mt-5 flex flex-wrap items-center justify-between gap-2 border-t border-slate-100 pt-3.5">
                  <button
                    onClick={() => setSelectedProject(project)}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-800 hover:text-orange-600 transition"
                  >
                    <span>View Project Details</span>
                    <FiArrowRight className="h-3.5 w-3.5" />
                  </button>

                  <button
                    onClick={() => handleWhatsAppProject(project)}
                    className="inline-flex items-center gap-1 rounded-lg bg-emerald-50 border border-emerald-300 px-3 py-1.5 text-xs font-bold text-emerald-700 hover:bg-emerald-100 transition shadow-sm active:scale-95"
                  >
                    <FaWhatsapp className="h-3.5 w-3.5 text-emerald-600" />
                    <span>Similar Quote</span>
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>

      </div>

      {/* Project Deep Dive Modal */}
      {selectedProject && (
        <div
          className="fixed inset-0 z-110 flex items-center justify-center bg-black/60 p-3 sm:p-4 backdrop-blur-sm"
          onClick={() => setSelectedProject(null)}
        >
          <div
            className="relative max-h-[92vh] w-full max-w-4xl overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedProject(null)}
              className="absolute right-4 top-4 z-20 flex h-9 w-9 items-center justify-center rounded-full bg-white/95 text-slate-800 shadow-md hover:bg-orange-600 hover:text-white transition"
              aria-label="Close modal"
            >
              <FiX className="h-5 w-5" />
            </button>

            <div className="grid max-h-[92vh] overflow-y-auto lg:grid-cols-12">
              <div className="lg:col-span-6 h-52 sm:h-72 lg:h-auto min-h-50 sm:min-h-87.5">
                <img
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  className="h-full w-full object-cover"
                />
              </div>

              <div className="lg:col-span-6 flex flex-col justify-between p-5 sm:p-8">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="rounded bg-orange-100 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-orange-800 border border-orange-200">
                      {selectedProject.category}
                    </span>
                    <span className="text-xs text-slate-500 font-medium">Case Study</span>
                  </div>

                  <h3 className="mt-2.5 text-2xl font-black text-slate-900">
                    {selectedProject.title}
                  </h3>

                  <p className="mt-2 text-xs leading-relaxed text-slate-600">
                    {selectedProject.description}
                  </p>

                  <div className="mt-5 space-y-2.5 rounded-2xl border border-slate-200/90 bg-slate-50 p-4 text-xs">
                    <div className="flex justify-between">
                      <span className="text-slate-500">Location:</span>
                      <span className="font-bold text-slate-900">{selectedProject.location}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Client Type:</span>
                      <span className="font-bold text-slate-900">{selectedProject.client}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Steel Specification:</span>
                      <span className="font-bold text-orange-700">{selectedProject.grade}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Surface Texture:</span>
                      <span className="font-bold text-slate-900">{selectedProject.finish}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Scope Delivered:</span>
                      <span className="font-bold text-slate-900">{selectedProject.scope}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-5 flex flex-col sm:flex-row gap-2.5">
                  <button
                    onClick={() => {
                      handleWhatsAppProject(selectedProject);
                      setSelectedProject(null);
                    }}
                    className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-[#25D366] py-3 text-xs font-bold text-white shadow-md transition hover:bg-[#20ba59] active:scale-[0.98]"
                  >
                    <FaWhatsapp className="h-4 w-4" />
                    <span>Inquire on WhatsApp</span>
                  </button>
                  <a
                    href="#contact"
                    onClick={() => setSelectedProject(null)}
                    className="flex-1 text-center rounded-xl bg-orange-600 py-3 text-xs font-bold text-white transition hover:bg-orange-700 shadow-sm"
                  >
                    Request Similar Quote
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

export default Projects;