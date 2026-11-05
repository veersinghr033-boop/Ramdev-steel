import { useState, useMemo } from "react";
import { useSiteContent } from "../data/siteContent";
import { FiCheck, FiCheckCircle, FiCopy, FiPlus, FiZap } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";

function CostEstimator({ onShowToast }) {
  const { workTypes, steelGrades, finishOptions } = useSiteContent();
  const [selectedTypeId, setSelectedTypeId] = useState(workTypes[0].id);
  const [selectedGradeId, setSelectedGradeId] = useState(steelGrades[0].id);
  const [selectedFinishId, setSelectedFinishId] = useState(finishOptions[0].id);
  const selectedType = workTypes.find((type) => type.id === selectedTypeId) ?? workTypes[0];
  const selectedGrade = steelGrades.find((grade) => grade.id === selectedGradeId) ?? steelGrades[0];
  const selectedFinish = finishOptions.find((finish) => finish.id === selectedFinishId) ?? finishOptions[0];
  const [quantity, setQuantity] = useState(workTypes[0].defaultQty);

  const [hasToughenedGlass, setHasToughenedGlass] = useState(false);
  const [hasWoodenHandrail, setHasWoodenHandrail] = useState(false);
  const [hasLaserCutPattern, setHasLaserCutPattern] = useState(false);

  const handleTypeChange = (type) => {
    setSelectedTypeId(type.id);
    setQuantity(type.defaultQty);
  };

  const calculation = useMemo(() => {
    let baseRate = selectedType.baseRate304;
    if (selectedGrade.id === "316") baseRate = selectedType.baseRate316;
    if (selectedGrade.id === "202") baseRate = selectedType.baseRate202;

    let unitRate = baseRate + selectedFinish.extraRate;

    if (hasToughenedGlass) unitRate += 350;
    if (hasWoodenHandrail) unitRate += 280;
    if (hasLaserCutPattern) unitRate += 220;

    const totalEstimated = Math.round(unitRate * quantity);
    const lowRange = Math.round(totalEstimated * 0.95);
    const highRange = Math.round(totalEstimated * 1.08);

    return {
      unitRate,
      lowRange,
      highRange,
      approxTotal: totalEstimated,
    };
  }, [
    selectedType,
    selectedGrade,
    selectedFinish,
    quantity,
    hasToughenedGlass,
    hasWoodenHandrail,
    hasLaserCutPattern,
  ]);

  const handleSendWhatsApp = () => {
    const message = `*Ramdev Steel - Quotation Request*%0A%0A` +
      `*Work Type:* ${selectedType.name}%0A` +
      `*Steel Grade:* ${selectedGrade.name}%0A` +
      `*Finish:* ${selectedFinish.name}%0A` +
      `*Quantity:* ${quantity} ${selectedType.unit}%0A` +
      (hasToughenedGlass ? `*Addon:* 12mm Toughened Glass%0A` : "") +
      (hasWoodenHandrail ? `*Addon:* Teakwood Top Handrail%0A` : "") +
      (hasLaserCutPattern ? `*Addon:* CNC Laser Cut Pattern%0A` : "") +
      `*Estimated Cost:* ₹${calculation.lowRange.toLocaleString()} - ₹${calculation.highRange.toLocaleString()}%0A%0A` +
      `Please provide the final quotation and site measurement schedule.`;

    window.open(`https://wa.me/918949708489?text=${message}`, "_blank");
  };

  const handleCopyQuote = () => {
    const text = `Ramdev Steel Fabrication Estimate:
Work: ${selectedType.name}
Grade: ${selectedGrade.name}
Finish: ${selectedFinish.name}
Size: ${quantity} ${selectedType.unit}
Est. Rate: ~₹${calculation.unitRate}/${selectedType.unit.split(" ")[0]}
Est. Total: ₹${calculation.lowRange.toLocaleString()} - ₹${calculation.highRange.toLocaleString()}
Call: +91 94688 15735`;

    navigator.clipboard.writeText(text);
    if (onShowToast) {
      onShowToast("Estimate copied to clipboard!");
    }
  };

  // Smart quick-dimension presets for fast tapping on mobile
  const dimensionPresets = useMemo(() => {
    if (selectedType.unit.includes("Step")) {
      return [12, 16, 20, 28];
    }
    if (selectedType.unit.includes("SQFT")) {
      return [40, 75, 120, 200];
    }
    return [20, 40, 75, 120]; // Default for RFT
  }, [selectedType]);

  return (
    <section id="calculator" className="relative bg-slate-50 py-12 sm:py-10 lg:py-18 border-y border-slate-200/90 overflow-hidden w-full max-w-full">
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center reveal">
          <div className="mb-3.5 inline-flex items-center gap-2 rounded-full border border-orange-200/90 bg-orange-50 px-3.5 py-1 text-xs font-bold uppercase tracking-widest text-orange-700 shadow-sm animate-float">
            <FiZap aria-hidden="true" className="h-4 w-4" />
            <span>Interactive Estimation Tool</span>
          </div>
          <h2 className="text-3xl font-black text-slate-900 sm:text-4xl md:text-5xl tracking-tight">
            Instant Steel{" "}
            <span className="bg-linear-to-r from-orange-600 via-amber-600 to-orange-700 bg-clip-text text-transparent">
              Cost Estimator
            </span>
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
            No guesswork. Select your fabrication requirement, grade, finish, and approximate length
            to see an instant ballpark budget.
          </p>
        </div>

        {/* Main Estimator Card */}
        <div className="mt-8 sm:mt-10 rounded-3xl border border-slate-200/90 bg-white p-4 sm:p-6 lg:p-8 shadow-xl shadow-slate-200/50 w-full max-w-full overflow-hidden reveal-scale delay-100">
          <div className="grid gap-6 lg:grid-cols-12 lg:gap-8 w-full min-w-0">

            {/* Left Options Configurator */}
            <div className="lg:col-span-7 space-y-5 sm:space-y-6 w-full min-w-0">

              {/* Step 1: Work Type */}
              <div className="w-full min-w-0">
                <label className="text-xs font-bold uppercase tracking-wider text-orange-700">
                  Step 1: Choose Fabrication Type
                </label>
                <div className="mt-3 grid gap-2.5 sm:grid-cols-2 w-full min-w-0">
                  {workTypes.map((type) => {
                    const isSelected = selectedType.id === type.id;
                    return (
                      <button
                        key={type.id}
                        type="button"
                        onClick={() => handleTypeChange(type)}
                        className={`relative rounded-2xl border p-3.5 sm:p-4 text-left transition-all w-full min-w-0 overflow-hidden ${isSelected
                          ? "border-orange-500 bg-linear-to-br from-orange-50 via-amber-50/50 to-orange-50/80 shadow-md ring-1 ring-orange-500/30"
                          : "border-slate-200/90 bg-white hover:border-slate-300 hover:bg-slate-50/70"
                          }`}
                      >
                        {type.popular && (
                          <span className="absolute right-2.5 top-2.5 sm:right-3 sm:top-3 rounded-full bg-orange-100 px-2 py-0.5 text-[9px] font-bold text-orange-800 uppercase border border-orange-200 shrink-0">
                            Popular
                          </span>
                        )}
                        <h4 className="text-sm font-bold text-slate-900 pr-14wrap-break-word">{type.name}</h4>
                        <p className="mt-1 text-xs text-slate-500 line-clamp-2 leading-relaxed wrap-break-word">{type.description}</p>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Step 2: SS Grade */}
              <div className="w-full min-w-0">
                <label className="text-xs font-bold uppercase tracking-wider text-orange-700">
                  Step 2: Choose Stainless Steel Grade
                </label>
                <div className="mt-3 grid gap-2.5 sm:grid-cols-3 w-full min-w-0">
                  {steelGrades.map((grade) => {
                    const isSelected = selectedGrade.id === grade.id;
                    return (
                      <button
                        key={grade.id}
                        type="button"
                        onClick={() => setSelectedGradeId(grade.id)}
                        className={`rounded-2xl border p-3.5 text-left transition-all w-full min-w-0 overflow-hidden ${isSelected
                          ? "border-orange-500 bg-linear-to-br from-orange-50 via-amber-50/50 to-orange-50/80 shadow-md ring-1 ring-orange-500/30"
                          : "border-slate-200/90 bg-white hover:border-slate-300 hover:bg-slate-50/70"
                          }`}
                      >
                        <span className="text-sm font-bold text-slate-900 block wrap-break-word">{grade.name}</span>
                        <span className="mt-1 inline-block text-[10px] font-bold text-orange-700 bg-orange-100/70 px-2 py-0.5 rounded-full border border-orange-200">
                          {grade.tag}
                        </span>
                        <p className="mt-1.5 text-[11px] text-slate-500 line-clamp-2 leading-relaxed wrap-break-word">{grade.desc}</p>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Step 3: Finish */}
              <div className="w-full min-w-0">
                <label className="text-xs font-bold uppercase tracking-wider text-orange-700">
                  Step 3: Surface Finish & Coating
                </label>
                <div className="mt-3 grid gap-2.5 sm:grid-cols-2 w-full min-w-0">
                  {finishOptions.map((finish) => {
                    const isSelected = selectedFinish.id === finish.id;
                    return (
                      <button
                        key={finish.id}
                        type="button"
                        onClick={() => setSelectedFinishId(finish.id)}
                        className={`flex items-center justify-between gap-2 rounded-2xl border p-3.5 text-left transition-all w-full min-w-0 overflow-hidden ${isSelected
                          ? "border-orange-500 bg-linear-to-br from-orange-50 via-amber-50/50 to-orange-50/80 shadow-md ring-1 ring-orange-500/30"
                          : "border-slate-200/90 bg-white hover:border-slate-300 hover:bg-slate-50/70"
                          }`}
                      >
                        <div className="min-w-0 flex-1">
                          <p className="text-xs font-bold text-slate-900 wrap-break-word">{finish.name}</p>
                          <p className="text-[10px] text-slate-500">{finish.tag}</p>
                        </div>
                        {finish.extraRate > 0 && (
                          <span className="text-[11px] font-bold text-orange-600 bg-orange-100/80 px-2 py-0.5 rounded-lg border border-orange-200 shrink-0">
                            +₹{finish.extraRate}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Step 4: Dimensions Slider & Mobile Quick Presets */}
              <div className="w-full min-w-0">
                <div className="flex flex-wrap items-center justify-between gap-1">
                  <label className="text-xs font-bold uppercase tracking-wider text-orange-700">
                    Step 4: Approximate Dimension ({selectedType.unit})
                  </label>
                  <span className="text-xs sm:text-sm font-black text-orange-600 bg-orange-50 px-2.5 py-0.5 rounded-full border border-orange-200 shrink-0">
                    {quantity} {selectedType.unit.split(" ")[0]}
                  </span>
                </div>

                {/* Quick Presets for Mobile */}
                <div className="mt-2.5 flex items-center gap-2 overflow-x-auto pb-1.5 no-scrollbar w-full min-w-0 max-w-full">
                  <span className="text-[10px] uppercase font-bold text-slate-400 whitespace-nowrap shrink-0">Presets:</span>
                  {dimensionPresets.map((preset) => (
                    <button
                      key={preset}
                      type="button"
                      onClick={() => setQuantity(preset)}
                      className={`rounded-xl px-3 py-1.5 text-xs font-bold transition whitespace-nowrap min-h-9 flex items-center shrink-0 ${quantity === preset
                        ? "bg-orange-600 text-white shadow-sm ring-1 ring-orange-600"
                        : "bg-slate-100 text-slate-700 hover:bg-orange-100 hover:text-orange-800"
                        }`}
                    >
                      {preset} {selectedType.unit.split(" ")[0]}
                    </button>
                  ))}
                </div>

                <div className="mt-3 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 w-full min-w-0">
                  <div className="w-full min-w-0 flex-1">
                    <input
                      type="range"
                      min={selectedType.minQty}
                      max={selectedType.maxQty}
                      value={quantity}
                      onChange={(e) => setQuantity(Number(e.target.value))}
                      className="h-3 sm:h-2.5 w-full cursor-pointer appearance-none rounded-lg bg-slate-200 accent-orange-600 py-2 sm:py-0"
                    />
                  </div>
                  <div className="flex items-center justify-between sm:justify-end gap-2 w-full sm:w-auto shrink-0">
                    <button
                      type="button"
                      onClick={() => setQuantity(Math.max(selectedType.minQty, quantity - (selectedType.unit.includes("Step") ? 1 : 5)))}
                      className="flex-1 sm:flex-none flex h-10 w-10 sm:h-10 sm:w-10 items-center justify-center rounded-xl border border-slate-300 bg-white text-lg font-bold text-slate-700 hover:bg-orange-50 hover:text-orange-600 active:scale-95 shadow-sm min-h-10 min-w-10"
                      aria-label="Decrease quantity"
                    >
                      −
                    </button>
                    <input
                      type="number"
                      min={selectedType.minQty}
                      max={selectedType.maxQty}
                      value={quantity}
                      onChange={(e) => setQuantity(Math.max(1, Number(e.target.value)))}
                      className="w-20 h-10 rounded-xl border border-slate-300 bg-slate-50 px-2 text-center text-base sm:text-sm font-bold text-slate-900 outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200"
                    />
                    <button
                      type="button"
                      onClick={() => setQuantity(Math.min(selectedType.maxQty, quantity + (selectedType.unit.includes("Step") ? 1 : 5)))}
                      className="flex-1 sm:flex-none flex h-10 w-10 sm:h-10 sm:w-10 items-center justify-center rounded-xl border border-slate-300 bg-white text-lg font-bold text-slate-700 hover:bg-orange-50 hover:text-orange-600 active:scale-95 shadow-sm min-h-10 min-w-10"
                      aria-label="Increase quantity"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              {/* Step 5: Optional Add-ons */}
              <div className="w-full min-w-0">
                <label className="text-xs font-bold uppercase tracking-wider text-orange-700">
                  Optional Add-Ons & Enhancements
                </label>
                <div className="mt-3 flex flex-wrap gap-2 sm:gap-2.5 w-full min-w-0">
                  <button
                    type="button"
                    onClick={() => setHasToughenedGlass(!hasToughenedGlass)}
                    className={`rounded-xl border px-3 py-2 sm:px-3.5 sm:py-2.5 text-xs font-semibold transition min-h-10flex items-center gap-1.5 max-w-full ${hasToughenedGlass
                      ? "border-orange-500 bg-orange-600 text-white shadow-sm"
                      : "border-slate-200/90 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50"
                      }`}
                  >
                    {hasToughenedGlass ? <FiCheck aria-hidden="true" /> : <FiPlus aria-hidden="true" />}
                    <span className="wrap-break-word">12mm Toughened Glass</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setHasWoodenHandrail(!hasWoodenHandrail)}
                    className={`rounded-xl border px-3 py-2 sm:px-3.5 sm:py-2.5 text-xs font-semibold transition min-h-10 flex items-center gap-1.5 max-w-full ${hasWoodenHandrail
                      ? "border-orange-500 bg-orange-600 text-white shadow-sm"
                      : "border-slate-200/90 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50"
                      }`}
                  >
                    {hasWoodenHandrail ? <FiCheck aria-hidden="true" /> : <FiPlus aria-hidden="true" />}
                    <span className="wrap-break-word">Teakwood Handrail Grip</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setHasLaserCutPattern(!hasLaserCutPattern)}
                    className={`rounded-xl border px-3 py-2 sm:px-3.5 sm:py-2.5 text-xs font-semibold transition min-h-10 flex items-center gap-1.5 max-w-full ${hasLaserCutPattern
                      ? "border-orange-500 bg-orange-600 text-white shadow-sm"
                      : "border-slate-200/90 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50"
                      }`}
                  >
                    {hasLaserCutPattern ? <FiCheck aria-hidden="true" /> : <FiPlus aria-hidden="true" />}
                    <span className="wrap-break-word">CNC Laser Cut Design</span>
                  </button>
                </div>
              </div>

            </div>

            {/* Right Live Estimate Summary */}
            <div className="lg:col-span-5 w-full min-w-0">
              <div className="sticky top-28 rounded-3xl border border-orange-200/90 bg-linear-to-b from-orange-50/90 via-white to-white p-4 sm:p-7 lg:p-8 shadow-xl shadow-orange-500/5 w-full min-w-0 overflow-hidden">

                <div className="flex items-center justify-between border-b border-orange-100 pb-3.5 gap-2">
                  <span className="text-xs font-bold uppercase tracking-widest text-slate-500 truncate">
                    Live Estimate Summary
                  </span>
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100 px-2.5 py-0.5 text-[10px] font-bold text-emerald-800 border border-emerald-200 shrink-0">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-600 animate-pulse" />
                    Calculated
                  </span>
                </div>

                {/* Big Price Display */}
                <div className="mt-5 text-center">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    Estimated Budget Range
                  </span>
                  <div className="mt-1 text-xl xs:text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight wrap-break-word">
                    ₹{calculation.lowRange.toLocaleString()} - ₹{calculation.highRange.toLocaleString()}
                  </div>
                  <p className="mt-1.5 text-xs text-orange-700 font-bold bg-orange-100/70 py-1 px-3 rounded-full inline-block border border-orange-200 max-w-full wrap-break-word">
                    ~ ₹{calculation.unitRate.toLocaleString()} per {selectedType.unit.split(" ")[0]} (all inclusive)
                  </p>
                </div>

                {/* Specs List */}
                <div className="mt-5 space-y-2 rounded-2xl border border-slate-200/90 bg-white p-4 text-xs shadow-sm">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Design Type:</span>
                    <span className="font-bold text-slate-900">{selectedType.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Steel Grade:</span>
                    <span className="font-bold text-orange-700">{selectedGrade.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Surface Finish:</span>
                    <span className="font-bold text-slate-900">{selectedFinish.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Quantity:</span>
                    <span className="font-bold text-slate-900">{quantity} {selectedType.unit}</span>
                  </div>
                  {(hasToughenedGlass || hasWoodenHandrail || hasLaserCutPattern) && (
                    <div className="flex justify-between border-t border-slate-100 pt-2 text-orange-700 font-semibold">
                      <span>Add-ons:</span>
                      <span>
                        {[
                          hasToughenedGlass && "Glass",
                          hasWoodenHandrail && "Wood",
                          hasLaserCutPattern && "CNC",
                        ]
                          .filter(Boolean)
                          .join(", ")}
                      </span>
                    </div>
                  )}
                </div>

                {/* What's included */}
                <div className="mt-4 space-y-1 text-[11px] text-slate-600">
                  <p className="flex items-center gap-1.5 font-bold text-slate-800"><FiCheckCircle aria-hidden="true" className="h-4 w-4 text-emerald-600" /> Included in this estimate:</p>
                  <p>• Prime SS raw material & precision laser cutting</p>
                  <p>• High-strength Argon TIG welding with smooth grind</p>
                  <p>• Multi-stage surface polishing & buffing</p>
                  <p>• Complete site installation & hardware fasteners</p>
                </div>

                {/* Action Buttons */}
                <div className="mt-5 space-y-2.5">
                  <button
                    onClick={handleSendWhatsApp}
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#25D366] px-5 py-3.5 text-sm font-bold text-white shadow-md shadow-green-500/20 transition hover:bg-[#20ba59] active:scale-[0.98]"
                  >
                    <FaWhatsapp aria-hidden="true" className="h-5 w-5" />
                    Send Estimate to WhatsApp
                  </button>

                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={handleCopyQuote}
                      className="rounded-xl border border-slate-200 bg-white py-2.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 shadow-sm"
                    >
                      <span className="inline-flex items-center justify-center gap-1.5"><FiCopy aria-hidden="true" className="h-3.5 w-3.5" /> Copy Summary</span>
                    </button>
                    <a
                      href="#contact"
                      className="flex items-center justify-center rounded-xl bg-orange-600 py-2.5 text-xs font-bold text-white transition hover:bg-orange-700 shadow-sm shadow-orange-500/20"
                    >
                      Book Free Site Visit
                    </a>
                  </div>
                </div>

                <p className="mt-3.5 text-center text-[10px] text-slate-500 leading-relaxed">
                  *Indicative estimate based on prevailing market raw steel rates. Exact quote provided upon site inspection.
                </p>

              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}

export default CostEstimator;
