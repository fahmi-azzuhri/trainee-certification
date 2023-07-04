import React, { useState, useEffect } from "react";
import { Button, Table, Modal, Form, Container } from "react-bootstrap";
import data from "../../data.json";
import NavBar from "../../components/Nav/NavBar";

const DataUser = () => {
  const [users, setUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState({});
  const [formValues, setFormValues] = useState({ username: "", email: "" });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    setUsers(data.tbUser);
  };

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedUser({});
    setFormValues({ username: "", email: "" });
  };

  const handleInputChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  const handleAddUser = () => {
    const newUser = {
      id: users.length + 1,
      username: formValues.username,
      email: formValues.email,
    };

    setUsers([...users, newUser]);
    handleCloseModal();
  };

  const handleEditUser = (user) => {
    setSelectedUser(user);
    setFormValues({ username: user.username, email: user.email });
    handleShowModal();
  };

  const handleUpdateUser = () => {
    const updatedUsers = users.map((user) =>
      user.id === selectedUser.id ? { ...user, ...formValues } : user
    );

    setUsers(updatedUsers);
    handleCloseModal();
  };

  const handleDeleteUser = (user) => {
    const filteredUsers = users.filter((u) => u.id !== user.id);
    setUsers(filteredUsers);
  };

  return (
    <>
      <NavBar />
      <div className="mt-3">
        <Container>
          <h2>Kelola Data User</h2>

          <Button variant="primary" onClick={handleShowModal} className="mb-3">
            Tambah User
          </Button>

          <Table striped bordered hover>
            <thead>
              <tr>
                <th>ID</th>
                <th>Nama</th>
                <th>Email</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                  <td>
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={() => handleEditUser(user)}>
                      Edit
                    </Button>{" "}
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => handleDeleteUser(user)}>
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
                {selectedUser.id ? "Edit User" : "Tambah User"}
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Form.Group controlId="formName">
                  <Form.Label>Nama</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Masukkan Nama"
                    name="username"
                    value={formValues.username}
                    onChange={handleInputChange}
                  />
                </Form.Group>

                <Form.Group controlId="formEmail">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Masukkan Email"
                    name="email"
                    value={formValues.email}
                    onChange={handleInputChange}
                  />
                </Form.Group>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseModal}>
                Batal
              </Button>
              {selectedUser.id ? (
                <Button variant="primary" onClick={handleUpdateUser}>
                  Simpan Perubahan
                </Button>
              ) : (
                <Button variant="primary" onClick={handleAddUser}>
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

export default DataUser;
