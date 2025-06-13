import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Modal, Button, Form, Table, Image } from "react-bootstrap";

const ProductManagement = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [productForm, setProductForm] = useState({
    id: null,
    name: "",
    description: "",
    price: "",
    stock_quantity: "",
    image: null,
    category_id: "",
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [showProductModal, setShowProductModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteItem, setDeleteItem] = useState({ type: "", id: null });

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);
const API_BASE_URL = "http://47.130.121.192:8000";
  const fetchCategories = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/categories`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setCategories(response.data);
    } catch (error) {
      toast.error(
        "Failed to fetch categories: " +
          (error.response?.data?.message || "Unknown error")
      );
    }
  };

  const fetchProducts = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/products`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setProducts(response.data);
    } catch (error) {
      toast.error(
        "Failed to fetch products: " +
          (error.response?.data?.message || "Unknown error")
      );
    }
  };

  const handleProductSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", productForm.name);
      formData.append("description", productForm.description);
      formData.append("price", productForm.price);
      formData.append("stock_quantity", productForm.stock_quantity);
      formData.append("category_id", productForm.category_id);

      if (productForm.image instanceof File) {
        formData.append("image", productForm.image);
      }

      if (productForm.id) {
        formData.append("_method", "PUT");
        await axios.post(
          `http://47.130.121.192:8000/api/products/${productForm.id}`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
      } else {
        await axios.post("http://47.130.121.192:8000/api/products", formData, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
      }

      fetchProducts();
      setProductForm({
        id: null,
        name: "",
        description: "",
        price: "",
        stock_quantity: "",
        image: null,
        category_id: "",
      });
      setImagePreview(null);
      setShowProductModal(false);
      toast.success("Product saved");
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.response?.data?.error ||
        "Unknown error";
      toast.error("Failed to save product: " + errorMessage);
      if (error.response?.data?.errors) {
        Object.values(error.response.data.errors).forEach((messages) => {
          messages.forEach((message) => toast.error(message));
        });
      }
    }
  };
  const handleDelete = async () => {
    try {
      await axios.delete(
        `http://47.130.121.192:8000/api/${deleteItem.type}/${deleteItem.id}`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      fetchProducts();
      setShowDeleteModal(false);
      toast.success(`${deleteItem.type} deleted`);
    } catch (error) {
      toast.error(
        `Failed to delete ${deleteItem.type}: ` +
          (error.response?.data?.message || "Unknown error")
      );
    }
  };

  const openProductModal = (product = null) => {
    if (product) {
      setProductForm({
        ...product,
        category_id: product.category_id.toString(),
        image: null,
        stock_quantity: product.stock_quantity,
      });
      setImagePreview(product.image_url || product.image || null);
    } else {
      setProductForm({
        id: null,
        name: "",
        description: "",
        price: "",
        stock_quantity: "",
        image: null,
        category_id: "",
      });
      setImagePreview(null);
    }
    setShowProductModal(true);
  };

  const openDeleteModal = (type, id) => {
    setDeleteItem({ type, id });
    setShowDeleteModal(true);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProductForm({ ...productForm, image: file });
      setImagePreview(URL.createObjectURL(file));
    } else {
      setProductForm({ ...productForm, image: null });
      setImagePreview(null);
    }
  };

  // Table-based UX/UI styles
  const styles = {
    page: {
      background: "#f8f9fa",
      minHeight: "100vh",
      padding: "32px 0",
    },
    header: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: 24,
    },
    addBtn: {
      borderRadius: 24,
      padding: "8px 24px",
      fontWeight: 600,
      fontSize: 16,
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
    image: {
      width: 60,
      height: 60,
      objectFit: "cover",
      borderRadius: 10,
      border: "1px solid #dee2e6",
      background: "#f8f9fa",
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
    },
    modalBody: {
      padding: 24,
    },
    modalFooter: {
      borderTop: "none",
      padding: 16,
    },
    formLabel: {
      fontWeight: 600,
      marginBottom: 4,
    },
    formControl: {
      borderRadius: 12,
      fontSize: 15,
      marginBottom: 16,
    },
    imagePreview: {
      width: 100,
      height: 100,
      objectFit: "cover",
      borderRadius: 12,
      marginTop: 8,
      border: "1px solid #dee2e6",
    },
    noData: {
      textAlign: "center",
      color: "#adb5bd",
      fontSize: 18,
      padding: "48px 0",
    },
  };

  return (
    <div style={styles.page}>
      <div className="container">
        <div style={styles.header}>
          <h3 style={{ fontWeight: 700, letterSpacing: 1 }}>
            Product Management
          </h3>
          <Button
            variant="success"
            style={styles.addBtn}
            onClick={() => openProductModal()}
          >
            + Add Product
          </Button>
        </div>

        {/* Table for Products */}
        <div style={styles.tableWrapper}>
          <Table responsive hover style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Image</th>
                <th style={styles.th}>Name</th>
                <th style={styles.th}>Description</th>
                <th style={styles.th}>Category</th>
                <th style={styles.th}>Price</th>
                <th style={styles.th}>Quantity</th>
                <th style={styles.th}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.length > 0 ? (
                products.map((product) => (
                  <tr key={product.id}>
                    <td style={styles.td}>
                      <Image
                        src={
                          product.image_url ||
                          "https://via.placeholder.com/60x60?text=No+Image"
                        }
                        alt={product.name}
                        style={styles.image}
                        onError={(e) =>
                          (e.target.src =
                            "https://via.placeholder.com/60x60?text=No+Image")
                        }
                        rounded
                      />
                    </td>
                    <td style={styles.td}>
                      <span style={{ fontWeight: 600 }}>{product.name}</span>
                    </td>
                    <td style={styles.td}>
                      {product.description.length > 40
                        ? product.description.substring(0, 40) + "..."
                        : product.description}
                    </td>
                    <td style={styles.td}>
                      <span style={{ color: "#198754", fontWeight: 500 }}>
                        {product.category?.name || "N/A"}
                      </span>
                    </td>
                    <td style={styles.td}>
                      <span style={{ fontWeight: 600 }}>${product.price}</span>
                    </td>
                    <td style={styles.td}>{product.stock_quantity}</td>
                    <td style={styles.td}>
                      <Button
                        variant="outline-primary"
                        size="sm"
                        style={styles.actionBtn}
                        onClick={() => openProductModal(product)}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="outline-danger"
                        size="sm"
                        style={styles.actionBtn}
                        onClick={() => openDeleteModal("products", product.id)}
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} style={styles.noData}>
                    <i
                      className="bi bi-box-seam"
                      style={{ fontSize: 48, opacity: 0.2 }}
                    ></i>
                    <div style={{ marginTop: 12 }}>No products found</div>
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </div>

        {/* Product Modal */}
        <Modal
          show={showProductModal}
          onHide={() => setShowProductModal(false)}
          centered
          contentClassName="rounded-4"
        >
          <Modal.Header closeButton style={styles.modalHeader}>
            <Modal.Title>
              {productForm.id ? "Edit Product" : "Add Product"}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body style={styles.modalBody}>
            <Form onSubmit={handleProductSubmit}>
              <Form.Group>
                <Form.Label style={styles.formLabel}>Name</Form.Label>
                <Form.Control
                  style={styles.formControl}
                  type="text"
                  value={productForm.name}
                  onChange={(e) =>
                    setProductForm({ ...productForm, name: e.target.value })
                  }
                  required
                  placeholder="Enter product name"
                />
              </Form.Group>
              <Form.Group>
                <Form.Label style={styles.formLabel}>Description</Form.Label>
                <Form.Control
                  style={styles.formControl}
                  as="textarea"
                  rows={3}
                  value={productForm.description}
                  onChange={(e) =>
                    setProductForm({
                      ...productForm,
                      description: e.target.value,
                    })
                  }
                  required
                  placeholder="Enter product description"
                />
              </Form.Group>
              <div className="row">
                <div className="col">
                  <Form.Group>
                    <Form.Label style={styles.formLabel}>Price</Form.Label>
                    <Form.Control
                      style={styles.formControl}
                      type="number"
                      min="0"
                      step="0.01"
                      value={productForm.price}
                      onChange={(e) =>
                        setProductForm({
                          ...productForm,
                          price: e.target.value,
                        })
                      }
                      required
                      placeholder="0.00"
                    />
                  </Form.Group>
                </div>
                <div className="col">
                  <Form.Group>
                    <Form.Label style={styles.formLabel}>Quantity</Form.Label>
                    <Form.Control
                      style={styles.formControl}
                      type="number"
                      min="0"
                      value={productForm.stock_quantity}
                      onChange={(e) =>
                        setProductForm({
                          ...productForm,
                          stock_quantity: e.target.value,
                        })
                      }
                      required
                      placeholder="0"
                    />
                  </Form.Group>
                </div>
              </div>
              <Form.Group>
                <Form.Label style={styles.formLabel}>Image</Form.Label>
                <Form.Control
                  style={styles.formControl}
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                />
                {imagePreview && (
                  <div>
                    <Image
                      src={imagePreview}
                      alt="Preview"
                      style={styles.imagePreview}
                      rounded
                    />
                  </div>
                )}
              </Form.Group>
              <Form.Group>
                <Form.Label style={styles.formLabel}>Category</Form.Label>
                <Form.Select
                  style={styles.formControl}
                  value={productForm.category_id}
                  onChange={(e) =>
                    setProductForm({
                      ...productForm,
                      category_id: e.target.value,
                    })
                  }
                  required
                >
                  <option value="">Select Category</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
              <div className="d-flex justify-content-end mt-3">
                <Button
                  variant="secondary"
                  className="me-2"
                  onClick={() => setShowProductModal(false)}
                  style={{ borderRadius: 20, padding: "6px 24px" }}
                >
                  Cancel
                </Button>
                <Button
                  variant="success"
                  type="submit"
                  style={{ borderRadius: 20, padding: "6px 24px" }}
                >
                  Save Product
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
              <i
                className="bi bi-exclamation-triangle-fill text-danger"
                style={{ fontSize: 36 }}
              ></i>
              <div style={{ marginTop: 16, fontSize: 18 }}>
                Are you sure you want to delete this{" "}
                {deleteItem.type.slice(0, -1)}?
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer style={styles.modalFooter}>
            <Button
              variant="secondary"
              onClick={() => setShowDeleteModal(false)}
              style={{ borderRadius: 20, padding: "6px 24px" }}
            >
              Cancel
            </Button>
            <Button
              variant="danger"
              onClick={handleDelete}
              style={{ borderRadius: 20, padding: "6px 24px" }}
            >
              Delete
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
};

export default ProductManagement;
