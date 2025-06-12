import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Modal, Button, Form, Table, InputGroup } from "react-bootstrap";

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [deleteItem, setDeleteItem] = useState({ type: "users", id: null });
  const [userForm, setUserForm] = useState({
    id: null,
    name: "",
    email: "",
    password: "",
    role: "user",
  });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/users", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setUsers(response.data);
    } catch (error) {
      toast.error("Failed to fetch users");
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:8000/api/users/${deleteItem.id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      fetchUsers();
      setShowDeleteModal(false);
      toast.success("User deleted");
    } catch (error) {
      toast.error("Failed to delete user");
    }
  };

  const handleEdit = async (e) => {
    e.preventDefault();
    try {
      const data = { ...userForm };
      if (!data.password) {
        delete data.password;
      }

      await axios.put(`http://localhost:8000/api/users/${userForm.id}`, data, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });

      fetchUsers();
      setShowEditModal(false);
      toast.success("User updated successfully");
    } catch (error) {
      toast.error(
        "Failed to update user: " +
          (error.response?.data?.message || "Unknown error")
      );
    }
  };

  const openDeleteModal = (id) => {
    setDeleteItem({ type: "users", id });
    setShowDeleteModal(true);
  };

  const openEditModal = (user) => {
    setUserForm({
      id: user.id,
      name: user.name,
      email: user.email,
      password: "",
      role: user.role || "user",
    });
    setShowEditModal(true);
  };

  // UX/UI styles object for consistency
  const styles = {
    page: {
      background: "#f8f9fa",
      minHeight: "100vh",
      padding: "32px 0",
      fontFamily: "'Inter', sans-serif",
    },
    header: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: 24,
    },
    tableWrapper: {
      background: "#fff",
      borderRadius: 16,
      boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
      padding: 24,
      marginTop: 24,
    },
    table: {
      borderRadius: 12,
      overflow: "hidden",
      fontSize: 15,
      verticalAlign: "middle",
    },
    th: {
      background: "#f1f3f5",
      fontWeight: 700,
      color: "#495057",
      border: "none",
      fontSize: 16,
      letterSpacing: 0.5,
      verticalAlign: "middle",
    },
    td: {
      verticalAlign: "middle",
      border: "none",
      background: "transparent",
    },
    actionBtn: {
      borderRadius: 20,
      padding: "4px 16px",
      fontSize: 14,
      marginRight: 8,
    },
    modalHeader: {
      background: "#f1f3f5",
      borderBottom: "none",
      borderRadius: "16px 16px 0 0",
      padding: "16px 24px",
    },
    modalBody: {
      padding: 24,
    },
    modalFooter: {
      borderTop: "none",
      padding: 16,
      justifyContent: "flex-end",
    },
    formLabel: {
      fontWeight: 600,
      marginBottom: 4,
      color: "#495057",
    },
    formControl: {
      borderRadius: 12,
      fontSize: 15,
      marginBottom: 16,
    },
    inputGroupText: {
      borderRadius: "12px 0 0 12px",
      background: "#e9ecef",
      borderRight: "none",
      color: "#495057",
    },
  };

  return (
    <div style={styles.page}>
      <div className="container">
        <div style={styles.header}>
          <h3 style={{ fontWeight: 700, letterSpacing: 1 }}>User Management</h3>
        </div>

        {/* Table for Users */}
        <div style={styles.tableWrapper}>
          <Table responsive hover style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>ID</th>
                <th style={styles.th}>Name</th>
                <th style={styles.th}>Email</th>
                <th style={styles.th}>Role</th>
                <th style={styles.th}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.length > 0 ? (
                users.map((user) => (
                  <tr key={user.id}>
                    <td style={styles.td}>{user.id}</td>
                    <td style={styles.td}>{user.name}</td>
                    <td style={styles.td}>{user.email}</td>
                    <td style={styles.td}>{user.role || "user"}</td>
                    <td style={styles.td}>
                      <Button
                        variant="outline-primary"
                        size="sm"
                        style={styles.actionBtn}
                        onClick={() => openEditModal(user)}
                      >
                        <i className="bi bi-pencil-square me-1"></i>Edit
                      </Button>
                      <Button
                        variant="outline-danger"
                        size="sm"
                        style={styles.actionBtn}
                        onClick={() => openDeleteModal(user.id)}
                      >
                        <i className="bi bi-trash me-1"></i>Delete
                      </Button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center">
                    No users found
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </div>

        {/* Delete Confirmation Modal */}
        <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Confirm Delete</Modal.Title>
          </Modal.Header>
          <Modal.Body>Are you sure you want to delete this user?</Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={() => setShowDeleteModal(false)}
            >
              Cancel
            </Button>
            <Button variant="danger" onClick={handleDelete}>
              Delete
            </Button>
          </Modal.Footer>
        </Modal>

        {/* Edit User Modal */}
        <Modal
          show={showEditModal}
          onHide={() => setShowEditModal(false)}
          centered
        >
          <Modal.Header closeButton style={styles.modalHeader}>
            <Modal.Title>Edit User</Modal.Title>
          </Modal.Header>
          <Modal.Body style={styles.modalBody}>
            <Form onSubmit={handleEdit}>
              <Form.Group className="mb-3">
                <Form.Label style={styles.formLabel}>Name</Form.Label>
                <InputGroup>
                  <InputGroup.Text style={styles.inputGroupText}>
                    <i className="bi bi-person"></i>
                  </InputGroup.Text>
                  <Form.Control
                    type="text"
                    value={userForm.name}
                    onChange={(e) =>
                      setUserForm({ ...userForm, name: e.target.value })
                    }
                    required
                    style={{
                      ...styles.formControl,
                      marginBottom: 0,
                      borderRadius: "0 12px 12px 0",
                    }}
                  />
                </InputGroup>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label style={styles.formLabel}>Email</Form.Label>
                <InputGroup>
                  <InputGroup.Text style={styles.inputGroupText}>
                    <i className="bi bi-envelope"></i>
                  </InputGroup.Text>
                  <Form.Control
                    type="email"
                    value={userForm.email}
                    onChange={(e) =>
                      setUserForm({ ...userForm, email: e.target.value })
                    }
                    required
                    style={{
                      ...styles.formControl,
                      marginBottom: 0,
                      borderRadius: "0 12px 12px 0",
                    }}
                  />
                </InputGroup>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label style={styles.formLabel}>Password</Form.Label>
                <InputGroup>
                  <InputGroup.Text style={styles.inputGroupText}>
                    <i className="bi bi-key"></i>
                  </InputGroup.Text>
                  <Form.Control
                    type="password"
                    value={userForm.password}
                    onChange={(e) =>
                      setUserForm({ ...userForm, password: e.target.value })
                    }
                    placeholder="Leave blank to keep current password"
                    style={{
                      ...styles.formControl,
                      marginBottom: 0,
                      borderRadius: "0 12px 12px 0",
                    }}
                  />
                </InputGroup>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label style={styles.formLabel}>Role</Form.Label>
                <InputGroup>
                  <InputGroup.Text style={styles.inputGroupText}>
                    <i className="bi bi-person-badge"></i>
                  </InputGroup.Text>
                  <Form.Select
                    value={userForm.role}
                    onChange={(e) =>
                      setUserForm({ ...userForm, role: e.target.value })
                    }
                    required
                    style={{
                      ...styles.formControl,
                      marginBottom: 0,
                      borderRadius: "0 12px 12px 0",
                    }}
                  >
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                  </Form.Select>
                </InputGroup>
              </Form.Group>

              <div className="d-flex justify-content-end gap-2">
                <Button
                  variant="secondary"
                  onClick={() => setShowEditModal(false)}
                >
                  Cancel
                </Button>
                <Button variant="primary" type="submit">
                  Save Changes
                </Button>
              </div>
            </Form>
          </Modal.Body>
        </Modal>
      </div>
    </div>
  );
};

export default UserManagement;
