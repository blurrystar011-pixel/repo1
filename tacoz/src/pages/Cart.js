// client/src/pages/CartPage.jsx
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, updateQty, clearCart, addToCart } from "../redux/cartSlice";
import LoginModal from "../components/LoginModel"; // ✅ Import your login modal
import "./Cart.css";
  const BASE_URL = process.env.REACT_APP_BACKEND_URL;
const trendingProducts = [
  { id: "t1", name: "Spicy Tacos", price: 3.49, image: "https://th.bing.com/th/id/OIP.u5TUrIWBDdL8oZ6kWjTmXwHaFI?w=194&h=135&c=7&r=0&o=7&dpr=2&pid=1.7&rm=3" },
  { id: "t2", name: "Guacamole Dip", price: 2.49, image: "https://th.bing.com/th/id/OIP.EORXrssigHPPDLQ7jgCsNwHaKL?w=194&h=267&c=7&r=0&o=7&dpr=2&pid=1.7&rm=3" },
  { id: "t3", name: "Churros", price: 4.99, image: "https://th.bing.com/th/id/OIP.e-qfd4adJX7L6fmYXbWjPQHaIz?w=194&h=230&c=7&r=0&o=7&dpr=2&pid=1.7&rm=3" },
];

const CartPage = () => {
  const items = useSelector((s) => s.cart.items);
  const user = useSelector((s) => s.user); // ✅ Grab user from Redux
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [showLogin, setShowLogin] = useState(false);

  // ✅ Auto-fill email if logged in
  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem("user")); // assuming you save user here
    if (savedUser?.email) {
      setEmail(savedUser.email);
    } else if (user?.email) {
      setEmail(user.email);
    }
  }, [user]);

  const total = items.reduce((s, i) => s + i.price * i.qty, 0);

  const handleCheckout = async () => {
    if (!email) {
      // ✅ If not logged in, show login modal
      setShowLogin(true);
      return;
    }

    try {
      const res = await fetch(`${BASE_URL}/api/create-checkout-session`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items, email }),
      });

      const data = await res.json();
      if (data.url) window.location.href = data.url;
    } catch (err) {
      console.error("Checkout error:", err);
      alert("Something went wrong. Try again later.");
    }
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
                  <p className="item-price">€{i.price.toFixed(2)}</p>
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
            Total: <strong>€{total.toFixed(2)}</strong>
          </p>

          {/* ✅ Only show email input if not logged in */}
          {!email && (
            <div className="login-warning">
              <p>Please login to continue checkout</p>
            </div>
          )}

          <button className="checkout-btn" onClick={handleCheckout}>
            💳 Checkout with Stripe
          </button>
          <button className="clear-btn" onClick={() => dispatch(clearCart())}>
            🗑️ Clear Cart
          </button>
        </div>

        {/* Related / Trending Section */}
        <div className="upsell-section">
          <h3>🔥 Trending Now</h3>
          <div className="upsell-list">
            {trendingProducts.map((p) => (
              <div key={p.id} className="upsell-item">
                <img src={p.image} alt={p.name} className="upsell-img" />
                <p className="upsell-name">{p.name}</p>
                <p className="upsell-price">€{p.price.toFixed(2)}</p>
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
      </div>

      {/* ✅ Show Login Modal if needed */}
      {showLogin && <LoginModal setShowModal={setShowLogin} />}
    </div>
  );
};

export default CartPage;
