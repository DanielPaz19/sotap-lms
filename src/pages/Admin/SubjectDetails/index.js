import { useParams } from "react-router-dom";
import useAdmin from "../../../context/AdminContextProvider";

function SubjectDetails() {
  const { id } = useParams();
  const { state } = useAdmin();
  const [subject] = state?.subjects.filter(
    (subject) => subject?.id === Number(id)
  );

   
  return (
    <h4 className="fw-bolder text-primary">
      {subject?.subject_name}:
      <span className="ms-3 fw-normal">{subject?.subject_description}</span>
    </h4>
  );
}

export default SubjectDetails;
