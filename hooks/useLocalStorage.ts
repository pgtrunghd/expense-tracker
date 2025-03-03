"use client";

import { Dispatch, SetStateAction, useEffect, useState } from "react";

const useLocalStorage = <T>(
  key: string,
  initialValue: T,
): [T, Dispatch<SetStateAction<T>>] => {
  const [state, setState] = useState(initialValue);

  useEffect(() => {
    try {
      const value = window.localStorage.getItem(key);
      if (value) {
        setState(JSON.parse(value));
      }
    } catch (error) {
      console.log(error);
    }
  }, [key]);

  const setValue = <T>(value: T): void => {
    try {
      const valueToStore = value instanceof Function ? value(state) : value;
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
      setState(valueToStore);
    } catch (error) {
      console.log(error);
    }
  };

  return [state, setValue];
};

export default useLocalStorage;
