import { Button } from "react-bootstrap";
import { BsPlusLg } from "react-icons/bs";
import { useParams } from "react-router-dom";
import AdminTeacherTable from "../../../components/AdminTeacherTable";
import useAdmin from "../../../context/AdminContextProvider";

function SubjectDetails() {
  const { id } = useParams();
  const { state } = useAdmin();
  const [subject] = state?.subjects.filter(
    (subject) => subject?.id === Number(id)
  );

  console.log(subject);

  return (
    <>
      <div className="d-md-flex justify-content-between align-items-center mt-5">
        <h4 className="fw-bolder text-primary ">
          {subject?.subject_name}:
          <span className="ms-3 fw-normal">{subject?.subject_description}</span>
        </h4>
        <Button variant="success">
          <BsPlusLg /> Add Teacher
        </Button>
      </div>
      <AdminTeacherTable teachers={subject?.teachers} />
    </>
  );
}

export default SubjectDetails;
