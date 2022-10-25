import { Card, Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./style.css";

function GradeCard({ title, id }) {
  return (
    <Col lg={3} md={4} sm={6}>
      <Link to={"/grade_levels/" + id}>
        <Card className="shadow card--grade__card">
          <Card.Body>
            <Card.Title>
              <div className="text-center text-primary fw-bold">{title}</div>
            </Card.Title>
          </Card.Body>
          <Card.Footer>
            <div
              className="text-center text-secondary"
              style={{ fontSize: ".8rem" }}
            >
              Click to View Details
            </div>
          </Card.Footer>
        </Card>
      </Link>
    </Col>
  );
}

function TeacherDashboard() {
  return (
    <Container className="pt-4 container--grade__card">
      <Row className="g-4">
        <GradeCard title="Grade 1" id={3} />
        <GradeCard title="Grade 1" />
        <GradeCard title="Grade 1" />
        <GradeCard title="Grade 1" />
        <GradeCard title="Grade 1" />
        <GradeCard title="Grade 1" />
        <GradeCard title="Grade 1" />
      </Row>
    </Container>
  );
}

export default TeacherDashboard;
