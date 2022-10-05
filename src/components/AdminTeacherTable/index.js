import useAdmin from "../../context/AdminContextProvider";
import { Table } from "react-bootstrap";
import { BsFillTrashFill } from "react-icons/bs";

function AdminTeacherTable() {
  const { state, deleteData } = useAdmin();

  return (
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
        {state.teachers.map((teacher) => (
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
