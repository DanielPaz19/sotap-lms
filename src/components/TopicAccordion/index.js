import { FaEye, FaPlay, FaCheck } from "react-icons/fa";
import { ImNotification } from "react-icons/im";
import { Accordion, ListGroup } from "react-bootstrap";
import { FiFileText } from "react-icons/fi";
import { Link } from "react-router-dom";

function TopicStatus({ topic_id, user_id }) {
  const topicStatus = [];

  switch (topicStatus.status) {
    case "viewed":
      return (
        <span className="fs-6 text-secondary" title="Topic Viewed">
          <FaEye />
        </span>
      );
    case "played":
      return (
        <span className="fs-6 text-warning" title="Topic Played">
          <FaPlay />
        </span>
      );
    case "done":
      return (
        <span className="fs-6 text-success" title="Topic Done">
          <FaCheck />
        </span>
      );

    default:
      return (
        <span className="fs-6 text-success" title="New">
          <ImNotification />
        </span>
      );
  }
}

function TopicAccordionItem({ eventKey, subjectId, user_id, topics }) {
  return (
    <div className="col-12  ">
      <Accordion.Item eventKey={eventKey}>
        <Accordion.Header>Topics</Accordion.Header>
        <Accordion.Body className="px-2">
          <ListGroup variant="flush">
            {topics?.map((topic) => (
              <Link to={`/modules/topic/${topic.id}`} key={topic.id}>
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

export default TopicAccordionItem;
