import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Modal, Button, Form, Table, InputGroup } from 'react-bootstrap';

const CategoryManagement = () => {
  const [categories, setCategories] = useState([]);
  const [categoryForm, setCategoryForm] = useState({ id: null, name: '', description: '' });
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteItem, setDeleteItem] = useState({ type: 'category', id: null }); // Changed type to singular for dynamic message

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/categories', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setCategories(response.data);
    } catch (error) {
      toast.error('Failed to fetch categories: ' + (error.response?.data?.message || 'Unknown error'));
    }
  };

  const handleCategorySubmit = async (e) => {
    e.preventDefault();
    try {
      if (categoryForm.id) {
        await axios.put(`http://localhost:8000/api/categories/${categoryForm.id}`, categoryForm, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
      } else {
        await axios.post('http://localhost:8000/api/categories', categoryForm, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
      }
      fetchCategories();
      setCategoryForm({ id: null, name: '', description: '' });
      setShowCategoryModal(false);
      toast.success('Category saved successfully!');
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.response?.data?.error || 'Unknown error';
      toast.error('Failed to save category: ' + errorMessage);
      if (error.response?.data?.errors) {
        Object.values(error.response.data.errors).forEach(messages => {
          messages.forEach(message => toast.error(message));
        });
      }
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:8000/api/categories/${deleteItem.id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      fetchCategories();
      setShowDeleteModal(false);
      toast.success('Category deleted successfully!');
    } catch (error) {
      toast.error('Failed to delete category: ' + (error.response?.data?.message || 'Unknown error'));
    }
  };

  const openCategoryModal = (category = null) => {
    setCategoryForm(category || { id: null, name: '', description: '' });
    setShowCategoryModal(true);
  };

  const openDeleteModal = (id) => {
    setDeleteItem({ type: 'category', id });
    setShowDeleteModal(true);
  };

  // UX/UI styles object for consistency
  const styles = {
    page: {
      background: '#f8f9fa',
      minHeight: '100vh',
      padding: '32px 0',
      fontFamily: "'Inter', sans-serif", // Ensure consistent font
    },
    header: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: 24,
    },
    addBtn: {
      borderRadius: 24,
      padding: '8px 24px',
      fontWeight: 600,
      fontSize: 16,
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
    },
    tableWrapper: {
      background: '#fff',
      borderRadius: 16,
      boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
      padding: 24,
      marginTop: 24,
    },
    table: {
      borderRadius: 12,
      overflow: 'hidden',
      fontSize: 15,
      verticalAlign: 'middle',
    },
    th: {
      background: '#f1f3f5',
      fontWeight: 700,
      color: '#495057',
      border: 'none',
      fontSize: 16,
      letterSpacing: 0.5,
      verticalAlign: 'middle',
    },
    td: {
      verticalAlign: 'middle',
      border: 'none',
      background: 'transparent',
    },
    actionBtn: {
      borderRadius: 20,
      padding: '4px 16px',
      fontSize: 14,
      marginRight: 8,
    },
    modalHeader: {
      background: '#f1f3f5',
      borderBottom: 'none',
      borderRadius: '16px 16px 0 0',
      padding: '16px 24px',
    },
    modalBody: {
      padding: 24,
    },
    modalFooter: {
      borderTop: 'none',
      padding: 16,
      justifyContent: 'flex-end', // Align buttons to the right
    },
    formLabel: {
      fontWeight: 600,
      marginBottom: 4,
      color: '#495057',
    },
    formControl: {
      borderRadius: 12,
      fontSize: 15,
      marginBottom: 16, // Added margin bottom for consistency
    },
    inputGroupText: {
      borderRadius: '12px 0 0 12px',
      background: '#e9ecef',
      borderRight: 'none',
      color: '#495057',
    },
    noData: {
      textAlign: 'center',
      color: '#adb5bd',
      fontSize: 18,
      padding: '48px 0',
    },
    deleteModalIcon: {
      fontSize: 36,
      marginBottom: 16,
    },
  };

  return (
    <div style={styles.page}>
      <div className="container">
        <div style={styles.header}>
          <h3 style={{ fontWeight: 700, letterSpacing: 1 }}>Category Management</h3>
          <Button
            variant="success"
            style={styles.addBtn}
            onClick={() => openCategoryModal()}
          >
            <i className="bi bi-plus-lg"></i>Add Category
          </Button>
        </div>

        {/* Table for Categories */}
        <div style={styles.tableWrapper}>
          <Table responsive hover style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>ID</th>
                <th style={styles.th}>Name</th>
                <th style={styles.th}>Description</th>
                <th style={styles.th}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {categories.length > 0 ? (
                categories.map((category) => (
                  <tr key={category.id}>
                    <td style={styles.td} className="text-muted">{category.id}</td>
                    <td style={styles.td}>
                      <span style={{ fontWeight: 600 }}>{category.name}</span>
                    </td>
                    <td style={styles.td}>
                      {category.description
                        ? category.description.length > 60
                          ? category.description.substring(0, 60) + '...'
                          : category.description
                        : <span className="text-secondary fst-italic">N/A</span>}
                    </td>
                    <td style={styles.td}>
                      <Button
                        variant="outline-primary"
                        size="sm"
                        style={styles.actionBtn}
                        onClick={() => openCategoryModal(category)}
                      >
                        <i className="bi bi-pencil-square me-1"></i>Edit
                      </Button>
                      <Button
                        variant="outline-danger"
                        size="sm"
                        style={styles.actionBtn}
                        onClick={() => openDeleteModal(category.id)}
                      >
                        <i className="bi bi-trash me-1"></i>Delete
                      </Button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" style={styles.noData}>
                    <i className="bi bi-folder-x" style={{ fontSize: 48, opacity: 0.2 }}></i>
                    <div style={{ marginTop: 12 }}>No categories found</div>
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </div>

        {/* Category Modal */}
        <Modal
          show={showCategoryModal}
          onHide={() => setShowCategoryModal(false)}
          centered
          contentClassName="rounded-4"
        >
          <Modal.Header closeButton style={styles.modalHeader}>
            <Modal.Title>
              {categoryForm.id ? 'Edit Category' : 'Add Category'}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body style={styles.modalBody}>
            <Form onSubmit={handleCategorySubmit}>
              <Form.Group className="mb-3">
                <Form.Label style={styles.formLabel}>Name</Form.Label>
                <InputGroup>
                  <InputGroup.Text style={styles.inputGroupText}>
                    <i className="bi bi-tag"></i>
                  </InputGroup.Text>
                  <Form.Control
                    type="text"
                    value={categoryForm.name}
                    onChange={(e) => setCategoryForm({ ...categoryForm, name: e.target.value })}
                    required
                    placeholder="Enter category name"
                    autoFocus
                    style={{ ...styles.formControl, marginBottom: 0, borderRadius: '0 12px 12px 0' }} // Adjust border radius for input group
                  />
                </InputGroup>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label style={styles.formLabel}>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  value={categoryForm.description}
                  onChange={(e) => setCategoryForm({ ...categoryForm, description: e.target.value })}
                  placeholder="Enter category description (optional)"
                  style={styles.formControl}
                />
              </Form.Group>
              <div className="d-flex justify-content-end mt-3">
                <Button
                  variant="secondary"
                  className="me-2"
                  onClick={() => setShowCategoryModal(false)}
                  type="button"
                  style={{ borderRadius: 20, padding: '6px 24px' }}
                >
                  Cancel
                </Button>
                <Button variant="success" type="submit" style={{ borderRadius: 20, padding: '6px 24px' }}>
                  {categoryForm.id ? 'Update' : 'Create'}
                </Button>
              </div>
            </Form>
          </Modal.Body>
        </Modal>

        {/* Delete Confirmation Modal */}
        <Modal
          show={showDeleteModal}
          onHide={() => setShowDeleteModal(false)}
          centered
          contentClassName="rounded-4"
        >
          <Modal.Header closeButton style={styles.modalHeader}>
            <Modal.Title>Confirm Delete</Modal.Title>
          </Modal.Header>
          <Modal.Body style={styles.modalBody}>
            <div className="text-center">
              <i className="bi bi-exclamation-triangle-fill text-danger" style={styles.deleteModalIcon}></i>
              <div style={{ marginTop: 16, fontSize: 18 }}>
                Are you sure you want to delete this {deleteItem.type}?
              </div>
              <small className="text-danger">This action cannot be undone.</small>
            </div>
          </Modal.Body>
          <Modal.Footer style={styles.modalFooter}>
            <Button
              variant="secondary"
              onClick={() => setShowDeleteModal(false)}
              style={{ borderRadius: 20, padding: '6px 24px' }}
            >
              Cancel
            </Button>
            <Button
              variant="danger"
              onClick={handleDelete}
              style={{ borderRadius: 20, padding: '6px 24px' }}
            >
              Delete
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
};

export default CategoryManagement;