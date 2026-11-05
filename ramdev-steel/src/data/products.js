import modernBalconyImg from "../assets/product/Modern Glass Balcony at Sunset.png";
import framelessGlassImg from "../assets/product/Frameless Glass Balcony at Sunset.png";
import laserCutGateImg from "../assets/product/Luxurious Botanical Laser-Cut Gate at Dusk.png";
import windowGrillImg from "../assets/product/Modern Window Grill Design Showcase.png";
import hardwareFittingsImg from "../assets/product/Stainless Glass Railing Hardware Guide.png";
import steelFurnitureImg from "../assets/product/Stainless Steel Design Portfolio Collage.png";

export const productImages = [
  modernBalconyImg,
  framelessGlassImg,
  laserCutGateImg,
  windowGrillImg,
  hardwareFittingsImg,
  steelFurnitureImg,
];

export const productCategories = [
  "All",
  "Railings",
  "Gates",
  "Grills",
  "Fittings",
  "Furniture",
];

export const products = [
  {
    id: 1,
    name: "Modern SS Balcony Railing",
    category: "Railings",
    grade: "SS 304 / SS 316",
    thickness: "1.5mm - 2.0mm Gauge",
    description:
      "Engineered multi-tier stainless steel railing with ergonomic top handrail and horizontal safety pipes. Designed for extreme outdoor weather.",
    image: modernBalconyImg,
    tag: "Bestseller",
    specs: {
      height: "3.0 - 3.5 Feet Standard",
      mount: "Core Drill / Base Flange Plate Anchor",
      finish: "Mirror Polish / Hairline Satin",
      warranty: "15 Years Anti-Rust Guarantee",
    },
  },
  {
    id: 2,
    name: "Frameless SS Glass Railing",
    category: "Railings",
    grade: "SS 304 Solid Cast",
    thickness: "12mm Toughened Glass",
    description:
      "Ultra-modern architectural glass balcony system with heavy-duty solid stainless steel spigots and continuous base channel profile.",
    image: framelessGlassImg,
    tag: "Luxury",
    specs: {
      height: "3.2 - 4.0 Feet",
      glass: "12mm Clear / Frosted / Tinted Toughened",
      hardware: "Duplex 2205 / SS 304 Spigots",
      finish: "Mirror Polish / Brushed Matt",
    },
  },
  {
    id: 3,
    name: "CNC Laser Cut Entrance Gate",
    category: "Gates",
    grade: "SS 304 Prime Sheet & Box Pipes",
    thickness: "2.0mm Frame + 3mm Sheet",
    description:
      "Custom-designed grand entrance gate featuring intricate CNC laser cut lattice patterns, heavy-duty ball-bearing hinges, and anti-sag structure.",
    image: laserCutGateImg,
    tag: "Custom Made",
    specs: {
      automation: "Compatible with remote sliding / swing motors",
      hinges: "Heavy Duty 4-bearing Stainless Hinges",
      finish: "Satin Brush / PVD Titanium Coated",
      security: "Integrated multi-point deadbolt mounts",
    },
  },
  {
    id: 4,
    name: "Architectural Window Safety Grills",
    category: "Grills",
    grade: "SS 304 Solid & Hollow Bars",
    thickness: "16mm - 19mm Diameter",
    description:
      "Elegant decorative safety grills for residential windows and balconies. Provides robust intrusion security with clean unobstructed outdoor views.",
    image: windowGrillImg,
    tag: "High Security",
    specs: {
      welding: "Complete 360° Argon TIG Welded Joint",
      pattern: "Geometric / Modern Linear / Floral",
      anchors: "Tamper-proof concealed wall anchors",
      finish: "High Gloss Buffed Finish",
    },
  },
  {
    id: 5,
    name: "Precision Railing Glass Fittings & Spigots",
    category: "Fittings",
    grade: "SS 304 / SS 316 Casted",
    thickness: "Solid Heavy Forging",
    description:
      "Heavy-duty glass clamps, base spigots, handrail brackets, adjustable elbows, and end caps built for lifetime commercial and residential duty.",
    image: hardwareFittingsImg,
    tag: "Hardware Spec",
    specs: {
      compatibility: "8mm, 10mm, 12mm Glass Panels",
      gaskets: "UV Resistant EPDM Anti-Slip Rubber Gaskets",
      standards: "ASTM A276 Certified Steel",
      finish: "Electro-polished Mirror & Satin",
    },
  },
  {
    id: 6,
    name: "Custom SS Architectural Furniture",
    category: "Furniture",
    grade: "SS 304 High Precision",
    thickness: "1.6mm - 2.5mm",
    description:
      "Bespoke stainless steel dining table bases, console frames, center tables, and commercial kitchen fabrication built to designer blueprints.",
    image: steelFurnitureImg,
    tag: "Designer Series",
    specs: {
      topCompatibility: "Marble, Quartz, Granite, or Glass",
      joints: "Seamless Invisible Grind Welds",
      finish: "PVD Gold / Rose Gold / Mirror Polish",
      durability: "Termite-free, 100% moisture resistant",
    },
  },
];
