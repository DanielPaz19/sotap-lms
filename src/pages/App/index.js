import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "../../customHooks/scrollToTop";
import AdminHome from "../Admin/Home";
import AdminLogin from "../Admin/Login";
import AdminStudent from "../Admin/Students";
import AdminDashboard from "../Admin/Dashboard";
import Books from "../Books";
import Dashboard from "../Dashboard";
import Events from "../Events";
import GradeLevels from "../GradeLevels";
import Home from "../Home";
import Login from "../Login";
import Modules from "../Modules";
import Quizes from "../Quizes";
import Students from "../Students";
import Subjects from "../Subjects";
import Teachers from "../Teachers";
import Topics from "../Topics";
import "./style.css";

function App() {
  const [user, setUser] = useState({
    id: null,
    firstname: "",
    lastname: "",
  });

  useEffect(() => {
    const id = localStorage.getItem("student_id");

    fetch(`http://localhost:3500/students?id=${id}`)
      .then((res) => res.json())
      .then((data) => setUser(data[0]))
      .catch((err) => console.log(err));
  }, []);

  // const checkUser = async ({ username, password }) => {
  //   try {
  //     const response = await fetch(
  //       `http://localhost:3500/users?username=${username}&password=${password}`
  //     );

  //     const data = await response.json();

  //     if (data === "") return;

  //     const student_id = data[0].student_id;

  //     localStorage.setItem("student_id", student_id);

  //     return student_id;
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const handleSubmit = async (formData) => {
    console.log(formData);

    // (await checkUser(formData))
    //   ? (window.location.pathname = "/")
    //   : (window.location.pathname = "/login");
  };

  return (
    <>
        <BrowserRouter>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<Home user={user} />}>
              <Route path="/" element={<Dashboard user={user} />} />
              <Route path="dashboard" element={<Dashboard user={user} />} />
              <Route path="modules" element={<Dashboard user={user} />} />
              <Route path="modules/:id" element={<Modules user={user} />} />
              <Route
                path="modules/topic/:id"
                element={<Topics user={user} />}
              />
              <Route path="modules/quiz/:id" element={<Quizes />} />
              <Route path="students" element={<Students />} />
              <Route path="teachers" element={<Teachers />} />
              <Route path="subjects" element={<Subjects />} />
              <Route path="grade_levels" element={<GradeLevels />} />
              <Route path="books" element={<Books />} />
              <Route path="events" element={<Events />} />
            </Route>
            <Route path="login" element={<Login onSubmit={handleSubmit} />} />

            <Route path="admin/login" element={<AdminLogin />} />
            <Route path="/admin" element={<AdminHome />}>
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="home" element={<AdminDashboard />} />
              <Route path="student" element={<AdminStudent />} />
            </Route>
          </Routes>
        </BrowserRouter>
    </>
  );
}

export default App;
