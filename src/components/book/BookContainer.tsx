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
  const [dimensions, setDimensions] = useState<{ width: number; height: number }>({ width: 400, height: 600 });
  const [isSinglePage, setIsSinglePage] = useState(true);
  const [isClient, setIsClient] = useState(false);

  const childArray = React.Children.toArray(children);

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
      const shouldBeSinglePage = width < 1100 || aspectRatio < 1.3;
      setIsSinglePage(shouldBeSinglePage);

      const availableWidth = width * 0.9;
      const availableHeight = height * 0.7;
      const pageAspectRatio = 0.7;

      let pageWidth: number;
      let pageHeight: number;

      if (shouldBeSinglePage) {
        pageHeight = availableHeight * 0.95;
        pageWidth = pageHeight * pageAspectRatio;

        if (pageWidth > availableWidth * 0.9) {
          pageWidth = availableWidth * 0.9;
          pageHeight = pageWidth / pageAspectRatio;
        }
      } else {
        pageHeight = availableHeight * 0.95;
        const totalWidth = pageHeight * pageAspectRatio * 2;

        if (totalWidth > availableWidth * 0.95) {
          pageWidth = (availableWidth * 0.95) / 2;
          pageHeight = pageWidth / pageAspectRatio;
        } else {
          pageWidth = pageHeight * pageAspectRatio;
        }
      }

      pageWidth = Math.max(BOOK_CONFIG.minWidth, Math.min(pageWidth, BOOK_CONFIG.maxWidth));
      pageHeight = Math.max(BOOK_CONFIG.minHeight, Math.min(pageHeight, BOOK_CONFIG.maxHeight));

      setDimensions({
        width: Math.floor(pageWidth),
        height: Math.floor(pageHeight)
      });
    };

    calculate();
    window.addEventListener("resize", calculate);
    return () => window.removeEventListener("resize", calculate);
  }, []);

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
      <div className="flex items-center justify-center w-full h-full">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-book-accent mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading book...</p>
        </div>
      </div>
    );
  }

  // Single page mode: simple slide-based navigation
  if (isSinglePage) {
    return (
      <div
        className={cn(
          "book-container flex items-center justify-center w-full h-full",
          className
        )}
      >
        <div
          className="relative overflow-hidden rounded-lg shadow-2xl bg-white"
          style={{
            width: dimensions.width,
            height: dimensions.height,
          }}
        >
          {childArray.map((child, index) => (
            <div
              key={index}
              className={cn(
                "absolute inset-0 transition-all duration-500 ease-in-out",
                index === currentPage
                  ? "opacity-100 translate-x-0"
                  : index < currentPage
                  ? "opacity-0 -translate-x-full"
                  : "opacity-0 translate-x-full"
              )}
            >
              {child}
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Double page mode: use HTMLFlipBook
  return (
    <div
      className={cn(
        "book-container flex items-center justify-center w-full h-full",
        className
      )}
    >
      <HTMLFlipBook
        key={`book-${dimensions.width}-${dimensions.height}`}
        ref={bookRef}
        width={dimensions.width}
        height={dimensions.height}
        size="fixed"
        minWidth={BOOK_CONFIG.minWidth}
        maxWidth={BOOK_CONFIG.maxWidth}
        minHeight={BOOK_CONFIG.minHeight}
        maxHeight={BOOK_CONFIG.maxHeight}
        drawShadow={true}
        flippingTime={BOOK_CONFIG.flippingTime}
        usePortrait={false}
        startPage={0}
        startZIndex={0}
        autoSize={false}
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
