import { useState } from "react";
import { Button, Form, Table, Modal, Alert } from "react-bootstrap";
import { BsPlusLg, BsFillTrashFill } from "react-icons/bs";
import useAdmin from "../../../context/AdminContextProvider";

function AdminStudent() {
  const [showAddStudent, setShowAddStudent] = useState(false);
  const [formData, setFormData] = useState({
    firstname: "",
    middlename: "",
    lastname: "",
  });

  const { addData, state, deleteData } = useAdmin();

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
        <Button variant="success" onClick={handleShow}>
          <BsPlusLg /> Add Student
        </Button>
      </div>
      <Table striped bordered hover size="sm" className="mt-3">
        <thead>
          <tr>
            <th>SID</th>
            <th>First Name</th>
            <th>Middle Name</th>
            <th>Last Name</th>
            <th>Username</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {state.students.map((student) => (
            <tr key={student.id}>
              <td>{String(student.id).padStart(5, 0)}</td>
              <td>{student.firstname}</td>
              <td>{student.middlename}</td>
              <td>{student.lastname}</td>
              <td className="text-center">
                {student.user?.username ? (
                  <span className="text-success">{student.user?.username}</span>
                ) : (
                  <span className="text-danger fst-italic">Not Registered</span>
                )}
              </td>
              <td className="fs-5 text-danger text-center">
                <span
                  className="hover"
                  onClick={() => {
                    deleteData("students", student.id);
                  }}
                >
                  <BsFillTrashFill />
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

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
