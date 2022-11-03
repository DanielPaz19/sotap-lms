// import { useState } from "react";
// import { useEffect } from "react";

function useGetAssignments(subject_id) {
  // const [data, setData] = useState([]);

  // useEffect(() => {
  //   const getTopics = async () => {
  //     const response = await fetch(
  //       `http://localhost:3500/assignments?subject_id=${subject_id}`
  //     );
  //     const data = await response.json();

  //     if (!data.length) return;
  //     setData(await data);
  //   };

  //   (async () => await getTopics())();
  // }, [subject_id]);

  // return data;
  return [];
}

export default useGetAssignments;
