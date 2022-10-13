import { Table } from "react-bootstrap";
import { BsFillTrashFill } from "react-icons/bs";
import useAdmin from "../../context/AdminContextProvider";

function AdminStudentTable({ students }) {
  const { deleteData } = useAdmin();

  return (
    <Table striped bordered hover size="sm" className="mt-3">
      <thead>
        <tr>
          <th>SID</th>
          <th>First Name</th>
          <th>Middle Name</th>
          <th>Last Name</th>
          <th>Username</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {students?.map((student) => (
          <tr key={student.id}>
            <td>{String(student.id).padStart(5, 0)}</td>
            <td>{student.firstname}</td>
            <td>{student.middlename}</td>
            <td>{student.lastname}</td>
            <td className="text-center">
              {student.user?.username ? (
                <span className="text-success">{student.user?.username}</span>
              ) : (
                <span className="text-danger fst-italic">Not Registered</span>
              )}
            </td>
            <td className="fs-5 text-danger text-center">
              <span
                className="hover"
                onClick={() => {
                  deleteData("students", student.id);
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

export default AdminStudentTable;
