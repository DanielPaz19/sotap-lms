import "./style.css";
import SubjectCard from "../../components/SubjectCard";
import { Form } from "react-bootstrap";
import { FaSearch } from "react-icons/fa";
import { useEffect, useState } from "react";
import useUser from "../../context/UserContextProvider";
import TeacherDashboard from "../../components/TeacherDashboard";

function Dashboard({ user }) {
  const [subjects, setSubjects] = useState([]);
  const [qry, setQry] = useState("");

  const { state: userState } = useUser();

  const getSubjectId = async (student_id) => {
    try {
      const response = await fetch(
        `http://localhost:3500/student_subjects?student_id=${student_id}`
      );
      const data = await response.json();

      if (data === "") return;

      return data[0].subjects_id;
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const getSubjects = async (qry) => {
      const subjectId = await getSubjectId(user.id);
      try {
        const response = await fetch(
          `http://localhost:3500/subjects?${subjectId
            .map((id) => `id=${id}`)
            .join("&")}&title_like=${qry}`
        );
        const data = await response.json();
        setSubjects(data);
      } catch (error) {
        console.log(error);
      }
    };

    (async () => await getSubjects(qry))();
  }, [user, qry]);

  const searchSubject = (e) => {
    setQry(e.target.value);
  };

  // Teacher Dashboard will show if teacher is login
  if (Number(userState?.user?.role) === 2) return <TeacherDashboard />;

  return (
    <>
      <div className="container px-0">
        <div className="row">
          <div className="col-12 col-md-6"></div>
          <div className="col-12 col-md-6 pt-3">
            <div className="position-relative">
              <Form.Control
                placeholder="Search"
                onChange={searchSubject}
                className="ps-5"
              />
              <span className="text-secondary position-absolute top-50 start-0 translate-middle ms-4">
                <FaSearch />
              </span>
            </div>
          </div>
        </div>
        <div className="container px-0">
          <div className="pt-2 pb-4 row g-2">
            {subjects.map((subject) => (
              <div
                className="col-6 col-md-4 col-lg-3 col-xl-3 p-0"
                key={subject.id}
              >
                <SubjectCard
                  title={subject.title}
                  img_src={subject.img_src}
                  id={subject.id}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
