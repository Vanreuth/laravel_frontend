import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Modal, Button, Form, Table, Image, InputGroup } from 'react-bootstrap';

const SliderManagement = () => {
  const [sliders, setSliders] = useState([]);
  const [sliderForm, setSliderForm] = useState({
    id: null,
    title: '',
    image: null, // For new image file
    description: '',
    order: '',
    is_active: true, // Default to active
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [showSliderModal, setShowSliderModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteItem, setDeleteItem] = useState({ type: 'slider', id: null });

  useEffect(() => {
    fetchSliders();
  }, []);

  const fetchSliders = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/sliders', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setSliders(response.data);
    } catch (error) {
      toast.error('Failed to fetch sliders: ' + (error.response?.data?.message || 'Unknown error'));
    }
  };

  const handleSliderSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('title', sliderForm.title);
      formData.append('description', sliderForm.description);
      formData.append('order', sliderForm.order);
      formData.append('is_active', sliderForm.is_active ? 1 : 0); // Laravel expects 1 or 0 for boolean

      if (sliderForm.image instanceof File) {
        formData.append('image', sliderForm.image);
      }

      if (sliderForm.id) {
        formData.append('_method', 'PUT'); // Laravel requires _method for PUT with FormData
        await axios.post(`http://localhost:8000/api/sliders/${sliderForm.id}`, formData, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'multipart/form-data', // Essential for FormData
          },
        });
      } else {
        await axios.post('http://localhost:8000/api/sliders', formData, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'multipart/form-data',
          },
        });
      }

      fetchSliders();
      setSliderForm({ id: null, title: '', image: null, description: '', order: '', is_active: true });
      setImagePreview(null);
      setShowSliderModal(false);
      toast.success('Slider saved successfully!');
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.response?.data?.error || 'Unknown error';
      toast.error('Failed to save slider: ' + errorMessage);
      if (error.response?.data?.errors) {
        Object.values(error.response.data.errors).forEach(messages => {
          messages.forEach(message => toast.error(message));
        });
      }
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:8000/api/sliders/${deleteItem.id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      fetchSliders();
      setShowDeleteModal(false);
      toast.success('Slider deleted successfully!');
    } catch (error) {
      toast.error('Failed to delete slider: ' + (error.response?.data?.message || 'Unknown error'));
    }
  };

  const openSliderModal = (slider = null) => {
    if (slider) {
      setSliderForm({
        ...slider,
        image: null, // Do not pre-fill image with URL, only allow new file upload
        is_active: Boolean(slider.is_active), // Ensure boolean for checkbox
      });
      setImagePreview(slider.image_url || null); // Display existing image
    } else {
      setSliderForm({ id: null, title: '', image: null, description: '', order: '', is_active: true });
      setImagePreview(null);
    }
    setShowSliderModal(true);
  };

  const openDeleteModal = (id) => {
    setDeleteItem({ type: 'slider', id });
    setShowDeleteModal(true);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSliderForm({ ...sliderForm, image: file });
      setImagePreview(URL.createObjectURL(file));
    } else {
      setSliderForm({ ...sliderForm, image: null });
      // If no new file selected, and there was an existing image_url, keep that preview
      if (sliderForm.id && sliders.find(s => s.id === sliderForm.id)?.image_url) {
        setImagePreview(sliders.find(s => s.id === sliderForm.id).image_url);
      } else {
        setImagePreview(null);
      }
    }
  };

  // UX/UI styles object for consistency
  const styles = {
    page: {
      background: '#f8f9fa',
      minHeight: '100vh',
      padding: '32px 0',
      fontFamily: "'Inter', sans-serif",
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
    sliderImage: {
      width: 100,
      height: 60,
      objectFit: 'cover',
      borderRadius: 8,
      border: '1px solid #dee2e6',
      background: '#f8f9fa',
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
      justifyContent: 'flex-end',
    },
    formLabel: {
      fontWeight: 600,
      marginBottom: 4,
      color: '#495057',
    },
    formControl: {
      borderRadius: 12,
      fontSize: 15,
      marginBottom: 16,
    },
    inputGroupText: {
      borderRadius: '12px 0 0 12px',
      background: '#e9ecef',
      borderRight: 'none',
      color: '#495057',
    },
    imagePreview: {
      width: 150,
      height: 90,
      objectFit: 'cover',
      borderRadius: 12,
      marginTop: 8,
      border: '1px solid #dee2e6',
      background: '#f8f9fa',
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
    activeBadge: {
        padding: '0.4em 0.8em',
        borderRadius: '12px',
        fontWeight: 600,
        fontSize: '0.85em',
        display: 'inline-block',
        backgroundColor: '#d1e7dd', // Light green
        color: '#0f5132', // Dark green text
        border: '1px solid #badbcc',
    },
    inactiveBadge: {
        padding: '0.4em 0.8em',
        borderRadius: '12px',
        fontWeight: 600,
        fontSize: '0.85em',
        display: 'inline-block',
        backgroundColor: '#f8d7da', // Light red
        color: '#842029', // Dark red text
        border: '1px solid #f5c2c7',
    }
  };

  return (
    <div style={styles.page}>
      <div className="container" style={{ maxWidth: 1000 }}>
        <div style={styles.header}>
          <h3 style={{ fontWeight: 700, letterSpacing: 1 }}>Slider Management</h3>
          <Button
            variant="success"
            style={styles.addBtn}
            onClick={() => openSliderModal()}
          >
            <i className="bi bi-plus-lg"></i>Add Slider
          </Button>
        </div>

        {/* Table for Sliders */}
        <div style={styles.tableWrapper}>
          <Table responsive hover style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>ID</th>
                <th style={styles.th}>Image</th>
                <th style={styles.th}>Title</th>
                <th style={styles.th}>Description</th>
                <th style={styles.th}>Order</th>
                <th style={styles.th}>Active</th>
                <th style={styles.th}>Actions</th>
              </tr>
            </thead>
            <tbody>
                {sliders.map((slider,id) => (
                  <tr key={id}>
                    <td style={styles.td} className="text-muted">{slider.id}</td>
                    <td style={styles.td}>
                      <img src={`http://localhost:8000${slider.image_url}`} alt={slider.title} style={styles.sliderImage} />
                    </td>
                    <td style={styles.td}>
                      <span style={{ fontWeight: 600 }}>{slider.title}</span>
                    </td>
                    <td style={styles.td}>
                      {slider.description?.length > 60
                        ? slider.description.substring(0, 60) + '...'
                        : (slider.description || <span className="text-secondary fst-italic">N/A</span>)}
                    </td>
                    <td style={styles.td}>{slider.order}</td>
                    <td style={styles.td}>
                      <span style={slider.is_active ? styles.activeBadge : styles.inactiveBadge}>
                        {slider.is_active ? 'Yes' : 'No'}
                      </span>
                    </td>
                    <td style={styles.td}>
                      <Button
                        variant="outline-primary"
                        size="sm"
                        style={styles.actionBtn}
                        onClick={() => openSliderModal(slider)}
                      >
                        <i className="bi bi-pencil-square me-1"></i>Edit
                      </Button>
                      <Button
                        variant="outline-danger"
                        size="sm"
                        style={styles.actionBtn}
                        onClick={() => openDeleteModal(slider.id)}
                      >
                        <i className="bi bi-trash me-1"></i>Delete
                      </Button>
                    </td>
                  </tr>
                ))}

            </tbody>
          </Table>
        </div>

        {/* Slider Modal */}
        <Modal
          show={showSliderModal}
          onHide={() => setShowSliderModal(false)}
          centered
          contentClassName="rounded-4"
        >
          <Modal.Header closeButton style={styles.modalHeader}>
            <Modal.Title>
              {sliderForm.id ? 'Edit Slider' : 'Add Slider'}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body style={styles.modalBody}>
            <Form onSubmit={handleSliderSubmit}>
              <Form.Group className="mb-3">
                <Form.Label style={styles.formLabel}>Title</Form.Label>
                <InputGroup>
                  <InputGroup.Text style={styles.inputGroupText}>
                    <i className="bi bi-card-heading"></i>
                  </InputGroup.Text>
                  <Form.Control
                    type="text"
                    value={sliderForm.title}
                    onChange={(e) => setSliderForm({ ...sliderForm, title: e.target.value })}
                    required
                    placeholder="Enter slider title"
                    autoFocus
                    style={{ ...styles.formControl, marginBottom: 0, borderRadius: '0 12px 12px 0' }}
                  />
                </InputGroup>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label style={styles.formLabel}>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  value={sliderForm.description}
                  onChange={(e) => setSliderForm({ ...sliderForm, description: e.target.value })}
                  placeholder="Enter slider description (optional)"
                  style={styles.formControl}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label style={styles.formLabel}>Display Order</Form.Label>
                <InputGroup>
                  <InputGroup.Text style={styles.inputGroupText}>
                    <i className="bi bi-sort-numeric-down"></i>
                  </InputGroup.Text>
                  <Form.Control
                    type="number"
                    min="0"
                    value={sliderForm.order}
                    onChange={(e) => setSliderForm({ ...sliderForm, order: e.target.value })}
                    required
                    placeholder="e.g., 1, 2, 3"
                    style={{ ...styles.formControl, marginBottom: 0, borderRadius: '0 12px 12px 0' }}
                  />
                </InputGroup>
              </Form.Group>

              <Form.Group controlId="formFile" className="mb-3">
                <Form.Label style={styles.formLabel}>Image</Form.Label>
                <Form.Control
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  style={styles.formControl}
                />
                {imagePreview && (
                  <div className="mt-2">
                    <Image
                      src={imagePreview}
                      alt="Slider Preview"
                      style={styles.imagePreview}
                      rounded
                    />
                  </div>
                )}
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Check
                  type="checkbox"
                  label="Is Active"
                  checked={sliderForm.is_active}
                  onChange={(e) => setSliderForm({ ...sliderForm, is_active: e.target.checked })}
                  id="isActiveCheck"
                  className="fw-semibold"
                />
              </Form.Group>

              <div className="d-flex justify-content-end mt-3">
                <Button
                  variant="secondary"
                  className="me-2"
                  onClick={() => setShowSliderModal(false)}
                  type="button"
                  style={{ borderRadius: 20, padding: '6px 24px' }}
                >
                  Cancel
                </Button>
                <Button variant="success" type="submit" style={{ borderRadius: 20, padding: '6px 24px' }}>
                  {sliderForm.id ? 'Update Slider' : 'Create Slider'}
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

export default SliderManagement;