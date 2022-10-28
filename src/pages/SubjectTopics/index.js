import { useState } from "react";
import { useEffect } from "react";
import {
  Button,
  Container,
  FloatingLabel,
  Form,
  ListGroup,
  Modal,
  Spinner,
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
  const [isLoading, setIsLoading] = useState(true);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editMode, setEditMode] = useState(false);

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
      setIsLoading(false);
    };

    getSubjectTopics();
  }, [subject_id, userState?.id, isLoading]);

  const handleClose = () => {
    setShow(false);
  };

  const handleShow = () => {
    setShow(true);
  };

  const handleSubmit = async (method = "POST", topic_id = null) => {
    setIsLoading(true);

    await fetch(API_URL + `/topics/${topic_id || ""}`, {
      method: method,
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

    setIsLoading(false);
    setShowEditModal(false);
    setEditMode(false);
    setShow(false);
  };

  if (isLoading && !topics.length)
    return (
      <div className="d-flex justify-content-center pt-5">
        <Spinner animation="border" variant="primary" />
      </div>
    );

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
          <ListGroup.Item
            action
            key={topic.id}
            onClick={() => setShowEditModal(topic.id)}
          >
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
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title className="h4 text-primary">Add Topic</Modal.Title>
        </Modal.Header>
        <Form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          <Modal.Body>
            <FloatingLabel label="Title" className="mb-3">
              <Form.Control
                type="text"
                placeholder="Title"
                required
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
              disabled={isLoading ? true : false}
            >
              Save Changes
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>

      {editMode ? (
        <Modal
          show={showEditModal}
          onHide={() => {
            setShowEditModal(false);
            setEditMode(false);
          }}
        >
          <Modal.Header closeButton>
            <Modal.Title className="h4 text-primary"> Edit Topic</Modal.Title>
          </Modal.Header>
          <Form
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit("PUT", showEditModal);
            }}
          >
            <Modal.Body>
              <FloatingLabel label="Title" className="mb-3">
                <Form.Control
                  className="text-primary fw-light"
                  defaultValue={topics
                    ?.filter(
                      (topic) => Number(topic.id) === Number(showEditModal)
                    )
                    .map((topic) => topic.title)}
                  type="text"
                  placeholder="Title"
                  required
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, title: e.target.value }))
                  }
                />
              </FloatingLabel>
              <FloatingLabel label="Video URL" className="mb-3">
                <Form.Control
                  className="text-primary fw-light"
                  defaultValue={topics
                    ?.filter(
                      (topic) => Number(topic.id) === Number(showEditModal)
                    )
                    .map((topic) => topic.url)}
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
                  className="text-primary fw-light"
                  defaultValue={topics
                    ?.filter(
                      (topic) => Number(topic.id) === Number(showEditModal)
                    )
                    .map((topic) => topic.body)}
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
                onClick={() => setEditMode(false)}
                disabled={isLoading ? true : false}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="primary"
                disabled={isLoading ? true : false}
              >
                Save Changes
              </Button>
            </Modal.Footer>
          </Form>
        </Modal>
      ) : (
        <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title className="h4 text-primary">Topic</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <FloatingLabel label="Title" className="mb-3">
              <Form.Control
                className="text-primary fw-light"
                value={topics
                  ?.filter(
                    (topic) => Number(topic.id) === Number(showEditModal)
                  )
                  .map((topic) => topic.title)}
                disabled
                type="text"
                placeholder="Title"
                required
              />
            </FloatingLabel>
            <FloatingLabel label="Video URL" className="mb-3">
              <Form.Control
                className="text-primary fw-light"
                value={topics
                  ?.filter(
                    (topic) => Number(topic.id) === Number(showEditModal)
                  )
                  .map((topic) => topic.url)}
                disabled
                type="url"
                placeholder="Video URL"
                required
              />
            </FloatingLabel>
            <FloatingLabel controlId="floatingTextarea2" label="Body">
              <Form.Control
                className="text-primary fw-light"
                value={topics
                  ?.filter(
                    (topic) => Number(topic.id) === Number(showEditModal)
                  )
                  .map((topic) => topic.body)}
                disabled
                required
                as="textarea"
                placeholder="Body"
                style={{ height: "8em" }}
              />
            </FloatingLabel>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="danger"
              onClick={() => setShowEditModal(false)}
              disabled={isLoading ? true : false}
            >
              Delete
            </Button>
            <Button
              variant="success"
              disabled={isLoading ? true : false}
              onClick={() => {
                setEditMode(true);
              }}
            >
              Edit Topic
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </Container>
  );
}

export default SubjectTopics;
