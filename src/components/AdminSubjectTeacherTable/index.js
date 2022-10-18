import { Table } from "react-bootstrap";
import { BsFillTrashFill } from "react-icons/bs";
import useAdmin from "../../context/AdminContextProvider";

function AdminSubjectTeacherTable({ subject_teachers, grade_id }) {
  const { removeSubjectToGrade } = useAdmin();

  const handleDelete = async (id) => {
    await removeSubjectToGrade({ grade_id, subject_teacher_id: id });
  };

  return (
    <>
      <Table striped bordered hover size="sm" className=" mt-3 bg-white">
        <thead>
          <tr>
            <th className="text-center">STID</th>
            <th className="text-center">Subject Code</th>
            <th className="text-center">Subject Name</th>
            <th className="text-center">Teacher</th>
            <th className="text-center">Action</th>
          </tr>
        </thead>
        <tbody>
          {subject_teachers?.map((item) => (
            <tr key={item.id}>
              <td className="text-center">
                {String(item.subject?.id).padStart(4, 0)}
              </td>
              <td className="text-center">{item.subject?.subject_code}</td>
              <td>{item.subject?.subject_name}</td>
              <td>
                {item.teacher?.firstname} {item.teacher?.lastname}
              </td>
              <td className="fs-5  text-center">
                <span
                  className="hover text-danger"
                  onClick={() => handleDelete(item.id)}
                >
                  <BsFillTrashFill />
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
}

export default AdminSubjectTeacherTable;
