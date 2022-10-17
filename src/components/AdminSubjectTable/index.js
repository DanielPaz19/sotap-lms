import useAdmin from "../../context/AdminContextProvider";
import { Table } from "react-bootstrap";
import { BsFillTrashFill, BsPencilSquare } from "react-icons/bs";
import { Link } from "react-router-dom";

function AdminSubjectTable({ subjects, teacher_id, hasDelete, variant }) {
  const { deleteData, removeSubjectToTeacher } = useAdmin();

  return (
    <Table striped bordered hover size="sm" className="mt-3">
      <thead>
        <tr>
          <th className="text-center">Subject ID</th>
          <th className="text-center">Subject Code</th>
          <th className="text-center">Subject Name</th>
          <th className="text-center">Subject Description</th>
          {hasDelete ? <th className="text-center">Actions</th> : ""}
        </tr>
      </thead>
      <tbody>
        {subjects?.map((subject) => (
          <tr key={subject.id}>
            <td className="text-center">{String(subject.id).padStart(5, 0)}</td>
            <td>{subject.subject_code}</td>
            <td>{subject.subject_name}</td>
            <td>{subject.subject_description}</td>
            <td className="fs-5 text-danger text-center">
              {variant === "teacher_profile" ? (
                ""
              ) : (
                <Link to={`/admin/subjects/${subject.id}`}>
                  <span className="hover text-info me-3">
                    <BsPencilSquare />
                  </span>
                </Link>
              )}
              {hasDelete ? (
                <span
                  className="hover"
                  onClick={() => {
                    variant === "teacher_profile"
                      ? removeSubjectToTeacher({
                          teacher_id: teacher_id,
                          subject_id: subject.id,
                        })
                      : deleteData("subjects", subject.id);
                  }}
                >
                  <BsFillTrashFill />
                </span>
              ) : (
                ""
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

AdminSubjectTable.defaultProps = {
  filter: null,
  hasDelete: true,
  variant: "subjects",
};

export default AdminSubjectTable;
