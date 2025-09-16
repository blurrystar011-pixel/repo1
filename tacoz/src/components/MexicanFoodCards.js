import React, { useState } from 'react';
import { Heart, Share2, Star, Filter, Clock, Flame, X, Phone, MessageCircle, ShoppingCart, Zap } from 'lucide-react';
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/cartSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import './MexicanFoodCards.css'; // Import the CSS file
import delimg1 from '../assets/del (1).png';
import delimg2 from '../assets/del (2).png';
import delimg3 from '../assets/del (3).png';

const MexicanFoodCards = () => {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [favorites, setFavorites] = useState(new Set());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

const handleAddToCart = (item) => {
  const itemWithNumericPrice = {
    ...item,
    price: parseFloat(item.price.replace("£", "")) // ✅ convert to number
  };
  dispatch(addToCart(itemWithNumericPrice));
  toast.success(`${item.name} added to cart 🛒`);
  closeModal();
};

const handleBuyNow = (item) => {
  const itemWithNumericPrice = {
    ...item,
    price: parseFloat(item.price.replace("£", "")) // ✅ convert to number
  };
  dispatch(addToCart(itemWithNumericPrice));
  toast.info(`Redirecting to cart... ⚡`);
  navigate("/cart");
};


  const foodItems = [
    {
      id: 1,
      name: "Authentic Chicken Tacos",
      price: "£12.99",
      rating: 4.8,
      description: "Tender chicken with fresh cilantro, onions, & lime on corn tortillas",
      image: "https://www.mexicanplease.com/wp-content/uploads/2018/01/best-chicken-tacos-closeup.jpg",
      category: "tacos",
      spicyLevel: 2,
      cookTime: "15-20 min",
      offer: "20% OFF",
      _id:'68bc364e56a0395461c3d121'

    },
    {
      id: 2,
      name: "Beef Burrito Bowl",
      price: "£14.50",
      rating: 4.6,
      description: "Seasoned beef with black beans, rice, cheese, and fresh guacamole",
      image: "https://images.unsplash.com/photo-1544025162-d76694265947?w=400&h=300&fit=crop",
      category: "bowls",
      spicyLevel: 1,
      cookTime: "10-15 min",
      offer: "FREE DELIVERY",
        _id:'68bc364e56a0395461c3d122'
    },
    {
      id: 3,
      name: "Spicy Jalapeño Quesadilla",
      price: "£10.99",
      rating: 4.7,
      description: "Crispy tortilla filled with melted cheese, jalapeños, and chicken",
      image: "https://images.unsplash.com/photo-1618040996337-56904b7850b9?w=400&h=300&fit=crop",
      category: "quesadillas",
      spicyLevel: 3,
      cookTime: "12-18 min",
      offer: "BUY 2 GET 1",
       _id:'68bc364e56a0395461c3d123'
    },
    {
      id: 4,
      name: "Veggie Enchiladas",
      price: "£13.25",
      rating: 4.5,
      description: "Roasted vegetables wrapped in corn tortillas with sauce & cheese",
      image: "https://www.spendwithpennies.com/wp-content/uploads/2021/03/Veggie-Enchiladas-SpendWithPennies-9.jpg",
      category: "enchiladas",
      spicyLevel: 1,
      cookTime: "20-25 min",
      offer: "15% OFF",
       _id:'68bc364e56a0395461c3d124'
    },
    {
      id: 5,
      name: "Carnitas Tacos",
      price: "£13.99",
      rating: 4.9,
      description: "Slow-cooked pork shoulder with pickled onions and chipotle crema",
      image: "https://images.unsplash.com/photo-1613514785940-daed07799d9b?w=400&h=300&fit=crop",
      category: "tacos",
      spicyLevel: 2,
      cookTime: "15-20 min",
       _id:'68bc364e56a0395461c3d125'
    },
    {
      id: 6,
      name: "Shrimp Burrito Bowl",
      price: "£16.75",
      rating: 4.8,
      description: "Grilled shrimp with cilantro-lime rice, black beans, and mango salsa",
      image: "https://i.pinimg.com/736x/2f/ec/2c/2fec2c372d0b2907835ff0fdb8545343.jpg",
      category: "bowls",
      spicyLevel: 2,
      cookTime: "12-16 min",
      offer: "NEW ITEM",
       _id:'68bc364e56a0395461c3d126'
    }
  ];

  const filters = [
    { id: 'all', label: 'All Items', icon: '🌮' },
    { id: 'tacos', label: 'Tacos', icon: '🌮' },
    { id: 'bowls', label: 'Bowls', icon: '🥙' },
    { id: 'quesadillas', label: 'Quesadillas', icon: '🧀' },
    { id: 'enchiladas', label: 'Enchiladas', icon: '🌯' }
  ];

  const filteredItems = selectedFilter === 'all'
    ? foodItems
    : foodItems.filter(item => item.category === selectedFilter);

  const toggleFavorite = (id) => {
    const newFavorites = new Set(favorites);
    if (newFavorites.has(id)) {
      newFavorites.delete(id);
    } else {
      newFavorites.add(id);
    }
    setFavorites(newFavorites);
  };

  const openOrderModal = (item) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedItem(null);
  };

  const orderOptions = [
    {
      id: 'call',
      name: 'Call to Order',
      icon: <Phone className="w-6 h-6" />,
      url: 'tel:+447507002201',
      className: 'order-option-button-call'
    },
    {
      id: 'whatsapp',
      name: 'WhatsApp Order',
      icon: <MessageCircle className="w-6 h-6" />,
      url: 'https://wa.me/+447507002201',
      className: 'order-option-button-whatsapp'
    },
    {
      id: 'ubereats',
      name: 'Uber Eats',
      icon: <div className="w-6 h-6 bg-black rounded flex items-center justify-center text-white text-xs font-bold">UE</div>,
      url: 'https://www.ubereats.com/gb/store/hello-tacos/P5WjPrDqWdyye8UKSxKsrQ?diningMode=DELIVERY&pl=JTdCJTIyYWRkcmVzcyUyMiUzQSUyMjEwMyUyMFNpbW1vbnMlMjBEcml2ZSUyMiUyQyUyMnJlZmVyZW5jZSUyMiUzQSUyMjI3NWQzN2YwLWI2YWEtNDExOS0zM2Q4LTlmYTlkNzU0OTdhMyUyMiUyQyUyMnJlZmVyZW5jZVR5cGUlMjIlM0ElMjJ1YmVyX3BsYWNlcyUyMiUyQyUyMmxhdGl0dWRlJTIyJTNBNTIuNDUyOTQ4MiUyQyUyMmxvbmdpdHVkZSUyMiUzQS0xLjk5NjAwNjklN0Q%3D',
      className: 'order-option-button-ubereats'
    },
    {
      id: 'justeat',
      name: 'Just Eat',
      icon: <div className="w-6 h-6 bg-orange-500 rounded flex items-center justify-center text-white text-xs font-bold">JE</div>,
      url: 'https://justeat.com/restaurants-mexican-food',
      className: 'order-option-button-justeat'
    },
    {
      id: 'deliveroo',
      name: 'Deliveroo',
      icon: <div className="w-6 h-6 bg-cyan-500 rounded flex items-center justify-center text-white text-xs font-bold">DR</div>,
      url: 'https://deliveroo.co.uk/menu/birmingham/wolverhampton-city-centre/hello-tacos-56-mander-square?srsltid=AfmBOorvLsOfud3LL8ecLYDCbL4ZmiQDkhAs-cVAERemCZA8XcuTdyuf',
      className: 'order-option-button-deliveroo'
    }
  ];

  const handleOrderClick = (option) => {
    window.open(option.url, '_blank');
    closeModal();
  };

  const getSpicyIndicator = (level) => {
    return Array.from({ length: 3 }, (_, i) => (
      <Flame
        key={i}
        className={`spicy-indicator-flame ${i < level ? 'spicy-red' : 'spicy-gray'} text-danger`}
      />
    ));
  };

  return (
    <div className="container-fluid">
      <div className="max-w-7xl">
        {/* Header */}
        <div className="header-container">
          <h1 className="header-title">🌮 Authentic Mexican Cuisine</h1>
          <p className="header-subtitle">Fresh ingredients, bold flavors, delivered to your door</p>
        </div>

        {/* Filter Section */}
        <div className="filter-section">
          <div className="filter-header">
            <Filter className="filter-icon" />
            <h2 className="filter-title">Filter Menu</h2>
          </div>
          <div className="filter-buttons">
            {filters.map(filter => (
              <button
                key={filter.id}
                onClick={() => setSelectedFilter(filter.id)}
                className={`filter-button ${selectedFilter === filter.id ? 'filter-button-selected' : 'filter-button-unselected'}`}
              >
                <span className="filter-button-icon">{filter.icon}</span>
                {filter.label}
              </button>
            ))}
          </div>
        </div>

        {/* Food Cards Grid */}
        <div className="food-grid">
          {filteredItems.map((item, index) => (
            <div
              key={item.id}
              className="food-card"
              style={{
                animationDelay: `${index * 0.1}s`
              }}
            >
              {/* Image Container */}
              <div className="image-container">
                <img
                  src={item.image}
                  alt={item.name}
                />
                <div className="image-overlay" />

                {/* Offer Badge */}
                {item.offer && (
                  <div className="offer-badge">
                    {item.offer}
                  </div>
                )}

                {/* Wishlist & Share Buttons */}
                <div className="card-buttons">
                  <button
                    onClick={() => toggleFavorite(item.id)}
                    className={`card-button wishlist-button ${favorites.has(item.id) ? 'wishlist-button-favorite' : ''}`}
                  >
                    <Heart className="card-button-icon" fill={favorites.has(item.id) ? 'currentColor' : 'none'} />
                  </button>
                  <button className="card-button share-button">
                    <Share2 className="card-button-icon" />
                  </button>
                </div>

                {/* Rating Badge */}
                <div className="rating-badge">
                  <Star />
                  <span>{item.rating}</span>
                </div>
              </div>

              {/* Content */}
              <div className="card-content">
                <div className="card-header-row">
                  <h3 className="card-title">{item.name}</h3>
                  <span className="card-price">{item.price}</span>
                </div>

                <p className="card-description">{item.description}</p>

                {/* Meta Info */}
                <div className="meta-info">
                  <div className="meta-group">
                    <Clock />
                    <span>{item.cookTime}</span>
                  </div>
                  <div className="meta-group spicy-indicator text-danger">
                    {getSpicyIndicator(item.spicyLevel)}
                  </div>
                </div>

                {/* Order Platforms */}
                <div className="platform-row">
                  <span className="platform-label">Order:</span>
                  <div className="platform-buttons">
                    {[delimg1, delimg2, delimg3].map(platform => (
                      <img style={{ width: '60px', height: '40px', objectFit:"contain" }} alt="Delivery Platform"
                        src={platform}></img>
                    ))}
                  </div>
                </div>

                {/* Order Button */}
                <button
                  onClick={() => openOrderModal(item)}
                  className="order-button"
                >
                  Order Now
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Order Modal */}
        {isModalOpen && selectedItem && (
          <div className="modal-overlay">
            <div className="modal-content animate-pulse-once">
              {/* Modal Header */}
              <div className="modal-header">
                <div className="modal-title-group">
                  <h3 className="modal-title">Order {selectedItem.name}</h3>
                  <p className="modal-subtitle">Choose your preferred ordering method</p>
                </div>
                <button
                  onClick={closeModal}
                  className="modal-close-button"
                >
                  <X className="modal-close-button-icon" />
                </button>
              </div>

              {/* Food Item Preview */}
              <div className="food-preview">
                <div className="food-preview-content">
                  <img
                    src={selectedItem.image}
                    alt={selectedItem.name}
                    className="food-preview-img"
                  />
                  <div className="food-preview-text">
                    <h4>{selectedItem.name}</h4>
                    <div className="food-preview-details">
                      <span className="food-preview-price">{selectedItem.price}</span>
                      <div className="food-preview-rating">
                        <Star />
                        <span>{selectedItem.rating}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* ✅ Cart Actions */}
              <div className="modal-actions">
                <button
                  className="btn btn-add"
                  onClick={() => handleAddToCart(selectedItem)}
                >
                  <ShoppingCart size={16} className="me-1" /> Add to Cart
                </button>
                <button
                  className="btn btn-buy"
                  onClick={() => handleBuyNow(selectedItem)}
                >
                  <Zap size={16} className="me-1" /> Buy Now
                </button>
              </div>

              {/* Order Options */}
              <div className="order-options">
                {orderOptions.map(option => (
                  <button
                    key={option.id}
                    onClick={() => handleOrderClick(option)}
                    className={`order-option-button ${option.className}`}
                  >
                    <div className="hover-overlay"></div>
                    <div className="option-icon">
                      {option.icon}
                    </div>
                    <span className="option-text">{option.name}</span>
                    <div className="option-type">
                      {option.id === 'call' && 'Instant'}
                      {option.id === 'whatsapp' && 'Chat'}
                      {option.id !== 'call' && option.id !== 'whatsapp' && 'App'}
                    </div>
                  </button>
                ))}
              </div>

              {/* Footer */}
              <div className="modal-footer">
                <p>All delivery times and prices may vary by platform</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MexicanFoodCards;
