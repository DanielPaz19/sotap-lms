import { useEffect } from "react";
import { useState } from "react";

function useGetStudentTopicData(topic_id, student_id) {
  const [data, setData] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const response = await fetch(
        `http://localhost:3500/student_topics?topic_id=${topic_id}&student_id=${student_id}`
      );
      const data = await response.json();

      if (!data.length) return;

      return setData(data[0]);
    };

    (async () => getData())();
  });

  return data;
}

export default useGetStudentTopicData;
