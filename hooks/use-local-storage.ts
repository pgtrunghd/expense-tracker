const isFunction = (value: any): value is Function =>
  typeof value === "function";

const dispatchStorageEvent = (key: string, newValue: string | null) =>
  window.dispatchEvent(new StorageEvent("storage", { key, newValue }));

const getLocalStorageItem = (key: string) => window.localStorage.getItem(key);

const setLocalStorageItem = <T>(key: string, value: T) => {
  const stringifiedValue = JSON.stringify(value);
  window.localStorage.setItem(key, stringifiedValue);
  dispatchStorageEvent(key, stringifiedValue);
};

const removeLocalStorageItem = (key: string) => {
  window.localStorage.removeItem(key);
  dispatchStorageEvent(key, null);
};

export const useLocalStorage = <T>(key: string, initialValue: T) => {};
