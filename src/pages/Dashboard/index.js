import "./style.css";
import SubjectCard from "../../components/SubjectCard";
import { useEffect } from "react";
import useUser from "../../context/UserContextProvider";
import TeacherDashboard from "../../components/TeacherDashboard";
import { API_URL } from "../../config";
import { useReducer } from "react";
import studentReducer, { initialState } from "../../context/studentReducer";

function Dashboard({ user }) {
  const [state, dispatch] = useReducer(studentReducer, initialState);
  const { state: userState } = useUser();

  useEffect(() => {
    getStudentGradeLevel(userState?.id);
    getGradesubjects(state?.grade_level?.id);
  }, [userState?.id, state?.grade_level?.id]);

  const getStudentGradeLevel = async (student_id) => {
    dispatch({ type: "REQUESTED" });
    const res = await fetch(API_URL + `/students/${student_id}`, {
      credentials: "include",
    });

    const { data } = await res.json();
    dispatch({
      type: "UPDATE_DATA",
      payload: { key: "grade_level", value: data?.grade_level[0] },
    });
  };

  const getGradesubjects = async (grade_id) => {
    dispatch({ type: "REQUESTED" });
    const res = await fetch(API_URL + `/grade_levels/${grade_id}/subjects`, {
      credentials: "include",
    });

    const { data } = await res.json();

    dispatch({
      type: "UPDATE_DATA",
      payload: { key: "subjects", value: data },
    });
  };

  // const getSubjectId = async (student_id) => {
  //   try {
  //     const response = await fetch(
  //       `http://localhost:3500/student_subjects?student_id=${student_id}`
  //     );
  //     const data = await response.json();

  //     if (data === "") return;

  //     return data[0].subjects_id;
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // useEffect(() => {
  //   const getSubjects = async (qry) => {
  //     const subjectId = await getSubjectId(user.id);
  //     try {
  //       const response = await fetch(
  //         `http://localhost:3500/subjects?${subjectId
  //           .map((id) => `id=${id}`)
  //           .join("&")}&title_like=${qry}`
  //       );
  //       const data = await response.json();
  //       setSubjects(data);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };

  //   (async () => await getSubjects(qry))();
  // }, [user, qry]);

  // Teacher Dashboard will show if teacher is login
  if (Number(userState?.user?.role) === 2) return <TeacherDashboard />;

  return (
    <>
      <div className="container px-0">
        <div className="row">
          <div className="col-12 col-md-6"></div>
          <div className="col-12 col-md-6 pt-3"></div>
        </div>
        <div className="container px-0">
          <div className="pt-2 pb-4 row g-2">
            {state?.subjects.map((subject, index) => (
              <div
                className="col-6 col-md-4 col-lg-3 col-xl-3 p-0"
                key={subject.id}
              >
                <SubjectCard
                  title={subject.subject_name}
                  img_src={subject?.img_url + `?random=${index}`}
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
