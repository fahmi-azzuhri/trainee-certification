import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";

const Landing = () => {
  return (
    <div>
      <Container fluid className="landing-page mt-3">
        <Row className="justify-content-center align-items-center">
          <Col md={6} className="text-center">
            <h1>Selamat Datang di Pembayaran Listrik</h1>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur
              sit amet leo id odio tempus vehicula. Integer nec gravida justo,
              vitae convallis purus.
            </p>
            <Button variant="primary">Mulai Bayar</Button>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Landing;
