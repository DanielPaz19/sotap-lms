import { Button, InputGroup, Form, Table, Pagination } from "react-bootstrap";
import { BsPlusLg, BsSearch, BsPencilSquare } from "react-icons/bs";

function AdminStudent() {
  return (
    <>
      <div className="d-md-flex justify-content-between align-items-center mt-5">
        <Button variant="success">
          <BsPlusLg /> Add Student
        </Button>

        <InputGroup className=" w-50" size="lg">
          <Form.Control
            placeholder="Search Student"
            aria-label="Search Studen"
            aria-describedby="basic-addon2"
          />
          <Button variant="primary" id="button-addon2">
            <BsSearch />
          </Button>
        </InputGroup>
      </div>
      <Table striped bordered hover size="sm" className="mt-3">
        <thead>
          <tr>
            <th>SID</th>
            <th>First Name</th>
            <th>Middle Name</th>
            <th>Last Name</th>
            <th>Status</th>
            <th>Grade Level</th>
            <th>Username</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>Mark</td>
            <td>Otto</td>
            <td>@mdo</td>
            <td>Enrolled</td>
            <td>5</td>
            <td>@mdo</td>
            <td className="fs-5 text-success text-center  hover">
              <BsPencilSquare />
            </td>
          </tr>
          <tr>
            <td>2</td>
            <td>Jacob</td>
            <td>Thornton</td>
            <td>@fat</td>
            <td>Transferred</td>
            <td>2</td>
            <td>@fat</td>
            <td className="fs-5 text-success text-center hover">
              <BsPencilSquare />
            </td>
          </tr>
          <tr>
            <td>3</td>
            <td colSpan={2}>Larry the Bird</td>
            <td>@twitter</td>
            <td>Drop</td>
            <td>1</td>
            <td>@twitter</td>
            <td className="fs-5 text-success text-center hover">
              <BsPencilSquare />
            </td>
          </tr>
          <tr>
            <td>3</td>
            <td colSpan={2}>Larry the Bird</td>
            <td>@twitter</td>
            <td>Suspended</td>
            <td>3</td>
            <td>@twitter</td>
            <td className="fs-5 text-success text-center hover">
              <BsPencilSquare />
            </td>
          </tr>
        </tbody>
      </Table>
      <div className="d-md-flex justify-content-end mt-5">
        <Pagination>
          <Pagination.First />
          <Pagination.Prev />
          <Pagination.Item>{1}</Pagination.Item>
          <Pagination.Ellipsis />

          <Pagination.Item>{10}</Pagination.Item>
          <Pagination.Item>{11}</Pagination.Item>
          <Pagination.Item active>{12}</Pagination.Item>
          <Pagination.Item>{13}</Pagination.Item>
          <Pagination.Item disabled>{14}</Pagination.Item>

          <Pagination.Ellipsis />
          <Pagination.Item>{20}</Pagination.Item>
          <Pagination.Next />
          <Pagination.Last />
        </Pagination>
      </div>
    </>
  );
}

export default AdminStudent;
