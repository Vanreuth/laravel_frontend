import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Modal, Button, Form, Table, InputGroup } from 'react-bootstrap';

const OrderManagement = () => {
  const [orders, setOrders] = useState([]);
  const [orderForm, setOrderForm] = useState({ id: null, user_id: '', total_amount: '', status: 'pending' });
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteItem, setDeleteItem] = useState({ type: 'order', id: null }); // Changed to singular for dynamic message
  const [users, setUsers] = useState([]); // State to hold users for the dropdown

  useEffect(() => {
    fetchOrders();
    fetchUsers(); // Fetch users when component mounts
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await axios.get('http://47.130.121.192:8000/api/orders', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setOrders(response.data);
    } catch (error) {
      toast.error('Failed to fetch orders: ' + (error.response?.data?.message || 'Unknown error'));
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://47.130.121.192:8000/api/users', { // Assuming an API endpoint for users
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setUsers(response.data);
    } catch (error) {
      toast.error('Failed to fetch users for order assignment.');
    }
  };

  const handleOrderSubmit = async (e) => {
    e.preventDefault();
    try {
      if (orderForm.id) {
        await axios.put(`http://47.130.121.192:8000/api/orders/${orderForm.id}`, orderForm, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
      } else {
        await axios.post('http://47.130.121.192:8000/api/orders', orderForm, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
      }
      fetchOrders();
      setOrderForm({ id: null, user_id: '', total_amount: '', status: 'pending' });
      setShowOrderModal(false);
      toast.success('Order saved successfully!');
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.response?.data?.error || 'Unknown error';
      toast.error('Failed to save order: ' + errorMessage);
      if (error.response?.data?.errors) {
        Object.values(error.response.data.errors).forEach(messages => {
          messages.forEach(message => toast.error(message));
        });
      }
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`http://47.130.121.192:8000/api/orders/${deleteItem.id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      fetchOrders();
      setShowDeleteModal(false);
      toast.success('Order deleted successfully!');
    } catch (error) {
      toast.error('Failed to delete order: ' + (error.response?.data?.message || 'Unknown error'));
    }
  };

  const openOrderModal = (order = null) => {
    // Ensure user_id is set as a string for the select input
    setOrderForm(
      order ? { ...order, user_id: order.user_id ? String(order.user_id) : '' } : { id: null, user_id: '', total_amount: '', status: 'pending' }
    );
    setShowOrderModal(true);
  };

  const openDeleteModal = (id) => {
    setDeleteItem({ type: 'order', id });
    setShowDeleteModal(true);
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
    statusPending: {
        backgroundColor: '#fff3cd', // Light yellow
        color: '#664d03', // Dark yellow text
        border: '1px solid #ffecb5',
    },
    statusProcessing: {
        backgroundColor: '#cfe2ff', // Light blue
        color: '#052c65', // Dark blue text
        border: '1px solid #b6d4fe',
    },
    statusShipped: {
        backgroundColor: '#d1e7dd', // Light green
        color: '#0f5132', // Dark green text
        border: '1px solid #badbcc',
    },
    statusDelivered: {
        backgroundColor: '#d1e7dd', // Light green
        color: '#0f5132', // Dark green text
        border: '1px solid #badbcc',
    },
    statusCancelled: {
        backgroundColor: '#f8d7da', // Light red
        color: '#842029', // Dark red text
        border: '1px solid #f5c2c7',
    },
  };

  // Helper to get status badge style
  const getStatusStyle = (status) => {
    switch (status) {
      case 'pending':
        return styles.statusPending;
      case 'processing':
        return styles.statusProcessing;
      case 'shipped':
        return styles.statusShipped;
      case 'delivered':
        return styles.statusDelivered;
      case 'cancelled':
        return styles.statusCancelled;
      default:
        return {};
    }
  };

  return (
    <div style={styles.page}>
      <div className="container"> {/* Increased max width slightly */}
        <div style={styles.header}>
          <h3 style={{ fontWeight: 700, letterSpacing: 1 }}>Order Management</h3>
          <Button
            variant="success"
            style={styles.addBtn}
            onClick={() => openOrderModal()}
          >
            <i className="bi bi-plus-lg"></i>Add Order
          </Button>
        </div>

        {/* Table for Orders */}
        <div style={styles.tableWrapper}>
          <Table responsive hover style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>ID</th>
                <th style={styles.th}>User</th>
                <th style={styles.th}>Total Amount</th>
                <th style={styles.th}>Status</th>
                <th style={styles.th}>Order Date</th> {/* Added Order Date column */}
                <th style={styles.th}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.length > 0 ? (
                orders.map((order) => (
                  <tr key={order.id}>
                    <td style={styles.td} className="text-muted">{order.id}</td>
                    <td style={styles.td}>
                      <span style={{ fontWeight: 600 }}>{order.user?.name || 'N/A'}</span>
                    </td>
                    <td style={styles.td}>
                      <span style={{ fontWeight: 600 }}>${parseFloat(order.total_amount).toFixed(2)}</span>
                    </td>
                    <td style={styles.td}>
                      <span style={{ ...styles.statusBadge, ...getStatusStyle(order.status) }}>
                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                      </span>
                    </td>
                    <td style={styles.td}>
                      {new Date(order.created_at).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                      })}
                    </td>
                    <td style={styles.td}>
                      <Button
                        variant="outline-primary"
                        size="sm"
                        style={styles.actionBtn}
                        onClick={() => openOrderModal(order)}
                      >
                        <i className="bi bi-pencil-square me-1"></i>Edit
                      </Button>
                      <Button
                        variant="outline-danger"
                        size="sm"
                        style={styles.actionBtn}
                        onClick={() => openDeleteModal(order.id)}
                      >
                        <i className="bi bi-trash me-1"></i>Delete
                      </Button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" style={styles.noData}> {/* Adjusted colspan */}
                    <i className="bi bi-receipt fs-1" style={{ opacity: 0.2 }}></i> {/* Changed icon */}
                    <div style={{ marginTop: 12 }}>No orders found</div>
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </div>

        {/* Order Modal */}
        <Modal
          show={showOrderModal}
          onHide={() => setShowOrderModal(false)}
          centered
          contentClassName="rounded-4"
        >
          <Modal.Header closeButton style={styles.modalHeader}>
            <Modal.Title>
              {orderForm.id ? 'Edit Order' : 'Add Order'}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body style={styles.modalBody}>
            <Form onSubmit={handleOrderSubmit}>
              <Form.Group className="mb-3">
                <Form.Label style={styles.formLabel}>User</Form.Label>
                <InputGroup>
                  <InputGroup.Text style={styles.inputGroupText}>
                    <i className="bi bi-person"></i>
                  </InputGroup.Text>
                  <Form.Select
                    value={orderForm.user_id}
                    onChange={(e) => setOrderForm({ ...orderForm, user_id: e.target.value })}
                    required
                    style={{ ...styles.formControl, marginBottom: 0, borderRadius: '0 12px 12px 0' }}
                  >
                    <option value="">Select User</option>
                    {users.map((user) => (
                      <option key={user.id} value={user.id}>
                        {user.name} ({user.email})
                      </option>
                    ))}
                  </Form.Select>
                </InputGroup>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label style={styles.formLabel}>Total Amount</Form.Label>
                <InputGroup>
                  <InputGroup.Text style={styles.inputGroupText}>$</InputGroup.Text>
                  <Form.Control
                    type="number"
                    step="0.01"
                    min="0"
                    value={orderForm.total_amount}
                    onChange={(e) => setOrderForm({ ...orderForm, total_amount: e.target.value })}
                    required
                    placeholder="0.00"
                    style={{ ...styles.formControl, marginBottom: 0, borderRadius: '0 12px 12px 0' }}
                  />
                </InputGroup>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label style={styles.formLabel}>Status</Form.Label>
                <InputGroup>
                  <InputGroup.Text style={styles.inputGroupText}>
                    <i className="bi bi-info-circle"></i>
                  </InputGroup.Text>
                  <Form.Select
                    value={orderForm.status}
                    onChange={(e) => setOrderForm({ ...orderForm, status: e.target.value })}
                    style={{ ...styles.formControl, marginBottom: 0, borderRadius: '0 12px 12px 0' }}
                  >
                    <option value="pending">Pending</option>
                    <option value="processing">Processing</option>
                    <option value="shipped">Shipped</option>
                    <option value="delivered">Delivered</option>
                    <option value="cancelled">Cancelled</option>
                  </Form.Select>
                </InputGroup>
              </Form.Group>
              <div className="d-flex justify-content-end mt-3">
                <Button
                  variant="secondary"
                  className="me-2"
                  onClick={() => setShowOrderModal(false)}
                  type="button"
                  style={{ borderRadius: 20, padding: '6px 24px' }}
                >
                  Cancel
                </Button>
                <Button variant="success" type="submit" style={{ borderRadius: 20, padding: '6px 24px' }}>
                  {orderForm.id ? 'Update Order' : 'Create Order'}
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

export default OrderManagement;