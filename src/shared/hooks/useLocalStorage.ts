import { useState, useEffect } from 'react';

export function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, (value: T | ((val: T) => T)) => void] {
  // State для хранения значения
  // Инициализируем из localStorage или используем initialValue
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      // Пытаемся получить из localStorage
      const item = window.localStorage.getItem(key);

      // Если есть - парсим JSON, иначе возвращаем initialValue
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      // Если ошибка парсинга - возвращаем initialValue
      console.error(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  // Функция для обновления значения
  const setValue = (value: T | ((val: T) => T)) => {
    try {
      // Поддерживаем функциональные обновления (как useState)
      // value может быть значением или функцией
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;

      // Сохраняем в state
      setStoredValue(valueToStore);

      // Сохраняем в localStorage
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      // Обрабатываем QuotaExceededError и другие ошибки
      console.error(`Error setting localStorage key "${key}":`, error);
    }
  };

  // Синхронизация между вкладками
  useEffect(() => {
    // Обработчик события storage (срабатывает в других вкладках)
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === key && e.newValue !== null) {
        try {
          setStoredValue(JSON.parse(e.newValue));
        } catch (error) {
          console.error(`Error parsing storage event for key "${key}":`, error);
        }
      }
    };

    // Подписываемся на события storage
    window.addEventListener('storage', handleStorageChange);

    // Cleanup: отписываемся при размонтировании
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [key]);

  return [storedValue, setValue];
}
