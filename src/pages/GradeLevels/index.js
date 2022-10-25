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

function GradeLevels() {
  return (
    <Container fluid="md" className="pt-4">
      <Tab.Container defaultActiveKey="first">
        <Row>
          <Col sm={3} lg={2} className="bg-white py-3 shadow rounded-3">
            <h4 className="text-primary text-center mb-4">Grade 1</h4>
            <Nav variant="pills" className="flex-column">
              <Nav.Item>
                <Nav.Link eventKey="first">Students</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="second">Subjects</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="third">Topics</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="forth">Quiz</Nav.Link>
              </Nav.Item>
            </Nav>
          </Col>
          <Col sm={9} lg={10}>
            <Tab.Content>
              <Tab.Pane eventKey="first">
                <StudentTable />
              </Tab.Pane>
              <Tab.Pane eventKey="second">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Non
                autem porro pariatur inventore magnam quidem atque ullam
                cupiditate aliquid corporis vitae temporibus sint animi facilis
                blanditiis ipsam molestiae, nesciunt iusto.
              </Tab.Pane>
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
    </Container>
  );
}

export default GradeLevels;
