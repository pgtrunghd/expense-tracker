"use client";

import { useCallback, useEffect, useSyncExternalStore } from "react";

const isFunction = (value: any): value is Function =>
  typeof value === "function";

const dispatchStorageEvent = (key: string, newValue: string | null) =>
  window.dispatchEvent(new StorageEvent("storage", { key, newValue }));

export const getLocalStorageItem = (key: string) =>
  window.localStorage.getItem(key);

const setLocalStorageItem = <T>(key: string, value: T) => {
  const stringifiedValue = JSON.stringify(value);
  window.localStorage.setItem(key, stringifiedValue);
  dispatchStorageEvent(key, stringifiedValue);
};

const removeLocalStorageItem = (key: string) => {
  window.localStorage.removeItem(key);
  dispatchStorageEvent(key, null);
};

export const localStorageSubscribe = (cb: () => void) => {
  window.addEventListener("storage", cb);
  return () => window.removeEventListener("storage", cb);
};

export const useLocalStorage = <T>(key: string, initialValue: T) => {
  const getSnapShot = () => getLocalStorageItem(key);
  const store = useSyncExternalStore(localStorageSubscribe, getSnapShot);

  const setState = useCallback(
    (v: T) => {
      try {
        let nextState: T;
        if (isFunction(v)) {
          const parsedStore = store ? JSON.parse(store) : null;
          nextState = v(parsedStore ?? initialValue);
        } else {
          nextState = v;
        }

        if (nextState === undefined || nextState === null) {
          removeLocalStorageItem(key);
        } else {
          setLocalStorageItem(key, nextState);
        }
      } catch (error) {
        console.log(error);
      }
    },
    [key, store, initialValue],
  );

  useEffect(() => {
    if (
      getLocalStorageItem(key) === null &&
      typeof initialValue !== "undefined"
    ) {
      setLocalStorageItem(key, initialValue);
    }
  }, [key, initialValue]);

  return {
    current: store ? JSON.parse(store) : initialValue,
    setItemValue: setState,
    removeItem: () => removeLocalStorageItem(key),
  };
};
