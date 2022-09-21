import { useState } from "react";
import { useEffect } from "react";

function useGetTopics(subject_id) {
  const [data, setData] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const response = await fetch(
        `http://localhost:3500/topics?subject_id=${subject_id}`
      );
      const data = await response.json();

      if (!data.length) return;
      setData(await data);
    };

    (async () => await getData())();
  }, [subject_id]);

  return data;
}

export default useGetTopics;
