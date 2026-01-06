"use client";

import { useEffect, useCallback } from "react";
import { useBook } from "@/context/BookContext";

export function useBookNavigation() {
  const { currentPage, totalPages, nextPage, previousPage, goToPage, isFlippingEnabled } = useBook();

  const handleKeyPress = useCallback(
    (event: KeyboardEvent) => {
      if (!isFlippingEnabled) return;

      switch (event.key) {
        case "ArrowRight":
        case "PageDown":
          event.preventDefault();
          nextPage();
          break;
        case "ArrowLeft":
        case "PageUp":
          event.preventDefault();
          previousPage();
          break;
        case "Home":
          event.preventDefault();
          goToPage(0);
          break;
        case "End":
          event.preventDefault();
          goToPage(totalPages - 1);
          break;
      }
    },
    [isFlippingEnabled, nextPage, previousPage, goToPage, totalPages]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [handleKeyPress]);

  return {
    currentPage,
    totalPages,
    nextPage,
    previousPage,
    goToPage,
    canGoNext: currentPage < totalPages - 1,
    canGoPrevious: currentPage > 0,
    progress: totalPages > 0 ? ((currentPage + 1) / totalPages) * 100 : 0,
  };
}
