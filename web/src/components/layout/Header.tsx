"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronDown, Menu } from "lucide-react";
import { navigation } from "@/data/mock/navigation";
import { Logo } from "./Logo";
import { Button } from "@/components/ui/Button";
import { MegaMenu } from "@/components/navigation/MegaMenu";
import { MobileMenu } from "@/components/navigation/MobileMenu";
import { cn } from "@/lib/utils";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const reduce = useReducedMotion();
  const pathname = usePathname();

  // Close any open menu on route change. Resetting transient menu UI when the
  // router navigates is an intentional external-system sync (e.g. browser back).
  useEffect(() => {
    /* eslint-disable react-hooks/set-state-in-effect */
    setOpenMenu(null);
    setMobileOpen(false);
    /* eslint-enable react-hooks/set-state-in-effect */
  }, [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // ESC + outside click close the mega menu.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenMenu(null);
    };
    const onClick = (e: MouseEvent) => {
      if (headerRef.current && !headerRef.current.contains(e.target as Node)) {
        setOpenMenu(null);
      }
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("mousedown", onClick);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("mousedown", onClick);
    };
  }, []);

  const scheduleClose = useCallback(() => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setOpenMenu(null), 140);
  }, []);

  const cancelClose = useCallback(() => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
  }, []);

  const activeItem = navigation.find((i) => i.label === openMenu && i.groups);

  return (
    <>
      <header
      ref={headerRef}
      className={cn(
        "sticky top-0 z-50 w-full bg-paper/85 backdrop-blur-md transition-shadow",
        scrolled || openMenu ? "border-b border-line shadow-sm" : "border-b border-transparent",
      )}
      onMouseLeave={scheduleClose}
      onMouseEnter={cancelClose}
    >
      <div className="container-page flex h-16 items-center justify-between gap-4">
        <Logo />

        {/* Desktop nav */}
        <nav className="hidden items-center lg:flex" aria-label="Primary">
          <ul className="flex items-center">
            {navigation.map((item) => {
              const hasMenu = !!item.groups;
              const isOpen = openMenu === item.label;
              if (!hasMenu) {
                return (
                  <li key={item.label}>
                    <Link
                      href={item.href ?? "#"}
                      className="inline-flex h-16 items-center px-3.5 text-sm font-medium text-ink-muted hover:text-ink"
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              }
              return (
                <li key={item.label}>
                  <button
                    aria-expanded={isOpen}
                    aria-haspopup="true"
                    onMouseEnter={() => {
                      cancelClose();
                      setOpenMenu(item.label);
                    }}
                    onClick={() => setOpenMenu(isOpen ? null : item.label)}
                    className={cn(
                      "inline-flex h-16 items-center gap-1 px-3.5 text-sm font-medium transition-colors",
                      isOpen ? "text-ink" : "text-ink-muted hover:text-ink",
                    )}
                  >
                    {item.label}
                    <ChevronDown className={cn("size-3.5 transition-transform", isOpen && "rotate-180")} />
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Right actions */}
        <div className="flex items-center gap-2">
          <Link
            href="/ai-training/expert-network"
            className="hidden text-sm font-medium text-ink-muted hover:text-ink xl:inline-flex"
          >
            Expert network
          </Link>
          <Button href="/contact" size="sm" className="hidden sm:inline-flex" withArrow>
            Book a demo
          </Button>
          <button
            className="rounded-md p-2 text-ink hover:bg-surface lg:hidden"
            aria-label="Open menu"
            onClick={() => setMobileOpen(true)}
          >
            <Menu className="size-6" />
          </button>
        </div>
      </div>

      {/* Desktop mega panel */}
      <AnimatePresence>
        {activeItem ? (
          <motion.div
            key={activeItem.label}
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: -6 }}
            transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-x-0 top-16 hidden border-b border-line bg-paper shadow-lg lg:block"
            onMouseEnter={cancelClose}
            onMouseLeave={scheduleClose}
          >
            <MegaMenu item={activeItem} onNavigate={() => setOpenMenu(null)} />
          </motion.div>
        ) : null}
      </AnimatePresence>
      </header>

      {/* Rendered outside <header> so its `fixed inset-0` resolves against the
          viewport, not the header's backdrop-filter containing block. */}
      <MobileMenu open={mobileOpen} onClose={() => setMobileOpen(false)} items={navigation} />
    </>
  );
}
