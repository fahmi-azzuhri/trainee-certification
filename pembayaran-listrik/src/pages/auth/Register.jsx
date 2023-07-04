import React, { useState } from "react";
import { Row, Col, Form, Button } from "react-bootstrap";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { register } from "../../redux/actions/auth";
import { useDispatch } from "react-redux";
import bg from "../../images/bg.png";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();

    const data = {
      name,
      email,
      phoneNumber,
      password, // Set the role to "buyer"
    };

    dispatch(register(data, navigate));
  };

  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const isEmailValid = (email) => {
    // Regular expression for email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const isPasswordValid = (password) => {
    // Regular expression for password validation
    const passwordRegex = /^(?=.*[A-Z])(?=.*[\W_])(?=.*[0-9]).{8,}$/;
    return passwordRegex.test(password);
  };
  const isPhoneNumberValid = (phoneNumber) => {
    // Regular expression for phone number validation
    const phoneNumberRegex = /^62\d{11}$/;
    return phoneNumberRegex.test(phoneNumber);
  };

  return (
    <Row className="vh-100">
      <Col md={6} className="loginPageLeft ">
        <div className="d-flex w-100 h-100">
          <img src={bg} alt="" />
        </div>
      </Col>
      <Col
        md={6}
        className="loginPageRight d-flex align-items-center justify-content-center">
        <Form className="w-75" onSubmit={onSubmit}>
          <h3 className="mb-3">Daftar</h3>

          <Form.Group controlId="formBasicName">
            <Form.Label>Nama</Form.Label>
            <Form.Control
              type="text"
              placeholder="Nama Lengkap"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formBasicEmail" className="mt-2">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Contoh: user@gmail.com"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              isInvalid={email !== "" && !isEmailValid(email)}
            />
            <Form.Control.Feedback type="invalid">
              {!isEmailValid(email) && "Masukkan email yang valid."}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="formBasicNoTelp" className="mt-2">
            <Form.Label>No Telepon</Form.Label>
            <Form.Control
              type="text"
              placeholder="+62"
              name="phoneNumber"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              isInvalid={phoneNumber !== "" && !isPhoneNumberValid(phoneNumber)}
            />
            <Form.Control.Feedback type="invalid">
              {!isPhoneNumberValid(phoneNumber) &&
                "Masukkan nomor telepon yang valid (14 angka)."}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="formBasicPassword" className="mt-2">
            <Form.Label>Password</Form.Label>

            <div className="password-input-wrapper d-flex align-items-center border rounded-3">
              <Form.Control
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                className="border-0"
                onChange={(e) => setPassword(e.target.value)}
                isInvalid={password !== "" && !isPasswordValid(password)}
              />
              <Button
                className="password-toggle-icon flex-row-reverse position-relative bg-transparent text-black border-0"
                onClick={handleTogglePassword}>
                {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
              </Button>
            </div>
            <Form.Control.Feedback type="invalid">
              {!isPasswordValid(password) && "Password minimal 8 karakter."}
            </Form.Control.Feedback>
          </Form.Group>

          <Button
            type="submit"
            className="w-100 mt-3 mb-3 btn-primary-default border-0">
            Daftar
          </Button>
          <p className="text-center mt-5">
            Sudah punya akun?
            <Button
              onClick={() => navigate("/login")}
              className="text-primary-default text-decoration-none border-0 bg-transparent">
              <span className="text-primary">Login di sini</span>
            </Button>
          </p>
        </Form>
      </Col>
    </Row>
  );
};

export default Register;
