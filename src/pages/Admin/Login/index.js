import Container from "react-bootstrap/Container";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { useState } from "react";
import { Navigate } from "react-router-dom";
import { ADMIN_USER } from "../../../config";
import useUser from "../../../context/UserContextProvider";

function AdminLogin() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    role: 1,
  });

  const { state, login } = useUser();

  const [error, setError] = useState(false);

  // Check if user is already logged in

  console.log(state);

  if (state?.user_id) {
    if (state?.role === ADMIN_USER) return <Navigate to="/admin" />;
  }

  const handleSubmit = async () => {
    await login(formData);
  };

  return (
    <Container className="mt-5">
      <Row>
        <Col md={3}></Col>
        <Col md={6}>
          <Form
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
          >
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
                  setFormData((prev) => ({
                    ...prev,
                    username: e.target.value,
                  }));
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
            <Button variant="primary w-100 mt-3" size="lg" type="submit">
              Login
            </Button>
          </Form>
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
