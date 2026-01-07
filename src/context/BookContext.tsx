"use client";

import React, { createContext, useContext, useState, useCallback, useEffect } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import type { BookContextType, BookConfig } from "@/types";
import { clamp } from "@/lib/utils";

const BookContext = createContext<BookContextType | undefined>(undefined);

interface BookProviderProps {
  children: React.ReactNode;
  bookConfig: BookConfig | null;
  initialPage?: number;
}

export function BookProvider({ children, bookConfig, initialPage = 0 }: BookProviderProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Get initial page from URL or prop
  const urlPage = searchParams.get("page");
  const startPage = urlPage ? Math.max(0, parseInt(urlPage, 10) - 1) : initialPage;

  const [currentPage, setCurrentPage] = useState(startPage);
  const [isFlippingEnabled, setFlippingEnabled] = useState(true);
  const [interactionMode, setInteractionMode] = useState<"reading" | "interactive">("reading");
  const [orientation, setOrientation] = useState<"portrait" | "landscape">("portrait");
  const [pagesPerView, setPagesPerView] = useState<1 | 2>(1);

  const totalPages = bookConfig?.totalPages ?? 0;

  // Sync URL when page changes
  useEffect(() => {
    const pageNum = currentPage + 1; // 1-based for URL
    const newParams = new URLSearchParams(searchParams.toString());
    newParams.set("page", pageNum.toString());
    router.replace(`${pathname}?${newParams.toString()}`, { scroll: false });
  }, [currentPage, pathname, router, searchParams]);

  // Detect orientation changes
  useEffect(() => {
    const handleResize = () => {
      const isPortrait = window.innerHeight > window.innerWidth;
      setOrientation(isPortrait ? "portrait" : "landscape");
    };

    if (typeof window !== "undefined") {
      handleResize();
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);

  const goToPage = useCallback(
    (page: number) => {
      const clampedPage = clamp(page, 0, totalPages - 1);
      setCurrentPage(clampedPage);
    },
    [totalPages]
  );

  const nextPage = useCallback(() => {
    const increment = pagesPerView;
    if (currentPage < totalPages - 1) {
      setCurrentPage((prev) => Math.min(prev + increment, totalPages - 1));
    }
  }, [currentPage, totalPages, pagesPerView]);

  const previousPage = useCallback(() => {
    const decrement = pagesPerView;
    if (currentPage > 0) {
      setCurrentPage((prev) => Math.max(prev - decrement, 0));
    }
  }, [currentPage, pagesPerView]);

  const toggleInteractionMode = useCallback(() => {
    setInteractionMode((prev) => (prev === "reading" ? "interactive" : "reading"));
    setFlippingEnabled((prev) => !prev);
  }, []);

  const value: BookContextType = {
    currentPage,
    totalPages,
    isFlippingEnabled,
    interactionMode,
    orientation,
    pagesPerView,
    bookConfig,
    goToPage,
    nextPage,
    previousPage,
    toggleInteractionMode,
    setFlippingEnabled,
    setPagesPerView,
  };

  return <BookContext.Provider value={value}>{children}</BookContext.Provider>;
}

export function useBook() {
  const context = useContext(BookContext);
  if (context === undefined) {
    throw new Error("useBook must be used within a BookProvider");
  }
  return context;
}
