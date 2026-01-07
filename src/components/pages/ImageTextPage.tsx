import React from "react";
import type { PageComponentProps } from "@/types/page";

export default function ImageTextPage({ content }: PageComponentProps) {
  return (
    <div className="flex flex-col h-full p-[0.75em] gap-[0.5em] overflow-hidden">
      {/* Image Section - takes about 55% of space */}
      <div className="flex-[55] min-h-0 flex items-center justify-center bg-gray-100 rounded overflow-hidden">
        {content.image ? (
          <img
            src={content.image as string}
            alt={content.title as string || "Page illustration"}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="text-center p-[0.5em]">
            <p className="text-gray-400 italic text-[0.8em]">Image</p>
          </div>
        )}
      </div>

      {/* Text Section - takes about 45% of space */}
      <div className="flex-[45] min-h-0 overflow-auto">
        {content.title && (
          <h2 className="text-[1.2em] font-heading font-bold text-gray-800 mb-[0.3em]">
            {content.title}
          </h2>
        )}

        <div className="font-serif text-gray-700 leading-snug text-[0.95em]">
          {content.text?.split('\n').map((paragraph, index) => (
            <p key={index} className="mb-[0.4em]">
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}
