import exp from "constants";
import {useEffect, useState} from "react";

const useQuestList = () => {
  const [questList, setQuestList] = useState([]);

  const API_URL = '/api/getQuestList';  // 여기에 올바른 API URL을 넣으세요



  const fetchQuestList = async () => {
    try {
      const response = await fetch(API_URL, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        setQuestList(data); // 데이터를 상태에 저장
      } else {
        alert('Failed');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }


  useEffect(() => {
    fetchQuestList();
  }, []);


  return questList
}


export default useQuestList