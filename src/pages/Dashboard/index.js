import SubjectCard from "../../components/SubjectCard";
import { Form, Button, InputGroup } from "react-bootstrap";
import { FaSearch } from "react-icons/fa";

function Dashboard() {
  const subjects = [
    "Mother Tongue",
    "Filipino",
    "English",
    "Mathematics",
    "Science",
    "Araling Panlipunan",
    "Edukasyon sa Pagpapakatao (EsP)",
    "Music",
    "Arts",
    "Physical Education",
    "Health",
    "Edukasyong Pantahanan at Pangkabuhayan (EPP)",
    "Technology and Livelihood Education (TLE)",
  ];

  const subjectOutput = subjects.map((subject) => (
    <div className="col-6 col-md-4 col-lg-3 col-xl-3">
      <SubjectCard title={subject} />
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
