import { useEffect, RefObject } from "react";

export function useSyncedHeight(
  refA: RefObject<HTMLElement | null>,
  refB: RefObject<HTMLElement | null>
) {
  useEffect(() => {
    const a = refA.current;
    const b = refB.current;
    if (!a || !b) return;

    let syncing = false;
    const observer = new ResizeObserver((entries) => {
      if (syncing) return;
      const target = entries[0].target as HTMLElement;
      const other = target === a ? b : a;
      syncing = true;
      other.style.height = `${target.offsetHeight}px`;
      requestAnimationFrame(() => {
        syncing = false;
      });
    });

    observer.observe(a);
    observer.observe(b);
    return () => observer.disconnect();
  }, [refA, refB]);
}
