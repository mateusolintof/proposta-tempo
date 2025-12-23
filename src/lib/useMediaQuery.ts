"use client";

import { useSyncExternalStore } from "react";

export function useMediaQuery(query: string) {
  return useSyncExternalStore(
    (onStoreChange) => {
      if (typeof window === "undefined") return () => {};
      const mediaQueryList = window.matchMedia(query);
      const handleChange = () => onStoreChange();

      if (mediaQueryList.addEventListener) {
        mediaQueryList.addEventListener("change", handleChange);
      } else {
        mediaQueryList.addListener(handleChange);
      }

      return () => {
        if (mediaQueryList.removeEventListener) {
          mediaQueryList.removeEventListener("change", handleChange);
        } else {
          mediaQueryList.removeListener(handleChange);
        }
      };
    },
    () => {
      if (typeof window === "undefined") return false;
      return window.matchMedia(query).matches;
    },
    () => false
  );
}
