export interface BookConfig {
  id: string;
  title: string;
  author: string;
  description: string;
  coverImage: string;
  totalPages: number;
  version: string;
  replaceable: boolean;
  metadata: {
    genre?: string;
    publicDomain?: boolean;
    copyright?: string;
    [key: string]: unknown;
  };
}

export interface BookState {
  currentPage: number;
  totalPages: number;
  isFlippingEnabled: boolean;
  interactionMode: "reading" | "interactive";
  orientation: "portrait" | "landscape";
}

export interface BookContextType extends BookState {
  bookConfig: BookConfig | null;
  goToPage: (page: number) => void;
  nextPage: () => void;
  previousPage: () => void;
  toggleInteractionMode: () => void;
  setFlippingEnabled: (enabled: boolean) => void;
}
