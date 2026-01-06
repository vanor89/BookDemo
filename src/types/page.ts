import { ReactNode } from "react";

export type PageType =
  | "cover"
  | "text"
  | "image-text"
  | "full-image"
  | "interactive"
  | "video"
  | "custom";

export interface PageContent {
  [key: string]: unknown;
  title?: string;
  text?: string;
  image?: string;
  illustration?: string;
}

export interface InteractiveElement {
  type: "button" | "link" | "form" | "video" | "custom";
  id: string;
  content: Record<string, unknown>;
}

export interface PageData {
  pageNumber: number;
  type: PageType;
  template: string;
  content: PageContent;
  interactive?: InteractiveElement[];
}

export interface PageComponentProps {
  pageNumber: number;
  content: PageContent;
  interactive?: InteractiveElement[];
}

export interface PageRef {
  pageNumber: number;
  element: HTMLDivElement | null;
}
