import exp from "constants";
import {useCallback, useEffect, useState} from "react";

const useQuestList = () => {
  const [questList, setQuestList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const API_URL = '/api/getQuestList';  // 올바른 API URL을 사용하세요

  const fetchQuestList = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(API_URL, {
        method: 'GET',
        cache: "no-store"
      });


      if (!response.ok) {
        throw new Error('Failed to fetch quest list');
      }

      const data = await response.json();
      setQuestList(data);
    } catch (error: any) {
      console.error('Error:', error);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchQuestList();
    const intervalId = setInterval(fetchQuestList, 60000); // 60초마다 갱신

    return () => clearInterval(intervalId);
  }, [fetchQuestList]);

  return { questList, isLoading, error, fetchQuestList };
};

export default useQuestList;