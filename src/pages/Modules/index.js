import { useEffect } from "react";
import { useState } from "react";
import BreadCrumb from "../../components/Breadcrumb";
import { Accordion, ListGroup } from "react-bootstrap";
import { FiFileText } from "react-icons/fi";

function ModuleList({ title }) {
  return (
    <ListGroup.Item action variant="light">
      <span className="me-2 fs-4">
        <FiFileText />
      </span>
      {title}
    </ListGroup.Item>
  );
}

function ModulesAccordionItems({ children, header, eventKey }) {
  return (
    <div className="col-12  ">
      <Accordion.Item eventKey={eventKey}>
        <Accordion.Header>{header}</Accordion.Header>
        <Accordion.Body className="px-2">
          <ListGroup variant="flush">{children}</ListGroup>
        </Accordion.Body>
      </Accordion.Item>
    </div>
  );
}

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
      <div className="container px-md-5 px-0">
        <Accordion defaultActiveKey={["0", "1", "2", "3"]} alwaysOpen>
          <div className="row g-md-4 g-3">
            <ModulesAccordionItems header={"Topics"} eventKey={"0"}>
              <ModuleList title={"Sample Topic 1"} />
              <ModuleList title={"Sample Topic 2"} />
              <ModuleList title={"Sample Topic 3"} />
              <ModuleList title={"Sample Topic 4"} />
            </ModulesAccordionItems>
            <ModulesAccordionItems header={"Assignments"} eventKey={"1"}>
              <ModuleList title={"Sample Assignment 1"} />
              <ModuleList title={"Sample Assignment 2"} />
              <ModuleList title={"Sample Assignment 3"} />
              <ModuleList title={"Sample Assignment 4"} />
            </ModulesAccordionItems>
            <ModulesAccordionItems header={"Quizes"} eventKey={"2"}>
              <ModuleList title={"Sample Quizes 1"} />
              <ModuleList title={"Sample Quizes 2"} />
              <ModuleList title={"Sample Quizes 3"} />
              <ModuleList title={"Sample Quizes 4"} />
            </ModulesAccordionItems>
            <ModulesAccordionItems header={"Exams"} eventKey={"3"}>
              <ModuleList title={"Sample Exams 1"} />
              <ModuleList title={"Sample Exams 2"} />
              <ModuleList title={"Sample Exams 3"} />
              <ModuleList title={"Sample Exams 4"} />
            </ModulesAccordionItems>
          </div>
        </Accordion>
      </div>
    </>
  );
}

export default Modules;
