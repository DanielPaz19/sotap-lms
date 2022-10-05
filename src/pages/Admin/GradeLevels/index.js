import { Tab, Tabs, Container, Row, Col } from "react-bootstrap";
import AdminStudentTable from "../../../components/AdminStudentTable";
import AdminTeacherTable from "../../../components/AdminTeacherTable";

function AdminGradeLevels() {
  return (
    <>
      <h3 className="text-center">Grade 1</h3>

      <Tabs
        defaultActiveKey="profile"
        id="fill-tab-example"
        className="mt-3"
        fill
      >
        <Tab eventKey="home" title="Students">
          <AdminStudentTable />
        </Tab>
        <Tab eventKey="profile" title="Teachers">
          <AdminTeacherTable />
        </Tab>
        <Tab eventKey="longer-tab" title="Subjects"></Tab>
      </Tabs>
    </>
  );
}

export default AdminGradeLevels;
