"use client";

import { useEffect, useState } from "react";

interface PersistedStore {
  persist: {
    hasHydrated: () => boolean;
    onFinishHydration: (callback: () => void) => () => void;
  };
}

export function useHasHydrated(store: PersistedStore) {
  const [hydrated, setHydrated] = useState(() => store.persist.hasHydrated());

  useEffect(() => {
    if (hydrated) return;
    return store.persist.onFinishHydration(() => setHydrated(true));
  }, [store, hydrated]);

  return hydrated;
}
