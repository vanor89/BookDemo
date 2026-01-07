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
  const [isSinglePage, setIsSinglePage] = useState(true);
  const [isClient, setIsClient] = useState(false);

  // Set client flag on mount
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Determine single vs double page mode based on screen size
  useEffect(() => {
    if (typeof window === "undefined") return;

    const updatePageMode = () => {
      const width = window.innerWidth;
      const aspectRatio = width / window.innerHeight;

      // Double page when landscape (aspect ratio >= 1.3) and wide enough (>= 640px)
      const shouldBeSinglePage = !(aspectRatio >= 1.3 && width >= 640);
      setIsSinglePage(shouldBeSinglePage);
    };

    updatePageMode();
    window.addEventListener("resize", updatePageMode);
    window.addEventListener("orientationchange", updatePageMode);

    return () => {
      window.removeEventListener("resize", updatePageMode);
      window.removeEventListener("orientationchange", updatePageMode);
    };
  }, []);

  // Update pagesPerView in context when isSinglePage changes
  useEffect(() => {
    setPagesPerView(isSinglePage ? 1 : 2);
  }, [isSinglePage, setPagesPerView]);

  // Sync page changes from context to book
  useEffect(() => {
    if (bookRef.current?.pageFlip) {
      const pageFlip = bookRef.current.pageFlip();
      if (pageFlip?.getCurrentPageIndex) {
        const currentBookPage = pageFlip.getCurrentPageIndex();
        if (currentBookPage !== currentPage) {
          pageFlip.flip(currentPage);
        }
      }
    }
  }, [currentPage]);

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

  return (
    <div
      className={cn(
        "book-container flex items-center justify-center w-full h-full overflow-hidden",
        className
      )}
    >
      <HTMLFlipBook
        key={`book-${isSinglePage ? "single" : "double"}`}
        ref={bookRef}
        width={300}
        height={400}
        size="stretch"
        minWidth={100}
        maxWidth={1000}
        minHeight={140}
        maxHeight={1400}
        drawShadow={true}
        flippingTime={BOOK_CONFIG.flippingTime}
        usePortrait={isSinglePage}
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
