'use client';
import { useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

/**
 * Modal dialog: moves focus inside on open, keeps Tab within it, closes on Escape or backdrop click,
 * locks page scroll, and returns focus to whatever opened it.
 */
export default function ProjectDialog({
  open,
  title,
  eyebrow,
  onClose,
  children,
}: {
  open: boolean;
  title: string;
  eyebrow: string;
  onClose: () => void;
  children: React.ReactNode;
}) {
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const opener = document.activeElement as HTMLElement | null;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
        return;
      }
      if (e.key !== 'Tab' || !panelRef.current) return;
      const focusables = panelRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
      );
      if (!focusables.length) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
      opener?.focus();
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 md:p-10" role="dialog" aria-modal="true" aria-labelledby="dialog-title">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-ink/70 backdrop-blur-[2px]"
            onClick={onClose}
          />
          <motion.div
            ref={panelRef}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="w-full max-w-5xl bg-paper text-ink rounded-sm relative z-10 flex flex-col overflow-y-auto max-h-[92vh] shadow-2xl p-5 sm:p-8 md:p-10 gap-6"
          >
            <button
              ref={closeRef}
              type="button"
              onClick={onClose}
              className="press absolute top-4 right-4 z-10 font-mono text-xs uppercase tracking-wider text-muted hover:text-accent px-2 py-1"
            >
              Close ✕
            </button>
            <div>
              <p className="font-mono text-xs uppercase tracking-wider text-accent mb-2 pr-20">{eyebrow}</p>
              <h3 id="dialog-title" className="font-serif text-3xl md:text-5xl tracking-tight leading-tight pr-20">
                {title}
              </h3>
            </div>
            {children}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
