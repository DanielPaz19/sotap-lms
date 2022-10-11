import { useParams } from "react-router-dom";
import useAdmin from "../../../context/AdminContextProvider";
import { Button, Form, Modal } from "react-bootstrap";
import { BsPlusLg } from "react-icons/bs";
import AdminSubjectTable from "../../../components/AdminSubjectTable";
import { useState } from "react";

function TeacherProfile() {
  const { id } = useParams(); // Get URL Params
  const { state } = useAdmin(); // Custom Admin Context
  const [teacher] = state?.teachers?.filter(
    (teacher) => teacher.id === Number(id)
  ); // Filter the teacher Base on ID

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <div className="d-md-flex justify-content-between align-items-center mt-5">
        <h4 className="fw-bolder text-primary">
          {teacher?.firstname} {teacher?.lastname}
        </h4>
        <Button variant="success" onClick={handleShow}>
          <BsPlusLg /> Add Subject
        </Button>
      </div>

      <AdminSubjectTable subjects={teacher?.subjects} hasDelete={false} />

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Subject</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Teacher</Form.Label>
              <Form.Control
                type="text"
                disabled
                value={
                  teacher?.firstname +
                  " " +
                  `${teacher?.middlename ? teacher?.middlename + " " : ""}` +
                  teacher?.lastname
                }
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Subjects</Form.Label>

              <Form.Select aria-label="Default select example" autoFocus>
                <option value="" disabled selected>
                  Choose Subject
                </option>
                {state?.subjects
                  ?.filter(
                    (subject) =>
                      !teacher?.subjects
                        .map((item) => item.id)
                        .includes(subject.id)
                  )
                  .map((subject) => (
                    <option key={subject?.id} value={subject?.id}>
                      {subject?.subject_code}
                    </option>
                  ))}
              </Form.Select>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="success" onClick={handleClose}>
            Add Subject
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default TeacherProfile;
