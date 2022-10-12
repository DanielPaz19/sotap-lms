import useAdmin from "../../context/AdminContextProvider";
import { Table } from "react-bootstrap";
import { BsFillTrashFill, BsEye } from "react-icons/bs";
import { Link } from "react-router-dom";

function AdminTeacherTable() {
  const { state, deleteData } = useAdmin();

  return (
    <Table striped bordered hover size="sm" className="mt-3">
      <thead>
        <tr>
          <th>TID</th>
          <th>Full Name</th>
          <th>Username</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {state.teachers.map((teacher) => (
          <tr key={teacher.id}>
            <td>{String(teacher.id).padStart(5, 0)}</td>
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
              <Link to={`${teacher.id}`}>
                <span className="hover text-info me-3">
                  <BsEye />
                </span>
              </Link>
              <span
                className="hover text-danger"
                onClick={() => {
                  deleteData("teachers", teacher.id);
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

export default AdminTeacherTable;
