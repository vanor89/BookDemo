"use client";

import React, { createContext, useContext, useState, useCallback, useEffect } from "react";
import type { BookContextType, BookConfig } from "@/types";
import { clamp } from "@/lib/utils";

const BookContext = createContext<BookContextType | undefined>(undefined);

interface BookProviderProps {
  children: React.ReactNode;
  bookConfig: BookConfig | null;
  initialPage?: number;
}

export function BookProvider({ children, bookConfig, initialPage = 0 }: BookProviderProps) {
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [isFlippingEnabled, setFlippingEnabled] = useState(true);
  const [interactionMode, setInteractionMode] = useState<"reading" | "interactive">("reading");
  const [orientation, setOrientation] = useState<"portrait" | "landscape">("portrait");

  const totalPages = bookConfig?.totalPages ?? 0;

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
    if (currentPage < totalPages - 1) {
      setCurrentPage((prev) => prev + 1);
    }
  }, [currentPage, totalPages]);

  const previousPage = useCallback(() => {
    if (currentPage > 0) {
      setCurrentPage((prev) => prev - 1);
    }
  }, [currentPage]);

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
    bookConfig,
    goToPage,
    nextPage,
    previousPage,
    toggleInteractionMode,
    setFlippingEnabled,
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
