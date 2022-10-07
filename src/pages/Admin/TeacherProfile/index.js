import { useParams } from "react-router-dom";
import useAdmin from "../../../context/AdminContextProvider";
import { Button } from "react-bootstrap";
import { BsPlusLg } from "react-icons/bs";
import AdminSubjectTable from "../../../components/AdminSubjectTable";
import { useEffect } from "react";
import { API_URL } from "../../../config";

function TeacherProfile() {
  const { id } = useParams(); // Get URL Params
  const { state } = useAdmin(); // Custom Admin Context
  const [teacher] = state.teachers.filter((teacher) => teacher.id == id); // Filter the teacher Base on ID

  console.log(teacher);

  return (
    <>
      <div className="d-md-flex justify-content-between align-items-center mt-5">
        <Button variant="success">
          <BsPlusLg /> Add Subject To {teacher?.firstname} {teacher?.lastname}
        </Button>
      </div>

      <AdminSubjectTable subjects={teacher.subjects} hasDelete={false} />
    </>
  );
}

export default TeacherProfile;
