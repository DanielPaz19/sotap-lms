import { Col, Container, Nav, Row, Tab, Table } from "react-bootstrap";

function StudentTable() {
  return (
    <Table striped responsive>
      <thead>
        <tr className="text-primary">
          <th>#</th>
          <th>First Name</th>
          <th>Middle Name</th>
          <th>Last Name</th>
          <th>Username</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>00001</td>
          <td>Mark</td>
          <td>Mark</td>
          <td>Otto</td>
          <td>@mdo</td>
        </tr>
        <tr>
          <td>00002</td>
          <td>Jacob</td>
          <td>Jacob</td>
          <td>Thornton</td>
          <td>@fat</td>
        </tr>
        <tr>
          <td>00003</td>
          <td>Larry the Bird</td>
          <td>Larry the Bird</td>
          <td>Larry the Bird</td>
          <td>@twitter</td>
        </tr>
      </tbody>
    </Table>
  );
}
function SubjectTable() {
  return (
    <Table striped responsive>
      <thead>
        <tr className="text-primary">
          <th>#</th>
          <th>Subject Code</th>
          <th>Subject Name</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>00001</td>
          <td>Mark</td>
          <td>Mark</td>
          <td>Otto</td>
        </tr>
        <tr>
          <td>00002</td>
          <td>Jacob</td>
          <td>Jacob</td>
          <td>Thornton</td>
        </tr>
        <tr>
          <td>00003</td>
          <td>Larry the Bird</td>
          <td>Larry the Bird</td>
          <td>Larry the Bird</td>
        </tr>
      </tbody>
    </Table>
  );
}

function GradeLevels() {
  return (
    <Container fluid="md" className="pt-4">
      <Tab.Container defaultActiveKey="first" fluid>
        <Row>
          <Col sm={3} lg={2}>
            <Container className="bg-white py-3 px-3 shadow rounded-3">
              <h4 className="text-primary text-center mb-4">Grade 1</h4>
              <Nav variant="pills" className="flex-column">
                <Nav.Item>
                  <Nav.Link eventKey="first" as="li" className="hover">
                    Students
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="second" as="li" className="hover">
                    Subjects
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="third" as="li" className="hover">
                    Topics
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="forth" as="li" className="hover">
                    Quiz
                  </Nav.Link>
                </Nav.Item>
              </Nav>
            </Container>
          </Col>
          <Col sm={9} lg={10}>
            <Tab.Content>
              <Tab.Pane eventKey="first">
                <StudentTable />
              </Tab.Pane>
              <Tab.Pane eventKey="second">
                <SubjectTable />
              </Tab.Pane>
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
    </Container>
  );
}

export default GradeLevels;
