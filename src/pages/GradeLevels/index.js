import { useReducer } from "react";
import { useEffect } from "react";
import { Col, Container, Nav, Row, Spinner, Tab, Table } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { API_URL } from "../../config";
import gradeReducer, { initialState } from "../../context/gradeReducer";
import useUser from "../../context/UserContextProvider";

function StudentTable({ students }) {
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

function SubjectTable({ subjects, teacherId }) {
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
            subject.teachers.map((teacher) => teacher.id).includes(teacherId)
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
  const [state, dispatch] = useReducer(gradeReducer, initialState);

  const { grade_id } = useParams();
  const { state: userState } = useUser();

  useEffect(() => {
    getStudents(grade_id);
    getSubjects(grade_id);
  }, [grade_id]);

  const getStudents = async (grade_id) => {
    dispatch({ type: "REQUESTED" });
    const res = await fetch(API_URL + `/grade_levels/${grade_id}/students`, {
      credentials: "include",
    });
    const { data } = await res.json();
    dispatch({
      type: "UPDATE_DATA",
      payload: { key: "students", value: data },
    });
  };

  const getSubjects = async (grade_id) => {
    dispatch({ type: "REQUESTED" });
    const res = await fetch(API_URL + `/grade_levels/${grade_id}/subjects`, {
      credentials: "include",
    });
    const { data } = await res.json();
    console.log(data);
    dispatch({
      type: "UPDATE_DATA",
      payload: { key: "subjects", value: data },
    });
  };

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
            {state?.loading ? (
              <div className="d-flex justify-content-center mt-5">
                <Spinner variant="primary" animation="border" />
              </div>
            ) : (
              <Tab.Content>
                <Tab.Pane eventKey="first">
                  <StudentTable students={state?.students} />
                </Tab.Pane>
                <Tab.Pane eventKey="second">
                  <SubjectTable
                    subjects={state?.subjects}
                    teacherId={userState?.id}
                  />
                </Tab.Pane>
              </Tab.Content>
            )}
          </Col>
        </Row>
      </Tab.Container>
    </Container>
  );
}

export default GradeLevels;
