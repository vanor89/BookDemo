"use client";

import React from "react";
import { BookProvider } from "@/context/BookContext";
import BookContainer from "@/components/book/BookContainer";
import BookControls from "@/components/book/BookControls";
import PageRenderer from "@/components/book/PageRenderer";
import type { BookConfig, PageData } from "@/types";
import Link from "next/link";

// Import book data
import bookConfig from "@/data/books/peter-rabbit/config.json";
import pagesData from "@/data/books/peter-rabbit/pages.json";

export default function BookPage() {
  const config = bookConfig as BookConfig;
  const pages = pagesData as PageData[];

  if (!config || !pages || pages.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Error Loading Book</h1>
          <p className="text-gray-600 mb-4">Unable to load book data</p>
          <Link
            href="/"
            className="text-book-accent hover:underline"
          >
            Return to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <BookProvider bookConfig={config} initialPage={0}>
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
        {/* Header */}
        <header className="fixed top-0 left-0 right-0 z-40 bg-white/80 backdrop-blur-sm border-b border-gray-200">
          <div className="container mx-auto px-4 py-3 flex items-center justify-between">
            <Link
              href="/"
              className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
            >
              ← Back to Home
            </Link>
            <h1 className="text-lg font-heading font-semibold text-gray-800">
              {config.title}
            </h1>
            <div className="w-24"></div> {/* Spacer for centering */}
          </div>
        </header>

        {/* Main Book Container */}
        <main className="pt-20 pb-32">
          <BookContainer>
            {pages.map((pageData) => (
              <PageRenderer key={pageData.pageNumber} pageData={pageData} />
            ))}
          </BookContainer>
        </main>

        {/* Navigation Controls */}
        <BookControls />
      </div>
    </BookProvider>
  );
}
