import React, { useState, useEffect } from "react";
import { Table, Button, Modal, Form } from "react-bootstrap";
import NavBar from "../../components/Nav/NavBar";
import { Container } from "react-bootstrap";
import data from "../../data.json";

const Tagihan = () => {
  const [bills, setBills] = useState([]);
  const [customers, setCustomers] = useState([]);

  const [showModal, setShowModal] = useState(false);
  const [selectedBill, setSelectedBill] = useState({});
  const [formValues, setFormValues] = useState({
    customerId: "",
    year: "",
    month: "",
    usage: "",
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    // Set the bills and customers state from the imported data
    setBills(data.tbTagihan);
    setCustomers(data.tbPelanggan);
  };

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedBill({});
    setFormValues({ customerId: "", year: "", month: "", usage: "" });
  };

  const handleInputChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  const handleAddBill = () => {
    const newBill = {
      id: bills.length + 1,
      tbPelanggan_id: parseInt(formValues.customerId),
      tahun_tagihan: formValues.year,
      bulan_tagihan: formValues.month,
      pemakaian: parseInt(formValues.usage),
    };

    setBills([...bills, newBill]);
    handleCloseModal();
  };

  const handleEditBill = (bill) => {
    setSelectedBill(bill);
    setFormValues({
      customerId: bill.tbPelanggan_id,
      year: bill.tahun_tagihan,
      month: bill.bulan_tagihan,
      usage: bill.pemakaian,
    });
    handleShowModal();
  };

  const handleUpdateBill = () => {
    const updatedBills = bills.map((bill) =>
      bill.id === selectedBill.id ? { ...bill, ...formValues } : bill
    );

    setBills(updatedBills);
    handleCloseModal();
  };

  const handleDeleteBill = (bill) => {
    const filteredBills = bills.filter((b) => b.id !== bill.id);
    setBills(filteredBills);
  };

  return (
    <>
      <NavBar />
      <div>
        <Container>
          <h2>Kelola Data Tagihan Listrik</h2>

          <Button variant="primary" onClick={handleShowModal} className="mb-3">
            Tambah Tagihan
          </Button>

          <Table striped bordered hover>
            <thead>
              <tr>
                <th>ID</th>
                <th>Tahun</th>
                <th>Bulan</th>
                <th>Pemakaian</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {bills.map((bill) => (
                <tr key={bill.id}>
                  <td>{bill.id}</td>
                  <td>{bill.tahun_tagihan}</td>
                  <td>{bill.bulan_tagihan}</td>
                  <td>{bill.pemakaian}</td>
                  <td>
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={() => handleEditBill(bill)}>
                      Edit
                    </Button>{" "}
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => handleDeleteBill(bill)}>
                      Hapus
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>

          <Modal show={showModal} onHide={handleCloseModal}>
            <Modal.Header closeButton>
              <Modal.Title>
                {selectedBill.id ? "Edit Tagihan" : "Tambah Tagihan"}
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Form.Group controlId="formCustomer">
                  <Form.Label>Pelanggan</Form.Label>
                  <Form.Control
                    as="select"
                    name="customerId"
                    value={formValues.customerId}
                    onChange={handleInputChange}>
                    <option value="">Pilih Pelanggan</option>
                    {customers.map((customer) => (
                      <option key={customer.id} value={customer.id}>
                        {customer.name}
                      </option>
                    ))}
                  </Form.Control>
                </Form.Group>

                <Form.Group controlId="formYear">
                  <Form.Label>Tahun</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Masukkan Tahun"
                    name="year"
                    value={formValues.year}
                    onChange={handleInputChange}
                  />
                </Form.Group>

                <Form.Group controlId="formMonth">
                  <Form.Label>Bulan</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Masukkan Bulan"
                    name="month"
                    value={formValues.month}
                    onChange={handleInputChange}
                  />
                </Form.Group>

                <Form.Group controlId="formUsage">
                  <Form.Label>Pemakaian</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Masukkan Pemakaian"
                    name="usage"
                    value={formValues.usage}
                    onChange={handleInputChange}
                  />
                </Form.Group>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseModal}>
                Batal
              </Button>
              {selectedBill.id ? (
                <Button variant="primary" onClick={handleUpdateBill}>
                  Simpan Perubahan
                </Button>
              ) : (
                <Button variant="primary" onClick={handleAddBill}>
                  Tambahkan
                </Button>
              )}
            </Modal.Footer>
          </Modal>
        </Container>
      </div>
    </>
  );
};

export default Tagihan;
