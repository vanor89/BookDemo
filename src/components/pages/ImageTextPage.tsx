import React from "react";
import type { PageComponentProps } from "@/types/page";

export default function ImageTextPage({ content }: PageComponentProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-full p-6 md:p-8">
      {/* Image Section */}
      <div className="flex items-center justify-center bg-gray-100 rounded-lg">
        {content.image ? (
          <img
            src={content.image as string}
            alt={content.title as string || "Page illustration"}
            className="w-full h-full object-cover rounded-lg"
          />
        ) : (
          <div className="text-center p-8">
            <p className="text-gray-400 italic">Image placeholder</p>
          </div>
        )}
      </div>

      {/* Text Section */}
      <div className="flex flex-col justify-center">
        {content.title && (
          <h2 className="text-2xl font-heading font-bold text-gray-800 mb-4">
            {content.title}
          </h2>
        )}

        <div className="prose font-serif text-gray-700 leading-relaxed">
          {content.text?.split('\n').map((paragraph, index) => (
            <p key={index} className="mb-3">
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}
