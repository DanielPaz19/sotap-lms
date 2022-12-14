import "./style.css";
import Nav from "../../components/Nav";
import Header from "../../components/Header";
import { Navigate, Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import { STUDENT_USER, TEACHER_USER } from "../../config";
import useUser from "../../context/UserContextProvider";
import { TeacherContextProvider } from "../../context/TeacherContextProvider";

function Home({ user }) {
  const [open, setOpen] = useState(false);

  // Auto open nav
  useEffect(() => {
    if (window.screen.width > 600) setOpen(true);
  }, []);

  const toggleNav = (e) => {
    if (e.target.closest(".btnToggleNav")) return setOpen(!open);
  };

  const closeNav = () => {
    if (window.screen.width < 600) setOpen(false);
  };

  const { state } = useUser();

  if (!state?.user_id) return <Navigate to="/login" />;

  return (
    <>
      <Nav
        user_type={STUDENT_USER}
        onClick={toggleNav}
        open={open}
        closeNav={closeNav}
        variant={state?.user?.role}
      />
      <div className="main">
        <Header
          title={""}
          user_type={STUDENT_USER}
          toggleNav={toggleNav}
          user={user}
        />
        <div className="content container-fluid">
          {state?.user?.role === TEACHER_USER ? (
            <TeacherContextProvider>
              <Outlet user={user} />
            </TeacherContextProvider>
          ) : (
            <Outlet user={user} />
          )}
        </div>
      </div>
    </>
  );
}

export default Home;
