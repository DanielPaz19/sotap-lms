import { useEffect, useRef } from "react";
import { useState } from "react";
import { Button, FloatingLabel, Form } from "react-bootstrap";
import { Link } from "react-router-dom";

function LoginForm({ onSubmit }) {
  const [formData, setFormData] = useState({
    role: 3,
    username: "",
    password: "",
  });

  // Set focus on input Select
  const inputSelect = useRef();
  useEffect(() => {
    inputSelect.current.focus();
  }, []);

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
              <FloatingLabel label="Login As" className="text-secondary mb-2">
                <Form.Select
                  ref={inputSelect}
                  aria-label="Floating label select example"
                  onChange={(e) => {
                    setFormData((prev) => ({
                      ...prev,
                      role: Number(e.target.value),
                    }));
                  }}
                >
                  <option value="3">Student</option>
                  <option value="2">Teacher</option>
                </Form.Select>
              </FloatingLabel>

              <FloatingLabel label="Username" className="text-secondary mb-2">
                <Form.Control
                  type="text"
                  placeholder="Username"
                  onChange={(e) =>
                    setFormData({ ...formData, username: e.target.value })
                  }
                />
              </FloatingLabel>

              <FloatingLabel label="Password" className="text-secondary mb-2">
                <Form.Control
                  type="password"
                  placeholder="Password"
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                />
              </FloatingLabel>

              <Button type="submit" className="w-100 mb-2" size="lg">
                Login
              </Button>

              {/* <div className="fontuser position-relative">
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
              </button> */}
              <Link to="/login/registration">Register</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;
