"use client";

import { useSyncExternalStore } from "react";

/**
 * Subscribes to a media query.
 *
 * Uses useSyncExternalStore so the server snapshot is explicit rather than
 * guessed: SSR always returns false, meaning components fall back to their
 * small-screen layout during server render and correct themselves on mount.
 * That direction is deliberate. A mobile layout briefly shown on desktop is
 * harmless, whereas a pinned desktop layout shown on a phone is broken.
 */
export function useMediaQuery(query: string) {
  return useSyncExternalStore(
    (onChange) => {
      const mql = window.matchMedia(query);
      mql.addEventListener("change", onChange);
      return () => mql.removeEventListener("change", onChange);
    },
    () => window.matchMedia(query).matches,
    () => false,
  );
}
