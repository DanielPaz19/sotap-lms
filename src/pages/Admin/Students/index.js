import { useContext } from "react";
import { useEffect, useState } from "react";
import { Button, Form, Table, Modal, Alert } from "react-bootstrap";
import { BsPlusLg, BsSearch, BsFillTrashFill } from "react-icons/bs";
import { API_URL } from "../../../config";
import { AdminContext } from "../../../context/AdminContextProvider";

function AdminStudent() {
  const [studentList, setStudentList] = useState([]);
  const [showAddStudent, setShowAddStudent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstname: "",
    middlename: "",
    lastname: "",
  });
  const { addData } = useContext(AdminContext);

  const handleClose = () => setShowAddStudent(false);
  const handleShow = () => setShowAddStudent(true);

  useEffect(() => {
    // get student list
    (async () => {
      const result = await fetch(`${API_URL}/students`, {
        method: "GET",
        credentials: "include",
      });

      const { data } = await result.json();

      console.log(data);
      setStudentList(data);
    })();
  }, [showAddStudent, loading]);

  const submitAddStudent = async () => {
    await addData("students", formData);

    // const data = await result.json();
    setShowAddStudent(false);
    setLoading(false);
    setFormData({
      firstname: "",
      middlename: "",
      lastname: "",
    });
  };

  const deleteStudent = async (id) => {
    await fetch(`${API_URL}/students/${id}`, {
      method: "DELETE",
      credentials: "include",
    });

    setLoading(false);
  };

  return (
    <>
      <div className="d-md-flex justify-content-between align-items-center mt-5">
        <Button variant="success" onClick={handleShow}>
          <BsPlusLg /> Add Student
        </Button>

        {/* <InputGroup className=" w-50" size="lg">
          <Form.Control
            placeholder="Search Student"
            aria-label="Search Studen"
            aria-describedby="basic-addon2"
          />
          <Button variant="primary" id="button-addon2">
            <BsSearch />
          </Button>
        </InputGroup> */}
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
          {studentList.map((student) => (
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
                    setLoading(true);
                    deleteStudent(student.id);
                  }}
                >
                  <BsFillTrashFill />
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {!studentList.length ? (
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
              setLoading(true);

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
                disabled={loading ? true : false}
              >
                Cancel
              </Button>
              <Button
                variant="primary"
                type="submit"
                className="ms-2"
                disabled={loading ? true : false}
              >
                Add Student
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
      {/* <div className="d-md-flex justify-content-end mt-5">
        <Pagination>
          <Pagination.First />
          <Pagination.Prev />
          <Pagination.Item>{1}</Pagination.Item>
          <Pagination.Ellipsis />

          <Pagination.Item>{10}</Pagination.Item>
          <Pagination.Item>{11}</Pagination.Item>
          <Pagination.Item active>{12}</Pagination.Item>
          <Pagination.Item>{13}</Pagination.Item>
          <Pagination.Item disabled>{14}</Pagination.Item>

          <Pagination.Ellipsis />
          <Pagination.Item>{20}</Pagination.Item>
          <Pagination.Next />
          <Pagination.Last />
        </Pagination>
      </div> */}
    </>
  );
}

export default AdminStudent;
