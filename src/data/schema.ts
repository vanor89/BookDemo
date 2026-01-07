import type { BookConfig } from "@/types/book";
import type { PageData } from "@/types/page";

export const SCHEMA_VERSION = "1.0.0";

export interface Book {
  config: BookConfig;
  pages: PageData[];
}

// Re-export types for convenience
export type { BookConfig, PageData };
