import "./style.css";
import { GiHamburgerMenu } from "react-icons/gi";
import { ImExit } from "react-icons/im";
import { useState } from "react";
import { Collapse } from "react-bootstrap";

function Header({ title, user_type, toggleNav }) {
  const [dropDownIsOpen, setDropDownIsOpen] = useState(false);

  const toggleDropDown = () => {
    setDropDownIsOpen(!dropDownIsOpen);
    console.log(dropDownIsOpen);
  };

  let user;

  switch (user_type) {
    case 1:
      user = "Admin";
      break;
    case 2:
      user = "Teacher";
      break;
    case 3:
      user = "Student";
      break;

    default:
      break;
  }

  const logoutUser = () => {
    // Destroy LocalStorage ID
    localStorage.clear();
    // Route to Login
    window.location.pathname = "/login";
  };

  return (
    <header
      className="d-flex align-items-center justify-content-between"
      onClick={toggleNav}
    >
      <span className="fs-4 ms-3 btnToggleNav" id="menu">
        <GiHamburgerMenu />
      </span>
      <div className="ms-md-5 fs-4 text-primary">{title}</div>
      <div className="user d-md-flex d-flex align-items-center">
        <img
          src="https://picsum.photos/200"
          alt=""
          width="45px"
          className="rounded-pill border border-dark me-2"
        />
        <div className="me-3 d-none d-md-block">
          <p className="fs-6 fw-bold text-primary my-0 user-name">
            Juan Dela Cruz
          </p>
          <p className="user-role my-0">{user}</p>
        </div>
        <div className="me-3 user-dropdown " onClick={toggleDropDown}>
          <i className="bi bi-chevron-down fs-5"></i>
        </div>
      </div>

      <Collapse in={dropDownIsOpen}>
        <div
          className="bg-white position-absolute end-0 top-100 me-1 me-md-2 mt-1 shadow"
          id="accountDropDown"
        >
          <div className="text-center fw-bold text-primary mt-1  d-block d-md-none">
            Juan Dela Cruz
            <hr />
          </div>
          <div className="pb-3 pt-md-3 fs-6 text-center" onClick={logoutUser}>
            <ImExit /> Logout
          </div>
        </div>
      </Collapse>
    </header>
  );
}

export default Header;
