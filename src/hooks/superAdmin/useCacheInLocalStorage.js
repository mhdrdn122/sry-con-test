/**
 * Custom hook to cache data in localStorage
 * - Retrieves cached data on initial render
 * - Updates cache when data changes
 * - Handles JSON parsing/serialization automatically
 * - Manages loading states
**/

import { useEffect } from "react";

const useCacheInLocalStorage = (data, keyName, setData, setLoadingData) => {
  useEffect(() => {
    const cached = localStorage.getItem(keyName);

    if (cached) {
      try {
        const parsedData = JSON.parse(cached);
        setData(parsedData);
        setLoadingData(false);
      } catch (e) {
        console.error("خطأ في تحويل البيانات المخزنة:", e);
        localStorage.removeItem(keyName);
      }
    }

    if (data) {
      localStorage.setItem(keyName, JSON.stringify(data));
    }
  }, []);

  useEffect(() => {
    if (data) {
      localStorage.setItem(keyName, JSON.stringify(data));
      setData(data);
      setLoadingData(false);
    }
  }, [data]);
};

export default useCacheInLocalStorage;
