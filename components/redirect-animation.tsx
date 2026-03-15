"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const REDIRECT_URL = "https://links.arcab.com.br";
const REDIRECT_DELAY_MS = 1500;
const FALLBACK_LINK_DELAY_MS = 2000;
const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;
const REDIRECT_LABEL = "Redirecionando";

export function RedirectAnimation() {
  const [showFallbackLink, setShowFallbackLink] = useState(false);

  useEffect(() => {
    const redirectTimer = window.setTimeout(() => {
      window.location.href = REDIRECT_URL;
    }, REDIRECT_DELAY_MS);

    const fallbackTimer = window.setTimeout(() => {
      setShowFallbackLink(true);
    }, FALLBACK_LINK_DELAY_MS);

    return () => {
      window.clearTimeout(redirectTimer);
      window.clearTimeout(fallbackTimer);
    };
  }, []);

  return (
    <main className="relative flex min-h-dvh items-center justify-center overflow-hidden bg-eco-dark px-6 py-12 text-eco-base">
      <div
        aria-hidden
        className="absolute inset-0 bg-[linear-gradient(to_right,#fafaf9_1px,transparent_1px),linear-gradient(to_bottom,#fafaf9_1px,transparent_1px)] bg-size-[36px_36px] opacity-[0.08]"
      />

      <div className="relative z-10 flex w-full max-w-sm flex-col items-center gap-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE_OUT_EXPO }}
        >
          <Image
            src="/assets/secondary-logo.svg"
            alt="ARCAB"
            width={212}
            height={56}
            priority
            className="h-auto w-46 brightness-0 invert md:w-53"
          />
        </motion.div>

        <motion.p
          role="status"
          aria-live="polite"
          aria-label={REDIRECT_LABEL}
          className="font-mono text-xs uppercase tracking-[0.18em] text-eco-base/80"
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.1, ease: EASE_OUT_EXPO }}
        >
          <span className="inline-flex items-end">
            <span className="inline-block pr-1 align-bottom">{REDIRECT_LABEL}</span>
            <motion.span
              aria-hidden
              className="ml-0.5 inline-block h-3 w-px bg-eco-base/70"
              animate={{ opacity: [1, 0, 1] }}
              transition={{ duration: 0.55, repeat: Infinity, ease: "easeInOut" }}
            />
          </span>
        </motion.p>

        <motion.div
          className="h-px w-44 overflow-hidden bg-eco-base/30"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.35, delay: 0.15 }}
        >
          <motion.div
            className="h-full origin-left bg-eco-accent"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.35, delay: 0.15, ease: EASE_OUT_EXPO }}
          />
        </motion.div>

        <motion.a
          href={REDIRECT_URL}
          className="font-mono text-[0.68rem] tracking-[0.16em] text-eco-base/55 transition-colors duration-200 hover:text-eco-base"
          initial={{ opacity: 0, y: 4 }}
          animate={showFallbackLink ? { opacity: 1, y: 0 } : { opacity: 0, y: 4 }}
          transition={{ duration: 0.35, ease: EASE_OUT_EXPO }}
          aria-hidden={!showFallbackLink}
          tabIndex={showFallbackLink ? 0 : -1}
        >
          Se não redirecionar, toque aqui
        </motion.a>
      </div>
    </main>
  );
}
