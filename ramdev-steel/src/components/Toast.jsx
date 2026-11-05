import { useEffect } from "react";
import { FiCheckCircle, FiInfo, FiX } from "react-icons/fi";

function Toast({ message, type = "success", onClose, duration = 3000 }) {
  useEffect(() => {
    if (!message) return;
    const timer = setTimeout(() => {
      onClose();
    }, duration);
    return () => clearTimeout(timer);
  }, [message, duration, onClose]);

  if (!message) return null;

  return (
    <div className="fixed bottom-24 right-4 sm:bottom-6 sm:right-6 z-120 max-w-[calc(100vw-2rem)] flex items-center gap-3 rounded-2xl border border-slate-800 bg-slate-950/95 px-4 sm:px-5 py-3 text-white shadow-2xl backdrop-blur-md transition-all duration-300">
      <div className="flex h-7 w-7 sm:h-8 sm:w-8 shrink-0 items-center justify-center rounded-full bg-orange-500/20 text-orange-400">
        {type === "success" ? (
          <FiCheckCircle className="h-4 w-4 sm:h-5 sm:w-5" />
        ) : (
          <FiInfo className="h-4 w-4 sm:h-5 sm:w-5" />
        )}
      </div>
      <p className="text-xs sm:text-sm font-medium text-slate-200">{message}</p>
      <button
        onClick={onClose}
        className="ml-2 text-slate-400 hover:text-white transition"
        aria-label="Close notification"
      >
        <FiX className="h-4 w-4" />
      </button>
    </div>
  );
}

export default Toast;
