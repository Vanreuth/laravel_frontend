import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Modal, Button, Form, Table, Image, InputGroup } from 'react-bootstrap';

const AboutUsManagement = () => {
  const [aboutUsEntries, setAboutUsEntries] = useState([]);
  const [aboutUsForm, setAboutUsForm] = useState({
    id: null,
    title: '',
    subtitle1: '',
    description1: '',
    subtitle2: '',
    description2: '',
    image1: null, // File object for upload
    image2: null, // File object for upload
    banner_image: null, // File object for upload
  });
  const [imagePreviews, setImagePreviews] = useState({
    image1: null,
    image2: null,
    banner_image: null,
  });
  const [showAboutUsModal, setShowAboutUsModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteItem, setDeleteItem] = useState({ type: 'about us entry', id: null });

  useEffect(() => {
    fetchAboutUsEntries();
  }, []);

  const fetchAboutUsEntries = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/about-us', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setAboutUsEntries(response.data);
    } catch (error) {
      toast.error('Failed to fetch About Us entries: ' + (error.response?.data?.message || 'Unknown error'));
    }
  };

  const handleAboutUsSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      // Append text fields
      formData.append('title', aboutUsForm.title);
      formData.append('subtitle1', aboutUsForm.subtitle1);
      formData.append('description1', aboutUsForm.description1);
      formData.append('subtitle2', aboutUsForm.subtitle2);
      formData.append('description2', aboutUsForm.description2);

      // Append image files if they are new File objects
      if (aboutUsForm.image1 instanceof File) {
        formData.append('image1', aboutUsForm.image1);
      }
      if (aboutUsForm.image2 instanceof File) {
        formData.append('image2', aboutUsForm.image2);
      }
      if (aboutUsForm.banner_image instanceof File) {
        formData.append('banner_image', aboutUsForm.banner_image);
      }

      if (aboutUsForm.id) {
        formData.append('_method', 'PUT'); // Laravel requires _method for PUT with FormData
        await axios.post(`http://localhost:8000/api/about-us/${aboutUsForm.id}`, formData, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'multipart/form-data',
          },
        });
      } else {
        await axios.post('http://localhost:8000/api/about-us', formData, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'multipart/form-data',
          },
        });
      }

      fetchAboutUsEntries();
      setAboutUsForm({
        id: null,
        title: '', subtitle1: '', description1: '',
        subtitle2: '', description2: '',
        image1: null, image2: null, banner_image: null,
      });
      setImagePreviews({ image1: null, image2: null, banner_image: null });
      setShowAboutUsModal(false);
      toast.success('About Us entry saved successfully!');
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.response?.data?.error || 'Unknown error';
      toast.error('Failed to save About Us entry: ' + errorMessage);
      if (error.response?.data?.errors) {
        Object.values(error.response.data.errors).forEach(messages => {
          messages.forEach(message => toast.error(message));
        });
      }
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:8000/api/about-us/${deleteItem.id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      fetchAboutUsEntries();
      setShowDeleteModal(false);
      toast.success('About Us entry deleted successfully!');
    } catch (error) {
      toast.error('Failed to delete About Us entry: ' + (error.response?.data?.message || 'Unknown error'));
    }
  };

  const openAboutUsModal = (entry = null) => {
    if (entry) {
      setAboutUsForm({
        ...entry,
        image1: null, // Set to null so user explicitly re-uploads if needed
        image2: null,
        banner_image: null,
      });
      setImagePreviews({
        image1: entry.image1_url || null, // Assuming *_url fields for existing images
        image2: entry.image2_url || null,
        banner_image: entry.banner_image_url || null,
      });
    } else {
      setAboutUsForm({
        id: null,
        title: '', subtitle1: '', description1: '',
        subtitle2: '', description2: '',
        image1: null, image2: null, banner_image: null,
      });
      setImagePreviews({ image1: null, image2: null, banner_image: null });
    }
    setShowAboutUsModal(true);
  };

  const openDeleteModal = (id) => {
    setDeleteItem({ type: 'about us entry', id });
    setShowDeleteModal(true);
  };

  const handleImageChange = (e, fieldName) => {
    const file = e.target.files[0];
    if (file) {
      setAboutUsForm(prevForm => ({ ...prevForm, [fieldName]: file }));
      setImagePreviews(prevPreviews => ({ ...prevPreviews, [fieldName]: URL.createObjectURL(file) }));
    } else {
      setAboutUsForm(prevForm => ({ ...prevForm, [fieldName]: null }));
      // If no new file selected, retain existing preview if available from initial load
      const currentEntry = aboutUsEntries.find(entry => entry.id === aboutUsForm.id);
      setImagePreviews(prevPreviews => ({
        ...prevPreviews,
        [fieldName]: (currentEntry && currentEntry[`${fieldName}_url`]) || null
      }));
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
    thumbnailImage: {
      width: 80,
      height: 50,
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
      width: 150, // Larger preview for modal
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
  };

  // Helper to truncate text for table display
  const truncateText = (text, maxLength) => {
    if (!text) return <span className="text-secondary fst-italic">N/A</span>;
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
  };

  return (
    <div style={styles.page}>
      <div className="container" style={{ maxWidth: 1200 }}> {/* Expanded max width for more content */}
        <div style={styles.header}>
          <h3 style={{ fontWeight: 700, letterSpacing: 1 }}>About Us Management</h3>
          <Button
            variant="success"
            style={styles.addBtn}
            onClick={() => openAboutUsModal()}
          >
            <i className="bi bi-plus-lg"></i>Add About Us Entry
          </Button>
        </div>

        {/* Table for About Us Entries */}
        <div style={styles.tableWrapper}>
          <Table responsive hover style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>ID</th>
                <th style={styles.th}>Title</th>
                <th style={styles.th}>Subtitle 1</th>
                <th style={styles.th}>Description 1</th>
                <th style={styles.th}>Image 1</th>
                <th style={styles.th}>Subtitle 2</th>
                <th style={styles.th}>Description 2</th>
                <th style={styles.th}>Image 2</th>
                <th style={styles.th}>Banner Image</th>
                <th style={styles.th}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {aboutUsEntries.length > 0 ? (
                aboutUsEntries.map((entry) => (
                  <tr key={entry.id}>
                    <td style={styles.td} className="text-muted">{entry.id}</td>
                    <td style={styles.td}>
                      <span style={{ fontWeight: 600 }}>{truncateText(entry.title, 30)}</span>
                    </td>
                    <td style={styles.td}>{truncateText(entry.subtitle1, 20)}</td>
                    <td style={styles.td}>{truncateText(entry.description1, 40)}</td>
                    <td style={styles.td}>
                      <Image
                        src={`http://localhost:8000${entry.image1}`}
                        alt="Image 1"
                        style={styles.thumbnailImage}
                        onError={(e) => (e.target.src = 'https://via.placeholder.com/80x50?text=No+Img')}
                        rounded
                      />
                    </td>
                    <td style={styles.td}>{truncateText(entry.subtitle2, 20)}</td>
                    <td style={styles.td}>{truncateText(entry.description2, 40)}</td>
                    <td style={styles.td}>
                      <Image
                        src={`http://localhost:8000${entry.image2}`}
                        alt="Image 2"
                        style={styles.thumbnailImage}
                        onError={(e) => (e.target.src = 'https://via.placeholder.com/80x50?text=No+Img')}
                        rounded
                      />
                    </td>
                    <td style={styles.td}>
                      <Image
                        src={`http://localhost:8000${entry.banner_image}`}
                        alt="Banner Image"
                        style={styles.thumbnailImage}
                        onError={(e) => (e.target.src = 'https://via.placeholder.com/80x50?text=No+Banner')}
                        rounded
                      />
                    </td>
                    <td style={styles.td}>
                      <Button
                        variant="outline-primary"
                        size="sm"
                        style={styles.actionBtn}
                        onClick={() => openAboutUsModal(entry)}
                      >
                        <i className="bi bi-pencil-square me-1"></i>Edit
                      </Button>
                      <Button
                        variant="outline-danger"
                        size="sm"
                        style={styles.actionBtn}
                        onClick={() => openDeleteModal(entry.id)}
                      >
                        <i className="bi bi-trash me-1"></i>Delete
                      </Button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="10" style={styles.noData}> {/* Adjusted colspan */}
                    <i className="bi bi-info-circle-fill fs-1" style={{ opacity: 0.2 }}></i>
                    <div style={{ marginTop: 12 }}>No About Us entries found</div>
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </div>

        {/* About Us Modal (Add/Edit) */}
        <Modal
          show={showAboutUsModal}
          onHide={() => setShowAboutUsModal(false)}
          centered
          size="lg" // Larger modal for more content
          contentClassName="rounded-4"
        >
          <Modal.Header closeButton style={styles.modalHeader}>
            <Modal.Title>
              {aboutUsForm.id ? 'Edit About Us Entry' : 'Add About Us Entry'}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body style={styles.modalBody}>
            <Form onSubmit={handleAboutUsSubmit}>
              <Form.Group className="mb-3">
                <Form.Label style={styles.formLabel}>Title</Form.Label>
                <InputGroup>
                  <InputGroup.Text style={styles.inputGroupText}>
                    <i className="bi bi-fonts"></i>
                  </InputGroup.Text>
                  <Form.Control
                    type="text"
                    value={aboutUsForm.title}
                    onChange={(e) => setAboutUsForm({ ...aboutUsForm, title: e.target.value })}
                    required
                    placeholder="Enter main title"
                    autoFocus
                    style={{ ...styles.formControl, marginBottom: 0, borderRadius: '0 12px 12px 0' }}
                  />
                </InputGroup>
              </Form.Group>

              {/* Section 1 */}
              <h5 className="mt-4 mb-3 fw-bold text-primary">Section 1 Details</h5>
              <Form.Group className="mb-3">
                <Form.Label style={styles.formLabel}>Subtitle 1</Form.Label>
                <InputGroup>
                  <InputGroup.Text style={styles.inputGroupText}>
                    <i className="bi bi-substack"></i>
                  </InputGroup.Text>
                  <Form.Control
                    type="text"
                    value={aboutUsForm.subtitle1}
                    onChange={(e) => setAboutUsForm({ ...aboutUsForm, subtitle1: e.target.value })}
                    required
                    placeholder="Enter subtitle for section 1"
                    style={{ ...styles.formControl, marginBottom: 0, borderRadius: '0 12px 12px 0' }}
                  />
                </InputGroup>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label style={styles.formLabel}>Description 1</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={4}
                  value={aboutUsForm.description1}
                  onChange={(e) => setAboutUsForm({ ...aboutUsForm, description1: e.target.value })}
                  required
                  placeholder="Enter description for section 1"
                  style={styles.formControl}
                />
              </Form.Group>
              <Form.Group controlId="formImage1" className="mb-3">
                <Form.Label style={styles.formLabel}>Image 1</Form.Label>
                <Form.Control
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageChange(e, 'image1')}
                  style={styles.formControl}
                />
                {imagePreviews.image1 && (
                  <div className="mt-2">
                    <Image
                      src={imagePreviews.image1}
                      alt="Image 1 Preview"
                      style={styles.imagePreview}
                      rounded
                    />
                  </div>
                )}
              </Form.Group>

              {/* Section 2 */}
              <h5 className="mt-4 mb-3 fw-bold text-primary">Section 2 Details</h5>
              <Form.Group className="mb-3">
                <Form.Label style={styles.formLabel}>Subtitle 2</Form.Label>
                <InputGroup>
                  <InputGroup.Text style={styles.inputGroupText}>
                    <i className="bi bi-substack"></i>
                  </InputGroup.Text>
                  <Form.Control
                    type="text"
                    value={aboutUsForm.subtitle2}
                    onChange={(e) => setAboutUsForm({ ...aboutUsForm, subtitle2: e.target.value })}
                    placeholder="Enter subtitle for section 2 (optional)"
                    style={{ ...styles.formControl, marginBottom: 0, borderRadius: '0 12px 12px 0' }}
                  />
                </InputGroup>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label style={styles.formLabel}>Description 2</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={4}
                  value={aboutUsForm.description2}
                  onChange={(e) => setAboutUsForm({ ...aboutUsForm, description2: e.target.value })}
                  placeholder="Enter description for section 2 (optional)"
                  style={styles.formControl}
                />
              </Form.Group>
              <Form.Group controlId="formImage2" className="mb-3">
                <Form.Label style={styles.formLabel}>Image 2</Form.Label>
                <Form.Control
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageChange(e, 'image2')}
                  style={styles.formControl}
                />
                {imagePreviews.image2 && (
                  <div className="mt-2">
                    <Image
                      src={imagePreviews.image2}
                      alt="Image 2 Preview"
                      style={styles.imagePreview}
                      rounded
                    />
                  </div>
                )}
              </Form.Group>

              {/* Banner Image */}
              <h5 className="mt-4 mb-3 fw-bold text-primary">Banner Image</h5>
              <Form.Group controlId="formBannerImage" className="mb-3">
                <Form.Label style={styles.formLabel}>Banner Image</Form.Label>
                <Form.Control
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageChange(e, 'banner_image')}
                  style={styles.formControl}
                />
                {imagePreviews.banner_image && (
                  <div className="mt-2">
                    <Image
                      src={imagePreviews.banner_image}
                      alt="Banner Image Preview"
                      style={styles.imagePreview}
                      rounded
                    />
                  </div>
                )}
              </Form.Group>

              <div className="d-flex justify-content-end mt-4">
                <Button
                  variant="secondary"
                  className="me-2"
                  onClick={() => setShowAboutUsModal(false)}
                  type="button"
                  style={{ borderRadius: 20, padding: '6px 24px' }}
                >
                  Cancel
                </Button>
                <Button variant="success" type="submit" style={{ borderRadius: 20, padding: '6px 24px' }}>
                  {aboutUsForm.id ? 'Update Entry' : 'Create Entry'}
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

export default AboutUsManagement;