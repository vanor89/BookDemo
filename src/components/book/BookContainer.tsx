"use client";

import React, { useRef, useEffect, useState } from "react";
import HTMLFlipBook from "react-pageflip";
import { useBook } from "@/context/BookContext";
import { useIsMobile } from "@/hooks/useMediaQuery";
import { BOOK_CONFIG } from "@/lib/constants";
import { cn } from "@/lib/utils";

interface BookContainerProps {
  children: React.ReactNode;
  className?: string;
}

export default function BookContainer({ children, className }: BookContainerProps) {
  const { currentPage, goToPage, isFlippingEnabled, orientation } = useBook();
  const bookRef = useRef<any>(null);
  const isMobile = useIsMobile();
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  // Calculate responsive dimensions
  useEffect(() => {
    const calculateDimensions = () => {
      const windowWidth = window.innerWidth;
      const windowHeight = window.innerHeight;

      let width = windowWidth * 0.8;
      let height = windowHeight * 0.8;

      // Clamp to min/max values
      width = Math.min(Math.max(width, BOOK_CONFIG.minWidth), BOOK_CONFIG.maxWidth);
      height = Math.min(Math.max(height, BOOK_CONFIG.minHeight), BOOK_CONFIG.maxHeight);

      // Mobile: use single page, smaller size
      if (isMobile) {
        width = Math.min(windowWidth * 0.95, 500);
        height = windowHeight * 0.7;
      }

      setDimensions({ width: Math.floor(width), height: Math.floor(height) });
    };

    calculateDimensions();
    window.addEventListener("resize", calculateDimensions);

    return () => window.removeEventListener("resize", calculateDimensions);
  }, [isMobile]);

  // Sync page changes from context to book
  useEffect(() => {
    if (bookRef.current && bookRef.current.pageFlip) {
      const currentBookPage = bookRef.current.pageFlip().getCurrentPageIndex();
      if (currentBookPage !== currentPage) {
        bookRef.current.pageFlip().flip(currentPage);
      }
    }
  }, [currentPage]);

  const handleFlip = (e: any) => {
    const newPage = e.data;
    if (newPage !== currentPage) {
      goToPage(newPage);
    }
  };

  if (dimensions.width === 0 || dimensions.height === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-book-accent mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading book...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={cn("book-container flex items-center justify-center", className)}>
      <HTMLFlipBook
        ref={bookRef}
        width={isMobile ? dimensions.width : dimensions.width / 2}
        height={dimensions.height}
        size={isMobile ? "fixed" : "stretch"}
        minWidth={BOOK_CONFIG.minWidth}
        maxWidth={BOOK_CONFIG.maxWidth}
        minHeight={BOOK_CONFIG.minHeight}
        maxHeight={BOOK_CONFIG.maxHeight}
        drawShadow={true}
        flippingTime={BOOK_CONFIG.flippingTime}
        usePortrait={isMobile}
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
