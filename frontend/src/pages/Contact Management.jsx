import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Modal, Button, Form, Table, Image, InputGroup } from 'react-bootstrap';

const ContactManagement = () => {
  const [contacts, setContacts] = useState([]);
  const [contactForm, setContactForm] = useState({
    id: null,
    title: '',
    image: null, // For main contact image file
    address: '',
    phone: '',
    email: '',
    banner_image: null, // For banner image file
    message: '', // General message/info for contact page
    status: 'active', // Default status
  });
  const [imagePreviews, setImagePreviews] = useState({
    image: null,
    banner_image: null,
  });
  const [showContactModal, setShowContactModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteItem, setDeleteItem] = useState({ type: 'contact entry', id: null });

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      const response = await axios.get('http://47.130.121.192:8000/api/contact', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setContacts(response.data);
    } catch (error) {
      toast.error('Failed to fetch contact entries: ' + (error.response?.data?.message || 'Unknown error'));
    }
  };

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('title', contactForm.title);
      formData.append('address', contactForm.address);
      formData.append('phone', contactForm.phone);
      formData.append('email', contactForm.email);
      formData.append('message', contactForm.message);
      formData.append('status', contactForm.status);

      if (contactForm.image instanceof File) {
        formData.append('image', contactForm.image);
      }
      if (contactForm.banner_image instanceof File) {
        formData.append('banner_image', contactForm.banner_image);
      }

      if (contactForm.id) {
        formData.append('_method', 'PUT'); // Laravel requires _method for PUT with FormData
        await axios.post(`http://47.130.121.192:8000/api/contact/${contactForm.id}`, formData, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'multipart/form-data',
          },
        });
      } else {
        await axios.post('http://47.130.121.192:8000/api/contact', formData, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'multipart/form-data',
          },
        });
      }

      fetchContacts();
      setContactForm({
        id: null, title: '', image: null, address: '', phone: '', email: '',
        banner_image: null, message: '', status: 'active',
      });
      setImagePreviews({ image: null, banner_image: null });
      setShowContactModal(false);
      toast.success('Contact entry saved successfully!');
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.response?.data?.error || 'Unknown error';
      toast.error('Failed to save contact entry: ' + errorMessage);
      if (error.response?.data?.errors) {
        Object.values(error.response.data.errors).forEach(messages => {
          messages.forEach(message => toast.error(message));
        });
      }
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`http://47.130.121.192:8000/api/contact/${deleteItem.id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      fetchContacts();
      setShowDeleteModal(false);
      toast.success('Contact entry deleted successfully!');
    } catch (error) {
      toast.error('Failed to delete contact entry: ' + (error.response?.data?.message || 'Unknown error'));
    }
  };

  const openContactModal = (entry = null) => {
    if (entry) {
      setContactForm({
        ...entry,
        image: null, // Don't pre-fill file input
        banner_image: null, // Don't pre-fill file input
      });
      setImagePreviews({
        image: entry.image_url || null, // Assuming image_url exists for display
        banner_image: entry.banner_image_url || null,
      });
    } else {
      setContactForm({
        id: null, title: '', image: null, address: '', phone: '', email: '',
        banner_image: null, message: '', status: 'active',
      });
      setImagePreviews({ image: null, banner_image: null });
    }
    setShowContactModal(true);
  };

  const openDeleteModal = (id) => {
    setDeleteItem({ type: 'contact entry', id });
    setShowDeleteModal(true);
  };

  const handleImageChange = (e, fieldName) => {
    const file = e.target.files[0];
    if (file) {
      setContactForm(prevForm => ({ ...prevForm, [fieldName]: file }));
      setImagePreviews(prevPreviews => ({ ...prevPreviews, [fieldName]: URL.createObjectURL(file) }));
    } else {
      setContactForm(prevForm => ({ ...prevForm, [fieldName]: null }));
      // If no new file selected, retain existing preview if available from initial load
      const currentEntry = contacts.find(c => c.id === contactForm.id);
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
    statusBadge: {
      padding: '0.4em 0.8em',
      borderRadius: '12px',
      fontWeight: 600,
      fontSize: '0.85em',
      display: 'inline-block',
    },
    statusActive: {
      backgroundColor: '#d1e7dd', // Light green
      color: '#0f5132', // Dark green text
      border: '1px solid #badbcc',
    },
    statusInactive: {
      backgroundColor: '#f8d7da', // Light red
      color: '#842029', // Dark red text
      border: '1px solid #f5c2c7',
    },
  };

  // Helper to truncate text for table display
  const truncateText = (text, maxLength) => {
    if (!text) return <span className="text-secondary fst-italic">N/A</span>;
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
  };

  // Helper to get status badge style
  const getStatusStyle = (status) => {
    switch (status) {
      case 'active':
        return styles.statusActive;
      case 'inactive':
        return styles.statusInactive;
      default:
        return {};
    }
  };

  return (
    <div style={styles.page}>
      <div className="container" style={{ maxWidth: 1200 }}>
        <div style={styles.header}>
          <h3 style={{ fontWeight: 700, letterSpacing: 1 }}>Contact Management</h3>
          <Button
            variant="success"
            style={styles.addBtn}
            onClick={() => openContactModal()}
          >
            <i className="bi bi-plus-lg"></i>Add Contact Entry
          </Button>
        </div>

        {/* Table for Contact Entries */}
        <div style={styles.tableWrapper}>
          <Table responsive hover style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>ID</th>
                <th style={styles.th}>Title</th>
                <th style={styles.th}>Image</th>
                <th style={styles.th}>Address</th>
                <th style={styles.th}>Phone</th>
                <th style={styles.th}>Email</th>
                <th style={styles.th}>Status</th>
                <th style={styles.th}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {contacts.length > 0 ? (
                contacts.map((contact) => (
                  <tr key={contact.id}>
                    <td style={styles.td} className="text-muted">{contact.id}</td>
                    <td style={styles.td}>
                      <span style={{ fontWeight: 600 }}>{truncateText(contact.title, 30)}</span>
                    </td>
                    <td style={styles.td}>
                      <Image
                        src={`http://47.130.121.192:8000${contact.image}`}
                        alt="Contact Image"
                        style={styles.thumbnailImage}
                        rounded
                      />
                    </td>
                    <td style={styles.td}>{truncateText(contact.address, 40)}</td>
                    <td style={styles.td}>{contact.phone || <span className="text-secondary fst-italic">N/A</span>}</td>
                    <td style={styles.td}>{contact.email || <span className="text-secondary fst-italic">N/A</span>}</td>
                    <td style={styles.td}>
                      <span style={{ ...styles.statusBadge, ...getStatusStyle(contact.status) }}>
                        {contact.status.charAt(0).toUpperCase() + contact.status.slice(1)}
                      </span>
                    </td>
                    <td style={styles.td}>
                      <Button
                        variant="outline-primary"
                        size="sm"
                        style={styles.actionBtn}
                        onClick={() => openContactModal(contact)}
                      >
                        <i className="bi bi-pencil-square me-1"></i>Edit
                      </Button>
                      <Button
                        variant="outline-danger"
                        size="sm"
                        style={styles.actionBtn}
                        onClick={() => openDeleteModal(contact.id)}
                      >
                        <i className="bi bi-trash me-1"></i>Delete
                      </Button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" style={styles.noData}> {/* Adjusted colspan */}
                    <i className="bi bi-person-lines-fill fs-1" style={{ opacity: 0.2 }}></i>
                    <div style={{ marginTop: 12 }}>No contact entries found</div>
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </div>

        {/* Contact Modal (Add/Edit) */}
        <Modal
          show={showContactModal}
          onHide={() => setShowContactModal(false)}
          centered
          size="lg"
          contentClassName="rounded-4"
        >
          <Modal.Header closeButton style={styles.modalHeader}>
            <Modal.Title>
              {contactForm.id ? 'Edit Contact Entry' : 'Add Contact Entry'}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body style={styles.modalBody}>
            <Form onSubmit={handleContactSubmit}>
              <Form.Group className="mb-3">
                <Form.Label style={styles.formLabel}>Title</Form.Label>
                <InputGroup>
                  <InputGroup.Text style={styles.inputGroupText}>
                    <i className="bi bi-card-heading"></i>
                  </InputGroup.Text>
                  <Form.Control
                    type="text"
                    value={contactForm.title}
                    onChange={(e) => setContactForm({ ...contactForm, title: e.target.value })}
                    required
                    placeholder="e.g., Main Office Contact"
                    autoFocus
                    style={{ ...styles.formControl, marginBottom: 0, borderRadius: '0 12px 12px 0' }}
                  />
                </InputGroup>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label style={styles.formLabel}>Address</Form.Label>
                <InputGroup>
                  <InputGroup.Text style={styles.inputGroupText}>
                    <i className="bi bi-geo-alt"></i>
                  </InputGroup.Text>
                  <Form.Control
                    as="textarea"
                    rows={2}
                    value={contactForm.address}
                    onChange={(e) => setContactForm({ ...contactForm, address: e.target.value })}
                    required
                    placeholder="Enter full address"
                    style={{ ...styles.formControl, marginBottom: 0, borderRadius: '0 12px 12px 0' }}
                  />
                </InputGroup>
              </Form.Group>

              <div className="row">
                <div className="col-md-6">
                  <Form.Group className="mb-3">
                    <Form.Label style={styles.formLabel}>Phone</Form.Label>
                    <InputGroup>
                      <InputGroup.Text style={styles.inputGroupText}>
                        <i className="bi bi-telephone"></i>
                      </InputGroup.Text>
                      <Form.Control
                        type="tel"
                        value={contactForm.phone}
                        onChange={(e) => setContactForm({ ...contactForm, phone: e.target.value })}
                        placeholder="e.g., +855 12 345 678"
                        style={{ ...styles.formControl, marginBottom: 0, borderRadius: '0 12px 12px 0' }}
                      />
                    </InputGroup>
                  </Form.Group>
                </div>
                <div className="col-md-6">
                  <Form.Group className="mb-3">
                    <Form.Label style={styles.formLabel}>Email</Form.Label>
                    <InputGroup>
                      <InputGroup.Text style={styles.inputGroupText}>
                        <i className="bi bi-envelope"></i>
                      </InputGroup.Text>
                      <Form.Control
                        type="email"
                        value={contactForm.email}
                        onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                        placeholder="e.g., info@example.com"
                        style={{ ...styles.formControl, marginBottom: 0, borderRadius: '0 12px 12px 0' }}
                      />
                    </InputGroup>
                  </Form.Group>
                </div>
              </div>

              <Form.Group className="mb-3">
                <Form.Label style={styles.formLabel}>General Message / Information</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  value={contactForm.message}
                  onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                  placeholder="Enter a general message or additional contact information"
                  style={styles.formControl}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label style={styles.formLabel}>Status</Form.Label>
                <InputGroup>
                  <InputGroup.Text style={styles.inputGroupText}>
                    <i className="bi bi-toggle-on"></i>
                  </InputGroup.Text>
                  <Form.Select
                    value={contactForm.status}
                    onChange={(e) => setContactForm({ ...contactForm, status: e.target.value })}
                    style={{ ...styles.formControl, marginBottom: 0, borderRadius: '0 12px 12px 0' }}
                  >
                   <option value="pending">Pending</option>
                   <option value="resolved">Resolved</option>
                  </Form.Select>
                </InputGroup>
              </Form.Group>

              {/* Image Uploads */}
              <h5 className="mt-4 mb-3 fw-bold text-primary">Images</h5>
              <div className="row">
                <div className="col-md-6">
                  <Form.Group controlId="formContactImage" className="mb-3">
                    <Form.Label style={styles.formLabel}>Main Contact Image</Form.Label>
                    <Form.Control
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImageChange(e, 'image')}
                      style={styles.formControl}
                    />
                    {imagePreviews.image && (
                      <div className="mt-2">
                        <Image
                          src={imagePreviews.image}
                          alt="Contact Preview"
                          style={styles.imagePreview}
                          rounded
                        />
                      </div>
                    )}
                  </Form.Group>
                </div>
                <div className="col-md-6">
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
                          alt="Banner Preview"
                          style={styles.imagePreview}
                          rounded
                        />
                      </div>
                    )}
                  </Form.Group>
                </div>
              </div>

              <div className="d-flex justify-content-end mt-4">
                <Button
                  variant="secondary"
                  className="me-2"
                  onClick={() => setShowContactModal(false)}
                  type="button"
                  style={{ borderRadius: 20, padding: '6px 24px' }}
                >
                  Cancel
                </Button>
                <Button variant="success" type="submit" style={{ borderRadius: 20, padding: '6px 24px' }}>
                  {contactForm.id ? 'Update Entry' : 'Create Entry'}
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

export default ContactManagement;