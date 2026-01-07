"use client";

import { useState, useEffect } from "react";

export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const media = window.matchMedia(query);

    // Set initial value
    setMatches(media.matches);

    // Create event listener
    const listener = (e: MediaQueryListEvent) => setMatches(e.matches);

    // Add listener
    media.addEventListener("change", listener);

    // Cleanup
    return () => media.removeEventListener("change", listener);
  }, [query]);

  return matches;
}

export function useIsMobile(): boolean {
  return useMediaQuery("(max-width: 768px)");
}

export function useIsTablet(): boolean {
  return useMediaQuery("(min-width: 768px) and (max-width: 1024px)");
}

export function useIsDesktop(): boolean {
  return useMediaQuery("(min-width: 1024px)");
}

/**
 * Determines if the book should show single page view based on:
 * - Screen width (mobile always single page)
 * - Aspect ratio (portrait orientation prefers single page)
 * - Available space for comfortable two-page display
 */
export function useSinglePageView(): boolean {
  const [isSinglePage, setIsSinglePage] = useState(true);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const checkSinglePageView = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      const aspectRatio = width / height;

      // Mobile: always single page (under 768px width)
      if (width < 768) {
        setIsSinglePage(true);
        return;
      }

      // Portrait or near-square orientation: single page
      // (when height is greater than or close to width)
      if (aspectRatio < 1.3) {
        setIsSinglePage(true);
        return;
      }

      // Tablet in landscape but narrow: single page
      if (width < 1100) {
        setIsSinglePage(true);
        return;
      }

      // Wide landscape screens: two pages
      setIsSinglePage(false);
    };

    // Run immediately
    checkSinglePageView();

    // Listen for resize
    window.addEventListener("resize", checkSinglePageView);

    // Also listen for orientation change on mobile
    window.addEventListener("orientationchange", checkSinglePageView);

    return () => {
      window.removeEventListener("resize", checkSinglePageView);
      window.removeEventListener("orientationchange", checkSinglePageView);
    };
  }, []);

  return isSinglePage;
}

