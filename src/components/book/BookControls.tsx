"use client";

import React from "react";
import { useBookNavigation } from "@/hooks/useBookNavigation";
import { cn } from "@/lib/utils";

interface BookControlsProps {
  className?: string;
}

export default function BookControls({ className }: BookControlsProps) {
  const { currentPage, totalPages, nextPage, previousPage, canGoNext, canGoPrevious, progress } =
    useBookNavigation();

  return (
    <div
      className={cn(
        "fixed bottom-8 left-1/2 -translate-x-1/2",
        "flex items-center gap-4 px-6 py-3",
        "bg-white/90 backdrop-blur-sm rounded-full shadow-lg",
        "border border-gray-200",
        "z-50",
        className
      )}
    >
      {/* Previous Button */}
      <button
        onClick={previousPage}
        disabled={!canGoPrevious}
        className={cn(
          "p-2 rounded-full transition-all",
          "hover:bg-gray-100 active:scale-95",
          "disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-transparent"
        )}
        aria-label="Previous page"
        title="Previous page (Left Arrow)"
      >
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>

      {/* Page Counter */}
      <div className="flex items-center gap-2 min-w-[100px] justify-center">
        <span className="text-sm font-medium text-gray-700">
          Page {currentPage + 1} of {totalPages}
        </span>
      </div>

      {/* Next Button */}
      <button
        onClick={nextPage}
        disabled={!canGoNext}
        className={cn(
          "p-2 rounded-full transition-all",
          "hover:bg-gray-100 active:scale-95",
          "disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-transparent"
        )}
        aria-label="Next page"
        title="Next page (Right Arrow)"
      >
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button>

      {/* Progress Bar */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-200 rounded-full overflow-hidden">
        <div
          className="h-full bg-book-accent transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}
