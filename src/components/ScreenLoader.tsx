"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

const SESSION_KEY = "nt_intro_played";

export default function ScreenLoader() {
  const [visible, setVisible] = useState(false);
  const [checked, setChecked] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    let alreadyPlayed = true;
    try {
      alreadyPlayed = window.sessionStorage.getItem(SESSION_KEY) === "1";
    } catch {
      alreadyPlayed = false;
    }

    if (alreadyPlayed) {
      setVisible(false);
      setChecked(true);
      return;
    }

    setVisible(true);
    setChecked(true);

    const duration = prefersReducedMotion ? 400 : 1900;
    const timer = window.setTimeout(() => {
      setVisible(false);
      try {
        window.sessionStorage.setItem(SESSION_KEY, "1");
      } catch {
        // ignore
      }
    }, duration);

    return () => window.clearTimeout(timer);
  }, [prefersReducedMotion]);

  if (!checked) return null;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[200] flex items-center justify-center bg-[#FBF6EC]"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }}
        >
          <motion.div
            initial={{ opacity: 1, scale: 1 }}
            exit={{ scale: 1.06, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }}
            className="flex flex-col items-center gap-5"
          >
            <svg
              viewBox="0 0 64 64"
              width="76"
              height="76"
              role="img"
              aria-label="Necessary Treasures"
            >
              <motion.circle
                cx="32"
                cy="32"
                r="29"
                fill="none"
                stroke="#3A2F28"
                strokeWidth="1.4"
                initial={{ pathLength: 0, opacity: 0.4 }}
                animate={{ pathLength: 1, opacity: 0.9 }}
                transition={{ duration: 1.1, ease: "easeInOut" }}
              />
              <motion.path
                d="M18 44 L18 20 L30 40 L30 20"
                fill="none"
                stroke="#3A2F28"
                strokeWidth="3.1"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.9, delay: 0.35, ease: "easeInOut" }}
              />
              <motion.path
                d="M34 20 L48 20 M41 20 L41 44"
                fill="none"
                stroke="#3A2F28"
                strokeWidth="3.1"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.9, delay: 0.55, ease: "easeInOut" }}
              />
              <motion.circle
                cx="49"
                cy="16"
                r="2.6"
                fill="#C1613F"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 1.1 }}
              />
            </svg>
            <motion.p
              className="font-serif italic text-lg tracking-wide text-[#3A2F28]"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.15 }}
            >
              Necessary Treasures
            </motion.p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
