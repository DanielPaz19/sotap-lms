import { useReducer, useState } from "react";
import { useEffect } from "react";
import {
  Button,
  Col,
  Container,
  FloatingLabel,
  Form,
  Modal,
  Nav,
  Row,
  Spinner,
  Tab,
  Table,
} from "react-bootstrap";
import { useParams } from "react-router-dom";
import { API_URL } from "../../config";
import gradeReducer, { initialState } from "../../context/gradeReducer";
import useUser from "../../context/UserContextProvider";

function TopicTable({ topics, subjects }) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [disabledSelect, setDisabledSelect] = useState(true);

  return (
    <>
      <div className="d-flex justify-content-start mb-3">
        <Button onClick={handleShow}>Add Topic</Button>
      </div>
      <Table striped responsive>
        <thead>
          <tr className="text-primary">
            <th>#</th>
            <th>Topic Title</th>
            <th>Video URL</th>
          </tr>
        </thead>
        <tbody>
          {topics?.map((topic) => (
            <tr>
              <td>{String(topic.id).padStart(5, 0)}</td>
              <td>{topic.title}</td>
              <td>{topic.url}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      {!topics?.length ? "No Topics Found" : ""}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add topic</Modal.Title>
        </Modal.Header>
        <Form>
          <Modal.Body>
            <FloatingLabel
              controlId="floatingSelect"
              label="Subject"
              className="mb-3"
            >
              <Form.Select
                aria-label="Floating label select example"
                defaultValue=""
                onChange={() => setDisabledSelect(false)}
              >
                <option value="" disabled>
                  Select subject ...
                </option>
                {subjects?.map((subject) => (
                  <option value="1" className="text-truncate">
                    {subject.subject_code}: {subject.subject_name}
                  </option>
                ))}
              </Form.Select>
            </FloatingLabel>
            <FloatingLabel controlId="floatingSelect" label="Topic">
              <Form.Select
                aria-label="Floating label select example"
                disabled={disabledSelect ? true : false}
                defaultValue=""
              >
                <option value="" disabled>
                  Select topic ...
                </option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
              </Form.Select>
            </FloatingLabel>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={handleClose}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
}

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

function SubjectTable({ subjects }) {
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
        {subjects?.map((subject) => (
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
    getSubjects(grade_id, userState?.id);
    getGradeDetails(grade_id);
    getGradeTopics(grade_id);
  }, [grade_id, userState?.id]);

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

  const getSubjects = async (grade_id, teacher_id) => {
    dispatch({ type: "REQUESTED" });
    const res = await fetch(
      API_URL + `/grade_levels/${grade_id}/subjects?teacher=${teacher_id}`,
      {
        credentials: "include",
      }
    );
    const { data } = await res.json();
    console.log(data);
    dispatch({
      type: "UPDATE_DATA",
      payload: { key: "subjects", value: data },
    });
  };

  const getGradeDetails = async (grade_id) => {
    dispatch({ type: "REQUESTED" });

    const res = await fetch(API_URL + `/grade_levels/${grade_id}`, {
      credentials: "include",
    });
    const { data } = await res.json();
    console.log(data);
    dispatch({
      type: "UPDATE_DATA",
      payload: { key: "grade_level", value: data },
    });
  };

  const getGradeTopics = async (grade_id) => {
    dispatch({ type: "REQUESTED" });

    const res = await fetch(API_URL + `/grade_levels/${grade_id}/topics`, {
      credentials: "include",
    });
    const { data } = await res.json();
    console.log(data);
    dispatch({
      type: "UPDATE_DATA",
      payload: { key: "topics", value: data },
    });
  };

  if (state?.loading)
    return (
      <div className="d-flex justify-content-center pt-5">
        <Spinner variant="primary" animation="border" />;
      </div>
    );

  return (
    <Container fluid="md" className="pt-4">
      <Tab.Container defaultActiveKey="first" fluid>
        <Row>
          <Col sm={3} lg={2}>
            <Container className="bg-white py-3 px-3 shadow rounded-3">
              <h4 className="text-primary text-center mb-4">
                {state?.grade_level?.name}
              </h4>
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
                <StudentTable students={state?.students} />
              </Tab.Pane>
              <Tab.Pane eventKey="second">
                <SubjectTable subjects={state?.subjects} />
              </Tab.Pane>
              <Tab.Pane eventKey="third">
                <TopicTable topics={state?.topics} subjects={state?.subjects} />
              </Tab.Pane>
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
    </Container>
  );
}

export default GradeLevels;
