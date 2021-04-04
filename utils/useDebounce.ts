import { useRef, useCallback, useEffect } from 'react';

export default function useDebouncedCallback<T extends any[]>(
  callback: (...args: T) => any,
  delay: number,
  options: { maxWait?: number; leading?: boolean; trailing?: boolean } = {},
): [(...args: T) => void, () => void, () => void] {
  const { maxWait, leading } = options;
  const maxWaitHandler: any = useRef(null);
  const maxWaitArgs: any = useRef<T | []>([]);
  const trailing = options.trailing === undefined ? true : options.trailing;
  const leadingCall = useRef(false);
  const functionTimeoutHandler: any = useRef(null);
  const isComponentUnmounted: any = useRef(false);
  const debouncedFunction = useRef(callback);
  debouncedFunction.current = callback;

  const cancelDebouncedCallback: () => void = useCallback(() => {
    clearTimeout(functionTimeoutHandler.current);
    clearTimeout(maxWaitHandler.current);
    maxWaitHandler.current = null;
    maxWaitArgs.current = [];
    functionTimeoutHandler.current = null;
    leadingCall.current = false;
  }, []);

  useEffect(
    () => () => {
      // we use flag, as we allow to call callPending outside the hook
      isComponentUnmounted.current = true;
    },
    [],
  );

  const debouncedCallback = useCallback(
    (...args: T) => {
      maxWaitArgs.current = args;
      clearTimeout(functionTimeoutHandler.current);

      if (leadingCall.current) {
        leadingCall.current = false;
      }

      if (!functionTimeoutHandler.current && leading && !leadingCall.current) {
        debouncedFunction.current(...args);
        leadingCall.current = true;
      }

      functionTimeoutHandler.current = setTimeout(() => {
        let shouldCallFunction = true;
        if (leading && leadingCall.current) {
          shouldCallFunction = false;
        }
        cancelDebouncedCallback();
        if (!isComponentUnmounted.current && trailing && shouldCallFunction) {
          debouncedFunction.current(...args);
        }
      }, delay);

      if (maxWait && !maxWaitHandler.current && trailing) {
        maxWaitHandler.current = setTimeout(() => {
          const { current } = maxWaitArgs;
          cancelDebouncedCallback();
          if (!isComponentUnmounted.current) {
            debouncedFunction.current.apply(null, current);
          }
        }, maxWait);
      }
    },
    [maxWait, delay, cancelDebouncedCallback, leading, trailing],
  );

  const callPending = useCallback(() => {
    if (!functionTimeoutHandler.current) {
      return;
    }
    debouncedFunction.current.apply(null, maxWaitArgs.current);
    cancelDebouncedCallback();
  }, [cancelDebouncedCallback]);

  return [debouncedCallback, cancelDebouncedCallback, callPending];
}
