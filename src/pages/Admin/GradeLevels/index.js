import { Button, Form, Modal } from "react-bootstrap";
import { BsPlusLg } from "react-icons/bs";
import AdminGradeTable from "../../../components/AdminGradeTable";
import { useState } from "react";
import useAdmin from "../../../context/AdminContextProvider";

function AdminGradeLevels() {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    grade_level: "",
    name: "",
  });

  const { addData, state } = useAdmin();

  // close Modal
  const handleClose = () => setShowModal(false);

  // Open Modal
  const handleShow = () => setShowModal(true);

  const submitData = async () => {
    await addData("grade_levels", formData);

    // Hide modal
    setShowModal(false);

    // Reset FormData Default value
    setFormData({
      grade_level: "",
      name: "",
    });
  };

  return (
    <>
      <div className="d-md-flex justify-content-between align-items-center mt-5">
        <h4 className="fw-bolder text-primary">Grade Levels</h4>
        <Button variant="success" onClick={handleShow}>
          <BsPlusLg /> Add Grade Level
        </Button>
      </div>

      <AdminGradeTable />

      <Modal
        show={showModal}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Add Grade Level</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form
            onSubmit={(e) => {
              e.preventDefault();
              submitData();
            }}
          >
            <Form.Group className="mb-3">
              <Form.Label>Level</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Level"
                required
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    level: e.target.value,
                  }))
                }
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Name"
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    name: e.target.value,
                  }))
                }
              />
            </Form.Group>
            <div className="d-md-flex justify-content-end">
              <Button
                variant="danger"
                onClick={handleClose}
                disabled={state?.loading ? true : false}
              >
                Cancel
              </Button>
              <Button
                variant="primary"
                type="submit"
                className="ms-2"
                disabled={state?.loading ? true : false}
              >
                Add Grade Level
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default AdminGradeLevels;
