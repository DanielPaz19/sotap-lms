import { useState } from "react";
import { Button, FloatingLabel, Form, Modal, Tab, Tabs } from "react-bootstrap";
import { BsPlusLg } from "react-icons/bs";
import { useParams } from "react-router-dom";
import AdminStudentTable from "../../../components/AdminStudentTable";
import AdminSubjectTeacherTable from "../../../components/AdminSubjectTeacherTable";
import useAdmin from "../../../context/AdminContextProvider";

function GradeLevelDetails() {
  const { id } = useParams();
  const { state, addStudentToGrade, addSubjectToGrade } = useAdmin();
  const [grade_level] = state?.grade_levels.filter(
    (grade) => grade.id === Number(id)
  );

  const [error, setError] = useState(false);
  const [showAddStudentModal, setShowAddStudentModal] = useState(false);
  const [showAddSubjectModal, setShowAddSubjectModal] = useState(false);
  const [formData, setFormData] = useState({
    grade_id: id,
    student_id: [],
  });
  const [formSubjectTeacher, setFormSubjectTeacher] = useState({
    grade_id: id,
    subject_id: "",
    teacher_id: "",
  });

  // close Modal
  const handleClose = () => {
    setShowAddStudentModal(false);
    setShowAddSubjectModal(false);
    setError(false);
  };

  // Open Modal
  const handleStudentModalShow = () => setShowAddStudentModal(true);
  const handleSubjectModalShow = () => setShowAddSubjectModal(true);

  const submitData = async () => {
    if (!formData.student_id.length) return setError(true);

    await addStudentToGrade(formData);

    // Hide modal
    setShowAddStudentModal(false);

    // Reset FormData Default value
    setFormData({
      grade_id: id,
      student_id: [],
    });
  };

  const handleSubmitSubjectTeacher = async () => {
    const [subject_teacher] = state?.subject_teacher
      .map((item) => ({
        id: item.id,
        subject_id: item.subject.id,
        teacher_id: item.teacher.id,
      }))
      .filter(
        (item) =>
          item.subject_id === Number(formSubjectTeacher.subject_id) &&
          item.teacher_id === Number(formSubjectTeacher.teacher_id)
      );

    await addSubjectToGrade({
      grade_id: id,
      subject_teacher_id: subject_teacher?.id,
    });

    handleClose();
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
        <h4 className="fw-bolder text-primary">{grade_level?.name}</h4>
      </div>

      <Tabs
        defaultActiveKey="students"
        id="uncontrolled-tab-example"
        className="mt-5"
        variant="pills"
      >
        <Tab eventKey="students" title="Students" className="pt-3">
          <Button
            variant="success"
            onClick={handleStudentModalShow}
            className="float-end mb-3"
          >
            <BsPlusLg /> Add Students
          </Button>
          <AdminStudentTable
            students={grade_level?.students}
            grade_id={id}
            onGradeLevels={true}
          />
        </Tab>
        <Tab eventKey="teachers" title="Subjects" className="pt-3">
          <Button
            variant="success"
            onClick={handleSubjectModalShow}
            className="float-end mb-3"
          >
            <BsPlusLg /> Add Subject
          </Button>
          <AdminSubjectTeacherTable
            subject_teachers={grade_level?.subject_teachers}
            grade_id={id}
          />
        </Tab>
      </Tabs>

      <Modal
        show={showAddStudentModal}
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
                Add Student to {grade_level?.name}
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
      <Modal
        show={showAddSubjectModal}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        size=""
      >
        <Modal.Header closeButton>
          <Modal.Title>Add Subject</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmitSubjectTeacher();
            }}
          >
            <FloatingLabel
              controlId="floatingSelect"
              label="Subject"
              className="mb-3"
            >
              <Form.Select
                required
                aria-label="Floating label select example"
                defaultValue=""
                onChange={(e) =>
                  setFormSubjectTeacher((prev) => ({
                    ...prev,
                    subject_id: e.target.value,
                    teacher_id: "",
                  }))
                }
              >
                <option value="">Select Subject</option>
                {state?.subjects
                  .filter(
                    (subject) =>
                      !grade_level?.subject_teachers
                        .map((subteach) => subteach.subject.id)
                        .includes(subject.id)
                  )
                  .map((subject) => (
                    <option key={subject.id} value={subject.id}>
                      {subject.subject_name}
                    </option>
                  ))}
              </Form.Select>
            </FloatingLabel>

            <FloatingLabel
              required
              controlId="floatingSelect"
              label="Teacher"
              className="mb-3"
            >
              <Form.Select
                required
                aria-label="Floating label select example"
                value={formSubjectTeacher.teacher_id}
                onChange={(e) =>
                  setFormSubjectTeacher((prev) => ({
                    ...prev,
                    teacher_id: e.target.value,
                  }))
                }
              >
                <option value="">Select Teacher</option>

                {state?.teachers
                  .filter((teacher) =>
                    teacher.subjects
                      .map((subject) => subject.id)
                      .includes(Number(formSubjectTeacher.subject_id))
                  )
                  .map((teacher) => (
                    <option key={teacher.id} value={teacher.id}>
                      {teacher.firstname} {teacher.lastname}
                    </option>
                  ))}
              </Form.Select>
            </FloatingLabel>

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
                Add Subject to {grade_level?.name}
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default GradeLevelDetails;
