import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Spinner } from 'react-bootstrap';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useAuth } from '../context/AuthContext';

const DashboardManagement = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalOrders: 0,
    totalUsers: 0,
    totalRevenue: 0,
    recentOrders: [],
    topProducts: []
  });

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://47.130.121.192:8000/api/dashboard/stats', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      setStats(response.data);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      toast.error('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const styles = {
    page: {
      padding: '1rem',
    },
    statsCard: {
      background: 'white',
      borderRadius: '16px',
      padding: '1.5rem',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
      height: '100%',
      transition: 'transform 0.2s ease-in-out',
      '&:hover': {
        transform: 'translateY(-5px)',
      },
    },
    statsIcon: {
      width: '48px',
      height: '48px',
      borderRadius: '12px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '1.5rem',
      marginBottom: '1rem',
    },
    statsValue: {
      fontSize: '1.75rem',
      fontWeight: '700',
      marginBottom: '0.5rem',
      color: '#1a202c',
    },
    statsLabel: {
      fontSize: '0.875rem',
      color: '#718096',
      margin: 0,
    },
    sectionTitle: {
      fontSize: '1.25rem',
      fontWeight: '600',
      color: '#2d3748',
      marginBottom: '1.5rem',
    },
    recentOrderCard: {
      background: 'white',
      borderRadius: '12px',
      padding: '1rem',
      marginBottom: '1rem',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)',
      border: '1px solid #e2e8f0',
    },
    productCard: {
      background: 'white',
      borderRadius: '12px',
      padding: '1rem',
      marginBottom: '1rem',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)',
      border: '1px solid #e2e8f0',
      display: 'flex',
      alignItems: 'center',
      gap: '1rem',
    },
    productImage: {
      width: '60px',
      height: '60px',
      borderRadius: '8px',
      objectFit: 'cover',
    },
    statusBadge: {
      padding: '0.25rem 0.75rem',
      borderRadius: '12px',
      fontSize: '0.75rem',
      fontWeight: '600',
    },
  };

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '400px' }}>
        <Spinner animation="border" variant="primary" />
      </div>
    );
  }

  return (
    <div style={styles.page}>
      {/* Statistics Cards */}
      <Row className="g-4 mb-4">
        <Col md={3}>
          <Card style={styles.statsCard}>
            <div style={{ ...styles.statsIcon, background: 'linear-gradient(135deg, #667eea, #5a67d8)' }}>
              <i className="bi bi-box-seam text-white"></i>
            </div>
            <div style={styles.statsValue}>{stats.totalProducts}</div>
            <p style={styles.statsLabel}>Total Products</p>
          </Card>
        </Col>
        <Col md={3}>
          <Card style={styles.statsCard}>
            <div style={{ ...styles.statsIcon, background: 'linear-gradient(135deg, #48bb78, #38a169)' }}>
              <i className="bi bi-receipt text-white"></i>
            </div>
            <div style={styles.statsValue}>{stats.totalOrders}</div>
            <p style={styles.statsLabel}>Total Orders</p>
          </Card>
        </Col>
        <Col md={3}>
          <Card style={styles.statsCard}>
            <div style={{ ...styles.statsIcon, background: 'linear-gradient(135deg, #ed8936, #dd6b20)' }}>
              <i className="bi bi-people text-white"></i>
            </div>
            <div style={styles.statsValue}>{stats.totalUsers}</div>
            <p style={styles.statsLabel}>Total Users</p>
          </Card>
        </Col>
        <Col md={3}>
          <Card style={styles.statsCard}>
            <div style={{ ...styles.statsIcon, background: 'linear-gradient(135deg, #f56565, #e53e3e)' }}>
              <i className="bi bi-currency-dollar text-white"></i>
            </div>
            <div style={styles.statsValue}>{formatCurrency(stats.totalRevenue)}</div>
            <p style={styles.statsLabel}>Total Revenue</p>
          </Card>
        </Col>
      </Row>

      {/* Recent Orders and Top Products */}
      <Row className="g-4">
        <Col md={6}>
          <div>
            <h3 style={styles.sectionTitle}>Recent Orders</h3>
            {stats.recentOrders.map((order) => (
              <div key={order.id} style={styles.recentOrderCard}>
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <h6 className="mb-1">Order #{order.id}</h6>
                    <p className="mb-0 text-muted">{order.customer_name}</p>
                    <small className="text-muted">{formatDate(order.created_at)}</small>
                  </div>
                  <div>
                    <span
                      style={{
                        ...styles.statusBadge,
                        background: order.status === 'completed' ? '#c6f6d5' : '#fed7d7',
                        color: order.status === 'completed' ? '#2f855a' : '#c53030',
                      }}
                    >
                      {order.status}
                    </span>
                  </div>
                </div>
                <div className="mt-2">
                  <small className="text-muted">{formatCurrency(order.total)}</small>
                </div>
              </div>
            ))}
          </div>
        </Col>
        <Col md={6}>
          <div>
            <h3 style={styles.sectionTitle}>Top Products</h3>
            {stats.topProducts.map((product) => (
              <div key={product.id} style={styles.productCard}>
                <img
                  src={`http://47.130.121.192:8000${product.image}`}
                  alt={product.name}
                  style={styles.productImage}
                />
                <div className="flex-grow-1">
                  <h6 className="mb-1">{product.name}</h6>
                  <p className="mb-0 text-muted">{formatCurrency(product.price)}</p>
                </div>
                <div>
                  <span
                    style={{
                      ...styles.statusBadge,
                      background: '#e2e8f0',
                      color: '#4a5568',
                    }}
                  >
                    {product.stock} in stock
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default DashboardManagement;
