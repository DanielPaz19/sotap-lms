import "./style.css";
import Nav from "../../components/Nav";
import Header from "../../components/Header";
import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import { STUDENT_USER } from "../../config";

function Home() {
  const [open, setOpen] = useState(true);

  useEffect(() => {
    checkLogin()
      ? console.log("Welcome to SOTAP LMS")
      : (window.location.pathname = "/login");
  }, []);

  const checkLogin = () => {
    return localStorage.getItem("student_id");
  };

  const toggleNav = (e) => {
    if (e.target.closest(".btnToggleNav")) return setOpen(!open);
  };

  return (
    <>
      <Nav user_type={STUDENT_USER} onClick={toggleNav} open={open} />
      <div className="main">
        <Header title={""} user_type={3} toggleNav={toggleNav} />
        <div className="content container-fluid">
          <Outlet />
        </div>
      </div>
    </>
  );
}

export default Home;
