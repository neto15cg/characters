import { useRef, useState, useCallback, useEffect } from 'react';

interface IntersectionObserverInit {
  root?: Element | null;
  rootMargin?: string;
  threshold?: number | number[];
  startVisible?: boolean;
}
type IntersectionObserverHookRefCallbackNode = Element | null;

type IntersectionObserverHookRefCallback = (node: IntersectionObserverHookRefCallbackNode) => void;

type IntersectionObserverHookResult = [
  IntersectionObserverHookRefCallback,
  { entry: IntersectionObserverEntry | undefined },
];

const DEFAULT_ROOT = null;
const DEFAULT_ROOT_MARGIN = '0px';
const DEFAULT_THRESHOLD = [0];

function Observer({
  root = DEFAULT_ROOT,
  rootMargin = DEFAULT_ROOT_MARGIN,
  threshold = DEFAULT_THRESHOLD,
}: IntersectionObserverInit = {}): IntersectionObserverHookResult {
  const observerRef = useRef<IntersectionObserver | null>(null);
  const [entry, setEntry] = useState<IntersectionObserverEntry>();

  useEffect(
    () => () => {
      const observer = observerRef.current;
      if (observer) {
        observer.disconnect();
      }
    },
    [],
  );

  const refCallback = useCallback(
    (node: IntersectionObserverHookRefCallbackNode) => {
      function getObserver() {
        if (!observerRef.current) {
          observerRef.current = new IntersectionObserver(
            ([entry]) => {
              setEntry(entry);
            },
            { root, rootMargin, threshold },
          );
        }
        return observerRef.current;
      }

      const observer = getObserver();
      observer.disconnect();
      if (node) {
        observer.observe(node);
      }
    },
    [root, rootMargin, threshold],
  );

  return [refCallback, { entry }];
}

export type TrackVisibilityResult = [IntersectionObserverHookRefCallback, { isVisible?: boolean }];

export function useIntersectionObserver(props?: IntersectionObserverInit): TrackVisibilityResult {
  const [ref, { entry }] = Observer(props);
  const isVisible = entry?.isIntersecting ?? props?.startVisible;
  return [ref, { isVisible }];
}
