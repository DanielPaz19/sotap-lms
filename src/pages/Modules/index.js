import { useEffect } from "react";
import { useState } from "react";
import BreadCrumb from "../../components/Breadcrumb";
import { Accordion, ListGroup } from "react-bootstrap";
import { FiFileText } from "react-icons/fi";
import useGetAssignments from "../../customHooks/useGetAssignments";
import useGetQuizes from "../../customHooks/useGetQuizes";
import useGetExams from "../../customHooks/useGetExams";
import useGetSubjectById from "../../customHooks/useGetSubjectById";
import { FaEye } from "react-icons/fa";
import TopicAccordionItem from "../../components/TopicAccordion";
import { useParams } from "react-router-dom";
import { useReducer } from "react";
import topicReducer, { initialState } from "../../context/topicReducer";
import { API_URL } from "../../config";

function ModuleList({ title, type }) {
  return (
    <ListGroup.Item
      action
      variant="light d-flex justify-content-between align-items-center"
    >
      <div>
        <span className="me-2 fs-4">
          <FiFileText />
        </span>
        {title}
      </div>
      <span className="fs-6 text-secondary" title="Topic Viewed">
        {type === "topic" && <FaEye />}
      </span>
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

function Modules({ user }) {
  const [subject, setSubject] = useState({});
  const [state, dispatch] = useReducer(topicReducer, initialState);
  const { id: subject_id } = useParams();

  useEffect(() => {
    getTopics(subject_id);
    getSubjectDetails(subject_id);
  }, [subject_id]);

  const getTopics = async (subject_id) => {
    dispatch({ type: "REQUESTED" });
    const res = await fetch(API_URL + `/subjects/${subject_id}/topics`, {
      credentials: "include",
    });

    const { data } = await res.json();
    dispatch({ type: "UPDATE_DATA", payload: { key: "topics", value: data } });
  };

  const getSubjectDetails = async (subject_id) => {
    dispatch({ type: "REQUESTED" });
    const res = await fetch(API_URL + `/subjects/${subject_id}`, {
      credentials: "include",
    });

    const { data } = await res.json();
    setSubject(data);
    dispatch({ type: "END_REQUEST" });
  };

  // Set Breadcrumbs Item and link
  const path = [
    { title: "Modules", link: "/modules" },
    {
      title: `${subject?.subject_code}: ${subject?.subject_name}`,
      link: `/modules/${subject?.id}`,
    },
  ];

  return (
    <>
      <BreadCrumb paths={path} />
      <div className="container px-md-5 px-0 pb-4">
        <Accordion defaultActiveKey={["0", "1", "2", "3"]} alwaysOpen>
          <div className="row g-md-4 g-3">
            <TopicAccordionItem eventKey={"0"} topics={state?.topics} />
            <ModulesAccordionItems header={"Assignments"} eventKey={"1"}>
              {useGetAssignments(subject?.id).map((assignment) => (
                <ModuleList title={assignment.title} key={assignment.id} />
              ))}
            </ModulesAccordionItems>
            <ModulesAccordionItems header={"Quizes"} eventKey={"2"}>
              {useGetQuizes(subject?.id).map((quiz) => (
                <ModuleList title={quiz.title} key={quiz.id} />
              ))}
            </ModulesAccordionItems>
            <ModulesAccordionItems header={"Exams"} eventKey={"3"}>
              {useGetExams(subject?.id).map((exam) => (
                <ModuleList title={exam.title} key={exam.id} />
              ))}
            </ModulesAccordionItems>
          </div>
        </Accordion>
      </div>
    </>
  );
}

export default Modules;
