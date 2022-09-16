import SubjectCard from "../../components/SubjectCard";
import { Form, Button, InputGroup } from "react-bootstrap";
import { FaSearch } from "react-icons/fa";
import { useEffect, useState } from "react";

function Dashboard() {
  const [subjects, setSubjects] = useState([]);

  useEffect(() => {
    const getSubjects = async () => {
      try {
        const response = await fetch("http://localhost:3500/subjects");
        const data = await response.json();
        console.log(data);
        setSubjects(data);
      } catch (error) {
        console.log(error);
      }
    };

    (async () => await getSubjects())();
  }, []);

  const subjectOutput = subjects.map((subject) => (
    <div className="col-6 col-md-4 col-lg-3 col-xl-3" key={subject.id}>
      <SubjectCard title={subject.title} />
    </div>
  ));

  return (
    <>
      <div className="row">
        <div className="col-12 col-md-6"></div>
        <div className="col-12 col-md-6">
          <InputGroup className="pt-3" size="lg">
            <Form.Control placeholder="Search" />
            <Button className="btn-secondary">
              <FaSearch />
            </Button>
          </InputGroup>
        </div>
      </div>
      <div className="pt-2 row g-2">{subjectOutput}</div>
    </>
  );
}

export default Dashboard;
