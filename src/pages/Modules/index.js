import { useEffect } from "react";
import { useState } from "react";
import BreadCrumb from "../../components/Breadcrumb";
import { Accordion, ListGroup } from "react-bootstrap";
import { FiFileText } from "react-icons/fi";
import useGetTopics from "../../customHooks/useGetTopics";
import useGetAssignments from "../../customHooks/useGetAssignments";
import useGetQuizes from "../../customHooks/useGetQuizes";
import useGetExams from "../../customHooks/useGetExams";
import { Link } from "react-router-dom";
import useGetSubjectById from "../../customHooks/useGetSubjectById";
import { FaEye, FaPlay, FaCheck } from "react-icons/fa";
import useGetStudentTopicData from "../../customHooks/useGetStudentTopicData";

function TopicStatus({ topic_id, user_id }) {
  const topicStatus = useGetStudentTopicData(topic_id, user_id);

  console.log(topicStatus.status);

  switch (topicStatus.status) {
    case "viewed":
      return (
        <span className="fs-5 text-secondary" title="Topic Viewed">
          <FaEye />
        </span>
      );
    case "played":
      return (
        <span className="fs-5 text-warning" title="Topic Viewed">
          <FaPlay />
        </span>
      );
    case "done":
      return (
        <span className="fs-5 text-success" title="Topic Viewed">
          <FaCheck />
        </span>
      );

    default:
      break;
  }
}

function TopicAccordionItem({ eventKey, subjectId, user_id }) {
  return (
    <div className="col-12  ">
      <Accordion.Item eventKey={eventKey}>
        <Accordion.Header>Topics</Accordion.Header>
        <Accordion.Body className="px-2">
          <ListGroup variant="flush">
            {useGetTopics(subjectId).map((topic) => (
              <Link to={`/modules/topic/${topic.id}`}>
                <ListGroup.Item
                  action
                  variant="light d-flex justify-content-between align-items-center"
                >
                  <div>
                    <span className="me-2 fs-4">
                      <FiFileText />
                    </span>
                    {topic.title}
                  </div>
                  <TopicStatus topic_id={topic.id} user_id={user_id} />
                </ListGroup.Item>
              </Link>
            ))}
          </ListGroup>
        </Accordion.Body>
      </Accordion.Item>
    </div>
  );
}

function ModuleList({ title, type, key, user }) {
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
      <span className="fs-5 text-secondary" title="Topic Viewed">
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

  const data = useGetSubjectById();

  useEffect(() => setSubject(data), [data]);

  // Set Breadcrumbs Item and link
  const path = [
    { title: "Modules", link: "/modules" },
    { title: subject?.title, link: `/modules/${subject?.id}` },
  ];

  return (
    <>
      <BreadCrumb paths={path} />
      <div className="container px-md-5 px-0 pb-4">
        <Accordion defaultActiveKey={["0", "1", "2", "3"]} alwaysOpen>
          <div className="row g-md-4 g-3">
            {/* <ModulesAccordionItems header={"Topics"} eventKey={"0"}>
              {useGetTopics(subject?.id).map((topic) => (
                <Link to={`/modules/topic/${topic.id}`}>
                  <ModuleList
                    title={topic.title}
                    key={topic.id}
                    type={"topic"}
                    user={user}
                  />
                </Link>
              ))}
            </ModulesAccordionItems> */}
            <TopicAccordionItem
              eventKey={"0"}
              subjectId={subject?.id}
              user_id={user?.id}
            />
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
