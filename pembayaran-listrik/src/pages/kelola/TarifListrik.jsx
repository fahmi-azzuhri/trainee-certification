import React, { useState } from "react";
import { Table, Button, Modal, Form, Container } from "react-bootstrap";
import NavBar from "../../components/Nav/NavBar";
import data from "../../data.json";

const TarifListrik = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedTariff, setSelectedTariff] = useState({});
  const [formValues, setFormValues] = useState({ type: "", price: "" });

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedTariff({});
    setFormValues({ type: "", price: "" });
  };

  const handleInputChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  const handleAddTariff = () => {
    const newTariff = {
      id: data.tbTarifListrik.length + 1,
      type: formValues.type,
      price: formValues.price,
    };

    data.tbTarifListrik.push(newTariff);
    handleCloseModal();
  };

  const handleEditTariff = (tariff) => {
    setSelectedTariff(tariff);
    setFormValues({ type: tariff.kdtarif, price: tariff.tarif_perkwh });
    handleShowModal();
  };

  const handleUpdateTariff = () => {
    data.tbTarifListrik.forEach((tariff) => {
      if (tariff.id === selectedTariff.id) {
        tariff.kdtarif = formValues.type;
        tariff.tarif_perkwh = formValues.price;
      }
    });

    handleCloseModal();
  };

  const handleDeleteTariff = (tariff) => {
    const filteredTariffs = data.tbTarifListrik.filter(
      (t) => t.id !== tariff.id
    );
    data.tbTarifListrik = filteredTariffs;
  };

  return (
    <>
      <NavBar />
      <div className="mt-3">
        <Container>
          <h2>Kelola Tarif Listrik</h2>

          <Button variant="primary" onClick={handleShowModal} className="mb-3">
            Tambah Tarif
          </Button>

          <Table striped bordered hover>
            <thead>
              <tr>
                <th>ID</th>
                <th>Tipe</th>
                <th>Harga</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {data.tbTarifListrik.map((tariff) => (
                <tr key={tariff.id}>
                  <td>{tariff.id}</td>
                  <td>{tariff.kdtarif}</td>
                  <td>{tariff.tarif_perkwh}</td>
                  <td>
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={() => handleEditTariff(tariff)}>
                      Edit
                    </Button>{" "}
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => handleDeleteTariff(tariff)}>
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
                {selectedTariff.id ? "Edit Tarif" : "Tambah Tarif"}
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Form.Group controlId="formType">
                  <Form.Label>Tipe</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Masukkan Tipe"
                    name="type"
                    value={formValues.type}
                    onChange={handleInputChange}
                  />
                </Form.Group>

                <Form.Group controlId="formPrice">
                  <Form.Label>Harga</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Masukkan Harga"
                    name="price"
                    value={formValues.price}
                    onChange={handleInputChange}
                  />
                </Form.Group>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseModal}>
                Batal
              </Button>
              {selectedTariff.id ? (
                <Button variant="primary" onClick={handleUpdateTariff}>
                  Simpan Perubahan
                </Button>
              ) : (
                <Button variant="primary" onClick={handleAddTariff}>
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

export default TarifListrik;
