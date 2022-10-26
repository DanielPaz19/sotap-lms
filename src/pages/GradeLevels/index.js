import { useEffect, useState } from "react";
import { Col, Container, Nav, Row, Tab, Table } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { API_URL } from "../../config";
import useTeacher from "../../context/TeacherContextProvider";
import useUser from "../../context/UserContextProvider";

function StudentTable() {
  const [students, setStudents] = useState([]);

  const { grade_id } = useParams();

  useEffect(() => {
    const getStudents = async () => {
      const res = await fetch(API_URL + `/grade_levels/${grade_id}/students`, {
        credentials: "include",
      });
      const { data } = await res.json();
      setStudents(data);
    };

    getStudents();
  }, [grade_id]);

  return (
    <Table striped responsive>
      <thead>
        <tr className="text-primary">
          <th>#</th>
          <th>First Name</th>
          <th>Middle Name</th>
          <th>Last Name</th>
          <th>Username</th>
        </tr>
      </thead>
      <tbody>
        {students?.map((student) => (
          <tr>
            <td>{String(student.id).padStart(5, 0)}</td>
            <td>{student.firstname}</td>
            <td>{student.middlename}</td>
            <td>{student.lastname}</td>
            <td>
              {student.user ? (
                <span className="text-success">{student.user?.username}</span>
              ) : (
                <span className="text-danger fst-italic">Not Registered</span>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}
function SubjectTable() {
  const [subjects, setSubjects] = useState([]);

  const { grade_id } = useParams();
  const { state: userState } = useUser();
  console.log(userState);

  useEffect(() => {
    const getStudents = async () => {
      const res = await fetch(API_URL + `/grade_levels/${grade_id}/subjects`, {
        credentials: "include",
      });
      const { data } = await res.json();
      console.log(data);
      setSubjects(data);
    };

    getStudents();
  }, [grade_id]);

  return (
    <Table striped responsive>
      <thead>
        <tr className="text-primary">
          <th>#</th>
          <th>Subject Code</th>
          <th>Subject Name</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        {subjects
          ?.filter((subject) =>
            subject.teachers
              .map((teacher) => teacher.id)
              .includes(userState?.id)
          )
          .map((subject) => (
            <tr>
              <td>{String(subject.id).padStart(5, 0)}</td>
              <td>{subject.subject_code}</td>
              <td>{subject.subject_name}</td>
              <td>{subject.subject_description}</td>
            </tr>
          ))}
      </tbody>
    </Table>
  );
}

function GradeLevels() {
  return (
    <Container fluid="md" className="pt-4">
      <Tab.Container defaultActiveKey="first" fluid>
        <Row>
          <Col sm={3} lg={2}>
            <Container className="bg-white py-3 px-3 shadow rounded-3">
              <h4 className="text-primary text-center mb-4">Grade 1</h4>
              <Nav variant="pills" className="flex-column">
                <Nav.Item>
                  <Nav.Link eventKey="first" as="li" className="hover">
                    Students
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="second" as="li" className="hover">
                    Subjects
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="third" as="li" className="hover">
                    Topics
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="forth" as="li" className="hover">
                    Quiz
                  </Nav.Link>
                </Nav.Item>
              </Nav>
            </Container>
          </Col>
          <Col sm={9} lg={10}>
            <Tab.Content>
              <Tab.Pane eventKey="first">
                <StudentTable />
              </Tab.Pane>
              <Tab.Pane eventKey="second">
                <SubjectTable />
              </Tab.Pane>
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
    </Container>
  );
}

export default GradeLevels;
