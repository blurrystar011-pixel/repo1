// ✅ Updated CartPage.jsx (no LoginModal)
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, updateQty, clearCart, addToCart } from "../redux/cartSlice";
import { useNavigate } from "react-router-dom";
import "./Cart.css";

const BASE_URL = process.env.REACT_APP_BACKEND_URL;

const CartPage = () => {
  const items = useSelector((s) => s.cart.items);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [orderNote, setOrderNote] = useState("");
  const [recommendations, setRecommendations] = useState([]);

  const total = items.reduce((s, i) => s + i.price * i.qty, 0);

  // ✅ Fetch dynamic add-ons
  useEffect(() => {
    if (items.length > 0) {
      const ids = items.map((i) => i._id || i.id).join(",");
      fetch(`${BASE_URL}/api/recommendations?cart=${ids}`)
        .then((res) => res.json())
        .then(setRecommendations)
        .catch(() => setRecommendations([]));
    }
  }, [items]);

  const handleProceedCheckout = () => {
    if (total < 5) {
      alert("Minimum order is £5.");
      return;
    }

    // ✅ Redirect to checkout page with order data
    navigate("/checkout", { state: { items, total, note: orderNote } });
  };

  return (
    <div className="cart-layout">
      {/* LEFT SIDE - CART ITEMS */}
      <div className="cart-items-section">
        <h2 className="cart-title">🌮 Your Cart</h2>
        {items.length === 0 ? (
          <p className="empty-cart">Your cart is empty. Add something tasty 😋</p>
        ) : (
          <ul className="cart-list">
            {items.map((i) => (
              <li key={i._id || i.id} className="cart-item">
                <img src={i.image || "/placeholder.jpg"} alt={i.name} className="item-img" />
                <div className="item-details">
                  <h4 className="item-name">{i.name}</h4>
                  <p className="item-price">£{i.price.toFixed(2)}</p>
                  <div className="qty-box">
                    Qty:
                    <input
                      type="number"
                      value={i.qty}
                      min={1}
                      onChange={(e) =>
                        dispatch(updateQty({ id: i._id || i.id, qty: Number(e.target.value) }))
                      }
                    />
                  </div>
                </div>
                <button
                  className="remove-btn"
                  onClick={() => dispatch(removeFromCart(i._id || i.id))}
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* RIGHT SIDE - SUMMARY + UPSELL */}
      <div className="summary-section">
        <div className="summary-card">
          <h3>Order Summary</h3>
          <p className="summary-total">
            Total: <strong>£{total.toFixed(2)}</strong>
          </p>

          {/* ✅ Min order warning */}
          {total < 5 && (
            <p className="min-order-warning">
              ⚠️ Minimum order is £5. Please add more items.
            </p>
          )}

          {/* ✅ Order note */}
          <textarea
            className="order-note"
            placeholder="Add a note for your order (optional)"
            value={orderNote}
            onChange={(e) => setOrderNote(e.target.value)}
          />

          <button
            className="checkout-btn"
            onClick={handleProceedCheckout}
            disabled={total < 5}
          >
            🚀 Proceed to Checkout
          </button>
          <button className="clear-btn" onClick={() => dispatch(clearCart())}>
            🗑️ Clear Cart
          </button>
        </div>

        {/* Dynamic Related Section */}
        {recommendations.length > 0 && (
          <div className="upsell-section">
            <h3>🔥 You may also like</h3>
            <div className="upsell-list">
              {recommendations.map((p) => (
                <div key={p.id} className="upsell-item">
                  <img src={p.image} alt={p.name} className="upsell-img" />
                  <p className="upsell-name">{p.name}</p>
                  <p className="upsell-price">£{p.price.toFixed(2)}</p>
                  <button
                    className="add-btn"
                    onClick={() => dispatch(addToCart({ ...p, qty: 1 }))}
                  >
                    + Add
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;
