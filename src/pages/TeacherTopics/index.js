import { Card, Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./style.css";
import useTeacher from "../../context/TeacherContextProvider";

function SubjectCard({ subject }) {
  return (
    <Col md={3}>
      <Link to="1">
        <Card className="shadow card--subject">
          <Card.Body>
            <Card.Title className="text-primary fw-bolder text-center">
              {subject.subject_code}
            </Card.Title>
            <Card.Subtitle className="text-muted text-center text-truncate">
              {subject.subject_description}
            </Card.Subtitle>
          </Card.Body>
          <Card.Footer className="text-secondary text-center fs-7">
            Click to View Details
          </Card.Footer>
        </Card>
      </Link>
    </Col>
  );
}

function TeacherTopics() {
  const { state: teacherState } = useTeacher();

  return (
    <>
      <Container className="pt-3">
        <h4 className="text-primary">Topic Subjects</h4>
        <hr />
        <Row className="g-3">
          {teacherState?.subjects.map((subject) => (
            <SubjectCard subject={subject} key={subject.id} />
          ))}
        </Row>
      </Container>
    </>
  );
}

export default TeacherTopics;
