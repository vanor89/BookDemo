import React from "react";
import type { PageComponentProps } from "@/types/page";

export default function CoverPage({ content }: PageComponentProps) {
  return (
    <div className="flex flex-col items-center justify-center h-full p-8 bg-gradient-to-br from-book-page to-amber-50">
      <div className="text-center space-y-8">
        <h1 className="text-4xl md:text-5xl font-heading font-bold text-gray-800 leading-tight">
          {content.title}
        </h1>

        {content.subtitle && (
          <p className="text-lg md:text-xl text-gray-600 font-serif italic">
            {content.subtitle}
          </p>
        )}

        <div className="pt-8">
          <p className="text-xl font-serif text-gray-700">
            by
          </p>
          <p className="text-2xl md:text-3xl font-heading font-semibold text-gray-800 mt-2">
            {content.author}
          </p>
        </div>

        {/* Decorative element */}
        <div className="pt-12">
          <div className="w-24 h-1 bg-book-accent mx-auto rounded-full"></div>
        </div>
      </div>
    </div>
  );
}
