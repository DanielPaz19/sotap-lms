import "./style.css";
import { GiHamburgerMenu } from "react-icons/gi";

function Header({ title, user_type, toggleNav }) {
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

  return (
    <header
      className="d-flex align-items-center justify-content-between"
      onClick={toggleNav}
    >
      <span className="fs-4 ms-3 btnToggleNav" id="menu">
        <GiHamburgerMenu />
      </span>
      <div className="ms-md-5 fs-4 text-primary">{title}</div>
      <div className="user d-md-flex align-items-center">
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
        <div className="me-3 user-dropdown d-none d-md-block">
          <i className="bi bi-chevron-down fs-5"></i>
        </div>
      </div>
    </header>
  );
}

export default Header;
