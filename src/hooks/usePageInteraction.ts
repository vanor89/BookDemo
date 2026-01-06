"use client";

import { useState, useCallback } from "react";
import { useBook } from "@/context/BookContext";

export function usePageInteraction() {
  const { interactionMode, toggleInteractionMode, setFlippingEnabled } = useBook();
  const [activeInteraction, setActiveInteraction] = useState<string | null>(null);

  const startInteraction = useCallback(
    (interactionId: string) => {
      setActiveInteraction(interactionId);
      if (interactionMode === "reading") {
        setFlippingEnabled(false);
      }
    },
    [interactionMode, setFlippingEnabled]
  );

  const endInteraction = useCallback(() => {
    setActiveInteraction(null);
    if (interactionMode === "reading") {
      setFlippingEnabled(true);
    }
  }, [interactionMode, setFlippingEnabled]);

  return {
    interactionMode,
    toggleInteractionMode,
    activeInteraction,
    startInteraction,
    endInteraction,
    isInteracting: activeInteraction !== null,
  };
}
