import { useState } from "react";
import { Button, Form, Modal, Alert } from "react-bootstrap";
import { BsPlusLg } from "react-icons/bs";
import AdminStudentTable from "../../../components/AdminStudentTable";
import useAdmin from "../../../context/AdminContextProvider";

function AdminStudent() {
  const [showAddStudent, setShowAddStudent] = useState(false);
  const [formData, setFormData] = useState({
    firstname: "",
    middlename: "",
    lastname: "",
  });

  const { addData, state } = useAdmin();

  // close Modal
  const handleClose = () => setShowAddStudent(false);

  // Open Modal
  const handleShow = () => setShowAddStudent(true);

  const submitAddStudent = async () => {
    await addData("students", formData);

    // Hide modal
    setShowAddStudent(false);

    // Reset FormData Default value
    setFormData({
      firstname: "",
      middlename: "",
      lastname: "",
    });
  };

  return (
    <>
      <div className="d-md-flex justify-content-between align-items-center mt-5">
        <h4 className="text-primary fw-bolder">Student List</h4>
        <Button variant="success" onClick={handleShow}>
          <BsPlusLg /> Add Student
        </Button>
      </div>

      <AdminStudentTable students={state.students} />

      {!state.students.length ? (
        <Alert variant="danger" className="text-center">
          No Students Found!
        </Alert>
      ) : (
        ""
      )}

      <Modal
        show={showAddStudent}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Add Student Form</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form
            onSubmit={(e) => {
              e.preventDefault();
              submitAddStudent();
            }}
          >
            <Form.Group className="mb-3">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter First Name"
                required
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    firstname: e.target.value,
                  }))
                }
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Middle Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Middle Name"
                name="middlename"
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    middlename: e.target.value,
                  }))
                }
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Last Name"
                name="lastname"
                required
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    lastname: e.target.value,
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
                Add Student
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default AdminStudent;
