import React from 'react';
import { X, Star, ShoppingCart, Zap } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/cartSlice';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import './ProductModel.css'; // new css file
const ProductModal = ({ item, onClose }) => {
  console.log('ProductModal item:', item); // Debugging line
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleAdd = () => {
    dispatch(addToCart(item));
    toast.success(`${item.name} added to cart 🛒`);
    onClose();
  };

  const handleBuyNow = () => {
    dispatch(addToCart(item));
    toast.info(`Redirecting to cart... ⚡`);
    navigate('/cart');
  };

  return (
    <div className="modal-overlay">
      <div className="modal-card">
        {/* Header */}
        <div className="modal-header">
          <h3 className="modal-title">{item.name}</h3>
          <button className="close-btn" onClick={onClose}>
            <X size={22} />
          </button>
        </div>

        {/* Content */}
        <div className="modal-body">
          <img
            src={item.image || '/placeholder.jpg'}
            alt={item.name}
            className="modal-img"
          />

          <div className="modal-info">
            <p className="modal-desc">{item.description}</p>

            <div className="modal-meta">
              <span className="rating">
                <Star size={16} className="star" /> {item.rating || 0}
              </span>
              <span>💸 {item.price} €</span>
              <span>
                🚚 {item.deliveryPrice ? `${item.deliveryPrice} €` : 'Free Delivery'}
              </span>
            </div>

            {item.offer && <div className="offer">{item.offer}</div>}

            {/* Actions */}
            <div className="modal-actions">
              <button className="btn btn-add" onClick={handleAdd}>
                <ShoppingCart size={16} className="me-1" /> Add to Cart
              </button>
              <button className="btn btn-buy" onClick={handleBuyNow}>
                <Zap size={16} className="me-1" /> Buy Now
              </button>
            </div>

            {/* Extra Ordering Options */}
            {item.orderingOptions?.length > 0 && (
              <div className="modal-extra">
                <h4>Order via:</h4>
                <div className="modal-links">
                  {item.orderingOptions.map((option) => (
                    <a
                      key={option.type}
                      href={option.action}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="order-link"
                    >
                      {option.label}
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;
