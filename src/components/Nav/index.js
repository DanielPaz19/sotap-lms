import React from "react";
import "./style.css";
import logo from "../../img/company-logo.png";

function Nav() {
  return (
    <nav className="bg-primary">
      <div className="text-center">
        <img
          src={logo}
          alt="company_logo"
          width="120px"
          className="my-2 logo"
        />
        <p className="logo-subtitle">Learning Management System</p>
      </div>
      <ul className="nav-items text-white mt-5 p-0">
        <a href="../dashboard">
          <li className="d-md-flex align-items-center ps-3 active-link">
            <i className="bi bi-speedometer me-3 fs-4"></i>Dashboard
          </li>
        </a>
        <a href="../students">
          <li className="d-md-flex align-items-center ps-3">
            <i className="bi bi-mortarboard me-3 fs-4"></i>Students
          </li>
        </a>
        <a href="../teachers">
          <li className="d-md-flex align-items-center ps-3">
            <i className="bi bi-person-video3 me-3 fs-4"></i>Teachers
          </li>
        </a>
        <a href="../subjects">
          <li className="d-md-flex align-items-center ps-3">
            <i className="bi bi-plus-slash-minus me-3 fs-4"></i> Subjects
          </li>
        </a>
        <a href="../grade_levels">
          <li className="d-md-flex align-items-center ps-3">
            <i className="bi bi-bar-chart me-3 fs-4"></i>Grade Levels
          </li>
        </a>
        <a href="../books">
          <li className="d-md-flex align-items-center ps-3">
            <i className="bi bi-book me-3 fs-4"></i>Books
          </li>
        </a>
        <a href="../events">
          <li className="d-md-flex align-items-center ps-3">
            <i className="bi bi-calendar-check me-3 fs-4"></i>Events
          </li>
        </a>
      </ul>
    </nav>
  );
}

export default Nav;
