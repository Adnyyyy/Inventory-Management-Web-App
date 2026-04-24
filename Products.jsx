import { useState, useEffect } from 'react';

function Products({ token, onLogout }) {
  const [products, setProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [isDeleteMode, setIsDeleteMode] = useState(false);
  const [selectedIds, setSelectedIds] = useState([]);

  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const [description, setDescription] = useState('');

  const fetchProducts = async () => {
    try {
      const response = await fetch("http://localhost:8000/products", {
        headers: { "Authorization": `Bearer ${token}` }
      });
      if (response.ok) {
        const data = await response.json();
        setProducts(data);
      }
    } catch (err) {
      console.error("Failed to fetch products", err);
    }
  };

  useEffect(() => {
    if (token) fetchProducts();
  }, [token]);

  const toggleSelection = (id) => {
    if (!isDeleteMode) return;
    setSelectedIds(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const handleEditClick = (product, e) => {
    e.stopPropagation();
    setEditingId(product.id);
    setName(product.name);
    setCategory(product.category);
    setPrice(product.price);
    setQuantity(product.quantity);
    setDescription(product.description);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingId(null);
    setName(''); setCategory(''); setPrice(''); setQuantity(''); setDescription('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const productData = {
      name,
      category,
      price: parseFloat(price),
      quantity: parseInt(quantity),
      description
    };

    const url = editingId
      ? `http://localhost:8000/product?id=${editingId}`
      : "http://localhost:8000/product";

    const method = editingId ? "PUT" : "POST";

    try {
      const response = await fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(productData),
      });

      if (response.ok) {
        closeModal();
        fetchProducts();
      } else {
        const errorData = await response.json();
        alert(`Error: ${JSON.stringify(errorData.detail)}`);
      }
    } catch (err) {
      alert("Error connecting to server");
    }
  };

  const handleMassDelete = async () => {
    if (selectedIds.length === 0) return;
    if (window.confirm(`Are you sure you want to delete ${selectedIds.length} items?`)) {
      try {
        await Promise.all(selectedIds.map(id =>
          fetch(`http://localhost:8000/product?id=${id}`, {
            method: 'DELETE',
            headers: { "Authorization": `Bearer ${token}` }
          })
        ));
        setSelectedIds([]);
        setIsDeleteMode(false);
        fetchProducts();
      } catch (err) {
        alert("Error during mass deletion");
      }
    }
  };

  return (
    <div className="dashboard-container">
      <div className="action-bar" style={{ position: 'fixed', top: '30px', right: '30px', zIndex: 100, display: 'flex', gap: '10px' }}>
        <button
          className="delete-mode-btn"
          onClick={() => {
            setIsDeleteMode(!isDeleteMode);
            setSelectedIds([]);
          }}
          style={{
            backgroundColor: isDeleteMode ? '#6c757d' : '#dc3545',
            color: 'white',
            border: 'none',
            padding: '12px 18px',
            borderRadius: '8px',
            cursor: 'pointer',
            fontWeight: 'bold',
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
          }}
        >
          {isDeleteMode ? 'Cancel Selection' : '🗑️'}
        </button>
        <button className="add-button" onClick={() => setShowModal(true)}>
          Add +
        </button>
      </div>

      <h1 className="brand-title">
        <span className="brand-ds">My</span>
        <span className="brand-inventory"> Inventory</span>
        <span className="brand-manager"> Manager</span>
      </h1>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>{editingId ? "Edit Product" : "Add New Product"}</h2>
            <form onSubmit={handleSubmit}>
              <div className="input-group">
                <label>Product Name</label>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
              </div>
              <div className="input-group">
                <label>Category</label>
                <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} required />
              </div>

              <div className="input-row">
                <div className="input-group">
                  <label>Price ($)</label>
                  <input type="number" step="0.01" value={price} onChange={(e) => setPrice(e.target.value)} required />
                </div>
                <div className="input-group">
                  <label>Quantity</label>
                  <input type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)} required />
                </div>
              </div>

              <div className="input-group">
                <label>Description</label>
                <textarea value={description} onChange={(e) => setDescription(e.target.value)} required />
              </div>

              <div className="modal-actions">
                <button type="button" onClick={closeModal} className="cancel-btn">Cancel</button>
                <button type="submit" className="confirm-add-btn">
                  {editingId ? "Update Product" : "Add Product"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="product-grid">
        {products.map((product) => (
          <div
            key={product.id}
            className={`product-card ${selectedIds.includes(product.id) ? 'selected' : ''}`}
            onClick={() => toggleSelection(product.id)}
          >
            <div className="card-header">
              <span className="category-badge">{product.category}</span>
              <div className="header-right">
                <button className="edit-icon-btn" onClick={(e) => handleEditClick(product, e)}>
                  ✏️
                </button>
                <span className="date-label">
                  {product.date_added ? new Date(product.date_added).toLocaleDateString(undefined, {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric'
                  }) : '11 Apr 2026'}
                </span>
              </div>
            </div>

            <h3>{product.name}</h3>
            <p className="product-description">{product.description}</p>

            <div className="card-footer">
              <span className="product-price">${product.price}</span>
              <span className="quantity-label">
                Qty: {product.quantity}
              </span>
            </div>
          </div>
        ))}
      </div>

      {isDeleteMode && (
        <div className="mass-delete-bar">
          <span>{selectedIds.length} items selected</span>

          <div style={{ display: 'flex', gap: '10px' }}>
            <button
              className="cancel-selection-btn"
              onClick={() => {
                setIsDeleteMode(false);
                setSelectedIds([]);
              }}
            >
              Cancel
            </button>

            <button
              className="confirm-delete-btn"
              onClick={handleMassDelete}
              disabled={selectedIds.length === 0}
            >
              Confirm Delete
            </button>
          </div>
        </div>
      )}

      <button className="logout-button" onClick={onLogout}>Logout</button>
    </div>
  );
}

export default Products;
