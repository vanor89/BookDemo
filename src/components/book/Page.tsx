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
          "flex flex-col",
          className
        )}
        data-page-number={pageNumber}
      >
        {children}

        {/* Page number footer */}
        <div className="absolute bottom-4 right-4 text-xs text-gray-400 font-serif">
          {pageNumber > 0 && pageNumber}
        </div>
      </div>
    );
  }
);

Page.displayName = "Page";

export default Page;
