import { useState, useEffect } from "react";

function useGetTopicById() {
  const [data, setData] = useState([]);

  const parseId = () => {
    const arrPath = window.location.pathname
      .split("/")
      .filter((arr) => arr !== "");

    return Number(arrPath.at(-1));
  };

  useEffect(() => {
    const getData = async (id) => {
      try {
        const response = await fetch(`http://localhost:3500/topics?id=${id}`);
        const data = await response.json();

        if (!data.length) return;

        setData(await data);
      } catch (error) {
        console.log(error);
      }
    };

    (async () => await getData(parseId()))();
  }, []);

  return data[0];
}

export default useGetTopicById;
