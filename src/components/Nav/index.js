import { Link } from "react-router-dom";
import "./style.css";
import logo from "../../img/company-logo.png";
import { GrFormClose } from "react-icons/gr";
import { Collapse } from "react-bootstrap";
import { ADMIN_USER, TEACHER_USER, STUDENT_USER } from "../../config";

function BtnHideNav() {
  return (
    <span className="fs-2 position-absolute end-0 me-3 d-md-none d-block btnToggleNav">
      <GrFormClose />
    </span>
  );
}

function NavLink({ href, title, icon }) {
  return (
    <Link to={`/${href}`}>
      <li className={`d-md-flex align-items-center ps-3 `}>
        <i className={`${icon} me-3 fs-4`}></i>
        {title}
      </li>
    </Link>
  );
}

function Nav({ user_type, onClick, open }) {
  let output;

  switch (user_type) {
    case ADMIN_USER:
      output = (
        <ul className="nav-items text-white mt-5 p-0">
          <NavLink
            href={"dashboard"}
            title={"Dashboard"}
            icon={"bi bi-speedometer"}
          />

          <NavLink
            href={"students"}
            title={"Students"}
            icon={"bi bi-mortarboard"}
          />

          <NavLink
            href={"teachers"}
            title={"Teachers"}
            icon={"bi bi-person-video3"}
          />
          <NavLink
            href={"subjects"}
            title={"Subjects"}
            icon={"bi bi-plus-slash-minus"}
          />
          <NavLink
            href={"grade_levels"}
            title={"Grade Levels"}
            icon={"bi bi-bar-chart"}
          />

          <NavLink href={"books"} title={"Books"} icon={"bi bi-book"} />

          <NavLink
            href={"events"}
            title={"Events"}
            icon={"bi bi-calendar-check"}
          />
        </ul>
      );
      break;
    case TEACHER_USER:
      output = (
        <ul className="nav-items text-white mt-5 p-0">
          <NavLink
            href={"dashboard"}
            title={"Dashboard"}
            icon={"bi bi-speedometer"}
          />
          <NavLink
            href={"students"}
            title={"Students"}
            icon={"bi bi-mortarboard"}
          />
          <NavLink
            href={"subjects"}
            title={"Subjects"}
            icon={"bi bi-plus-slash-minus"}
          />
          <NavLink
            href={"grade_levels"}
            title={"Grade Levels"}
            icon={"bi bi-bar-chart"}
          />
          <NavLink href={"books"} title={"Books"} icon={"bi bi-book"} />

          <NavLink
            href={"events"}
            title={"Events"}
            icon={"bi bi-calendar-check"}
          />
        </ul>
      );
      break;
    case STUDENT_USER:
      output = (
        <ul className="nav-items text-white mt-5 p-0">
          <NavLink
            href={"dashboard"}
            title={"Dashboard"}
            icon={"bi bi-speedometer"}
          />
          <NavLink
            href={"student_assignments"}
            title={"Assignments"}
            icon={"bi bi-card-checklist"}
          />
          <NavLink
            href={"student_quizes"}
            title={"Quizes"}
            icon={"bi bi-pencil"}
          />
          <NavLink
            href={"student_exams"}
            title={"Exams"}
            icon={"bi bi-files"}
          />

          <NavLink
            href={"events"}
            title={"Events"}
            icon={"bi bi-calendar-check"}
          />
        </ul>
      );
      break;

    default:
      break;
  }

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
        <div className="text-center">
          <img
            src={logo}
            alt="company_logo"
            width="120px"
            className="my-2 logo"
          />
          <p className="logo-subtitle">Learning Management System</p>
        </div>
        {output}
      </nav>
    </Collapse>
  );
}

export default Nav;
