"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const REDIRECT_URL = "https://links.arcab.com.br";
const REDIRECT_DELAY_MS = 1500;
const FALLBACK_LINK_DELAY_MS = 2000;
const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;
const REDIRECT_LABEL = "Redirecionando...";
const TYPEWRITER_TARGET_WIDTH_CH = REDIRECT_LABEL.length + 6;

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
      <motion.div
        aria-hidden
        className="absolute inset-0"
        initial={{ opacity: 0.2 }}
        animate={{ opacity: [0.16, 0.24, 0.16] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-eco-primary/20 blur-3xl" />
        <div className="absolute left-1/2 top-1/2 h-88 w-88 -translate-x-1/2 -translate-y-1/2 rounded-full bg-eco-accent/10 blur-3xl" />
      </motion.div>

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
            <motion.span
              className="inline-block overflow-hidden whitespace-nowrap pr-1 align-bottom"
              initial={{ width: 0 }}
              animate={{ width: `${TYPEWRITER_TARGET_WIDTH_CH}ch` }}
              transition={{ duration: 0.45, delay: 0.12, ease: "linear" }}
            >
              {REDIRECT_LABEL}
            </motion.span>
            <motion.span
              aria-hidden
              className="ml-0.5 inline-block h-3 w-px bg-eco-base/70"
              animate={{ opacity: [1, 0, 1] }}
              transition={{ duration: 0.55, repeat: Infinity, ease: "easeInOut" }}
            />
          </span>
        </motion.p>

        <motion.div
          className="h-1 w-40 overflow-hidden rounded-full bg-eco-base/20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.35, delay: 0.15 }}
        >
          <motion.div
            className="h-full origin-left rounded-full bg-linear-to-r from-eco-primary to-eco-accent"
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
          Se nao redirecionar, toque aqui
        </motion.a>
      </div>
    </main>
  );
}
