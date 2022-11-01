import { Link } from "react-router-dom";
import "./style.css";
import logo from "../../img/company-logo.png";
import { GrFormClose } from "react-icons/gr";
import { Collapse } from "react-bootstrap";
import { TEACHER_USER, STUDENT_USER } from "../../config";

function BtnHideNav() {
  return (
    <span className="fs-2 position-absolute end-0 me-3 d-md-none d-block btnToggleNav">
      <GrFormClose />
    </span>
  );
}

function NavLink({ href, title, icon, disabled }) {
  return (
    <Link to={`/${href}`}>
      <li
        className={`d-md-flex align-items-center ps-3 ${
          disabled ? "text-muted" : ""
        }`}
        style={{ minWidth: "16rem" }}
      >
        <i className={`${icon} me-3 fs-4`}></i>
        {title}
      </li>
    </Link>
  );
}

function StudentNav({ user_type, onClick, open, closeNav }) {
  return (
    <Collapse
      in={open}
      dimension="width"
      onExiting={function () {
        document.querySelector("nav").classList.add("nav-active");
      }}
      onExited={function () {
        document.querySelector("nav").classList.add("nav-active");
      }}
    >
      <nav className="bg-primary" onClick={onClick}>
        <BtnHideNav />
        <div className="text-center logo-container">
          <img
            src={logo}
            alt="company_logo"
            width="120px"
            className="my-2 logo"
          />
          <p className="logo-subtitle">Learning Management System</p>
        </div>
        <ul className="nav-items text-white mt-5 p-0" onClick={closeNav}>
          <NavLink
            href={"dashboard"}
            title={"Dashboard"}
            icon={"bi bi-speedometer"}
          />
          <NavLink
            href={"/#"}
            title={"Assignments"}
            icon={"bi bi-card-checklist"}
            disabled={true}
          />
          <NavLink
            href={"/#"}
            title={"Quizzes"}
            icon={"bi bi-pencil"}
            disabled={true}
          />
          <NavLink
            href={"/#"}
            title={"Exams"}
            icon={"bi bi-files"}
            disabled={true}
          />
        </ul>
      </nav>
    </Collapse>
  );
}

function TeacherNav({ user_type, onClick, open, closeNav }) {
  return (
    <Collapse
      in={open}
      dimension="width"
      onExiting={function () {
        document.querySelector("nav").classList.add("nav-active");
      }}
      onExited={function () {
        document.querySelector("nav").classList.add("nav-active");
      }}
    >
      <nav className="bg-primary" onClick={onClick}>
        <BtnHideNav />
        <div className="text-center logo-container">
          <img
            src={logo}
            alt="company_logo"
            width="120px"
            className="my-2 logo"
          />
          <p className="logo-subtitle">Learning Management System</p>
        </div>
        <ul className="nav-items text-white mt-5 p-0" onClick={closeNav}>
          <NavLink
            href={"dashboard"}
            title={"Dashboard"}
            icon={"bi bi-speedometer"}
          />
          <NavLink
            href={"teacher/topics"}
            title={"Topics"}
            icon={"bi bi-lightbulb"}
          />
          <NavLink href={"quizzes"} title={"Quizzes"} icon={"bi bi-pencil"} />
        </ul>
      </nav>
    </Collapse>
  );
}

function Nav({ user_type, onClick, open, closeNav, variant }) {
  if (variant === TEACHER_USER) {
    return <TeacherNav onClick={onClick} open={open} closeNav={closeNav} />;
  }

  if (variant === STUDENT_USER) {
    return <StudentNav onClick={onClick} open={open} closeNav={closeNav} />;
  }
}

NavLink.defaultProps = {
  disabled: false,
};

export default Nav;
