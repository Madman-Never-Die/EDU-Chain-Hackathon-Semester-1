import { useCallback, useEffect, useState } from "react";

const useQuestList = () => {
  const [questList, setQuestList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const API_URL = '/api/getQuestList';

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

  const updateQuestParticipation = useCallback(async (questId: number) => {
    try {
      const response = await fetch(`/api/quests/${questId}/participate`, {
        method: 'POST',
        cache: "no-store"
      });

      if (!response.ok) {
        throw new Error('Failed to update quest participation');
      }

      const updatedQuest = await response.json();

      setQuestList((prevList: any) =>
          prevList.map((quest: any) =>
              quest.id === questId ? { ...quest, participation: updatedQuest.participation } : quest
          )
      );

      return updatedQuest;
    } catch (error: any) {
      console.error('Error updating quest participation:', error);
      setError(error.message);
      throw error;
    }
  }, []);

  useEffect(() => {
    fetchQuestList();
    const intervalId = setInterval(fetchQuestList, 60000); // 60초마다 갱신

    return () => clearInterval(intervalId);
  }, [fetchQuestList]);

  return { questList, setQuestList, isLoading, error, fetchQuestList, updateQuestParticipation };
};

export default useQuestList;