import { Table } from "react-bootstrap";
import useAdmin from "../../context/AdminContextProvider";
import { BsFillTrashFill } from "react-icons/bs";

function AdminGradeTable() {
  const { state, deleteData } = useAdmin();

  console.log(state);
  return (
    <Table striped bordered hover size="sm" className="mt-3">
      <thead>
        <tr>
          <th>Grade Level ID</th>

          <th>Level</th>
          <th>Description</th>
          <th>Students</th>
          <th>Teachers</th>
          <th>Subjects</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {state.grade_levels.map((grade) => (
          <tr key={grade.id}>
            <td>{String(grade.id).padStart(5, 0)}</td>
            <td>{grade.level}</td>
            <td>{grade.name}</td>
            <td>{grade.students.length}</td>
            <td>{grade.teachers.length}</td>
            <td>{grade.subjects.length}</td>
            <td className="fs-5 text-danger text-center">
              <span
                className="hover"
                onClick={() => {
                  deleteData("grade_levels", grade.id);
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

export default AdminGradeTable;
