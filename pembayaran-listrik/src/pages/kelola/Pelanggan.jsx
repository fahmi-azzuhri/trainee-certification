import React, { useState } from "react";
import { Table, Button, Modal, Form, Container } from "react-bootstrap";
import NavBar from "../../components/Nav/NavBar";
import data from "../../data.json";

const Pelanggan = () => {
  const [customers, setCustomers] = useState(data.tbPelanggan);

  const [tariffs] = useState(data.tbTarifListrik);

  const [showModal, setShowModal] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState({});
  const [formValues, setFormValues] = useState({
    nama_pelanggan: "",
    alamat: "",
    tbTarifListrik_id: "",
  });

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedCustomer({});
    setFormValues({ nama_pelanggan: "", alamat: "", tbTarifListrik_id: "" });
  };

  const handleInputChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  const handleAddCustomer = () => {
    const newCustomer = {
      id: customers.length + 1,
      nama_pelanggan: formValues.nama_pelanggan,
      alamat: formValues.alamat,
      tbTarifListrik_id: parseInt(formValues.tbTarifListrik_id),
    };

    setCustomers([...customers, newCustomer]);
    handleCloseModal();
  };

  const handleEditCustomer = (customer) => {
    setSelectedCustomer(customer);
    setFormValues({
      nama_pelanggan: customer.nama_pelanggan,
      alamat: customer.alamat,
      tbTarifListrik_id: customer.tbTarifListrik_id,
    });
    handleShowModal();
  };

  const handleUpdateCustomer = () => {
    const updatedCustomers = customers.map((customer) =>
      customer.id === selectedCustomer.id
        ? { ...customer, ...formValues }
        : customer
    );

    setCustomers(updatedCustomers);
    handleCloseModal();
  };

  const handleDeleteCustomer = (customer) => {
    const filteredCustomers = customers.filter((c) => c.id !== customer.id);
    setCustomers(filteredCustomers);
  };

  const getTariffType = (tariffId) => {
    const tariff = tariffs.find((tariff) => tariff.id === tariffId);
    return tariff ? tariff.type : "";
  };

  return (
    <>
      <NavBar />
      <div>
        <Container>
          <h2>Kelola Data Pelanggan</h2>

          <Button variant="primary" onClick={handleShowModal} className="mb-3">
            Tambah Pelanggan
          </Button>

          <Table striped bordered hover>
            <thead>
              <tr>
                <th>ID</th>
                <th>Nama</th>
                <th>Alamat</th>
                <th>Tarif</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {customers.map((customer) => (
                <tr key={customer.id}>
                  <td>{customer.id}</td>
                  <td>{customer.nama_pelanggan}</td>
                  <td>{customer.alamat}</td>
                  <td>{getTariffType(customer.tbTarifListrik_id)}</td>
                  <td>
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={() => handleEditCustomer(customer)}>
                      Edit
                    </Button>{" "}
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => handleDeleteCustomer(customer)}>
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
                {selectedCustomer.id ? "Edit Pelanggan" : "Tambah Pelanggan"}
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Form.Group controlId="formName">
                  <Form.Label>Nama</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Masukkan Nama"
                    name="nama_pelanggan"
                    value={formValues.nama_pelanggan}
                    onChange={handleInputChange}
                  />
                </Form.Group>

                <Form.Group controlId="formAddress">
                  <Form.Label>Alamat</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Masukkan Alamat"
                    name="alamat"
                    value={formValues.alamat}
                    onChange={handleInputChange}
                  />
                </Form.Group>

                <Form.Group controlId="formTariff">
                  <Form.Label>Tarif</Form.Label>
                  <Form.Control
                    as="select"
                    name="tbTarifListrik_id"
                    value={formValues.tbTarifListrik_id}
                    onChange={handleInputChange}>
                    <option value="">Pilih Tarif</option>
                    {tariffs.map((tariff) => (
                      <option key={tariff.id} value={tariff.id}>
                        {tariff.type} - Rp {tariff.price}
                      </option>
                    ))}
                  </Form.Control>
                </Form.Group>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseModal}>
                Batal
              </Button>
              {selectedCustomer.id ? (
                <Button variant="primary" onClick={handleUpdateCustomer}>
                  Simpan Perubahan
                </Button>
              ) : (
                <Button variant="primary" onClick={handleAddCustomer}>
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

export default Pelanggan;
