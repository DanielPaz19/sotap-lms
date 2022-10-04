import { useState } from "react";
import { Button, Form, Table, Modal, Alert } from "react-bootstrap";
import { BsPlusLg, BsFillTrashFill } from "react-icons/bs";
import useAdmin from "../../../context/AdminContextProvider";

function AdminSubject() {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    subject_code: "",
    subject_name: "",
    subject_description: "",
  });

  const { addData, state, deleteData } = useAdmin();

  const handleClose = () => setShowModal(false);

  const handleShow = () => setShowModal(true);

  const submitForm = async () => {
    await addData("subjects", formData);

    // Hide modal
    setShowModal(false);

    // Reset FormData Default value
    setFormData({
      subject_code: "",
      subject_name: "",
      subject_description: "",
    });
  };

  return (
    <>
      <div className="d-md-flex justify-content-between align-items-center mt-5">
        <Button variant="success" onClick={handleShow}>
          <BsPlusLg /> Add Subject
        </Button>
      </div>
      <Table striped bordered hover size="sm" className="mt-3">
        <thead>
          <tr>
            <th>Subject ID</th>
            <th>Subject Code</th>
            <th>Subject Name</th>
            <th>Subject Description</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {state.subjects.map((subject) => (
            <tr key={subject.id}>
              <td>{String(subject.id).padStart(5, 0)}</td>
              <td>{subject.subject_code}</td>
              <td>{subject.subject_name}</td>
              <td>{subject.subject_description}</td>
              <td className="fs-5 text-danger text-center">
                <span
                  className="hover"
                  onClick={() => {
                    deleteData("subjects", subject.id);
                  }}
                >
                  <BsFillTrashFill />
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {!state.subjects.length ? (
        <Alert variant="danger" className="text-center">
          No Subject Found!
        </Alert>
      ) : (
        ""
      )}

      <Modal
        show={showModal}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Add Subject Form</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form
            onSubmit={(e) => {
              e.preventDefault();
              submitForm();
            }}
          >
            <Form.Group className="mb-3">
              <Form.Label>Subject Code</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Subject Code"
                required
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    subject_code: e.target.value,
                  }))
                }
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Subject Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Subject Name"
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    subject_name: e.target.value,
                  }))
                }
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Subject Description</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Description"
                name="subject_description"
                required
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    subject_description: e.target.value,
                  }))
                }
              />
            </Form.Group>
            <div className="d-md-flex justify-content-end">
              <Button
                variant="danger"
                onClick={handleClose}
                disabled={state.loading ? true : false}
              >
                Cancel
              </Button>
              <Button
                variant="primary"
                type="submit"
                className="ms-2"
                disabled={state.loading ? true : false}
              >
                Add Subject
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default AdminSubject;
