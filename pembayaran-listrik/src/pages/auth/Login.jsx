import React, { useState, useEffect } from "react";
import { Row, Col, Form, Button } from "react-bootstrap";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../../redux/actions/auth";
import bg from "../../images/bg.png";

const Login = (props) => {
  const { user, isLoggedIn } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [emailValid, setEmailValid] = useState(true);
  const [passwordValid, setPasswordValid] = useState(true);

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const validateEmail = () => {
    // Regular expression for email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setEmailValid(emailRegex.test(email));
  };

  const validatePassword = () => {
    // Regular expression for password validation
    const passwordRegex =
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/;
    setPasswordValid(passwordRegex.test(password));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    validateEmail();
    validatePassword();

    if (emailValid && passwordValid) {
      const data = { email, password };
      await dispatch(login(data, navigate));
    }
  };

  useEffect(() => {
    if (isLoggedIn || user) {
      navigate("/dashboard");
    }
  }, [isLoggedIn, navigate, user]);

  return (
    <Row className="vh-100">
      <Col md={6} className="loginPageLeft">
        <div className="d-flex w-100 h-100">
          <img src={bg} alt="" />
        </div>
      </Col>
      <Col
        md={6}
        className="loginPageRight d-flex align-items-center justify-content-center vh-100 flex-column">
        <Form className="w-75" onSubmit={onSubmit}>
          <h3 className="mb-3">Login</h3>
          <p>
            Login now and enjoy a comfortable and secure flight experience safe
            flight experience.
          </p>
          <Form.Group controlId="formBasicEmail" className="mt-2">
            <Form.Label>Email/No Telepon</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              isInvalid={!emailValid}
            />
            {!emailValid && (
              <Form.Control.Feedback type="invalid">
                Invalid email
              </Form.Control.Feedback>
            )}
          </Form.Group>

          <Form.Group controlId="formBasicPassword" className="mt-2">
            <Row>
              <Col md={6}>
                <Form.Label>Password</Form.Label>
              </Col>
              <Col md={6} className="d-flex flex-row-reverse">
                <Form.Label>
                  <Link
                    to="/resetpassword"
                    className="text-primary-default text-decoration-none">
                    Lupa kata sandi?
                  </Link>
                </Form.Label>
              </Col>
            </Row>

            <div className="password-input-wrapper d-flex align-items-center border rounded-3">
              <Form.Control
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                className="border-0"
                onChange={(e) => setPassword(e.target.value)}
                isInvalid={!passwordValid}
              />
              <Button
                className="password-toggle-icon flex-row-reverse position-relative bg-transparent text-black border-0"
                onClick={handleTogglePassword}>
                {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
              </Button>
            </div>
            {!passwordValid && (
              <Form.Control.Feedback type="invalid">
                Invalid password
              </Form.Control.Feedback>
            )}
          </Form.Group>

          <Button type="submit" className="w-100 mt-3 btn-primary-default mb-3">
            Masuk
          </Button>
          <p className="text-center mt-5">
            Don't have an account?
            <Button
              onClick={() => navigate("/register")}
              className="text-primary-default text-decoration-none border-0 bg-transparent">
              <span className="text-primary">Register here</span>
            </Button>
          </p>
        </Form>
      </Col>
    </Row>
  );
};

export default Login;
