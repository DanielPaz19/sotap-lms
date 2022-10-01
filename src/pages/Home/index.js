import "./style.css";
import Nav from "../../components/Nav";
import Header from "../../components/Header";
import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import { STUDENT_USER } from "../../config";

function Home({ user }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (window.screen.width > 600) setOpen(true);
  }, []);

  useEffect(() => {
    const checkLogin = () => {
      return localStorage.getItem("student_id");
    };

    checkLogin()
      ? console.log("Welcome to SOTAP LMS")
      : (window.location.pathname = "/login");
  }, []);

  const toggleNav = (e) => {
    if (e.target.closest(".btnToggleNav")) return setOpen(!open);
  };

  const closeNav = () => {
    if (window.screen.width < 600) setOpen(false);
  };

  return (
    <>
      <Nav
        user_type={STUDENT_USER}
        onClick={toggleNav}
        open={open}
        closeNav={closeNav}
      />
      <div className="main">
        <Header
          title={""}
          user_type={STUDENT_USER}
          toggleNav={toggleNav}
          user={user}
        />
        <div className="content container-fluid">
          <Outlet user={user} />
        </div>
      </div>
    </>
  );
}

export default Home;
