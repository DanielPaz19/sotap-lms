import useAdmin from "../../context/AdminContextProvider";
import { Table } from "react-bootstrap";
import { BsFillTrashFill, BsPencilSquare } from "react-icons/bs";
import { Link } from "react-router-dom";

function AdminTeacherTable({ teachers, subject_id }) {
  const { deleteData, removeSubjectToTeacher } = useAdmin();

  return (
    <Table striped bordered hover size="sm" className="mt-3">
      <thead>
        <tr>
          <th className="text-center">TID</th>
          <th className="text-center">Full Name</th>
          <th className="text-center">Username</th>
          <th className="text-center">Actions</th>
        </tr>
      </thead>
      <tbody>
        {teachers?.map((teacher) => (
          <tr key={teacher.id}>
            <td className="text-center">{String(teacher.id).padStart(5, 0)}</td>
            <td>
              {teacher.firstname + " "}
              {teacher.middlename ? teacher.middlename + " " : ""}
              {teacher.lastname}
            </td>
            <td className="text-center">
              {teacher.user?.username ? (
                <span className="text-success">{teacher.user?.username}</span>
              ) : (
                <span className="text-danger fst-italic">Not Registered</span>
              )}
            </td>
            <td className="fs-5  text-center">
              <Link to={`/admin/teachers/${teacher.id}`}>
                <span className="hover text-info me-3">
                  <BsPencilSquare />
                </span>
              </Link>
              <span
                className="hover text-danger"
                onClick={() => {
                  subject_id
                    ? removeSubjectToTeacher({
                        subject_id,
                        teacher_id: teacher.id,
                      })
                    : deleteData("teachers", teacher.id);
                }}
              >
                <BsFillTrashFill />
              </span>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

AdminTeacherTable.defaultProps = {
  subject_id: null,
};

export default AdminTeacherTable;
