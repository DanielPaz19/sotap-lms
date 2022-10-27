import { Card, Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import useTeacher from "../../context/TeacherContextProvider";
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
  const { state: teacherState } = useTeacher();

  return (
    <Container className="pt-3 container--grade__card">
      <h4 className="text-primary">Dashboard</h4>
      <hr />
      <Row className="g-4">
        {teacherState?.grade_levels.map((grade) => (
          <GradeCard key={grade.id} title={grade.name} id={grade.id} />
        ))}
      </Row>
    </Container>
  );
}

export default TeacherDashboard;
