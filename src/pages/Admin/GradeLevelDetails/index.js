import { Button } from "react-bootstrap";
import { BsPlusLg } from "react-icons/bs";
import { useParams } from "react-router-dom";
import AdminStudentTable from "../../../components/AdminStudentTable";
import useAdmin from "../../../context/AdminContextProvider";

function GradeLevelDetails() {
  const { id } = useParams();
  const { state } = useAdmin();
  const [grade_level] = state?.grade_levels.filter(
    (grade) => grade.id === Number(id)
  );

  console.log(grade_level.students);

  return (
    <>
      <div className="d-md-flex justify-content-between align-items-center mt-5">
        <h4 className="fw-bolder text-primary">{grade_level?.name}</h4>;
        <Button variant="success">
          <BsPlusLg /> Add Students
        </Button>
      </div>
      <AdminStudentTable students={grade_level.students}/>
    </>
  );
}

export default GradeLevelDetails;
