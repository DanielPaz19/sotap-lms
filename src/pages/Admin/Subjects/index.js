import { useState } from "react";
import { Button, Form, Modal, Alert } from "react-bootstrap";
import { BsPlusLg } from "react-icons/bs";
import AdminSubjectTable from "../../../components/AdminSubjectTable";
import useAdmin from "../../../context/AdminContextProvider";

function AdminSubject() {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    subject_code: "",
    subject_name: "",
    subject_description: "",
    img_url: "",
  });

  const { addData, state } = useAdmin();

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
      img_url: "",
    });
  };

  return (
    <>
      <div className="d-md-flex justify-content-between align-items-center mt-5 ">
        <h4 className="fw-bolder text-primary">Subject List</h4>
        <Button
          variant="success"
          onClick={handleShow}
          className="d-md-flex justify-content-between align-items-center"
        >
          <BsPlusLg />
          <span className="ms-1 fs-6">New Subject</span>
        </Button>
      </div>

      <AdminSubjectTable subjects={state.subjects} />

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
                autoComplete="off"
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
            <Form.Group className="mb-3">
              <Form.Label>Image URL</Form.Label>
              <Form.Control
                autoComplete="off"
                type="text"
                placeholder="Enter Image URL"
                name="subject_description"
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    img_url: e.target.value,
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
