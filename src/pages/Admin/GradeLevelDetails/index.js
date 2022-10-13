import { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { BsPlusLg } from "react-icons/bs";
import { useParams } from "react-router-dom";
import AdminStudentTable from "../../../components/AdminStudentTable";
import useAdmin from "../../../context/AdminContextProvider";

function GradeLevelDetails() {
  const { id } = useParams();
  const { state, addStudentToGrade } = useAdmin();
  const [grade_level] = state?.grade_levels.filter(
    (grade) => grade.id === Number(id)
  );

  const [error, setError] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    grade_id: id,
    student_id: [],
  });

  // close Modal
  const handleClose = () => {
    setShowModal(false);
    setError(false);
  };

  // Open Modal
  const handleShow = () => setShowModal(true);

  const submitData = async () => {
    if (!formData.student_id.length) return setError(true);

    await addStudentToGrade(formData);

    // Hide modal
    setShowModal(false);

    // Reset FormData Default value
    setFormData({
      grade_id: id,
      student_id: [],
    });
  };

  const handleCheckBox = (e) => {
    setError(false);
    const checked = [];

    // Loop through all input checks
    document
      .querySelectorAll("#checkStudent")
      .forEach((item) => item.checked && checked.push(Number(item.value)));

    setFormData((prev) => ({ ...prev, student_id: checked }));
  };

  return (
    <>
      <div className="d-md-flex justify-content-between align-items-center mt-5">
        <h4 className="fw-bolder text-primary">{grade_level?.name}</h4>;
        <Button variant="success" onClick={handleShow}>
          <BsPlusLg /> Add Students
        </Button>
      </div>
      <AdminStudentTable students={grade_level?.students} />

      <Modal
        show={showModal}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        size="xl"
      >
        <Modal.Header closeButton>
          <Modal.Title>Add Student</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form
            onSubmit={(e) => {
              e.preventDefault();
              submitData();
            }}
          >
            <AdminStudentTable
              students={state?.students.filter(
                (student) => !student.grade_level.length
              )}
              checkbox={true}
              handleCheckBox={handleCheckBox}
              error={error}
            />

            <div className="d-md-flex justify-content-end">
              {error ? (
                <span className="text-danger me-5">
                  Select atleast one (1) student to Proceed!
                </span>
              ) : (
                ""
              )}
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
                Add to {grade_level?.name}
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default GradeLevelDetails;
