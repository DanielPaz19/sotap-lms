import { Card, Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./style.css";

function SubjectCard({ subject }) {
  return (
    <Col md={3}>
      <Link to="1">
        <Card className="shadow card--subject">
          <Card.Body>
            <Card.Title className="text-primary fw-bolder text-center">
              {subject.name}
            </Card.Title>
            <Card.Subtitle className="text-muted text-center">
              {subject.description}
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
  return (
    <>
      <Container className="pt-3">
        <h4 className="text-primary">Topic Subjects</h4>
        <hr />
        <Row className="g-3">
          <SubjectCard
            subject={{
              name: "Subject Name",
              description: "Subject Description",
            }}
          />
          <SubjectCard
            subject={{
              name: "Subject Name",
              description: "Subject Description",
            }}
          />
          <SubjectCard
            subject={{
              name: "Subject Name",
              description: "Subject Description",
            }}
          />
          <SubjectCard
            subject={{
              name: "Subject Name",
              description: "Subject Description",
            }}
          />
        </Row>
      </Container>
    </>
  );
}

export default TeacherTopics;
