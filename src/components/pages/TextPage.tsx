import React from "react";
import type { PageComponentProps } from "@/types/page";

export default function TextPage({ content }: PageComponentProps) {
  return (
    <div className="flex flex-col h-full p-[0.75em] overflow-hidden">
      <div className="flex-1 min-h-0 overflow-auto">
        {content.title && (
          <h2 className="text-[1.4em] font-heading font-bold text-gray-800 mb-[0.5em]">
            {content.title}
          </h2>
        )}

        <div className="font-serif text-gray-700 leading-relaxed text-[1em]">
          {content.text?.split('\n').map((paragraph, index) => (
            <p key={index} className="mb-[0.5em] text-justify">
              {paragraph}
            </p>
          ))}
        </div>

        {content.illustration && (
          <div className="mt-[0.75em] text-center">
            <div className="inline-block p-[0.5em] bg-gray-100 rounded-lg">
              <p className="text-[0.7em] text-gray-500 italic">
                [Illustration]
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
