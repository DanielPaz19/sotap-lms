import { useEffect, useRef } from "react";
import { useState } from "react";
import { Button, FloatingLabel, Form, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";
import useUser from "../../context/UserContextProvider";

function LoginForm({ onSubmit }) {
  const [formData, setFormData] = useState({
    role: 3,
    username: "",
    password: "",
  });
  const [clearError, setClearError] = useState(false);
  const { login, state: userState } = useUser();

  console.log(userState);

  // Set focus on input Select
  const inputSelect = useRef();
  useEffect(() => {
    inputSelect.current.focus();
  }, []);

  const handleSubmit = async () => {
    await login(formData);
    setClearError(false);
  };

  return (
    <div className="col-md-5 col-12 position-relative">
      <div className="login mx-auto position-absolute top-50 start-50 translate-middle">
        <div className="text-center">
          <h2 className="loginTxt">Login</h2>
          <form
            action=""
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
          >
            <div className="container pb-5">
              <FloatingLabel label="Login As" className="text-secondary mb-2">
                <Form.Select
                  ref={inputSelect}
                  aria-label="Floating label select example"
                  onChange={(e) => {
                    setClearError(true);
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
                  isInvalid={!clearError ? userState?.error && true : false}
                  type="text"
                  placeholder="Username"
                  onChange={(e) => {
                    setClearError(true);
                    setFormData({ ...formData, username: e.target.value });
                  }}
                />
              </FloatingLabel>

              <FloatingLabel label="Password" className="text-secondary mb-2">
                <Form.Control
                  isInvalid={!clearError ? userState?.error && true : false}
                  type="password"
                  placeholder="Password"
                  onChange={(e) => {
                    setClearError(true);
                    setFormData({ ...formData, password: e.target.value });
                  }}
                />
              </FloatingLabel>

              <Button
                type="submit"
                className="w-100 mb-2"
                size="lg"
                disabled={userState?.loading ? true : false}
              >
                {userState?.loading ? (
                  <Spinner as="span" animation="border" size="sm" />
                ) : (
                  "Login"
                )}
              </Button>

              <Link to="/login/registration">Register</Link>
            </div>
            <p className="text-danger">
              {!clearError ? userState?.error && userState?.error?.message : ""}
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;
