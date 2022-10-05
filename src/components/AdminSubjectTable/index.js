import useAdmin from "../../context/AdminContextProvider";
import { Table } from "react-bootstrap";
import { BsFillTrashFill } from "react-icons/bs";

function AdminSubjectTable() {
  const { state, deleteData } = useAdmin();

  return (
    <Table striped bordered hover size="sm" className="mt-3">
      <thead>
        <tr>
          <th>Subject ID</th>
          <th>Subject Code</th>
          <th>Subject Name</th>
          <th>Subject Description</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {state.subjects.map((subject) => (
          <tr key={subject.id}>
            <td>{String(subject.id).padStart(5, 0)}</td>
            <td>{subject.subject_code}</td>
            <td>{subject.subject_name}</td>
            <td>{subject.subject_description}</td>
            <td className="fs-5 text-danger text-center">
              <span
                className="hover"
                onClick={() => {
                  deleteData("subjects", subject.id);
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

export default AdminSubjectTable;
