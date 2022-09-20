import { useState, useEffect } from "react";

function useGetSubjectById(subject_id = null) {
  const [data, setData] = useState({});

  const parseId = () => {
    const arrPath = window.location.pathname
      .split("/")
      .filter((arr) => arr !== "");

    return Number(arrPath.at(-1));
  };

  const id = subject_id || parseId();

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await fetch(`http://localhost:3500/subjects?id=${id}`);
        const data = await response.json();

        if (!data.length) return;

        setData(await data);
      } catch (error) {
        console.log(error);
      }
    };

    (async () => await getData(parseId()))();
  }, [id]);

  return data[0];
}

export default useGetSubjectById;
