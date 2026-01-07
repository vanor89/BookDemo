import React from "react";
import type { PageComponentProps } from "@/types/page";

export default function CoverPage({ content }: PageComponentProps) {
  return (
    <div className="flex flex-col items-center justify-center h-full p-[1em] overflow-hidden bg-gradient-to-br from-book-page to-amber-50">
      <div className="text-center space-y-[1em] overflow-hidden">
        <h1 className="text-[2em] font-heading font-bold text-gray-800 leading-tight line-clamp-3">
          {content.title as string}
        </h1>

        {typeof content.subtitle === 'string' && (
          <p className="text-[1em] text-gray-600 font-serif italic line-clamp-2">
            {content.subtitle}
          </p>
        )}

        <div className="pt-[0.75em]">
          <p className="text-[0.9em] font-serif text-gray-700">
            by
          </p>
          <p className="text-[1.3em] font-heading font-semibold text-gray-800 mt-[0.3em] line-clamp-1">
            {content.author as string}
          </p>
        </div>

        {/* Decorative element */}
        <div className="pt-[1em]">
          <div className="w-[5em] h-[0.2em] bg-book-accent mx-auto rounded-full"></div>
        </div>
      </div>
    </div>
  );
}
