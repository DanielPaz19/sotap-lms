import { Tab, Tabs, Container, Row, Col } from "react-bootstrap";

function AdminGradeLevels() {
  return (
    <>
      <Container fluid="md">
        <Row>
          <Col md={2}>1 of 1</Col>
          <Col>
            <Tabs
              defaultActiveKey="profile"
              id="fill-tab-example"
              className="mt-4 "
              fill
            >
              <Tab eventKey="home" title="Students">
                <div className="bg-white p-3">Student List</div>
              </Tab>
              <Tab eventKey="profile" title="Teachers">
                Sample Tab 2
              </Tab>
              <Tab eventKey="longer-tab" title="Subjects">
                Sample Tab 3
              </Tab>
            </Tabs>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default AdminGradeLevels;
