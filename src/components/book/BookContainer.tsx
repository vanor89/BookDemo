"use client";

import React, { useRef, useEffect, useState } from "react";
import HTMLFlipBook from "react-pageflip";
import { useBook } from "@/context/BookContext";
import { BOOK_CONFIG } from "@/lib/constants";
import { cn } from "@/lib/utils";

interface BookContainerProps {
  children: React.ReactNode;
  className?: string;
}

export default function BookContainer({ children, className }: BookContainerProps) {
  const { currentPage, goToPage, isFlippingEnabled, setPagesPerView } = useBook();
  const bookRef = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState<{ width: number; height: number }>({ width: 400, height: 600 });
  const [isSinglePage, setIsSinglePage] = useState(true);
  const [isClient, setIsClient] = useState(false);


  // Set client flag on mount
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Update pagesPerView in context when isSinglePage changes
  useEffect(() => {
    setPagesPerView(isSinglePage ? 1 : 2);
  }, [isSinglePage, setPagesPerView]);

  // Calculate dimensions and determine single/double page mode
  useEffect(() => {
    if (typeof window === "undefined") return;

    const calculate = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      const aspectRatio = width / height;

      // Determine single vs double page
      const isLandscape = aspectRatio >= 1.3;
      const isWideEnoughForDouble = width >= 640;
      const shouldBeSinglePage = !(isLandscape && isWideEnoughForDouble);

      setIsSinglePage(shouldBeSinglePage);

      // Get actual container dimensions if available
      let availableWidth: number;
      let availableHeight: number;

      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        availableWidth = rect.width - 16; // small padding
        availableHeight = rect.height - 16;
      } else {
        // Fallback: estimate based on viewport
        const headerHeight = 50;
        const footerHeight = height < 350 ? 0 : 60;
        availableWidth = width - 32;
        availableHeight = height - headerHeight - footerHeight - 32;
      }

      const pageAspectRatio = 0.7; // width/height ratio

      let pageWidth: number;
      let pageHeight: number;

      if (shouldBeSinglePage) {
        // Start with max height that fits
        pageHeight = availableHeight;
        pageWidth = pageHeight * pageAspectRatio;

        // If too wide, constrain by width
        if (pageWidth > availableWidth) {
          pageWidth = availableWidth;
          pageHeight = pageWidth / pageAspectRatio;
        }
      } else {
        // Double page: need to fit 2 pages side by side
        pageHeight = availableHeight;
        const totalWidthNeeded = pageHeight * pageAspectRatio * 2;

        // If total width exceeds available, constrain by width
        if (totalWidthNeeded > availableWidth) {
          pageWidth = availableWidth / 2;
          pageHeight = pageWidth / pageAspectRatio;
        } else {
          pageWidth = pageHeight * pageAspectRatio;
        }
      }

      // Ensure positive dimensions
      pageWidth = Math.max(100, pageWidth);
      pageHeight = Math.max(140, pageHeight);

      setDimensions({
        width: Math.floor(pageWidth),
        height: Math.floor(pageHeight)
      });
    };

    // Initial calculation
    calculate();

    // Recalculate after a brief delay to ensure container is rendered
    const timeoutId = setTimeout(calculate, 100);

    // Recalculate on resize
    window.addEventListener("resize", calculate);
    window.addEventListener("orientationchange", calculate);

    // Use ResizeObserver for container size changes
    let resizeObserver: ResizeObserver | null = null;
    if (containerRef.current) {
      resizeObserver = new ResizeObserver(calculate);
      resizeObserver.observe(containerRef.current);
    }

    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener("resize", calculate);
      window.removeEventListener("orientationchange", calculate);
      resizeObserver?.disconnect();
    };
  }, [isClient]); // Re-run when client is ready

  // Sync page changes from context to book (only for double-page mode)
  useEffect(() => {
    if (!isSinglePage && bookRef.current?.pageFlip) {
      const pageFlip = bookRef.current.pageFlip();
      if (pageFlip && typeof pageFlip.getCurrentPageIndex === 'function') {
        const currentBookPage = pageFlip.getCurrentPageIndex();
        if (currentBookPage !== currentPage) {
          pageFlip.flip(currentPage);
        }
      }
    }
  }, [currentPage, isSinglePage]);

  const handleFlip = (e: any) => {
    const newPage = e.data;
    if (newPage !== currentPage) {
      goToPage(newPage);
    }
  };

  if (!isClient) {
    return (
      <div ref={containerRef} className="flex items-center justify-center w-full h-full">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-book-accent mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading book...</p>
        </div>
      </div>
    );
  }

  // Single page mode: use HTMLFlipBook in portrait mode
  if (isSinglePage) {
    return (
      <div
        ref={containerRef}
        className={cn(
          "book-container flex items-center justify-center w-full h-full overflow-hidden",
          className
        )}
      >
        <HTMLFlipBook
          key={`book-single-${dimensions.width}-${dimensions.height}`}
          ref={bookRef}
          width={dimensions.width}
          height={dimensions.height}
          size="stretch"
          minWidth={100}
          maxWidth={800}
          minHeight={140}
          maxHeight={1200}
          drawShadow={true}
          flippingTime={BOOK_CONFIG.flippingTime}
          usePortrait={true}
          startPage={0}
          startZIndex={0}
          autoSize={true}
          maxShadowOpacity={BOOK_CONFIG.maxShadowOpacity}
          showCover={true}
          mobileScrollSupport={true}
          onFlip={handleFlip}
          className="shadow-book"
          style={{}}
          clickEventForward={true}
          useMouseEvents={true}
          swipeDistance={BOOK_CONFIG.swipeDistance}
          showPageCorners={true}
          disableFlipByClick={!isFlippingEnabled}
        >
          {children}
        </HTMLFlipBook>
      </div>
    );
  }

  // Double page mode: use HTMLFlipBook
  return (
    <div
      ref={containerRef}
      className={cn(
        "book-container flex items-center justify-center w-full h-full overflow-hidden",
        className
      )}
    >
      <HTMLFlipBook
        key={`book-double-${dimensions.width}-${dimensions.height}`}
        ref={bookRef}
        width={dimensions.width}
        height={dimensions.height}
        size="stretch"
        minWidth={100}
        maxWidth={800}
        minHeight={140}
        maxHeight={1200}
        drawShadow={true}
        flippingTime={BOOK_CONFIG.flippingTime}
        usePortrait={false}
        startPage={0}
        startZIndex={0}
        autoSize={true}
        maxShadowOpacity={BOOK_CONFIG.maxShadowOpacity}
        showCover={true}
        mobileScrollSupport={true}
        onFlip={handleFlip}
        className="shadow-book"
        style={{}}
        clickEventForward={true}
        useMouseEvents={true}
        swipeDistance={BOOK_CONFIG.swipeDistance}
        showPageCorners={true}
        disableFlipByClick={!isFlippingEnabled}
      >
        {children}
      </HTMLFlipBook>
    </div>
  );
}
