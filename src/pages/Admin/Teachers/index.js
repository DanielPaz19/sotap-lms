import { useEffect, useState } from "react";
import { Button, Form, Table, Modal, Alert } from "react-bootstrap";
import { BsPlusLg, BsSearch, BsFillTrashFill } from "react-icons/bs";
import { API_URL } from "../../../config";

function AdminTeacher() {
  const [teacherList, setTeacherList] = useState([]);
  const [showAddTeacherModal, setShowAddTeacherModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstname: "",
    middlename: "",
    lastname: "",
  });

  console.log(formData);

  const handleClose = () => setShowAddTeacherModal(false);
  const handleShow = () => setShowAddTeacherModal(true);

  useEffect(() => {
    // get student list
    (async () => {
      const result = await fetch(`${API_URL}/teachers`, {
        method: "GET",
        credentials: "include",
      });

      const { data } = await result.json();

      console.log(data);
      setTeacherList(data);
    })();
  }, [showAddTeacherModal, loading]);

  const submitAddTeacher = async () => {
    await fetch(API_URL + `/teachers`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(formData),
    });

    // const data = await result.json();
    setShowAddTeacherModal(false);
    setLoading(false);
    setFormData({
      firstname: "",
      middlename: "",
      lastname: "",
    });
  };

  const deleteTeacher = async (id) => {
    await fetch(`${API_URL}/teachers/${id}`, {
      method: "DELETE",
      credentials: "include",
    });

    setLoading(false);
  };

  return (
    <>
      <div className="d-md-flex justify-content-between align-items-center mt-5">
        <Button variant="success" onClick={handleShow}>
          <BsPlusLg /> Add Teacher
        </Button>
      </div>
      <Table striped bordered hover size="sm" className="mt-3">
        <thead>
          <tr>
            <th>TID</th>
            <th>First Name</th>
            <th>Middle Name</th>
            <th>Last Name</th>
            <th>Username</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {teacherList.map((teacher) => (
            <tr key={teacher.id}>
              <td>{String(teacher.id).padStart(5, 0)}</td>
              <td>{teacher.firstname}</td>
              <td>{teacher.middlename}</td>
              <td>{teacher.lastname}</td>
              <td className="text-center">
                {teacher.user?.username ? (
                  <span className="text-success">{teacher.user?.username}</span>
                ) : (
                  <span className="text-danger fst-italic">Not Registered</span>
                )}
              </td>
              <td className="fs-5 text-danger text-center">
                <span
                  className="hover"
                  onClick={() => {
                    setLoading(true);
                    deleteTeacher(teacher.id);
                  }}
                >
                  <BsFillTrashFill />
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {!teacherList.length ? (
        <Alert variant="danger" className="text-center">
          No Teachers Found!
        </Alert>
      ) : (
        ""
      )}

      <Modal
        show={showAddTeacherModal}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Add Teacher Form</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form
            onSubmit={(e) => {
              e.preventDefault();
              setLoading(true);
              submitAddTeacher();
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
                Add Teacher
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

export default AdminTeacher;
