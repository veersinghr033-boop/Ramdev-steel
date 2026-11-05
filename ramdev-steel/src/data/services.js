import serviceRailingImg from "../assets/service/Modern Staircase with Polished Steel Railing.png";
import serviceGlassImg from "../assets/service/Modern Glass Balcony at Sunset.png";
import serviceGateImg from "../assets/service/Modern Luxury Gate at Twilight.png";
import serviceGrillImg from "../assets/service/Modern Evening Facade with Grilled Windows.png";
import serviceFabricationImg from "../assets/service/Luxury Stainless Steel Terrace Kitchen.png";
import serviceInstallationImg from "../assets/service/Modern Railing Installation Team.png";

export const serviceImages = [
  serviceRailingImg,
  serviceGlassImg,
  serviceGateImg,
  serviceGrillImg,
  serviceFabricationImg,
  serviceInstallationImg,
];

export const services = [
  {
    id: 1,
    number: "01",
    title: "SS Balcony & Stair Railings",
    deliverables: ["304/316 Grade Steel", "Precision Core Drill Anchors", "Seamless Mirror/Satin Buff"],
    description:
      "Engineered stainless steel railings for residential staircases, exterior balconies, ramps, and commercial atriums with strict safety load compliance.",
    image: serviceRailingImg,
  },
  {
    id: 2,
    number: "02",
    title: "Frameless Glass Railings",
    deliverables: ["12mm Toughened Glass", "SS 304 Solid Base Spigots", "Slimline Aluminum Channel"],
    description:
      "Minimalist architectural glass railings providing uninterrupted panoramic views, optimal safety barrier, and sleek modern aesthetic.",
    image: serviceGlassImg,
  },
  {
    id: 3,
    number: "03",
    title: "Designer Steel Gates",
    deliverables: ["Anti-Sag Box Frame", "CNC Laser Cut Motifs", "Motorized Automation Ready"],
    description:
      "Grand entry gates combining high-tensile steel integrity with contemporary laser lattice designs, premium ball bearing pivots, and security deadbolts.",
    image: serviceGateImg,
  },
  {
    id: 4,
    number: "04",
    title: "Safety Grills & Partitions",
    deliverables: ["Burglary-Resistant Rods", "Concealed Fastening", "Weather-Resistant Polish"],
    description:
      "Decorative and high-security window grills, balcony mesh frames, and interior spatial partitions tailored to modern architectural layouts.",
    image: serviceGrillImg,
  },
  {
    id: 5,
    number: "05",
    title: "Custom Steel Fabrication",
    deliverables: ["CAD Blueprinting", "TIG Argon Welding", "Custom Dimensions"],
    description:
      "Made-to-order architectural steelwork, designer furniture bases, commercial kitchen counters, and structural assemblies for villas and hotels.",
    image: serviceFabricationImg,
  },
  {
    id: 6,
    number: "06",
    title: "Site Installation & Finishing",
    deliverables: ["Expert Fitting Team", "Chemical Anchor Fasteners", "Final Mirror Buffing"],
    description:
      "End-to-end on-site installation by certified fabrication technicians ensuring perfect leveling, rigid anchoring, and scratch-free handover.",
    image: serviceInstallationImg,
  },
];
