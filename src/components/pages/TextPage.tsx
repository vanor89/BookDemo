import React from "react";
import type { PageComponentProps } from "@/types/page";

export default function TextPage({ content }: PageComponentProps) {
  return (
    <div className="flex flex-col justify-center h-full p-8 md:p-12">
      <div className="max-w-prose mx-auto">
        {content.title && (
          <h2 className="text-2xl md:text-3xl font-heading font-bold text-gray-800 mb-6">
            {content.title}
          </h2>
        )}

        <div className="prose prose-lg font-serif text-gray-700 leading-relaxed">
          {content.text?.split('\n').map((paragraph, index) => (
            <p key={index} className="mb-4 text-justify">
              {paragraph}
            </p>
          ))}
        </div>

        {content.illustration && (
          <div className="mt-6 text-center">
            <div className="inline-block p-4 bg-gray-100 rounded-lg">
              <p className="text-sm text-gray-500 italic">
                [Illustration placeholder]
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
