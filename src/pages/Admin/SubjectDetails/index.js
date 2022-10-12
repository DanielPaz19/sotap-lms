import { useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import { BsPlusLg } from "react-icons/bs";
import { useParams } from "react-router-dom";
import AdminTeacherTable from "../../../components/AdminTeacherTable";
import useAdmin from "../../../context/AdminContextProvider";

function SubjectDetails() {
  const { id } = useParams();
  const { state, addSubjectTeacher } = useAdmin();
  const [subject] = state?.subjects.filter(
    (subject) => subject?.id === Number(id)
  );

  const [show, setShow] = useState(false);
  const [formData, setFormData] = useState({ teacher_id: "", subject_id: id });

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSubmit = async () => {
    await addSubjectTeacher(formData);

    setShow(false);

    setFormData({ teacher_id: "", subject_id: id });
  };

  return (
    <>
      <div className="d-md-flex justify-content-between align-items-center mt-5">
        <h4 className="fw-bolder text-primary ">
          {subject?.subject_name}:
          <span className="ms-3 fw-normal">{subject?.subject_description}</span>
        </h4>
        <Button variant="success" onClick={handleShow}>
          <BsPlusLg /> Add Teacher
        </Button>
      </div>
      <AdminTeacherTable
        teachers={subject?.teachers}
        subject_id={subject?.id}
      />
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Subject</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
          >
            <Form.Group className="mb-3">
              <Form.Label>Subject</Form.Label>
              <Form.Control
                type="text"
                disabled
                value={subject?.subject_code}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Subjects</Form.Label>

              <Form.Select
                required
                defaultValue="0"
                autoFocus
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    teacher_id: e.target.value,
                  }))
                }
              >
                <option disabled value="0">
                  Choose Teacher
                </option>
                {state?.teachers
                  ?.filter(
                    (teacher) =>
                      !subject?.teachers
                        .map((item) => item.id)
                        .includes(teacher.id)
                  )
                  .map((teacher) => (
                    <option key={teacher?.id} value={teacher?.id}>
                      {teacher?.firstname + " " + teacher?.lastname}
                    </option>
                  ))}
              </Form.Select>
            </Form.Group>
            <div className="d-md-flex justify-content-end mt-4">
              <Button
                variant="secondary"
                onClick={handleClose}
                className="me-1"
              >
                Close
              </Button>
              <Button type="submit" variant="success">
                Add Subject
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default SubjectDetails;
