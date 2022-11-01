import { Col, Container, Row } from "react-bootstrap";
import CountUp from "react-countup";
import useAdmin from "../../../context/AdminContextProvider";

function DataCounter({ data, title }) {
  return (
    <Col md={3} className="mb-4">
      <div className="text-center">
        <CountUp end={data} duration={0.75} className="display-3" /> <br />
        <span>{title}</span>
      </div>
    </Col>
  );
}

function AdminDashboard() {
  const { state } = useAdmin();
  return (
    <>
      <Container>
        <Row>
          <DataCounter data={state.students.length} title="Students" />
          <DataCounter data={state.teachers.length} title="Teachers" />
          <DataCounter data={state.subjects.length} title="Subjects" />
          <DataCounter data={state.grade_levels.length} title="Grade Levels" />
          <Col md={3}></Col>
          <DataCounter
            data={state?.teachers?.filter((teacher) => teacher?.user).length}
            title="Registered Teachers"
          />
          <DataCounter
            data={state?.students?.filter((student) => student?.user).length}
            title="Registered Students"
          />
          <Col md={3}></Col>
        </Row>
      </Container>
    </>
  );
}

export default AdminDashboard;
