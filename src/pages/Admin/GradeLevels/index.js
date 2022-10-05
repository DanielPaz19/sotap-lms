// import { Tab, Tabs, Container, Row, Col } from "react-bootstrap";
// import AdminStudentTable from "../../../components/AdminStudentTable";
// import AdminSubjectTable from "../../../components/AdminSubjectTable";
// import AdminTeacherTable from "../../../components/AdminTeacherTable";

import { Button } from "react-bootstrap";
import { BsPlusLg } from "react-icons/bs";
import AdminGradeTable from "../../../components/AdminGradeTable";

function AdminGradeLevels() {
  return (
    <>
      <div className="d-md-flex justify-content-between align-items-center mt-5">
        <Button variant="success">
          <BsPlusLg /> Add Grade Level
        </Button>
      </div>

      <AdminGradeTable />
      {/* <h3 className="text-center">Grade 1</h3>

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
        <Tab eventKey="longer-tab" title="Subjects">
          <AdminSubjectTable />
        </Tab>
      </Tabs> */}
    </>
  );
}

export default AdminGradeLevels;
