import { useState } from 'react';

export function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(
    JSON.parse(localStorage.getItem(key)) || initialValue
  )

  const setToLocalStorage = (value) => {
    setValue(value);
    localStorage.setItem(key, JSON.stringify(value))
  };

  return [value, setToLocalStorage];
}