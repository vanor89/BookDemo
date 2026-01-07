import React, { forwardRef } from "react";
import { cn } from "@/lib/utils";

interface PageProps {
  pageNumber: number;
  children: React.ReactNode;
  className?: string;
}

const Page = forwardRef<HTMLDivElement, PageProps>(
  ({ pageNumber, children, className }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "book-page",
          "relative w-full h-full overflow-hidden",
          "bg-book-page",
          className
        )}
        data-page-number={pageNumber}
      >
        {/* Scalable content wrapper */}
        <div className="w-full h-full flex flex-col page-content-scale">
          {children}
        </div>

        {/* Page number footer */}
        <div className="absolute bottom-2 right-2 text-[0.6em] text-gray-400 font-serif">
          {pageNumber > 0 && pageNumber}
        </div>
      </div>
    );
  }
);

Page.displayName = "Page";

export default Page;
