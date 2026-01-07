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

  // Set client flag and determine page mode on mount
  useEffect(() => {
    setIsClient(true);

    const updatePageMode = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      const isLandscape = width > height;
      const isWideEnough = width >= 640;

      // Double page only when: landscape AND wide enough
      // Single page (portrait mode) for everything else
      const shouldBeDoublePage = isLandscape && isWideEnough;
      setIsSinglePage(!shouldBeDoublePage);
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
      <div
        className="h-full flex items-center justify-center"
        style={{
          width: isSinglePage ? 'min(100%, 500px)' : '100%',
          maxWidth: '100%'
        }}
      >
        <HTMLFlipBook
          key={`book-${isSinglePage ? "portrait" : "landscape"}`}
          ref={bookRef}
          width={isSinglePage ? 300 : 400}
          height={isSinglePage ? 450 : 500}
          size={isSinglePage ? "fixed" : "stretch"}
          minWidth={100}
          maxWidth={isSinglePage ? 500 : 1000}
          minHeight={140}
          maxHeight={1400}
          drawShadow={true}
          flippingTime={BOOK_CONFIG.flippingTime}
          usePortrait={isSinglePage}
          startPage={0}
          startZIndex={0}
          autoSize={!isSinglePage}
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
    </div>
  );
}
