import "./style.css";
import { GiHamburgerMenu } from "react-icons/gi";
import { ImExit } from "react-icons/im";
import { useState } from "react";
import { Collapse } from "react-bootstrap";
import { ADMIN_USER, STUDENT_USER, TEACHER_USER } from "../../config";
import useUser from "../../context/UserContextProvider";

function Header({ title, user_type, toggleNav, user }) {
  const [dropDownIsOpen, setDropDownIsOpen] = useState(false);

  const { state, logout } = useUser();

  const toggleDropDown = () => {
    setDropDownIsOpen(!dropDownIsOpen);
  };

  const setUserType = (user_type) => {
    switch (user_type) {
      case ADMIN_USER:
        return "Admin";
      case TEACHER_USER:
        return "Teacher";
      case STUDENT_USER:
        return "Student";

      default:
        return;
    }
  };

  const logoutUser = async () => {
    await logout();
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
            {state?.firstname} {state?.lastname}
          </p>
          <p className="user-role my-0">{setUserType(state?.user.role)}</p>
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
            {state?.firstname} {state?.lastname}
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
