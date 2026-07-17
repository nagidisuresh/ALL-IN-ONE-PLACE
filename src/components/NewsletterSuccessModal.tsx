import React, { useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Check, Sparkles, Mail } from "lucide-react";
import { useLanguage } from "./LanguageProvider";
import { useTheme } from "./ThemeProvider";
import confetti from "canvas-confetti";

interface NewsletterSuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  email: string;
}

export default function NewsletterSuccessModal({
  isOpen,
  onClose,
  email,
}: NewsletterSuccessModalProps) {
  const { t } = useLanguage();
  const { theme } = useTheme();

  useEffect(() => {
    if (isOpen) {
      // Trigger a multi-burst confetti celebration!
      const duration = 2.5 * 1000;
      const animationEnd = Date.now() + duration;
      const defaults = { startVelocity: 25, spread: 360, ticks: 50, zIndex: 9999 };

      const randomInRange = (min: number, max: number) => {
        return Math.random() * (max - min) + min;
      };

      const interval = setInterval(() => {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
          return clearInterval(interval);
        }

        const particleCount = 45 * (timeLeft / duration);

        // burst from the left and right sides
        confetti({
          ...defaults,
          particleCount,
          origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
        });
        confetti({
          ...defaults,
          particleCount,
          origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
        });
      }, 250);

      return () => clearInterval(interval);
    }
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-md cursor-pointer"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: "spring", duration: 0.5, bounce: 0.3 }}
            className={`relative w-full max-w-md overflow-hidden rounded-3xl p-8 text-center shadow-2xl transition-all border ${
              theme === "light"
                ? "bg-white border-slate-100 text-slate-800"
                : "bg-[#0c0c16] border-white/10 text-white"
            }`}
          >
            {/* Background Accent glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-48 bg-pink-500/10 rounded-full blur-3xl pointer-events-none" />

            {/* Close Button */}
            <button
              onClick={onClose}
              className={`absolute top-4 right-4 rounded-full p-1.5 transition-colors cursor-pointer ${
                theme === "light"
                  ? "text-slate-400 hover:bg-slate-100 hover:text-slate-800"
                  : "text-gray-400 hover:bg-white/5 hover:text-white"
              }`}
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Celebration Icon with Success Animation */}
            <div className="relative mx-auto mb-6 flex h-20 w-20 items-center justify-center">
              {/* Outer rotating pulse ring */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 rounded-full border border-dashed border-pink-500/40"
              />

              {/* Inner glowing circle */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: [0, 1.1, 1] }}
                transition={{ delay: 0.1, duration: 0.5 }}
                className="absolute inset-1.5 rounded-full bg-gradient-to-tr from-pink-500 to-purple-600 shadow-lg shadow-pink-500/20 flex items-center justify-center text-white"
              >
                <Check className="w-8 h-8 stroke-[3]" />
              </motion.div>

              {/* Float sparkles */}
              <motion.div
                animate={{ y: [0, -6, 0], opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-1 -right-1 text-yellow-400"
              >
                <Sparkles className="w-5 h-5 fill-yellow-400/20" />
              </motion.div>

              <motion.div
                animate={{ y: [0, 6, 0], opacity: [0.5, 0.9, 0.5] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                className="absolute -bottom-1 -left-1 text-pink-400"
              >
                <Sparkles className="w-4 h-4 fill-pink-400/20" />
              </motion.div>
            </div>

            {/* Modal Title */}
            <motion.h3
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className={`text-xl md:text-2xl font-bold tracking-tight font-display mb-3 ${
                theme === "light" ? "text-slate-900" : "text-white"
              }`}
            >
              {t("newsletterModalTitle")}
            </motion.h3>

            {/* Modal Description */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className={`text-sm leading-relaxed mb-6 ${
                theme === "light" ? "text-slate-600" : "text-gray-400"
              }`}
            >
              {t("newsletterModalSubtitle")}
            </motion.p>

            {/* Subscribed Email Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-2xl text-xs font-mono mb-8 border ${
                theme === "light"
                  ? "bg-slate-50 border-slate-200 text-slate-700"
                  : "bg-white/[0.02] border-white/5 text-pink-300"
              }`}
            >
              <Mail className="w-4 h-4 text-pink-500 shrink-0" />
              <span className="truncate max-w-[200px] font-bold">{email}</span>
            </motion.div>

            {/* Close / Action Button */}
            <motion.button
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              onClick={onClose}
              className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:opacity-95 text-white text-sm font-bold py-3.5 px-6 rounded-2xl shadow-lg shadow-pink-500/25 cursor-pointer transform active:scale-[0.98] transition-all"
            >
              {t("newsletterModalClose")}
            </motion.button>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
