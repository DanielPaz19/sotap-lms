import { useEffect } from "react";
import { useState } from "react";
import BreadCrumb from "../../components/Breadcrumb";

function Modules() {
  const [subject, setSubject] = useState({});

  const parseSubjectId = () => {
    const arrPath = window.location.pathname
      .split("/")
      .filter((arr) => arr !== "");

    return Number(arrPath.at(-1));
  };

  useEffect(() => {
    const getSubjectById = async (id) => {
      try {
        const response = await fetch(`http://localhost:3500/subjects?id=${id}`);
        const data = await response.json();
        setSubject(await data[0]);
        console.log(data[0]);
      } catch (error) {
        console.log(error);
      }
    };

    (async () => await getSubjectById(parseSubjectId()))();
  }, []);

  // Set Breadcrumbs Item and link
  const path = [
    { title: "Modules", link: "modules" },
    { title: subject?.title, link: `modules/${subject?.id}` },
  ];

  return (
    <>
      <BreadCrumb paths={path} />
    </>
  );
}

export default Modules;
