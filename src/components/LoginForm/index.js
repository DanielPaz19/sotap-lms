import { useState } from "react";
import { FaKey, FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";

function LoginForm({ onSubmit }) {
  const [formData, setFormData] = useState(null);

  return (
    <div className="col-md-5 col-12 position-relative">
      <div className="login mx-auto position-absolute top-50 start-50 translate-middle">
        <div className="text-center">
          <h2 className="loginTxt">Login</h2>
          <form
            action=""
            onSubmit={(e) => {
              e.preventDefault();
              onSubmit(formData);
            }}
          >
            <div className="container pb-5">
              <div className="fontuser position-relative">
                <span className="position-absolute top-50 translate-middle ms-4">
                  <FaUser />
                </span>
                <input
                  autoComplete="off"
                  type="text"
                  placeholder="User ID"
                  name="uname"
                  required
                  id="inputUsername"
                  onChange={(e) =>
                    setFormData({ ...formData, username: e.target.value })
                  }
                />
              </div>

              <div className="fontpassword position-relative">
                <span className="position-absolute top-50 translate-middle ms-4">
                  <FaKey />
                </span>
                <input
                  autoComplete="false"
                  type="password"
                  placeholder="Password"
                  name="psw"
                  id="inputPassword"
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                />
              </div>
              <button className="loginBtn btn" type="submit">
                Login
              </button>
              <Link to="/login/registration">Register</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;
