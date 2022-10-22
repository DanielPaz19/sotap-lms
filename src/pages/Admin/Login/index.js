import Container from "react-bootstrap/Container";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { useState } from "react";
import { Navigate } from "react-router-dom";
import useLogInStatus from "../../../customHooks/useLoginStatus";
import { ADMIN_USER, API_URL } from "../../../config";

function AdminLogin() {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [auth, setAuth] = useState(false);

  const [error, setError] = useState(false);

  // Check if user is already logged in
  const user = useLogInStatus();

  if (user?.id) {
    if (user?.role === ADMIN_USER) return <Navigate to="/admin" />;
  }

  const submit = async () => {
    try {
      const response = await fetch(API_URL + "/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
        credentials: "include",
      });

      const status = response.status;

      if (status === 200) return setAuth(true);

      return setError(true);
    } catch (err) {
      console.log(err);
    }
  };

  if (auth) return <Navigate to="/admin" />;

  return (
    <Container className="mt-5">
      <Row>
        <Col md={3}></Col>
        <Col md={6}>
          <FloatingLabel
            controlId="floatingInput"
            label="Username"
            className="mb-3"
          >
            <Form.Control
              type="text"
              placeholder="Username"
              onChange={(e) => {
                setError(false);
                setFormData((prev) => ({ ...prev, username: e.target.value }));
              }}
            />
          </FloatingLabel>
          <FloatingLabel controlId="floatingPassword" label="Password">
            <Form.Control
              type="password"
              placeholder="Password"
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  password: e.target.value,
                }))
              }
            />
          </FloatingLabel>
          <Button variant="primary w-100 mt-3" size="lg" onClick={submit}>
            Login
          </Button>
        </Col>
        <Col md={3}></Col>
      </Row>
      {error ? (
        <Container className="mt-3">
          <div className="text-center text-danger">
            Invalid Username or Password!
          </div>
        </Container>
      ) : (
        ""
      )}
    </Container>
  );
}

export default AdminLogin;
