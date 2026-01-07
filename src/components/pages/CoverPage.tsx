import React from "react";
import type { PageComponentProps } from "@/types/page";

export default function CoverPage({ content }: PageComponentProps) {
  return (
    <div className="flex flex-col items-center justify-center h-full p-[1em] overflow-hidden bg-gradient-to-br from-book-page to-amber-50">
      <div className="text-center space-y-[0.75em] overflow-hidden">
        <h1 className="text-[2em] font-heading font-bold text-gray-800 leading-tight">
          {content.title as string}
        </h1>

        {typeof content.subtitle === 'string' && (
          <p className="text-[1em] text-gray-600 font-serif italic">
            {content.subtitle}
          </p>
        )}

        <div className="pt-[0.5em]">
          <p className="text-[0.9em] font-serif text-gray-700">
            by
          </p>
          <p className="text-[1.3em] font-heading font-semibold text-gray-800 mt-[0.25em]">
            {content.author as string}
          </p>
        </div>

        {/* Decorative element */}
        <div className="pt-[0.75em]">
          <div className="w-[4em] h-[0.15em] bg-book-accent mx-auto rounded-full"></div>
        </div>
      </div>
    </div>
  );
}
