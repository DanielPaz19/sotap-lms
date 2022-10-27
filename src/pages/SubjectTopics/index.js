import { useRef, useState } from "react";
import { useEffect } from "react";
import {
  Button,
  Container,
  FloatingLabel,
  Form,
  ListGroup,
  Modal,
  Stack,
} from "react-bootstrap";
import { useParams } from "react-router-dom";
import { API_URL } from "../../config";
import useTeacher from "../../context/TeacherContextProvider";
import useUser from "../../context/UserContextProvider";

function SubjectTopics() {
  const { subject_id } = useParams();
  const [topics, setTopics] = useState([]);
  const [show, setShow] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    url: "",
    body: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const modalInput = useRef();
  const { state: userState } = useUser();
  const { state: teacherState } = useTeacher();

  const [subject] = teacherState?.subjects.filter(
    (subject) => Number(subject.id) === Number(subject_id)
  );

  useEffect(() => {
    const getSubjectTopics = async () => {
      const res = await fetch(
        API_URL + `/teacher/${userState?.id}/topics?subject=${subject_id}`,
        { credentials: "include" }
      );
      const { data } = await res.json();
      console.log(data);
      setTopics(data);
    };

    getSubjectTopics();
  }, [subject_id, userState?.id, isLoading]);

  const handleClose = () => {
    setShow(false);
  };

  const handleShow = () => {
    setShow(true);
  };

  const handleSubmit = async () => {
    setIsLoading(true);

    const res = await fetch(API_URL + `/topics`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        ...formData,
        subject_id,
        teacher_id: userState?.id,
      }),
    });

    console.log(await res.json());
    setIsLoading(false);
    setShow(false);
  };

  return (
    <Container className="pt-3">
      <h4 className="text-primary">
        {subject?.subject_code} : {subject?.subject_name}
      </h4>
      <hr />
      <Button className="mb-3" onClick={handleShow}>
        Add Topic
      </Button>
      <ListGroup variant="flush">
        {topics?.map((topic) => (
          <ListGroup.Item action key={topic.id}>
            <Stack direction="horizontal" gap={3}>
              <span className="font-monospace">
                {String(topic.id).padStart(5, 0)}
              </span>
              <span className="vr"></span>
              <span className="text-primary fw-light">{topic.title}</span>
            </Stack>
          </ListGroup.Item>
        ))}
      </ListGroup>

      <Modal
        show={show}
        onHide={handleClose}
        onEntered={() => modalInput.current.focus()}
      >
        <Modal.Header closeButton>
          <Modal.Title className="h4 text-primary">Add Topic</Modal.Title>
        </Modal.Header>
        <Form
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <Modal.Body>
            <FloatingLabel label="Title" className="mb-3">
              <Form.Control
                type="text"
                placeholder="Title"
                required
                ref={modalInput}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, title: e.target.value }))
                }
              />
            </FloatingLabel>
            <FloatingLabel label="Video URL" className="mb-3">
              <Form.Control
                type="url"
                placeholder="Video URL"
                required
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, url: e.target.value }))
                }
              />
            </FloatingLabel>
            <FloatingLabel controlId="floatingTextarea2" label="Body">
              <Form.Control
                required
                as="textarea"
                placeholder="Body"
                style={{ height: "8em" }}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, body: e.target.value }))
                }
              />
            </FloatingLabel>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="danger"
              onClick={handleClose}
              disabled={isLoading ? true : false}
            >
              Close
            </Button>
            <Button
              type="submit"
              variant="primary"
              onClick={handleSubmit}
              disabled={isLoading ? true : false}
            >
              Save Changes
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </Container>
  );
}

export default SubjectTopics;
