import { Form, Table } from "react-bootstrap";
import { BsFillTrashFill } from "react-icons/bs";
import useAdmin from "../../context/AdminContextProvider";

function AdminStudentTable({
  students,
  checkbox,
  handleCheckBox,
  error,
  onGradeLevels,
  grade_id,
}) {
  const { deleteData, removeStudentFromGradeLevel } = useAdmin();

  return (
    <Table striped bordered hover size="sm" className="mt-3 bg-white">
      <thead>
        <tr>
          {checkbox ? <th className="text-center"></th> : ""}
          <th className="text-center">SID</th>
          <th className="text-center">First Name</th>
          <th className="text-center">Middle Name</th>
          <th className="text-center">Last Name</th>
          {checkbox ? (
            ""
          ) : (
            <>
              <th className="text-center">Username</th>
              <th className="text-center">Actions</th>
            </>
          )}
        </tr>
      </thead>
      <tbody>
        {students?.map((student) => (
          <tr key={student.id}>
            {checkbox ? (
              <td className="text-center">
                {error ? (
                  <Form.Check
                    defaultValue={student.id}
                    onChange={(e) => handleCheckBox(e)}
                    id="checkStudent"
                    isInvalid
                  />
                ) : (
                  <Form.Check
                    defaultValue={student.id}
                    onChange={(e) => handleCheckBox(e)}
                    id="checkStudent"
                  />
                )}
              </td>
            ) : (
              ""
            )}
            <td className="text-center">{String(student.id).padStart(5, 0)}</td>
            <td>{student.firstname}</td>
            <td>{student.middlename}</td>
            <td>{student.lastname}</td>
            {checkbox ? (
              ""
            ) : (
              <>
                <td className="text-center">
                  {student.user?.username ? (
                    <span className="text-success">
                      {student.user?.username}
                    </span>
                  ) : (
                    <span className="text-danger fst-italic">
                      Not Registered
                    </span>
                  )}
                </td>
                <td className="fs-5 text-danger text-center">
                  <span
                    className="hover"
                    onClick={() => {
                      onGradeLevels
                        ? removeStudentFromGradeLevel({
                            grade_id: grade_id,
                            students: [student.id],
                          })
                        : deleteData("students", student.id);
                    }}
                  >
                    <BsFillTrashFill />
                  </span>
                </td>
              </>
            )}
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

AdminStudentTable.defaultProps = {
  checkbox: false,
  onGradeLevels: false,
};

export default AdminStudentTable;
